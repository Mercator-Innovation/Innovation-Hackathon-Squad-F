// Ties the screens together. Each screen lives in screens/<name>.js and
// registers itself on window.SCREENS. The address after # picks the screen:
//   #/            the pretend game app (host)
//   #/hub         hub home
//   #/guide       guide list, #/guide/<id> one scenario
//   #/chat        chat
//   #/safe-adult  text a safe adult

window.SCREENS = window.SCREENS || {};

(function () {
  const C = window.CONTENT;
  const main = document.getElementById("main");
  const header = document.getElementById("hub-header");

  document.getElementById("prototype-banner").textContent = C.prototypeBanner;
  document.getElementById("quick-exit").textContent = C.quickExit;
  document.getElementById("emergency").textContent = C.emergency;

  // Quick exit: leave straight away and replace this page in history
  document.getElementById("quick-exit").addEventListener("click", () => {
    window.location.replace("https://www.google.co.uk");
  });

  // Small helper screens use to build HTML safely
  window.esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function render() {
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
    const name = parts[0] || "host";
    const screen = window.SCREENS[name] || window.SCREENS.host;
    header.hidden = name === "host";
    document.body.classList.toggle("in-hub", name !== "host");
    main.innerHTML = screen.render(parts.slice(1));
    if (screen.mount) screen.mount(main, parts.slice(1));
    // Move focus to the new heading so keyboard and screen reader users know the screen changed
    const h1 = main.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus(); }
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", render);
  render();
})();
