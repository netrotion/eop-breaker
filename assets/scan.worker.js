import { checking_premium_uid, remain_puid } from "./scan-utils.js";

let scanning = false;

self.onmessage = async (e) => {
    const { type, payload } = e.data;

    if (type === "START") {
        if (scanning) return;
        scanning = true;
        // payload: { mode: 'list'|'range', startId: string, endId: string }
        await bruteForceScan(payload || { mode: 'list' });
    } else if (type === "STOP") {
        scanning = false;
        self.postMessage({ type: "log", content: "$ Worker: Scan stopped.\n" });
    }
};

function padId(id) {
    return String(id).padStart(6, '0');
}

async function bruteForceScan(options) {
    const threadCount = options.threads || 50;
    self.postMessage({ type: "log", content: `$ Worker: Starting concurrent bruteforce (Speed: ${threadCount}x)\n` });

    let targetList = [];

    if (options.mode === 'range') {
        const start = parseInt(options.startId);
        const end = parseInt(options.endId);

        if (isNaN(start) || isNaN(end) || start > end) {
            self.postMessage({ type: "log", content: "$ Error: Invalid range provided.\n" });
            self.postMessage({ type: "finished" });
            scanning = false;
            return;
        }

        self.postMessage({ type: "log", content: `$ Generating range from ${padId(start)} to ${padId(end)}\n` });

        // Generate range
        for (let i = start; i <= end; i++) {
            targetList.push(padId(i));
        }
    } else {
        targetList = remain_puid;
    }

    let index = 0;
    let completedCount = 0;
    let lastReportTime = Date.now();
    let lastCompletedCount = 0;

    const total = targetList.length;
    const CONCURRENCY_LIMIT = threadCount;
    const workers = [];
    let latestId = ""; // Track latest scanned ID




    // Stats Reporter Loop
    const statsInterval = setInterval(() => {
        if (!scanning) {
            clearInterval(statsInterval);
            return;
        }

        const now = Date.now();
        const timeDiff = (now - lastReportTime) / 1000; // seconds
        const countDiff = completedCount - lastCompletedCount;
        const rps = (countDiff / timeDiff).toFixed(0);
        const percent = total > 0 ? ((completedCount / total) * 100).toFixed(2) : 0;

        self.postMessage({
            type: "stats",
            stats: {
                rps: rps,
                checked: completedCount,
                total: total,
                percent: percent,
                currentId: latestId
            }
        });

        lastReportTime = now;
        lastCompletedCount = completedCount;

    }, 500); // Update every 500ms

    const worker = async () => {
        while (scanning && index < targetList.length) {
            // Atomic-like index claim
            const currentIndex = index++;
            const currentUid = targetList[currentIndex];
            latestId = currentUid; // Update latest ID properly

            if (!currentUid) break;

            try {
                const role = await checking_premium_uid(currentUid);

                if (!scanning) break;

                const isPremium = role === "premium";
                completedCount++;

                // Logging restored by user request
                const percent = total > 0 ? ((completedCount / total) * 100).toFixed(2) : "0.00";

                self.postMessage({
                    type: "log",
                    content: `[${currentUid}] ${isPremium ? "Role : *Premium*" : "Role : Normal"}\n`
                });

                if (isPremium) {
                    // Send final stats before exiting
                    const finalPercent = total > 0 ? ((completedCount / total) * 100).toFixed(2) : "0.00";
                    self.postMessage({
                        type: "stats",
                        stats: {
                            rps: 0,
                            checked: completedCount,
                            total: total,
                            percent: finalPercent
                        }
                    });

                    self.postMessage({
                        type: "found",
                        uid: currentUid,
                        content: `\n$ [SUCCESS] Found Premium UID: ${currentUid}\n`
                    });

                    scanning = false; // Stop flag
                    clearInterval(statsInterval); // Stop stats
                    return;
                }
            } catch (err) {
                // Only log errors
                self.postMessage({
                    type: "log",
                    content: `[${currentUid}] error: ${err.message}\n`
                });
            }
        }
    };

    // Spawn "green threads" (async tasks)
    for (let i = 0; i < CONCURRENCY_LIMIT; i++) {
        workers.push(worker());
    }

    await Promise.all(workers);
    clearInterval(statsInterval);

    if (scanning) {
        // Send final 100% stats
        self.postMessage({
            type: "stats",
            stats: { rps: 0, checked: total, total: total, percent: 100 }
        });
        self.postMessage({ type: "log", content: `$ Finished scanning, no premium UID found.\n` });
        self.postMessage({ type: "finished" });
        scanning = false;
    }
}
