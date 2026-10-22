// Offline help. Two jobs:
// 1. Save the offline help page on the phone on the first visit (see sw.js).
//    This needs the site to come from a web address, not opened as a file.
// 2. If the connection drops while the hub is open, show a calm bar with a
//    link to the offline page, without interrupting what the person is doing.

(function () {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js");
  }

  const style = document.createElement("style");
  style.textContent = `
    .offline-bar {
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
      display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: center; justify-content: center;
      padding: .75rem 1rem; background: #142320; color: #fff;
      font-family: var(--font, system-ui, sans-serif); font-size: 1.05rem;
    }
    .offline-bar[hidden] { display: none; }
    .offline-bar p { margin: 0; }
    .offline-bar a {
      /* !important so the hub's own link colours don't make this hard to read */
      color: #142320 !important; background: #ffbf47 !important; font-weight: 700; text-decoration: none;
      padding: .45rem .9rem; border-radius: 10px;
    }
    .offline-bar a:focus-visible { outline: 4px solid #fff; outline-offset: 2px; }
  `;
  document.head.appendChild(style);

  const bar = document.createElement("div");
  bar.className = "offline-bar";
  bar.setAttribute("role", "status");
  bar.hidden = true;
  bar.innerHTML = `<p>No internet? Your offline help is still here.</p>
    <a href="offline.html">Open offline help</a>`;
  document.body.appendChild(bar);

  function update() {
    bar.hidden = navigator.onLine;
    // Leave room at the bottom so the bar doesn't cover the end of the page
    document.body.style.paddingBottom = bar.hidden ? "" : bar.offsetHeight + "px";
  }
  window.addEventListener("offline", update);
  window.addEventListener("online", update);
  update();
})();
