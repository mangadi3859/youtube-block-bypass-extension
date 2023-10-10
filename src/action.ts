const TOGGLE_SESSION_NAME = "__yt_toggle-state";
const toggleBtn = <HTMLInputElement>document.querySelector("#toggle-btn");

async function startAction(): Promise<void> {
    let toggleSession = (await chrome.storage.local.get(TOGGLE_SESSION_NAME))[TOGGLE_SESSION_NAME];
    let isOn = toggleSession == null || toggleSession == "1";
    toggleBtn.checked = isOn;
    toggleBtn.addEventListener("click", (e) => {
        isOn = toggleBtn.checked;
        chrome.storage.local.set({ [TOGGLE_SESSION_NAME]: isOn ? "1" : "0" }, () => null);
    });
}

startAction();

declare const chrome: any;
