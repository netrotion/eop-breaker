// import {
//     sendMessageToBackground as chromeSendMessage,
//     onMessageListener as chromeOnMessage
// } from "./chromeMessageUtil-8fa16848.js";
// import {
//     setStorageData as saveToChromeStorage,
//     getStorageData as getFromChromeStorage
// } from "./chrome-function-77166f62.js";
// import {
//     STORAGE_KEY_TIMER_SECONDS as KEY_TIMER_SECONDS,
//     STORAGE_KEY_AUTO_STATUS as KEY_AUTO_STATUS,
//     initPremiumState
// } from "./constant-935d8745.js";

import {
    s as chromeSendMessage,
    a as chromeOnMessage
} from "./message-util.js";
import {
    a as saveToChromeStorage,
    g as getFromChromeStorage
} from "./chrome-utils.js";
import {
    s as KEY_TIMER_SECONDS,
    a as KEY_AUTO_STATUS,
    initPremiumState
} from "./constant.js";
// External libraries
const $ = window.jQuery;
const _ = window._;

/**
 * Handles popup dialogs, error messages, captchas, and modal buttons automatically.
 */
const handlePopupsAndErrors = async () => {
    let intervalId;
    try {
        intervalId = setInterval(() => {
            const errorIcons = $(".dbxtit > i.error").toArray();
            const captchaInput = $("#imgtxtcaptcha");

            // If captcha input exists, attempt to close the popup
            if ($(captchaInput).length && $(".fa.fa-close").length) {
                $(".fa.fa-close")[0].click();
            }

            if (errorIcons) {
                // Click all footer buttons (usually "Close" or "Confirm" on errors)
                const buttons = $(".dbxfote > .btn_L3").toArray();
                for (const btnIndex in buttons) {
                    buttons[btnIndex].click();
                }
            }

            // Click modal footer buttons if there are extra buttons (often confirm/cancel dialogs)
            const modalButtons = $(".modal-dialog.modal-dialog-centered > .modal-content > .modal-footer > button").toArray();
            if (modalButtons.length > 2) {
                for (const idx in modalButtons) {
                    // Clicks buttons from index 2 onwards
                    if (Number(idx) >= 2) modalButtons[idx].click();
                }
            }
        }, 100);
    } catch (error) {
        throw console.log("Clicked error"), error;
    }
    await new Promise(resolve => {
        setTimeout(() => {
            clearInterval(intervalId);
            resolve(false);
        }, 1500);
    });
};

/**
 * Waits for a specific element selector to appear in the DOM.
 */
const waitForElement = async (selector, timeout = 30000) => new Promise((resolve, reject) => {
    let interval;
    setTimeout(() => {
        clearInterval(interval);
        reject();
    }, timeout);
    interval = setInterval(function () {
        if ($(selector).length) {
            clearInterval(interval);
            resolve($(selector));
        }
    }, 100);
});

/**
 * Checks if an element currently exists in the DOM.
 */
const elementExists = async (selector) => {
    return !!$(selector).length;
};

/**
 * Waits until a specific number of elements match the selector.
 */
const waitForElementCount = async (selector, count) => new Promise((resolve, reject) => {
    let interval;
    setTimeout(() => {
        clearInterval(interval);
        reject();
    }, 4000);
    interval = setInterval(function () {
        if ($(selector).length >= count) {
            clearInterval(interval);
            resolve($(selector));
        }
    }, 100);
});

/**
 * Visually marks units on the course page that have available answers in the database.
 */
function displayAvailableAnswerCounts(elements, answerArray) {
    elements.forEach(el => {
        var match;
        const unitText = $(el).text();
        // Finds if the unit text matches any record in the answer database
        const count = (match = answerArray.find(item => unitText.includes(item.taskAnswer_unit))) == null ? void 0 : match.count;
        if (count) {
            $(el).append("<br><span style=\"background-color: yellow\"> (Cracked) Có sẵn " + count + " đáp án</span>");
        }
    });
}

/**
 * Main logic for the Course List page. fetches available answer counts and displays them.
 */
async function showAnswerCountsOnCoursePage() {
    try {
        await waitForElement("#units");
        const courseItems = $("#units .ditem p > strong").toArray();
        const breadcrumbText = $(".breadcrumb span:last-child").text().split("-F")[0];

        const response = await chromeSendMessage({
            type: "task-answer",
            case: "get-length",
            value: breadcrumbText
        });

        if (Array.isArray(response)) {
            displayAvailableAnswerCounts(courseItems, response);
        } else {
            console.error("Unexpected response format:", response);
        }
    } catch (err) {
        console.error("Error in showAnswerCountsOnCoursePage:", err);
    }
}

function initCoursePageFeatures() {
    showAnswerCountsOnCoursePage();
}

/**
 * Observes the DOM for the addition of a specific element.
 */
async function observeElementCreation(targetSelector, callback) {
    await waitForElement(targetSelector);

    function mutationCallback(mutations, observer) {
        for (let mutation of mutations) {
            if (mutation.type === "childList") {
                $(mutation.addedNodes).each(function () {
                    if (($(this).is(targetSelector) || $(this).find(targetSelector).length > 0)) {
                        callback();
                    }
                });
            }
        }
    }
    const observer = new MutationObserver(mutationCallback);
    const body = document.body;
    const config = {
        childList: true,
        attributes: false,
        subtree: true,
        attributeOldValue: false
    };
    try {
        observer.observe(body, config);
    } catch {
        console.log("Error observing element");
    }
}

/**
 * Fetches answers from the server and fills them into the DOM.
 */
async function fetchAndFillAnswers(userInfo, questions, type) {
    if (userInfo["major"]["length"]) {
        try {
            const response = await chromeSendMessage({
                type: "task-answer",
                case: "get-all",
                value: userInfo
            });
            if (response["length"]) {
                window["localStorage"]["setItem"]("got-answer", "true");
            }
            const filledAnswers = mapQuestionsToAnswers(questions, response);
            applyAnswersToDOM(filledAnswers, type);
        } catch (err) {
            console.error("Error filling answers:", err);
        }
    }
}

/**
 * Maps the questions found on the page to the answers returned from the server.
 */
function mapQuestionsToAnswers(questions, answers) {
    return questions.map(qGroup => {
        return qGroup.map((qItem, idx) => {
            var match, matchSingle;
            const isMultiple = qGroup.length > 1;
            if (isMultiple) {
                match = _.find(answers, ans => ans.question == qItem.question && ans.questionNumber == idx);
                return {
                    ...qItem,
                    value: match ? match.answer : undefined
                };
            } else {
                matchSingle = _.find(answers, ans => ans.question == qItem.question);
                return {
                    ...qItem,
                    value: matchSingle ? matchSingle.answer : undefined
                };
            }
        });
    });
}

/**
 * Applies the mapped answer values to the actual DOM elements (Inputs or Radio buttons).
 */
function applyAnswersToDOM(answers, type) {
    switch (type) {
        case "text":
            answers.forEach(group => {
                group.forEach(item => {
                    if (item.value) {
                        $(item.element).val(item.value);
                    }
                });
            });
            break;
        case "choose":
            answers.forEach(group => {
                group.forEach(item => {
                    if (item.value) {
                        const val = item.value;
                        // Find the label that matches the answer text
                        const label = $(item.element).find("label").filter(function () {
                            return $(this).text().trim().toLocaleLowerCase() === val.toLocaleLowerCase();
                        });
                        if (label.length > 0) label.click();
                    }
                });
            });
            break;
        default:
            console.log("Unhandled question type:", type);
            break;
    }
}

// Enum for Question Types
var QuestionTypes = (x => {
    return x[x["questionByInputTitle"] = 0] = "questionByInputTitle",
        x[x["questionByChooseAnswer"] = 1] = "questionByChooseAnswer",
        x[x["cantResolveQuestion"] = 2] = "cantResolveQuestion",
        x
})(QuestionTypes || {});

/**
 * Parses multiple choice questions from the DOM.
 */
function parseMultipleChoiceQuestions() {
    const questions = $("#dquestion .ques");
    const parsed = questions.map(function () {
        return {
            question: $(this).find("> p:nth-child(2)").text().trim().replace(/^(\d+|\w).\s+/, ""),
            element: $(this).find("> div:first")[0]
        };
    }).get();
    return {
        questionList: Object.values(_.groupBy(parsed, x => x.question)),
        type: "choose"
    };
}

/**
 * Parses fill-in-the-blank (text input) questions from the DOM.
 */
function parseFillBlankQuestions() {
    const regex = /[a-zA-Z]/;
    const inputs = $("#dquestion .ques input.danw.dinline").map(function () {
        let parent = $(this).parent();
        // Traverse up to find the container with text content indicating the question
        while (parent.length && !regex.test(parent.text())) {
            if (regex.test(parent.prev().text())) {
                parent = parent.prev();
            } else if (regex.test(parent.prev().prev().text())) {
                parent = parent.prev().prev();
            } else {
                parent = parent.parent();
            }
        }
        return {
            question: parent.text().trim().replace(/^(\d+|\w)\.\s+/, "").replace(/\s+/g, " "),
            element: this
        };
    }).get();
    return {
        questionList: Object.values(_.groupBy(inputs, x => x.question)),
        type: "text"
    };
}

/**
 * Detects the type of questions present on the page.
 */
function detectQuestionType() {
    if ($("#dquestion .ques input.danw.dinline").length > 0) return 0; // Text input
    if ($(".iradio_square-green").length > 0) return 1; // Radio/Choose
    return 2;
}

/**
 * Gets the question list based on the detected type.
 */
function getCurrentPageQuestions() {
    switch (detectQuestionType()) {
        case 0:
            return parseFillBlankQuestions();
        case 1:
            return parseMultipleChoiceQuestions();
        default:
            return parseFillBlankQuestions();
    }
}

/**
 * Extracts User ID, Major, Unit, and Task info from the page HTML and breadcrumbs.
 */
async function getTaskMetadata() {
    var regexMatch, breadcrumbItem, taskName;
    await waitForElementCount(".breadcrumb-item", 3);
    const breadcrumbs = $(".breadcrumb-item").toArray().map(el => el.textContent);
    const html = $("html")[0].outerHTML;

    // Regex to find user ID in the inline script
    var regex = /'id': dj.intval\('(\d+)'\)/;

    return {
        userId: ((regexMatch = regex.exec(html)) == null ? void 0 : regexMatch[1]) ?? "",
        major: breadcrumbs[0] ?? "null",
        unit: breadcrumbs[1] ?? "null",
        task: ((taskName = (breadcrumbItem = breadcrumbs[2]) == null ? void 0 : breadcrumbItem.split(" (")[0]) == null ? void 0 : taskName.trim()) ?? "null"
    };
}

/**
 * Checks if fields are empty, if so, attempts to fetch and fill them.
 */
async function autoFillIfEmpty() {
    try {
        await waitForElement(".ques");
    } catch {
        return;
    }
    const userInfo = await getTaskMetadata();
    const { questionList, type } = getCurrentPageQuestions();
    let isFilled = true;

    switch (type) {
        case "text":
            // Check if ANY input has a value
            isFilled = questionList.some(group => group.some(item => $(item.element).val()));
            break;
        case "choose":
            // Check if ANY radio button is checked
            isFilled = questionList.some(group => group.some(item => $(item.element).find("input").filter(":checked").is(":checked")));
            break;
    }

    if (!isFilled) {
        fetchAndFillAnswers(userInfo, questionList, type);
    }
}

/**
 * Saves the current answers from the DOM to the server (Extension backend).
 */
async function saveAnswersToServer(userInfo, questions, type) {
    const { UID, ROLE } = await initPremiumState();
    userInfo["userId"] = UID;
    if (questions.length) {
        const answers = extractAnswersFromDOM(questions, userInfo, type);
        if (answers.length) {
            try {
                const res = await chromeSendMessage({
                    type: "task-answer",
                    case: "set-some",
                    value: answers
                });
                console.log("Answers set successfully:", res);
            } catch (err) {
                console.error("Error setting answers:", err);
            }
        }
    }
}

/**
 * Scrapes the DOM to create an array of answer objects.
 */
function extractAnswersFromDOM(questions, userInfo, type) {
    const result = [];
    switch (type) {
        case "text":
            questions.forEach(group => {
                group.forEach((item, idx) => {
                    var val;
                    const answer = ((val = $(item.element).val()) == null ? void 0 : val.toString()) ?? "";
                    result.push(createAnswerPayload(userInfo, item, idx, answer));
                });
            });
            break;
        case "choose":
            questions.forEach(group => {
                group.forEach((item, idx) => {
                    // Find checked input label text
                    const answer = $(item.element).find("input:checked").closest("div").next("label").text().trim();
                    result.push(createAnswerPayload(userInfo, item, idx, answer));
                });
            });
            break;
        default:
            console.log("Unhandled question type:", type);
            break;
    }
    return result;
}

function createAnswerPayload(userInfo, item, idx, answer) {
    return {
        ...userInfo,
        question: item.question,
        questionNumber: idx,
        answer: answer
    };
}

/**
 * Trigger wrapper to save answers upon success.
 */
async function triggerSaveAnswers() {
    try {
        await waitForElement(".ques");
    } catch {
        return;
    }
    const userInfo = await getTaskMetadata();
    const { questionList, type } = getCurrentPageQuestions();
    saveAnswersToServer(userInfo, questionList, type);
}

/**
 * Fixes the audio player styles to make it visible and usable.
 */
async function fixAudioControls() {
    try {
        await waitForElement("#mbody audio");
    } catch {
        return;
    }
    const audio = $("#mbody audio");
    if (audio.attr("controls")) {
        $("#mbody audio").parent().css({ position: "relative" });
        audio.removeClass("hidden");
        audio.attr("controls", "true");
        audio.css({
            position: "absolute",
            zIndex: "1",
            height: "35px",
            width: "100%",
            minWidth: "400px",
            top: 0,
            left: 0
        });
    }
}

/**
 * Monitors the task page for changes (new questions loaded) and success toasts.
 */
async function monitorTaskChanges() {
    let lastId = null;

    function check() {
        const element = $(".ques");
        const id = element.attr("id");
        if (id !== lastId) {
            fixAudioControls();
            autoFillIfEmpty();
            lastId = id;
        }
    }
    check();
    setInterval(check, 1000);

    // If a success toast appears, save the answers as valid
    observeElementCreation("#toast-container > .toast-success", () => {
        triggerSaveAnswers();
    });
}

const setStorageWithExpiry = (key, value) => {
    const expiredTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(key, JSON.stringify({
        value: value,
        expiredTime: expiredTime
    }));
};

const getStorageWithExpiry = (key) => {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    if (data.expiredTime < new Date().getTime()) {
        localStorage.removeItem(key);
        return null;
    }
    return data.value;
};

/**
 * Solves the vocabulary sorting/matching task using stored word lists.
 */
const solveVocabularyTask = async () => {
    const wordsList = JSON.parse(getStorageWithExpiry("wordsList") || "[]");
    const currentWords = $(".dvoca.active > div > .dtitle").text();

    if (wordsList.length === 0) {
        setStorageWithExpiry("wordsList", JSON.stringify([]));
    }

    let maxMatch = 0;
    let bestIndex = -1;

    // Attempt to match current word list with stored lists
    for (let i = 0; i < wordsList.length; i++) {
        if (wordsList[i].length !== currentWords.length) continue;
        let matchCount = 0;
        for (let j = 0; j < currentWords.length && wordsList[i].toLowerCase().includes(currentWords[j].toLowerCase()); j++) {
            matchCount++;
        }
        if (matchCount > maxMatch && matchCount === currentWords.length) {
            maxMatch = matchCount;
            bestIndex = i;
            console.log("match word", wordsList[i]);
        }
    }

    if (bestIndex === -1) {
        if (wordsList.length === 0) {
            alert("[Tool EOP] Lưu ý, Một số unit có nhiều bài từ vựng và bạn cần để tool chạy tự động qua các bài đó.\nMột số chuyên ngành khi làm bài sắp xếp sẽ có một số từ không có trong các bài từ vựng trên trang eop, các bạn kiểm tra trong sách giáo trình và tự làm hoặc tra google @_@, mình sẽ update sau");
        } else {
            alert("[Tool EOP] Từ cần sắp xếp không có trong danh sách từ vựng được lưu trong tool: \n " + wordsList.join("/"));
        }
        alert("[Tool EOP] Bạn cần quay các bài từ vựng và để hệ thống tự làm, hệ thống sẽ lưu lại các từ vào tool rồi sắp xếp cho bạn");
    }

    const matchedList = wordsList[bestIndex];
    for (let i = 0; i < matchedList.length; i++) {
        const targets = $(".sortable");
        for (let j = 0; j < targets.length; j++) {
            if ($(targets[j]).text() === matchedList[i].toUpperCase() || $(targets[j]).text() === matchedList[i].toLowerCase()) {
                $(targets[j]).click();
                await new Promise(r => setTimeout(r, 100));
                break;
            }
        }
    }
};

async function handleVocabFinish() {
    try {
        await waitForElement(".dvocabulary h4");
        await clickRevealAnswerButton();
    } catch { }
}

/**
 * Resets the task by clicking Undo buttons and handling popups.
 */
async function resetTask() {
    try {
        await handlePopupsAndErrors();
        (await waitForElement(".fa-check")).click();
        await handlePopupsAndErrors();
    } catch (err) {
        console.log("error submit click", err);
    }
}

/**
 * Clicks the "Answer" (Reveal) button on the site.
 */
async function clickRevealAnswerButton() {
    try {
        await handlePopupsAndErrors();
        (await waitForElement('button[id*="answer"]')).click();
        await handlePopupsAndErrors();
    } catch { }
}

/**
 * Solves image matching tasks by sending image URLs to the server.
 */
async function solveImageMatchTask() {
    try {
        const elements = await waitForElementCount(".dstore.sortable li div", 0);
        const inputImageObjects = [];
        elements.filter(function () {
            return $(this).attr("style").match(/\burl\(/);
        }).each(function () {
            const img = $(this).attr("background-image").replace(/url\(['"]?(.*?)['"]?\)/, "$1");
            inputImageObjects.push({
                element: $(this),
                image: img
            });
        });
        const result = await chromeSendMessage({
            type: "task-answer",
            case: "match word",
            value: {
                igs: inputImageObjects.map(obj => obj.image)
            }
        });
        return {
            inputImageObjects: inputImageObjects,
            result: result
        };
    } catch (err) {
        console.error("Error in solveImageMatchTask:", err);
        return {
            inputImageObjects: [],
            result: []
        };
    }
}

/**
 * Processes vocabulary tasks: solves them or saves new words to storage.
 */
async function processVocabularyTask() {
    if (await elementExists(".dvocabulary h4")) {
        solveVocabularyTask();
    }
    // Save vocabulary words
    $(".dvoca.active > div > .dtitle").each(function () {
        const list = JSON.parse(getStorageWithExpiry("wordsList") || "[]");
        console.log("wordsList", list);
        const text = $(this).text().trim();
        if (!list.includes(text)) {
            list.push(text);
            setStorageWithExpiry("wordsList", JSON.stringify(list));
        }
    });
}

/**
 * The main "One Hit" function. Attempts to brute-force or auto-solve the task completely.
 */
async function executeAutoSolveSequence() {
    try {
        autoFillIfEmpty();
        await resetTask();
        try {
            await waitForElement("#toast-container > .toast-success", 5000);
            console.log("Task completed successfully");
            return;
        } catch {
            console.log("Success toast not found, continuing with the process");
        }

        // Reset/Undo if present
        $(".fa-undo").each(function () {
            this.click();
        });

        // Clear inputs that are not hidden
        $("input").filter(function () {
            return $(this).parent().css("display") !== "none";
        }).each(function () {
            this.click();
        });

        await processVocabularyTask();

        // Click 'ins' elements (hints or answers)
        $("ins").each(function () {
            $(this).click();
        });

        await resetTask();
        await clickRevealAnswerButton();

        const { inputImageObjects, result } = await solveImageMatchTask();
        let submitButtons = $('button[id*="submit"]');

        await handleVocabFinish();

        submitButtons.each(function () {
            $(this).click();
            $("input[type=text]").each(function () {
                $(this).val($(this).attr("placeholder") || "");
            });
        });

        inputImageObjects.forEach((obj, idx) => {
            if (result) {
                $(obj.element).val(result[idx]);
            }
        });

        await resetTask();

    } catch { }
}


let timerSettings = {
    status: true,
    currentSecond: 30,
    secondEOP: 30
};
let timerIntervalId = null;
let timerCallback = null;

function getTimerState() {
    return { ...timerSettings };
}

async function updateTimerSettings(data) {
    Object.assign(timerSettings, data);
    if (data.secondEOP !== undefined) {
        timerSettings.currentSecond = data.secondEOP;
    }
    await Promise.all([saveToChromeStorage(KEY_TIMER_SECONDS, timerSettings.secondEOP), saveToChromeStorage(KEY_AUTO_STATUS, timerSettings.status)]);
    if (timerSettings.status) {
        startTimer();
    } else {
        stopTimer();
    }
}

function setTimerState(status, secondEOP) {
    Object.assign(timerSettings, {
        status: status,
        secondEOP: secondEOP,
        currentSecond: secondEOP
    });
}

function setTimerCallback(callback) {
    timerCallback = callback;
}

/**
 * Main timer loop for automatic task navigation/execution.
 */
async function timerTick() {
    if (!window.location.href.includes("eop.edu.vn/study/task") || !timerSettings.status) return;

    if (timerSettings.currentSecond > 1) {
        timerSettings.currentSecond--;
    } else {
        timerSettings.currentSecond = timerSettings.secondEOP;
        if (timerCallback) await timerCallback();
    }

    chrome.runtime.sendMessage({
        type: "update-theory-object",
        value: timerSettings
    });

    timerIntervalId = setTimeout(timerTick, 1000);
}

function startTimer() {
    if (timerIntervalId === null) timerTick();
}

function stopTimer() {
    if (timerIntervalId !== null) {
        clearTimeout(timerIntervalId);
        timerIntervalId = null;
    }
}

async function handleExtensionMessages(msg) {
    try {
        switch (msg.case) {
            case "one-hit":
            case "run-now":
                await executeAutoSolveSequence();
                return { success: false };
            case "set-all":
                await updateTimerSettings(msg.value);
                return { success: false };
            case "get-all":
                return getTimerState();
            default:
                console.log("Unhandled case for theory-auto-filling:", msg.case);
                return { error: "Unhandled case" };
        }
    } catch (err) {
        console.error("Error in handleExtensionMessages:", err);
        return { error: "An error occurred while processing the request" };
    }
}

async function initAutomation() {
    try {
        const [status, secondEOP] = await Promise.all([getFromChromeStorage(KEY_AUTO_STATUS), getFromChromeStorage(KEY_TIMER_SECONDS)]);
        setTimerState(status, secondEOP);
        setTimerCallback(executeAutoSolveSequence);
        if (status) startTimer();

        chromeOnMessage(async (msg) => {
            if (msg.type === "theory-auto-filling") {
                return handleExtensionMessages(msg);
            } else {
                console.log("Unhandled message type:", msg.type);
                return { error: "Unhandled message type" };
            }
        });
    } catch (err) {
        console.error("Error in initAutomation:", err);
    }
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "get-theory-object") {
        sendResponse(getTimerState());
    }
});

function initTaskPage() {
    monitorTaskChanges();
    initAutomation();
}

try {
    if (window.location.pathname.includes("study/course")) {
        initCoursePageFeatures();
    } else {
        initTaskPage();
    }
} catch { }