// The made-up game app the hub plugs into. Not a real product.
window.SCREENS = window.SCREENS || {};
window.SCREENS.host = {
  render() {
    const H = window.CONTENT.host;
    return `
      <section class="host">
        <h1 class="host-title">${esc(H.appName)}</h1>
        <p class="host-tagline">${esc(H.appTagline)}</p>
        <div class="host-world" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <button type="button" class="host-play">${esc(H.playButton)}</button>
        <div class="launcher">
          <a class="launcher-button" href="#/hub">${esc(H.launcher)}</a>
          <p class="launcher-hint">${esc(H.launcherHint)}</p>
        </div>
      </section>`;
  }
};
