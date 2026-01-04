import { s as wn } from "./chrome-utils.js";
import "./constant.js";
import { remain_puid, initPremiumState, checking_premium_uid } from "./constant.js";
import { LogQueue } from "./log-queue.js";
import {
    defineComponent,
    ref,
    onMounted,
    onUnmounted,
    createApp,
    openBlock,
    createElementBlock,
    createElementVNode,
    Fragment,
    renderList,
    withDirectives,
    vModelText,
    toDisplayString,
    reactive,
    normalizeClass,
    createStaticVNode,
    createBlock
} from "./vendor.js";

// Component Definition
const HomePage = defineComponent({
    __name: "HomePage",
    setup() {
        // State
        const loading = ref(true);
        const userInfo = reactive({ UID: "...", ROLE: "..." });

        // Scan State
        const scanning = ref(false);
        const consoleLog = ref("");
        const scanOptions = reactive({
            mode: "list", // 'list' or 'range'
            startId: "",
            endId: "",
            threads: 50
        });

        const scanStats = ref({
            rps: 0,
            checked: 0,
            total: 0,
            percent: 0
        });

        // Dedicated ref for UI reactivity to ensure immediate updates
        const scanMode = ref("list");

        // Auto State
        const activeTab = ref("auto");
        const timerSettings = reactive({
            status: true,
            currentSecond: 30,
            secondEOP: 30,
            minSecondEOP: 30,
            maxSecondEOP: 30
        });

        // Initialize Data
        onMounted(async () => {
            try {
                // Load Premium State
                const data = await initPremiumState();
                userInfo.UID = data.UID;
                userInfo.ROLE = data.ROLE;
                consoleLog.value = `$ UID : ${data.UID}\n$ Starting bruteforce\n`;

                // Load Timer Settings & Tab
                loadTab();
                // Don't await getTimer indefinitely, just fire it
                getTimer().catch(console.error);

                // Listeners
                chrome.runtime.onMessage.addListener(x => {
                    if (x.type === "update-theory-object") Object.assign(timerSettings, x.value);
                });

                const interval = setInterval(getTimer, 1000);
                onUnmounted(() => clearInterval(interval));

            } catch (e) {
                console.error("Init error:", e);
            } finally {
                loading.value = false;
            }
        });

        // Safety timeout to ensure loading doesn't hang forever
        setTimeout(() => {
            if (loading.value) {
                console.warn("Loading timed out, forcing UI.");
                loading.value = false;
            }
        }, 3000);


        // --- Logic Functions ---
        let worker = null;
        let queue = new LogQueue();
        const WORKER_URL = new URL('./scan.worker.js', import.meta.url);

        // Initialize display loop
        // Initialize display loop
        let logLines = []; // Persistent buffer for performance
        const processLogs = () => {
            if (!queue.isEmpty()) {
                const newContent = queue.dequeueAll();
                if (!newContent) return;

                // Efficiently append and truncate
                const newLines = newContent.split('\n');
                // Filter out empty lines if needed, but keeping raw for now

                // Push new lines
                for (let i = 0; i < newLines.length; i++) {
                    if (newLines[i] !== "") logLines.push(newLines[i]);
                }

                // Truncate to last 300 lines
                if (logLines.length > 300) {
                    logLines = logLines.slice(-300);
                }

                consoleLog.value = logLines.join('\n');

                const el = document.getElementById("crack-console");
                if (el) el.scrollTop = el.scrollHeight;
            }
        };
        // Throttle log updates to 100ms (10 FPS) to prevent UI blocking
        setInterval(processLogs, 100);

        const initWorker = () => {
            if (worker) return;
            worker = new Worker(WORKER_URL, { type: "module" });

            worker.onmessage = (e) => {
                const { type, content, uid, stats } = e.data;

                if (type === "log") {
                    queue.enqueue(content);
                }
                else if (type === "stats") {
                    // Manual DOM update for performance and reliability
                    const rpsEl = document.getElementById('stat-rps');
                    const percentEl = document.getElementById('stat-percent');
                    const idEl = document.getElementById('stat-id');

                    if (rpsEl) rpsEl.textContent = stats.rps;
                    if (percentEl) percentEl.textContent = stats.percent + "%";
                    if (idEl) idEl.textContent = stats.checked || 0;

                    // Keep reactive state sync just in case
                    Object.assign(scanStats.value, stats);
                }
                else if (type === "found") {
                    queue.enqueue(content);
                    // Handle found logic
                    chrome.storage.local.set({ "eop-puid": uid });
                    scanning.value = false;
                    terminateWorker(); // Force stop
                }
                else if (type === "finished") {
                    scanning.value = false;
                }
            };

            worker.onerror = (err) => {
                console.error("Worker error:", err);
                queue.enqueue(`$ Worker Error: ${err.message}\n`);
                scanning.value = false;
            };
        };

        const terminateWorker = () => {
            if (worker) {
                worker.terminate();
                worker = null;
            }
        };

        const stopScan = () => {
            scanning.value = false;
            // Terminate immediately to stop all pending logs
            terminateWorker();
            queue.enqueue("$ Stop\n");
        };

        const bruteForceScan = async () => {
            scanning.value = true; // Set scanning true immediately
            initWorker();
            worker.postMessage({
                type: "START",
                payload: {
                    mode: scanOptions.mode,
                    startId: scanOptions.startId,
                    endId: scanOptions.endId,
                    threads: scanOptions.threads
                }
            });
        };

        const oneHit = async () => {
            try { await wn({ type: "theory-auto-filling", case: "one-hit" }) }
            catch (d) { console.error("Error in oneHit:", d) }
        };

        const changeTab = (tab) => {
            if (activeTab.value !== tab) {
                activeTab.value = tab;
                try { localStorage.setItem("activeTab", tab) } catch (e) { }
            }
        };

        const saveTab = () => { try { localStorage.setItem("activeTab", activeTab.value) } catch (e) { } };
        const loadTab = () => { try { const d = localStorage.getItem("activeTab"); if (d) activeTab.value = d; } catch (e) { } };

        const updateTimer = async () => {
            try { await wn({ type: "theory-auto-filling", case: "set-all", value: timerSettings }) }
            catch (d) { console.error("Error updating:", d) }
        };

        const getTimer = async () => {
            try {
                const d = await wn({ type: "theory-auto-filling", case: "get-all" });
                Object.assign(timerSettings, d);
            } catch (d) { }
        };

        // Render Function
        return () => {
            // Loading State
            if (loading.value) {
                return (openBlock(), createElementBlock("div", { key: "loading", class: "flex items-center justify-center min-h-screen bg-neutral-50" }, [
                    createElementVNode("div", { class: "loading loading-spinner loading-lg text-primary" })
                ]));
            }

            // Main Content
            return (openBlock(), createElementBlock("div", { key: "content", class: "bg-neutral-50 min-h-screen p-3" }, [

                // Header
                createElementVNode("h1", { class: "text-xl font-bold text-primary-600 mb-3" }, "Tool EOP [Cracked by lvh - hngl]"),

                // Tabs
                createElementVNode("div", { class: "tabs w-full" }, [
                    (openBlock(), createElementBlock(Fragment, null, renderList(["auto", "manual", "cracked"], (tab) => {
                        return createElementVNode("a", {
                            key: tab,
                            class: normalizeClass(["tab tab-lifted flex-1 text-sm", activeTab.value === tab ? "tab-active" : "bg-gray-200 bg-opacity-50"]),
                            onClick: () => changeTab(tab)
                        }, toDisplayString(tab === "auto" ? "Automatic" : tab === "manual" ? "Normal" : "Cracked"), 2);
                    }), 64))
                ]),

                // Content Area
                createElementVNode("div", { class: "bg-white rounded-b-lg shadow-sm p-4" }, [

                    // Auto Tab
                    activeTab.value === "auto" ? (openBlock(), createElementBlock("div", { key: 0 }, [
                        createElementVNode("div", { class: "text-center mb-4" }, [
                            createElementVNode("span", { class: "text-3xl font-bold text-accent-blue-500" }, toDisplayString(timerSettings.currentSecond) + " giây ", 1)
                        ]),
                        createElementVNode("div", { class: "flex items-center justify-between mb-3" }, [
                            createElementVNode("span", { class: "text-sm font-medium text-neutral-700" }, "Trạng thái tự động:"),
                            createElementVNode("input", {
                                type: "checkbox",
                                class: "toggle toggle-primary toggle-sm",
                                checked: timerSettings.status,
                                onChange: ($event) => {
                                    timerSettings.status = $event.target.checked;
                                    updateTimer();
                                }
                            }, null, 8, ["checked"])
                        ]),
                        createElementVNode("div", { class: "flex items-center justify-between" }, [
                            createElementVNode("label", { class: "text-sm text-neutral-600 whitespace-nowrap mr-2" }, "Độ trễ (s):"),
                            createElementVNode("div", { class: "flex items-center gap-2" }, [
                                withDirectives(createElementVNode("input", {
                                    "onUpdate:modelValue": $event => timerSettings.minSecondEOP = $event,
                                    type: "number",
                                    min: "5",
                                    class: "input input-bordered input-sm w-12 bg-neutral-100 focus:border-primary-400 text-center px-1",
                                    placeholder: "Min",
                                    onInput: updateTimer
                                }, null, 544), [[vModelText, timerSettings.minSecondEOP, void 0, { number: false }]]),

                                createElementVNode("span", { class: "text-neutral-400 font-bold" }, "-"),

                                withDirectives(createElementVNode("input", {
                                    "onUpdate:modelValue": $event => timerSettings.maxSecondEOP = $event,
                                    type: "number",
                                    min: "5",
                                    class: "input input-bordered input-sm w-12 bg-neutral-100 focus:border-primary-400 text-center px-1",
                                    placeholder: "Max",
                                    onInput: updateTimer
                                }, null, 544), [[vModelText, timerSettings.maxSecondEOP, void 0, { number: false }]])
                            ])
                        ])
                    ])) :

                        // Manual Tab
                        activeTab.value === "manual" ? (openBlock(), createElementBlock("div", { key: 1, class: "text-3xl font-bold text-accent-blue-500" }, [
                            createElementVNode("button", { onClick: oneHit, class: "btn btn-primary btn-sm w-full text-white" }, " One Hit ")
                        ])) :

                            // Cracked Tab
                            activeTab.value === "cracked" ? (openBlock(), createElementBlock("div", { key: 2, class: "font-bold bg-black text-white p-2 rounded" }, [
                                // Control Panel
                                createElementVNode("div", { class: "eop-config-panel" }, [
                                    createElementVNode("div", { class: "eop-radio-group" }, [
                                        createElementVNode("span", { class: "eop-label" }, "Mode"),
                                        createElementVNode("label", { class: "eop-radio-label" }, [
                                            createElementVNode("input", {
                                                type: "radio",
                                                name: "scanmode",
                                                value: "list",
                                                checked: scanMode.value === 'list',
                                                onClick: () => {
                                                    scanMode.value = 'list';
                                                    scanOptions.mode = 'list';
                                                    const el = document.getElementById('range-ui-container');
                                                    if (el) el.style.display = 'none';
                                                },
                                                class: "eop-radio"
                                            }),
                                            createElementVNode("span", {}, "LIST")
                                        ]),
                                        createElementVNode("label", { class: "eop-radio-label" }, [
                                            createElementVNode("input", {
                                                type: "radio",
                                                name: "scanmode",
                                                value: "range",
                                                checked: scanMode.value === 'range',
                                                onClick: () => {
                                                    scanMode.value = 'range';
                                                    scanOptions.mode = 'range';
                                                    const el = document.getElementById('range-ui-container');
                                                    if (el) el.style.display = 'flex';
                                                },
                                                class: "eop-radio"
                                            }),
                                            createElementVNode("span", {}, "RANGE")
                                        ])
                                    ]),

                                    // Range Inputs
                                    // Range Inputs
                                    createElementVNode("div", {
                                        id: "range-ui-container",
                                        key: "range-ui",
                                        class: "eop-input-group",
                                        style: { display: scanMode.value === 'range' ? 'flex' : 'none' }
                                    }, [
                                        createElementVNode("span", { class: "eop-label" }, "Range"),
                                        withDirectives(createElementVNode("input", {
                                            "onUpdate:modelValue": $event => scanOptions.startId = $event,
                                            type: "number",
                                            class: "eop-input",
                                            placeholder: "START"
                                        }, null, 512), [[vModelText, scanOptions.startId]]),
                                        createElementVNode("span", { class: "eop-divider" }, "-"),
                                        withDirectives(createElementVNode("input", {
                                            "onUpdate:modelValue": $event => scanOptions.endId = $event,
                                            type: "number",
                                            class: "eop-input",
                                            placeholder: "END"
                                        }, null, 512), [[vModelText, scanOptions.endId]])
                                    ]),

                                    // Thread Input
                                    createElementVNode("div", { key: "thread-input", class: "eop-input-group" }, [
                                        createElementVNode("span", { class: "eop-label" }, "Threads"),
                                        withDirectives(createElementVNode("input", {
                                            "onUpdate:modelValue": $event => scanOptions.threads = $event,
                                            type: "number",
                                            class: "eop-input",
                                            placeholder: "50",
                                            min: "1",
                                            max: "5000"
                                        }, null, 512), [[vModelText, scanOptions.threads]])
                                    ])
                                ]),

                                createElementVNode("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr", // 3 columns
                                        gap: "8px",
                                        marginBottom: "10px",
                                        padding: "8px"
                                    }
                                }, [
                                    // RPS Card
                                    createElementVNode("div", {
                                        style: {
                                            background: "#1e1e1e",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #333"
                                        }
                                    }, [
                                        createElementVNode("span", { style: { fontSize: "10px", color: "#888", marginBottom: "2px" } }, "RPS"),
                                        createElementVNode("span", { id: "stat-rps", style: { fontSize: "14px", fontWeight: "bold", color: "#4ade80" } }, toDisplayString(scanStats.value.rps))
                                    ]),

                                    // Percent Card
                                    createElementVNode("div", {
                                        style: {
                                            background: "#1e1e1e",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #333"
                                        }
                                    }, [
                                        createElementVNode("span", { style: { fontSize: "10px", color: "#888", marginBottom: "2px" } }, "PROGRESS"),
                                        createElementVNode("span", { id: "stat-percent", style: { fontSize: "14px", fontWeight: "bold", color: "#60a5fa" } }, toDisplayString(scanStats.value.percent) + "%")
                                    ]),

                                    // Checked Count Card
                                    createElementVNode("div", {
                                        style: {
                                            background: "#1e1e1e",
                                            padding: "8px",
                                            borderRadius: "6px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            border: "1px solid #333"
                                        }
                                    }, [
                                        createElementVNode("span", { style: { fontSize: "10px", color: "#888", marginBottom: "2px" } }, "CHECKED"),
                                        createElementVNode("span", { id: "stat-id", style: { fontSize: "14px", fontWeight: "bold", color: "#fca5a5" } }, toDisplayString(scanStats.value.checked || 0))
                                    ])
                                ]),

                                createElementVNode("div", { id: "crack-console", class: "console mb-2", textContent: consoleLog.value }, null, 8, ["textContent"]),
                                createElementVNode("button", {
                                    onClick: () => {
                                        if (!scanning.value) {
                                            scanning.value = true;
                                            bruteForceScan({ ...scanOptions });
                                        } else {
                                            stopScan();
                                        }
                                    },
                                    class: "btn btn-warning btn-sm text-black w-full"
                                }, toDisplayString(scanning.value ? "Tạm dừng" : "Bắt đầu"))
                            ])) : null
                ]),

                // Footer
                createStaticVNode(`
                    <div class="mt-4 bg-white rounded-lg shadow-sm p-4">
                        <h2 class="text-base font-bold text-secondary-500 mb-2">Chú ý</h2>
                        <ul class="list-disc list-inside space-y-2">
                            <li class="text-neutral-700 text-sm"> Vai trò: <span class="font-bold text-accent-blue-500">${userInfo.ROLE}</span></li>
                            <li class="text-neutral-700 text-sm"><strong>Donate:</strong> 034537028 MB - LE VIET HUNG</li>
                            <li class="text-neutral-700 text-sm"><strong>Miễn phí sử dụng</strong></li>
                            <li class="text-neutral-700 text-sm"><strong>Liên hệ</strong>
                                <a class="btn btn-circle btn-outline btn-xs bg-primary hover:bg-primary-600 text-white ml-1" href="https://www.facebook.com/hngl2808/" target="_blank"><i class="fab fa-facebook"></i></a>
                                <a class="btn btn-circle btn-outline btn-xs bg-primary hover:bg-primary-600 text-white ml-1" href="https://github.com/netrotion" target="_blank"><i class="fa-brands fa-github"></i></a>
                            </li>
                            <li class="text-neutral-700 text-sm"><strong>Sắp Xếp chữ (Mới):</strong> Chạy tool qua bài lý thuyết từ vựng trước, sau đó làm bài sắp xếp. </li>
                        </ul>
                    </div>`, 1)
            ]));
        };
    }
});

const App = defineComponent({
    __name: "App",
    setup() {
        return () => (openBlock(), createBlock(HomePage));
    }
});

createApp(App).mount("#app");