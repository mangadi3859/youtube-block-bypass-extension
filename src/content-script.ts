const SESSION_NAME = "__yt_state";
const __TOGGLE_SESSION_NAME = "__yt_toggle-state";

let isBlocked = sessionStorage.getItem(SESSION_NAME) == "1";

async function start(): Promise<void> {
    let toggleState = (await chrome.storage.local.get(__TOGGLE_SESSION_NAME))[__TOGGLE_SESSION_NAME];
    let isToggledOn = toggleState == null || toggleState == "1";
    if (!isToggledOn) return;
    if (window.location.pathname != "/watch") return;
    const id = new URL(window.location.href).searchParams.get("v");
    if (!id) return console.log("[Youtube Block Bypass] Cannot find video id");

    const iframeHTML = `<iframe 
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

    const player = <HTMLDivElement>document.querySelector("#player.ytd-watch-flexy");
    if (isBlocked) {
        player.innerHTML = iframeHTML;

        return;
    }

    const blocker = <HTMLDivElement>document.querySelector("yt-playability-error-supported-renderers#error-screen");
    if (!blocker) return console.log("[Youtube Block Bypass] Cannot find blocker element");
    isBlocked = true;
    sessionStorage.setItem(SESSION_NAME, "1");
    (<Element>blocker.parentNode).innerHTML = iframeHTML;
}

document.addEventListener("yt-navigate-finish", () => {
    start();
    window.addEventListener("hashchange", start);
});
