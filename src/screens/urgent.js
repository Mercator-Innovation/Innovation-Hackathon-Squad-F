// Need urgent help: the worst situations and what to do straight away.
// Reached from "Need urgent help" in the top bar on every hub screen.
// Each situation opens to show short steps, so the page stays short to scan.
window.SCREENS = window.SCREENS || {};
window.SCREENS.urgent = {
  render() {
    const U = window.CONTENT.urgent;
    return `
      <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
      <h1>${esc(U.title)}</h1>
      <p class="lead">${esc(U.intro)}</p>
      <p class="urgent"><a href="tel:999">${esc(U.call)}</a></p>
      <p class="urgent-note">${esc(U.callNote)}</p>

      <h2>${esc(U.pickHeading)}</h2>
      <div class="urgent-list">
        ${U.situations.map((s) => `
          <details class="urgent-item">
            <summary>${esc(s.title)}</summary>
            <ol class="steps">${s.steps.map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
            ${s.more ? `<a href="${s.more}">${esc(U.moreLink)}</a>` : ""}
          </details>`).join("")}
      </div>

      <p class="tell-prompt">${esc(U.notUrgent)} <a href="${U.notUrgentHref}">${esc(U.notUrgentLink)}</a></p>
      <p class="hub-fault ci-fault">${esc(window.CONTENT.home.notYourFault)}</p>`;
  }
};
