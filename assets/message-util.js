function sendMessagePromise(payload) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(payload, response => {
            resolve(response);
        });
    });
}

function addMessageListener(callback) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        callback(message, sender).then(sendResponse);
        return true; // keep response async
    });
}

export {
    addMessageListener as a,
    sendMessagePromise as s
};
