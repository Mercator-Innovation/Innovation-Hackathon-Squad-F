// Text a safe adult: a phone-style text chat with a vetted volunteer (made up),
// which builds towards one agreed next step for tomorrow.
//   #/safe-adult         the chat
//   #/safe-adult/steps   my next steps and useful numbers, with tick-offs
// Nothing is sent anywhere. Next steps are kept only on this device.
window.SCREENS = window.SCREENS || {};

(function () {
  const D = window.DATA;
  const STEPS_KEY = "turtleToast.nextSteps";
  const CALLED_KEY = "turtleToast.calledNumbers";

  // ---- Storage on this device (fails quietly in private windows)
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* not saved */ }
  }
  const openSteps = () => load(STEPS_KEY, []).filter((s) => !s.done);

  // ---- The conversation, kept while the page is open
  const vol = D.volunteers[0];
  let chat = null;
  function newChat() {
    chat = {
      stage: "start",
      messages: [
        { from: "vol", text: `Hi, I'm ${vol.name}. I'm a volunteer here.` },
        { from: "vol", text: "You can tell me what's going on. You don't have to give your name." }
      ],
      plan: {}
    };
  }
  newChat();

  // What the young person can tap at each stage
  function quickReplies() {
    switch (chat.stage) {
      case "start": return D.starters.map((t) => ({ label: t, value: t, starter: true }));
      case "safety": return [{ label: "Yes, I'm safe", value: "safe" }, { label: "No, I don't feel safe", value: "unsafe" }];
      case "unsafe": return [{ label: "I'm safe now", value: "safe" }];
      case "step": return D.nextSteps.map((s) => ({ label: s.choice, value: s.id }));
      case "when": return D.whenOptions.map((w) => ({ label: w, value: w }));
      case "checkin": return D.checkInOptions.map((c) => ({ label: c.label, value: c.value }));
      default: return [];
    }
  }

  // ---- Little helpers
  const esc = (s) => window.esc(s);
  function helplinesHTML(withTicks) {
    const called = load(CALLED_KEY, []);
    return `<ul class="sa-lines">${D.helplines.map((h) => `
      <li>
        <span class="sa-line-name">${esc(h.name)}</span>
        <a class="sa-line-num" href="tel:${h.tel}">${esc(h.number)}</a>
        <span class="sa-line-about">${esc(h.about)}</span>
        ${withTicks ? `<span class="sa-tick"><input type="checkbox" id="called-${h.id}" data-called="${h.id}" ${called.includes(h.id) ? "checked" : ""}>
          <label for="called-${h.id}">I've called them</label></span>` : ""}
      </li>`).join("")}</ul>`;
  }
  function messageHTML(m) {
    if (m.from === "you") return `<li class="sa-msg sa-you"><span class="sa-sr">You said:</span>${esc(m.text)}</li>`;
    if (m.from === "card") return `<li class="sa-card">${m.html}</li>`;
    return `<li class="sa-msg sa-vol"><span class="sa-sr">${esc(vol.name)} said:</span>${esc(m.text)}</li>`;
  }
  function agreedCardHTML(p) {
    const step = D.nextSteps.find((s) => s.id === p.step);
    return `<p class="sa-card-title">Our plan for tomorrow</p>
      <p><strong>${esc(step.title)}</strong>, ${esc(p.when.toLowerCase())}.</p>
      ${p.checkIn ? `<p>${esc(vol.name)} will check in ${esc(p.checkIn.toLowerCase())}.</p>` : ""}
      <a class="sa-card-link" href="#/safe-adult/steps">See my next steps</a>`;
  }

  // ---- The volunteer's side of the script
  function respond(input, isFreeText) {
    const say = (t) => chat.messages.push({ from: "vol", text: t });
    const s = chat.stage;
    if (s === "start") {
      say("Thank you for telling me. That sounds really hard, and you did the right thing messaging.");
      say("First, are you safe right now?");
      chat.stage = "safety";
    } else if (isFreeText) {
      say("Thanks for telling me. I'm listening.");
      if (s === "done") say("You can message me any time. Your plan is saved in your next steps.");
      else say("When you're ready, you can tap one of the options below.");
    } else if ((s === "safety" || s === "unsafe") && input === "unsafe") {
      say("If you or anyone is in danger right now, please call 999. You won't be in trouble.");
      chat.messages.push({ from: "card", html: `<p class="sa-card-title">In danger right now?</p><a class="sa-999" href="tel:999">Call 999</a>` });
      say("I'll still be here when you're safe.");
      chat.stage = "unsafe";
    } else if (s === "safety" || s === "unsafe") {
      say("I'm glad you're safe. Let's think about tomorrow.");
      say("What's one small step that could help?");
      chat.stage = "step";
    } else if (s === "step") {
      const step = D.nextSteps.find((x) => x.id === input);
      chat.plan.step = step.id;
      say(step.volunteerSays);
      if (step.showHelplines) chat.messages.push({ from: "card", html: `<p class="sa-card-title">Free numbers you could phone</p>${helplinesHTML(false)}` });
      say("When could you do it tomorrow?");
      chat.stage = "when";
    } else if (s === "when") {
      chat.plan.when = input;
      say("That sounds like a good plan.");
      say("Shall I message you in a day or two to see how it went?");
      chat.stage = "checkin";
    } else if (s === "checkin") {
      chat.plan.checkIn = input;
      say(input ? `Great, I'll message you ${input.toLowerCase()}.` : "That's OK. You can message me any time.");
      say("Here's what we agreed. I've saved it in your next steps.");
      chat.messages.push({ from: "card", html: agreedCardHTML(chat.plan) });
      say("You've done something brave tonight. It's not your fault.");
      saveAgreedStep(chat.plan);
      chat.stage = "done";
      chat.notify = true;
    }
  }

  function saveAgreedStep(p) {
    const step = D.nextSteps.find((s) => s.id === p.step);
    const steps = load(STEPS_KEY, []);
    steps.unshift({ id: String(Date.now()), stepId: step.id, title: step.title, when: p.when,
      tip: step.tip || "", helplines: !!step.showHelplines, checkIn: p.checkIn, volunteer: vol.name, done: false });
    save(STEPS_KEY, steps);
  }

  // ---- Styles for this screen only (kept here so they don't clash with styles.css)
  function addStyles() {
    if (document.getElementById("sa-style")) return;
    const st = document.createElement("style");
    st.id = "sa-style";
    st.textContent = `
      .sa-sr { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
      .sa-bell { display:flex; align-items:center; gap:.6rem; margin:.5rem 0 1rem; padding:.6rem .9rem; background:var(--adult-soft); border:2px solid var(--adult); border-radius:12px; color:var(--text); text-decoration:none; font-weight:700; }
      .sa-bell-dot { flex:none; width:1.6rem; height:1.6rem; border-radius:50%; background:var(--adult); color:#fff; display:grid; place-items:center; font-size:.9rem; }
      .sa-phone { position:relative; background:#fff; border:10px solid #1b1b1f; border-radius:34px; overflow:hidden; display:flex; flex-direction:column; min-height:34rem; box-shadow:0 10px 30px rgba(0,0,0,.15); }
      .sa-top { display:flex; align-items:center; gap:.7rem; padding:.8rem .9rem; background:#f2f2f6; border-bottom:1px solid #dcdce2; }
      .sa-avatar { flex:none; width:3rem; height:3rem; }
      .sa-avatar svg { width:100%; height:100%; display:block; }
      .sa-who { min-width:0; display:flex; flex-direction:column; line-height:1.25; }
      .sa-name { font-weight:800; font-size:1.1rem; }
      .sa-badge { display:inline-flex; align-items:center; gap:.3rem; font-size:.8rem; font-weight:700; color:var(--primary); }
      .sa-online { font-size:.8rem; color:var(--muted); }
      .sa-online::before { content:""; display:inline-block; width:.55rem; height:.55rem; border-radius:50%; background:#1a8f3c; margin-right:.35rem; vertical-align:middle; }
      .sa-log { list-style:none; margin:0; padding:1rem .8rem; display:flex; flex-direction:column; gap:.45rem; flex:1; overflow-y:auto; max-height:26rem; background:#fff; }
      .sa-msg { max-width:82%; padding:.55rem .85rem; border-radius:18px; font-size:1rem; line-height:1.4; }
      .sa-vol { align-self:flex-start; background:#e9e9ef; color:#16161a; border-bottom-left-radius:6px; }
      .sa-you { align-self:flex-end; background:#0b6bd3; color:#fff; border-bottom-right-radius:6px; }
      .sa-card { align-self:stretch; background:var(--adult-soft); border:2px solid var(--adult); border-radius:14px; padding:.7rem .9rem; font-size:1rem; }
      .sa-card p { margin:.2rem 0; }
      .sa-card-title { font-weight:800; color:var(--adult); }
      .sa-card-link { font-weight:700; }
      .sa-999 { display:inline-block; margin-top:.3rem; padding:.5rem 1rem; background:var(--urgent); color:#fff; font-weight:800; border-radius:999px; text-decoration:none; }
      .sa-typing { align-self:flex-start; color:var(--muted); font-size:.9rem; font-style:italic; }
      .sa-quick { display:flex; flex-wrap:wrap; gap:.4rem; padding:.6rem .8rem 0; background:#fff; }
      .sa-chip { font:inherit; font-size:.95rem; padding:.45rem .8rem; border-radius:999px; border:2px solid #0b6bd3; background:#fff; color:#0b5ab3; cursor:pointer; text-align:left; }
      .sa-chip:hover { background:#e8f1fc; }
      .sa-compose { display:flex; gap:.5rem; align-items:flex-end; padding:.6rem .8rem .8rem; background:#fff; border-top:1px solid #ececf0; margin-top:.6rem; }
      .sa-compose textarea { flex:1; min-width:0; font:inherit; font-size:1rem; padding:.55rem .8rem; border:2px solid #c9c9d2; border-radius:20px; resize:none; }
      .sa-send { font:inherit; font-weight:800; font-size:1rem; padding:.55rem 1rem; border:0; border-radius:20px; background:#0b6bd3; color:#fff; cursor:pointer; }
      .sa-toast { position:absolute; top:.6rem; left:.6rem; right:.6rem; z-index:2; display:flex; gap:.6rem; align-items:center; padding:.6rem .8rem; background:rgba(30,30,36,.94); color:#fff; border-radius:14px; font-size:.95rem; box-shadow:0 6px 18px rgba(0,0,0,.25); }
      .sa-toast img, .sa-toast svg { width:1.8rem; height:1.8rem; flex:none; }
      .sa-toast strong { display:block; }
      .sa-under { display:flex; flex-wrap:wrap; gap:.5rem 1rem; justify-content:space-between; margin-top:.8rem; font-size:.95rem; }
      .sa-reset { font:inherit; font-size:.95rem; background:none; border:0; color:var(--primary); text-decoration:underline; cursor:pointer; padding:0; }
      .sa-steps { list-style:none; padding:0; margin:1rem 0; display:grid; gap:.8rem; }
      .sa-step { background:var(--card); border:2px solid var(--border); border-left:8px solid var(--adult); border-radius:12px; padding:.8rem 1rem; }
      .sa-step.is-done { border-left-color:var(--primary); opacity:.75; }
      .sa-step h3 { margin:0 0 .2rem; font-size:1.1rem; }
      .sa-step p { margin:.25rem 0; }
      .sa-step.is-done h3 { text-decoration:line-through; }
      .sa-tick { display:flex; align-items:center; gap:.5rem; margin-top:.4rem; font-weight:700; }
      .sa-tick input { width:1.4rem; height:1.4rem; accent-color:var(--primary); }
      .sa-lines { list-style:none; padding:0; margin:.4rem 0 0; display:grid; gap:.6rem; }
      .sa-lines li { display:flex; flex-direction:column; gap:.1rem; }
      .sa-line-name { font-weight:700; }
      .sa-line-num { font-weight:800; font-size:1.1rem; }
      .sa-line-about { font-size:.95rem; color:var(--muted); }
      .sa-box { background:var(--card); border:2px solid var(--border); border-radius:12px; padding:.8rem 1rem; }
      .sa-empty { color:var(--muted); }
      @media (max-width: 420px) { .sa-phone { border-width:6px; border-radius:24px; } }
    `;
    document.head.appendChild(st);
  }

  // A tiny turtle for the disguised notification
  const turtleIcon = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#2a1666"/>
    <path d="M6 20 Q7 10 15 10 Q23 10 24 20 Z" fill="#8a4dff"/><rect x="5" y="19" width="20" height="3" rx="1.5" fill="#ff3da0"/>
    <circle cx="26" cy="15" r="3.5" fill="#5fe36a"/><rect x="27" y="16" width="3" height="5" rx="1" fill="#f4c27a"/></svg>`;

  // ---- Screen: the chat
  function renderChat() {
    const open = openSteps().length;
    return `
      <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
      <h1>Text a safe adult</h1>
      <p class="lead">Text a volunteer who's been checked and trained. Together you'll agree one small step for tomorrow.</p>
      ${open ? `<a class="sa-bell" href="#/safe-adult/steps"><span class="sa-bell-dot">${open}</span>You have ${open} next step${open === 1 ? "" : "s"} to do</a>` : ""}
      <div class="sa-phone">
        <div class="sa-top">
          <span class="sa-avatar">${vol.avatar}</span>
          <span class="sa-who">
            <span class="sa-name">${esc(vol.name)}</span>
            <span class="sa-badge"><svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0l2 2 3-.5.5 3L16 8l-2.5 3.5-.5 3-3-.5L8 16l-2-2-3 .5-.5-3L0 8l2.5-3.5.5-3 3 .5z" fill="currentColor"/><path d="M4.8 8.2l2.1 2.1 4.3-4.3" fill="none" stroke="#fff" stroke-width="1.8"/></svg>Vetted volunteer</span>
            <span class="sa-online">Online now. ${esc(vol.replyTime)}</span>
          </span>
        </div>
        <ol class="sa-log" id="sa-log" aria-live="polite" aria-label="Messages with ${esc(vol.name)}">${chat.messages.map(messageHTML).join("")}</ol>
        <div class="sa-quick" id="sa-quick"></div>
        <form class="sa-compose" id="sa-form">
          <label for="sa-input" class="sa-sr">Your message</label>
          <textarea id="sa-input" rows="1" placeholder="Type a message"></textarea>
          <button type="submit" class="sa-send">Send</button>
        </form>
      </div>
      <div class="sa-under">
        <a href="#/safe-adult/steps">My next steps and useful numbers</a>
        <button type="button" class="sa-reset" id="sa-reset">Start a new chat</button>
      </div>
      <p class="demo-note">Prototype: ${esc(vol.name)} is made up and their picture is a drawing. In a real service, volunteers would be checked and trained, and each would have a drawn avatar that looks like them. Nothing is sent.</p>`;
  }

  function mountChat(root) {
    const log = root.querySelector("#sa-log");
    const quick = root.querySelector("#sa-quick");
    const input = root.querySelector("#sa-input");
    let busy = false;

    const scrollDown = () => { log.scrollTop = log.scrollHeight; };
    function drawQuick() {
      const q = busy ? [] : quickReplies();
      quick.innerHTML = q.map((r, i) => `<button type="button" class="sa-chip" data-i="${i}">${esc(r.label)}</button>`).join("");
      quick.hidden = !q.length;
      quick.querySelectorAll(".sa-chip").forEach((b) => b.addEventListener("click", () => {
        const r = q[Number(b.dataset.i)];
        if (r.starter) { input.value = r.value; input.focus(); return; } // starters go in the box so they can edit
        send(r.label, r.value, false);
      }));
    }
    function redrawLog() { log.innerHTML = chat.messages.map(messageHTML).join(""); scrollDown(); }

    function send(text, value, isFreeText) {
      if (busy) return;
      chat.messages.push({ from: "you", text });
      redrawLog();
      busy = true; drawQuick();
      const typing = document.createElement("li");
      typing.className = "sa-typing"; typing.textContent = `${vol.name} is typing…`;
      log.appendChild(typing); scrollDown();
      const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 200 : 900;
      setTimeout(() => {
        respond(value, isFreeText);
        busy = false;
        redrawLog(); drawQuick();
        if (chat.notify) { chat.notify = false; showToast(root); }
      }, delay);
    }

    root.querySelector("#sa-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const t = input.value.trim();
      if (!t) return;
      input.value = "";
      send(t, t, chat.stage !== "start");
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); root.querySelector("#sa-form").requestSubmit(); }
    });
    root.querySelector("#sa-reset").addEventListener("click", () => { newChat(); window.SCREENS["safe-adult"].remount(); });

    drawQuick(); scrollDown();
  }

  // Disguised phone notification: says nothing about what the app is for
  function showToast(root) {
    const phone = root.querySelector(".sa-phone");
    const t = document.createElement("div");
    t.className = "sa-toast"; t.setAttribute("role", "status");
    t.innerHTML = `${turtleIcon}<span><strong>Turtle Toast</strong>You've got 1 thing for tomorrow</span>`;
    phone.appendChild(t);
    setTimeout(() => t.remove(), 6000);
    // Refresh the bell above the phone
    const open = openSteps().length;
    let bell = root.querySelector(".sa-bell");
    if (!bell) { bell = document.createElement("a"); bell.className = "sa-bell"; bell.href = "#/safe-adult/steps"; phone.before(bell); }
    bell.innerHTML = `<span class="sa-bell-dot">${open}</span>You have ${open} next step${open === 1 ? "" : "s"} to do`;
  }

  // ---- Screen: my next steps
  function renderSteps() {
    const steps = load(STEPS_KEY, []);
    return `
      <a class="back" href="#/safe-adult">Back to the chat</a>
      <h1>My next steps</h1>
      <p class="lead">The steps you agreed with a volunteer. Tick them off when you've done them.</p>
      ${steps.length ? `<ul class="sa-steps">${steps.map((s) => `
        <li class="sa-step ${s.done ? "is-done" : ""}">
          <h3>${esc(s.title)}</h3>
          <p><strong>When:</strong> tomorrow, ${esc(s.when.toLowerCase())}</p>
          ${s.tip ? `<p>${esc(s.tip)}</p>` : ""}
          ${s.helplines ? helplinesHTML(false) : ""}
          <p class="muted">${s.checkIn ? `${esc(s.volunteer)} will check in ${esc(s.checkIn.toLowerCase())}.` : `You can message ${esc(s.volunteer)} any time.`}</p>
          <span class="sa-tick"><input type="checkbox" id="done-${s.id}" data-done="${s.id}" ${s.done ? "checked" : ""}>
            <label for="done-${s.id}">I've done this</label></span>
        </li>`).join("")}</ul>`
        : `<p class="sa-box sa-empty">No steps yet. <a href="#/safe-adult">Text a volunteer</a> and you'll agree one together.</p>`}
      <h2>Useful numbers</h2>
      <div class="sa-box">${helplinesHTML(true)}</div>
      <p class="demo-note">Your steps are only saved on this phone. ${steps.length ? `<button type="button" class="sa-reset" id="sa-clear">Delete my steps</button>` : ""}</p>`;
  }

  function mountSteps(root) {
    root.querySelectorAll("[data-done]").forEach((cb) => cb.addEventListener("change", () => {
      const steps = load(STEPS_KEY, []);
      const s = steps.find((x) => x.id === cb.dataset.done);
      if (s) { s.done = cb.checked; save(STEPS_KEY, steps); }
      cb.closest(".sa-step").classList.toggle("is-done", cb.checked);
    }));
    root.querySelectorAll("[data-called]").forEach((cb) => cb.addEventListener("change", () => {
      const called = new Set(load(CALLED_KEY, []));
      cb.checked ? called.add(cb.dataset.called) : called.delete(cb.dataset.called);
      save(CALLED_KEY, [...called]);
    }));
    const clear = root.querySelector("#sa-clear");
    if (clear) clear.addEventListener("click", () => { save(STEPS_KEY, []); save(CALLED_KEY, []); window.SCREENS["safe-adult"].remount(["steps"]); });
  }

  // ---- Register the screen
  let current = [];
  window.SCREENS["safe-adult"] = {
    render(parts) { addStyles(); current = parts || []; return current[0] === "steps" ? renderSteps() : renderChat(); },
    mount(root, parts) { (parts && parts[0] === "steps") ? mountSteps(root) : mountChat(root); },
    remount(parts) {
      const main = document.getElementById("main");
      const p = parts || current;
      main.innerHTML = this.render(p);
      this.mount(main, p);
    }
  };
})();
