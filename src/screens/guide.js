// Guide: pick a scenario, then see steps and things to say.
window.SCREENS = window.SCREENS || {};
window.SCREENS.guide = {
  render(args) {
    const G = window.CONTENT.guide;
    const all = window.DATA.scenarios;
    const s = all.find((x) => x.id === args[0]);

    if (!s) {
      return `
        <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
        <h1>${esc(G.title)}</h1>
        <p class="lead">${esc(G.intro)}</p>
        <ul class="cards">
          ${all.map((x) => `<li><a class="card${x.emergency ? " card-urgent" : ""}" href="#/guide/${x.id}">
            <span class="card-title">${esc(x.title)}</span></a></li>`).join("")}
          <li><a class="card card-game" href="#/world">
            <span class="card-title">${esc(window.CONTENT.world.entry.title)}</span>
            <span class="card-text">${esc(window.CONTENT.world.entry.text)}</span></a></li>
        </ul>`;
    }

    return `
      <a class="back" href="#/guide">${esc(window.CONTENT.back)}</a>
      <h1>${esc(s.title)}</h1>
      ${s.emergency ? `<p class="urgent"><a href="tel:999">${esc(window.CONTENT.emergency)}</a></p>` : ""}
      <h2>${esc(G.stepsHeading)}</h2>
      <ol class="steps">${s.steps.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
      <h2>${esc(G.sayHeading)}</h2>
      <ul class="say">${s.say.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      <h2>${esc(G.alsoHeading)}</h2>
      <p class="actions">
        <a class="button" href="#/chat">${esc(G.chatLink)}</a>
        <a class="button button-secondary" href="#/safe-adult">${esc(G.safeAdultLink)}</a>
      </p>`;
  }
};
