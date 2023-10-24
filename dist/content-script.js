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
const SESSION_NAME = "__yt_state";
const __TOGGLE_SESSION_NAME = "__yt_toggle-state";
let isBlocked = sessionStorage.getItem(SESSION_NAME) == "1";
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        let toggleState = (yield chrome.storage.local.get(__TOGGLE_SESSION_NAME))[__TOGGLE_SESSION_NAME];
        let isToggledOn = toggleState == null || toggleState == "1";
        if (!isToggledOn)
            return;
        if (window.location.pathname != "/watch")
            return;
        const id = new URL(window.location.href).searchParams.get("v");
        if (!id)
            return console.log("[Youtube Block Bypass] Cannot find video id");
        const iframeHTML = `<iframe id="yt-iframe-player"
    style="width: 100%; height: auto; aspect-ratio: 16/9;"
    src="https://www.youtube.com/embed/${id}?autoplay=1"
    title="Youtube Block Bypass"
    frameborder="0"
    allow="accelerometer;
    autoplay;
    clipboard-write;
    encrypted-media; gyroscope;
    picture-in-picture; web-share"
    allowfullscreen="">
    </iframe>
    `;
        document.querySelector("#yt-iframe-player");
        const player = document.querySelector("#player.ytd-watch-flexy");
        if (isBlocked) {
            player.innerHTML = iframeHTML;
            return;
        }
        const blocker = document.querySelector("yt-playability-error-supported-renderers#error-screen");
        if (!blocker)
            return console.log("[Youtube Block Bypass] Cannot find blocker element");
        isBlocked = true;
        sessionStorage.setItem(SESSION_NAME, "1");
        blocker.parentNode.innerHTML = iframeHTML;
    });
}
document.addEventListener("yt-navigate-finish", () => {
    start();
});
