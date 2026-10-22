// Hub home: three ways to get help.
window.SCREENS = window.SCREENS || {};
window.SCREENS.hub = {
  render() {
    const H = window.CONTENT.home;
    const card = (href, o) => `
      <li><a class="card" href="${href}">
        <span class="card-title">${esc(o.title)}</span>
        <span class="card-text">${esc(o.text)}</span>
      </a></li>`;
    return `
      <h1>${esc(H.title)}</h1>
      <p class="lead">${esc(H.intro)}</p>
      <ul class="cards">
        ${card("#/guide", H.options.guide)}
        ${card("#/chat", H.options.chat)}
        ${card("#/safe-adult", H.options.safeAdult)}
      </ul>
      <p class="reassure">${esc(H.notYourFault)}</p>`;
  }
};
