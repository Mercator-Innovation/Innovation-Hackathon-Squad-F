// Text a safe adult: choose a person, pick or edit a message, pretend-send.
window.SCREENS = window.SCREENS || {};
window.SCREENS["safe-adult"] = {
  render() {
    const S = window.CONTENT.safeAdult;
    const people = window.DATA.safeAdults;
    return `
      <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
      <h1>${esc(S.title)}</h1>
      <p class="lead">${esc(S.intro)}</p>
      <p class="demo-note">${esc(S.demoNote)}</p>
      <form id="sa-form">
        <fieldset>
          <legend><h2>${esc(S.chooseHeading)}</h2></legend>
          ${people.map((p, i) => `
            <div class="choice">
              <input type="radio" name="person" id="p-${p.id}" value="${p.id}" ${i === 0 ? "checked" : ""}>
              <label for="p-${p.id}">${esc(p.name)} <span class="muted">(${esc(p.relation)})</span></label>
            </div>`).join("")}
        </fieldset>
        <fieldset>
          <legend><h2>${esc(S.templatesHeading)}</h2></legend>
          ${S.templates.map((t, i) => `
            <div class="choice">
              <input type="radio" name="template" id="t-${i}" value="${i}" ${i === 0 ? "checked" : ""}>
              <label for="t-${i}">${esc(t)}</label>
            </div>`).join("")}
        </fieldset>
        <label for="sa-message" class="block-label">${esc(S.messageLabel)}</label>
        <textarea id="sa-message" rows="3">${esc(S.templates[0])}</textarea>
        <button type="submit" class="button">${esc(S.send)}</button>
      </form>
      <div id="sa-sent" class="sent" hidden role="status"></div>`;
  },
  mount(root) {
    const S = window.CONTENT.safeAdult;
    const msg = root.querySelector("#sa-message");
    root.querySelectorAll('input[name="template"]').forEach((r) =>
      r.addEventListener("change", () => { msg.value = S.templates[r.value]; }));

    root.querySelector("#sa-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const id = root.querySelector('input[name="person"]:checked').value;
      const person = window.DATA.safeAdults.find((p) => p.id === id);
      const sent = root.querySelector("#sa-sent");
      e.target.hidden = true;
      sent.hidden = false;
      sent.innerHTML = `
        <h2 tabindex="-1">${esc(S.sentTitle)}</h2>
        <p><strong>${esc(person.name)}:</strong> “${esc(msg.value)}”</p>
        <p>${esc(S.sentText)}</p>
        <a class="button" href="#/hub">${esc(S.home)}</a>`;
      sent.querySelector("h2").focus();
    });
  }
};
