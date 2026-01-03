const ENDPOINT = "https://tool-eop-v3-backend-wszmtm2dda-uc.a.run.app";
const ENDPOINT_2 = "https://yddkqpr2xf.execute-api.ap-southeast-1.amazonaws.com/v1";
const STATUS_KEY = "statusEOP";
const CURRENT_SECOND_KEY = "currentSecondEOP";
const SECOND_KEY = "secondEOP";
const remain_puid = ['123456', '220206', '220253', '220235', '220307', '220327', '220303', '220574', '220671', '220670', '220664', '220754', '220716', '220737', '220682', '220783', '220796', '220868', '221059', '221049', '221729', '222218', '222306', '222514', '222509', '222647', '222638', '222645', '222870', '222906', '222865', '222877', '222953', '222902', '222975', '223124', '223078', '223027', '223152', '223162', '223029', '223128', '223154', '223250', '223403', '223157', '223344', '223861', '223955', '223977', '224177', '224749', '224834', '224881', '225108', '225721', '225882', '226120', '225903', '225910', '226097', '226135', 
'226118', '226109', '226128', '226144', '226513', '226526', '226511', '226553', '226826', '226603', '226635', '227478', '227454', '227479', '227183', '227462', '131840', '141926', '142419', '148336', '153027', '152723', '152668', '153327', '163890', '164226', '164399', '164550', '164381', '164569', '164780', '165284', '165866', '166215', '165954', '166416', '165865', '166832', '167472', '168596', '168602', '168370', '168930', '166747', '170864', '169570', '170624', '170440', '172366', '172187', '172149', '172861', '173078', '173068', '172614', '172823', '173625', '172800', '173782', '173803', '173788', '174120', '173950', '173724', '173754', '173630', '173795', '173840', '173601', '174142', '173912', '174002', '173267', '173622', '174235', '174290', '174299', '173639', '173406', '174135', '174924', '175206', '174281', '175523', '174852', '175556', '175551', '175692', '176105', '176221', '176124', '176243', '176363', '176397', '175844', '176097', '176339', '177018', '176467', '176463', '176008', '177206', '176635', '176273', '176544', '177244', '177474', '177237', '177603', '178573', '178071', '178605', '178161', '177108', '178523', '178723', '178522', '179151', '178819', '178012', '178751', '178534', '178998', '178540', '178886', '179372', '178503', '179441', '179392', '179405', '179673', '179888', '179764', '179444', '180119', '180058', '180541', '179924', '179812', '180030', '180509', '180023', '180653', '179526', '179155', '180664', '180549', '198094'];

async function checking_premium_uid(id) {
  try {
    const response = await fetch(`${ENDPOINT}/task-answer/answers`, {
      method: "POST",
      body: JSON.stringify({
        major: "1",
        unit: "0",
        task: "1",
        userId: id
      }),
      headers: { "Content-Type": "application/json" }
    });
    return response.status === 200 ? "premium" : "non-premium";
  } catch (error) {
    console.error("Error checking premium UID:", error);
    return "non-premium";
  }
}

async function get_premium_ids() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["eop-puid"], async function (result) {
      const uid = result["eop-puid"];
      if (uid) {
        const role = await checking_premium_uid(uid.toString());
        if (role === "premium") {
          return resolve(uid.toString());
        }
      }
      // Nếu không phải premium, lấy ouid
      chrome.storage.local.get(["eop-ouid"], function (res2) {
        resolve(res2["eop-ouid"] ? res2["eop-ouid"].toString() : "142419");
      });
    });
  });
}

async function initPremiumState() {
  const UID = await get_premium_ids();
  const ROLE = await checking_premium_uid(UID);
  return { UID, ROLE };
}

export {
    ENDPOINT as A, 
    STATUS_KEY as a, 
    ENDPOINT_2 as b, 
    CURRENT_SECOND_KEY as c, 
    SECOND_KEY as s,
    remain_puid,
    initPremiumState,
    get_premium_ids
};