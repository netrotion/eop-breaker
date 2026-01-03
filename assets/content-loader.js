



function showToast(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: #fff;
        padding: 10px 15px;
        border-radius: 6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        font-size: 14px;
        z-index: 999999;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "showToast") {
        showToast(msg.message, msg.duration || 3000);
    }
});

(function () {
    'use strict';

    const injectTime = performance.now();
    (async () => {
        const {
            onExecute
        } = await import(
            /* @vite-ignore */
            chrome.runtime.getURL("assets/content.js")
        );
        onExecute?.({
            perf: {
                injectTime,
                loadTime: performance.now() - injectTime
            }
        });
    })().catch(console.error);

})();