"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const TOGGLE_SESSION_NAME = "__yt_toggle-state";
const toggleBtn = document.querySelector("#toggle-btn");
function startAction() {
    return __awaiter(this, void 0, void 0, function* () {
        let toggleSession = (yield chrome.storage.local.get(TOGGLE_SESSION_NAME))[TOGGLE_SESSION_NAME];
        let isOn = toggleSession == null || toggleSession == "1";
        toggleBtn.checked = isOn;
        toggleBtn.addEventListener("click", (e) => {
            isOn = toggleBtn.checked;
            chrome.storage.local.set({ [TOGGLE_SESSION_NAME]: isOn ? "1" : "0" }, () => null);
        });
    });
}
startAction();
