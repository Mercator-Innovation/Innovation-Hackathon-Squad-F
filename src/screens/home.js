// Hub home: the landing page a child sees after tapping the plugin.
// A blocky, futuristic game look (inspired by block-building games, not copied),
// with big "level" tiles so it's easy to choose.
window.SCREENS = window.SCREENS || {};
window.SCREENS.hub = {
  render() {
    const H = window.CONTENT.home;

    // Square pixel-style icons for each tile. Decorative only.
    const icons = {
      guide: `<svg viewBox="0 0 8 8" width="32" height="32" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M3 0h2v1H3zM1 1h2v1H1zM5 1h2v1H5zM0 2h1v4H0zM7 2h1v4H7zM1 6h2v1H1zM5 6h2v1H5zM3 7h2v1H3zM4 2h2v1H4zM4 3h1v2H4zM3 4h1v1H3zM2 5h1v1H2z"/></svg>`,
      chat: `<svg viewBox="0 0 8 8" width="32" height="32" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M0 0h8v1H0zM0 1h1v4H0zM7 1h1v4H7zM0 5h3v1H0zM4 5h4v1H4zM1 6h2v1H1zM1 7h1v1H1zM2 2h4v1H2zM2 3h3v1H2z"/></svg>`,
      adult: `<svg viewBox="0 0 8 8" width="32" height="32" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M1 0h6v1H1zM0 1h1v6H0zM7 1h1v6H7zM1 7h6v1H1zM1 2h6v1H1zM2 4h1v1H2zM4 4h1v1H4zM2 5h1v1H2z"/></svg>`,
      helpNow: `<svg viewBox="0 0 8 8" width="32" height="32" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M2 0h4v1H2zM1 1h1v1H1zM6 1h1v1H6zM0 2h1v4H0zM7 2h1v4H7zM1 6h1v1H1zM6 6h1v1H6zM2 7h4v1H2zM4 2h1v2H4zM5 4h1v1H5z"/></svg>`
    };

    const tile = (href, cls, icon, o) => `
      <li><a class="tile ${cls}" href="${href}">
        <span class="tile-icon">${icon}</span>
        <span class="tile-body">
          <span class="tile-title">${esc(o.title)}</span>
          <span class="tile-text">${esc(o.text)}</span>
        </span>
        <span class="tile-go" aria-hidden="true">▶</span>
      </a></li>`;

    // The squad's chosen logo (pixel art won the vote). It includes the name.
    const logo = `<img class="hub-art" src="images/turtle-toast-game-a-pixel.svg" alt="Turtle Toast">`;

    return `
      <section class="hub-hello">
        ${logo}
        <h1>${esc(H.title)}</h1>
        <p class="lead">${esc(H.intro)}</p>
        <p class="hub-private">
          <svg viewBox="0 0 8 8" width="18" height="18" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M2 0h4v1H2zM1 1h1v2H1zM6 1h1v2H6zM0 3h8v5H0z"/></svg>
          ${esc(H.privateNote)}
        </p>
      </section>

      ${window.CHECKIN ? window.CHECKIN.bannerHTML() : ""}

      <h2 class="hub-pick">${esc(H.pickHeading)}</h2>
      <ul class="tiles">
        ${tile("#/world", "tile-guide", icons.guide, H.options.guide)}
        ${tile("#/chat", "tile-chat", icons.chat, H.options.chat)}
        ${tile("#/safe-adult", "tile-adult", icons.adult, H.options.safeAdult)}
        ${tile("#/help-now", "tile-help", icons.helpNow, H.options.helpNow)}
      </ul>

      <p class="hub-fault">
        <svg viewBox="0 0 8 8" width="24" height="24" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M1 1h2v1H1zM5 1h2v1H5zM0 2h4v1H0zM4 2h4v1H4zM0 3h8v1H0zM1 4h6v1H1zM2 5h4v1H2zM3 6h2v1H3z"/></svg>
        ${esc(H.notYourFault)}
      </p>`;
  }
};
