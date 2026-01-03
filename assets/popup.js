import { s as wn } from "./chrome-utils.js";
import "./constant.js";
import { remain_puid, initPremiumState } from "./constant.js";
import {
    defineComponent,
    ref,
    reactive,
    onMounted,
    onUnmounted,
    openBlock,
    createElementBlock,
    createElementVNode,
    Fragment,
    renderList,
    normalizeClass,
    toDisplayString,
    withDirectives,
    vModelCheckbox,
    vModelText,
    createStaticVNode,
    createBlock,
    createApp
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

        // Auto State
        const activeTab = ref("auto");
        const timerSettings = reactive({
            status: true,
            currentSecond: 30,
            secondEOP: 30
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
        const bruteForceScan = async () => {
            consoleLog.value = "$ Starting bruteforce\n";
            let index = 0;
            const loop = async () => {
                if (!scanning.value) return;
                if (index >= remain_puid.length) {
                    consoleLog.value += `$ Finished scanning, no premium UID found.\n`;
                    scanning.value = false;
                    return;
                }
                const currentUid = remain_puid[index];
                try {
                    const res = await fetch(`https://tool-eop-v3-backend-wszmtm2dda-uc.a.run.app/task-answer/answers`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ major: "1", unit: "0", task: "1", userId: currentUid })
                    });

                    const isPremium = res.status === 200;
                    consoleLog.value += `[${currentUid}] ${isPremium ? "Role : *Premium*" : "Role : Normal"}\n`;
                    if (isPremium) {
                        consoleLog.value += `$ Found 1 premium UID, exiting...\n$ UID changed, please reopen extension to take effect.\n`;
                        chrome.storage.local.set({ "eop-puid": currentUid });
                        return;
                    }
                    const el = document.getElementById("crack-console");
                    if (el) el.scrollTop = el.scrollHeight;

                    index++;
                    await new Promise(r => setTimeout(r, 0));
                    loop();
                } catch (err) {
                    consoleLog.value += `[${currentUid}] connection error: ${err.message}\n`;
                    scanning.value = false;
                }
            };
            loop();
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
                            withDirectives(createElementVNode("input", {
                                "onUpdate:modelValue": $event => timerSettings.status = $event,
                                type: "checkbox",
                                class: "toggle toggle-primary toggle-sm",
                                onChange: updateTimer
                            }, null, 544), [[vModelCheckbox, timerSettings.status]])
                        ]),
                        createElementVNode("div", { class: "flex items-center justify-between" }, [
                            createElementVNode("label", { for: "inputSecond", class: "text-sm text-neutral-600" }, "Độ trễ (giây):"),
                            withDirectives(createElementVNode("input", {
                                "onUpdate:modelValue": $event => timerSettings.secondEOP = $event,
                                type: "number",
                                min: "5",
                                class: "input input-bordered input-sm w-24 bg-neutral-100 focus:border-primary-400",
                                id: "inputSecond",
                                onInput: updateTimer
                            }, null, 544), [[vModelText, timerSettings.secondEOP, void 0, { number: false }]])
                        ])
                    ])) :

                        // Manual Tab
                        activeTab.value === "manual" ? (openBlock(), createElementBlock("div", { key: 1, class: "text-3xl font-bold text-accent-blue-500" }, [
                            createElementVNode("button", { onClick: oneHit, class: "btn btn-primary btn-sm w-full text-white" }, " One Hit ")
                        ])) :

                            // Cracked Tab
                            activeTab.value === "cracked" ? (openBlock(), createElementBlock("div", { key: 2, class: "font-bold bg-black text-white" }, [
                                createElementVNode("div", { id: "crack-console", class: "console", textContent: consoleLog.value }, null, 8, ["textContent"]),
                                createElementVNode("button", {
                                    onClick: () => {
                                        if (!scanning.value) {
                                            scanning.value = true;
                                            bruteForceScan();
                                        } else {
                                            scanning.value = false;
                                            consoleLog.value += "$ Stop\n";
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