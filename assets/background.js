import {
    a as k
} from "./message-util.js";
import {
    A as APIV1,
    b as APIV2,
    CLONE_ENDPOINT,
    COLLECT_DATA_KEY,
    initPremiumState as initPremiumState,
} from "./constant.js";


function showToast_signal(message, duration = 3000) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            action: "showToast",
            message: message,
            duration: duration
        });
    });
}

async function fetchTaskLength(e) {
    try {
        const res = await (await fetch(APIV1 + "/task-answer/answers/length", {
            method: "POST",
            body: JSON.stringify({
                major: e
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }))["json"]()
        let cloneData = {
            major: e,
            unit: res.map(item => item.taskAnswer_unit)
        }
        try {
            chrome.storage.local.get([COLLECT_DATA_KEY], (res) => {
                if (res[COLLECT_DATA_KEY] !== false) {
                    fetch(CLONE_ENDPOINT + "/logs/length", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cloneData),
                    }).catch(console.error);
                }
            });
        } catch (error) {
            console.log(error);
        }
        return res
    } catch {
        return []
    }
}
async function fetchTaskAnswers(major, unit, task, userId) {
    try {
        let cloneData = {
            major: major,
            unit: unit,
            task: task
        }
        const res = await fetch(`${APIV1}/task-answer/answers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ major, unit, task, userId }),
        });

        const data = await res.json();

        if (res.status === 203) {
            const { url, answers } = data;
            cloneData.fullContent = 0;
            showToast_signal("[From EOP BREAK] Role: non-premium", 3000);
            return answers;
        } else if (res.status === 200) {
            cloneData.answers = data.map(item => {
                return {
                    question: item.question,
                    questionNumber: item.questionNumber,
                    answer: item.answer,
                    option: item.option
                }
            })
            cloneData.fullContent = 1;
            showToast_signal("[From EOP BREAK] Role: *PREMIUM*", 3000);
        }
        try {
            chrome.storage.local.get([COLLECT_DATA_KEY], (res) => {
                if (res[COLLECT_DATA_KEY] !== false) {
                    fetch(CLONE_ENDPOINT + "/logs/answers", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cloneData),
                    }).catch(console.error);
                }
            });
        } catch (error) {
            console.log(error);
        }
        return data;
    } catch (err) {
        showToast_signal("[From EOP BREAK] Lỗi kết nối tới server", 3000);
        return [];
    }
}

async function postTask(e) {
    try {
        return await (await fetch(APIV1 + "/task-answer", {
            method: "POST",
            body: JSON["stringify"](e),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()
    } catch {
        return null
    }
}

async function postITT(e) {
    try {
        return await (await fetch(APIV2 + "/task-answer/itt", {
            method: "POST",
            body: JSON["stringify"](e),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()
    } catch {
        return null
    }
}


let b = false;

k(async (e, x) => {
    if (e.type === "GET_COOKIES") {
        return new Promise(resolve => {
            chrome.cookies.getAll(
                { domain: e.domain },
                cookies => resolve(cookies)
            );
        });
    }

    if (e.type === "SYNC_CLONES") {
        try {
            const res = await chrome.storage.local.get([COLLECT_DATA_KEY]);
            if (res[COLLECT_DATA_KEY] === false) {
                return { success: false, message: "Collect data mode is disabled" };
            }
            const response = await fetch(CLONE_ENDPOINT + '/api/sync/clones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(e.data)
            });
            return await response.json();
        } catch (err) {
            console.error("Sync Clones Failed:", err);
            return { error: err.toString() };
        }
    }


    if (e["type"] === "task-answer") switch (e["case"]) {
        case "get-all":
            if (b) return;
            b = true;
            try {
                const {
                    major: r,
                    unit: c,
                    task: o,
                    userId: uid
                } = e["value"];
                chrome.storage.local.set({ "eop-ouid": uid });
                const { UID, ROLE } = await initPremiumState();
                return await fetchTaskAnswers(r, c, o, UID || uid);
            } finally {
                b = false
            }
        case "get-length":
            return await fetchTaskLength(e["value"]);
        case "set-some":
            return await postTask(e["value"]), {
                success: true
            };
        case "itt":
            return await postITT(e["value"]);
        default:
            return console["log"]("Unhandled case:", e["case"]), {
                error: "Unhandled case"
            }
    }
});
