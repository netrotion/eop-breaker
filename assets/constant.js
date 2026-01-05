// const CLONE_ENDPOINT = "http://127.0.0.1:5000";
const CLONE_ENDPOINT = "https://eop.pythonanywhere.com";
const ENDPOINT = "https://tool-eop-v3-backend-wszmtm2dda-uc.a.run.app";
const ENDPOINT_2 = "https://yddkqpr2xf.execute-api.ap-southeast-1.amazonaws.com/v1";
const STATUS_KEY = "statusEOP";
const CURRENT_SECOND_KEY = "currentSecondEOP";
const SECOND_KEY = "secondEOP";
const MIN_SECOND_KEY = "minSecondEOP";
const MAX_SECOND_KEY = "maxSecondEOP";
const COLLECT_DATA_KEY = "collectDataModeEOP";
import { remain_puid, checking_premium_uid } from "./scan-utils.js";

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
  MIN_SECOND_KEY as m,
  MAX_SECOND_KEY as M,
  CLONE_ENDPOINT,
  COLLECT_DATA_KEY,
  remain_puid,
  initPremiumState,
  get_premium_ids,
  checking_premium_uid
};