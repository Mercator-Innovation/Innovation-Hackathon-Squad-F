// "How did it go?": closes the loop on a next step agreed in Text a safe adult.
// When someone comes back with a step they haven't told us about yet, the hub
// shows a banner. This screen asks if they did it and what would help now.
//   #/how-did-it-go          the oldest step still waiting for a check-in
//   #/how-did-it-go/<id>     one step
// Uses the same next steps that safe-adult.js keeps on this device. Nothing is sent anywhere.
window.SCREENS = window.SCREENS || {};
(function () {
  const STEPS_KEY = "turtleToast.nextSteps";
  const load = () => { try { return JSON.parse(localStorage.getItem(STEPS_KEY)) || []; } catch (e) { return []; } };
  const save = (v) => { try { localStorage.setItem(STEPS_KEY, JSON.stringify(v)); } catch (e) { /* not saved */ } };
  const waiting = () => load().filter((s) => !s.done && !s.outcome && !(s.askAfter > Date.now()));
  const update = (id, patch) => save(load().map((s) => (s.id === id ? Object.assign({}, s, patch) : s)));

  const T = () => window.CONTENT.checkIn;
  const btn = (href, text, cls) => `<a class="button ${cls || ""}" href="${href}">${esc(text)}</a>`;

  // Shown on the hub when a step is waiting
  window.CHECKIN = {
    bannerHTML() {
      const s = waiting()[0];
      if (!s) return "";
      return `
        <a class="ci-banner" href="#/how-did-it-go/${esc(s.id)}">
          <span class="ci-banner-dot" aria-hidden="true">?</span>
          <span class="ci-banner-body">
            <span class="ci-banner-title">${esc(T().bannerTitle)}</span>
            <span class="ci-banner-text">${esc(T().bannerText)} ${esc(s.title)}</span>
          </span>
          <span class="tile-go" aria-hidden="true">▶</span>
        </a>`;
    }
  };

  window.SCREENS["how-did-it-go"] = {
    render(args) {
      const C = T();
      const list = load();
      const s = args[0] ? list.find((x) => x.id === args[0]) : waiting()[0];
      const back = `<a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>`;

      if (!s) {
        return `${back}
          <h1>${esc(C.title)}</h1>
          <p class="lead">${esc(C.none)}</p>
          <p class="actions">${btn("#/safe-adult", C.planOne)}</p>
          <p class="demo-note">${esc(C.demoNote)}</p>
          <p><button type="button" class="button button-secondary" id="ci-demo">${esc(C.demoButton)}</button></p>`;
      }

      const answer = args[1];
      const plan = `
        <div class="ci-plan">
          <span class="ci-plan-label">${esc(C.youPlanned)}</span>
          <strong>${esc(s.title)}</strong>${s.when ? `, ${esc(s.when.toLowerCase())}` : ""}.
          ${s.volunteer ? `<span class="ci-plan-who">${esc(C.agreedWith)} ${esc(s.volunteer)}</span>` : ""}
        </div>`;

      if (!answer) {
        return `${back}
          <h1>${esc(C.title)}</h1>
          ${plan}
          <h2>${esc(C.didYou)}</h2>
          <ul class="ci-choices">
            ${C.answers.map((a) => `<li><a class="ci-choice" href="#/how-did-it-go/${esc(s.id)}/${a.id}">${esc(a.label)}</a></li>`).join("")}
          </ul>
          <p class="ci-safe">${esc(C.notSafe)} <a href="tel:999">${esc(C.call999)}</a></p>`;
      }

      const r = C.responses[answer];
      if (!r) return `${back}<h1>${esc(C.title)}</h1>`;
      return `${back}
        <h1>${esc(r.title)}</h1>
        <p class="lead">${esc(r.text)}</p>
        <h2>${esc(r.nextHeading)}</h2>
        <ul class="ci-next">
          ${r.next.map((n) => `<li><a class="ci-next-link" href="${n.href}" ${n.keep ? 'data-keep="1"' : ""}>
            <span class="ci-next-title">${esc(n.title)}</span>
            <span class="ci-next-text">${esc(n.text)}</span></a></li>`).join("")}
        </ul>
        <p class="hub-fault ci-fault">${esc(window.CONTENT.home.notYourFault)}</p>
        <p class="ci-safe">${esc(C.notSafe)} <a href="tel:999">${esc(C.call999)}</a></p>`;
    },

    mount(root, args) {
      const demo = root.querySelector("#ci-demo");
      if (demo) {
        demo.addEventListener("click", () => {
          const id = "demo-" + Date.now();
          const list = load();
          list.unshift(Object.assign({ id, done: false }, T().demoStep));
          save(list);
          location.hash = "#/how-did-it-go/" + id;
        });
        return;
      }
      const s = args[0] ? load().find((x) => x.id === args[0]) : waiting()[0];
      const answer = args[1];
      if (!s || !answer) return;
      // Record the answer so the hub stops asking. "Yes" also ticks the step off.
      const patch = { outcome: answer, checkedAt: Date.now() };
      if (answer === "yes") patch.done = true;
      update(s.id, patch);
      // "Keep it for tomorrow": clear the answer and ask again in 12 hours
      root.querySelectorAll("[data-keep]").forEach((a) => a.addEventListener("click", () => {
        update(s.id, { outcome: "", when: "Tomorrow", askAfter: Date.now() + 12 * 60 * 60 * 1000 });
      }));
    }
  };
})();
