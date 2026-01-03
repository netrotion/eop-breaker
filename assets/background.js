import {
    a as k
} from "./message-util.js";
import {
    A as APIV1,
    b as APIV2,
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
        return await (await fetch(APIV1 + "/task-answer/answers/length", {
            method: "POST",
            body: JSON.stringify({
                major: e
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }))["json"]()
    } catch {
        return []
    }
}
async function fetchTaskAnswers(major, unit, task, userId) {
    try {
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
            showToast_signal("[From EOP BREAK] Role: non-premium", 3000);
            return answers;
        } else if (res.status === 200) {
            showToast_signal("[From EOP BREAK] Role: *PREMIUM*", 3000);
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