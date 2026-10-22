// Help right now: which services you can reach at this moment, open first.
// The services and their hours are in data/help-now.js.
// Open or closed is shown in words and a symbol as well as colour.
window.SCREENS = window.SCREENS || {};
(function () {
  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Pretend times for show and tell, so we can see the page at night or at the weekend
  const PRETEND = [
    { id: "now", label: "Right now" },
    { id: "fri-2330", label: "Friday at 11:30pm", day: 5, mins: 23 * 60 + 30 },
    { id: "sat-0300", label: "Saturday at 3am", day: 6, mins: 3 * 60 },
    { id: "sun-1400", label: "Sunday at 2pm", day: 0, mins: 14 * 60 }
  ];
  let pretendId = "now";

  // Today's day and minutes past midnight, in UK time
  function ukNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, mins: Number(get("hour")) * 60 + Number(get("minute")) };
  }

  function when() {
    const p = PRETEND.find((x) => x.id === pretendId);
    return p && p.day !== undefined ? { day: p.day, mins: p.mins } : ukNow();
  }

  const toMins = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

  function isOpen(s, day, mins) {
    if (s.always) return true;
    return s.hours.some((r) => {
      const from = toMins(r.from), to = toMins(r.to);
      if (to > from) return r.days.includes(day) && mins >= from && mins < to;
      // Runs past midnight
      return (r.days.includes(day) && mins >= from) || (r.days.includes((day + 6) % 7) && mins < to);
    });
  }

  function clock(mins) {
    const h = Math.floor(mins / 60), m = mins % 60;
    const h12 = h % 12 || 12;
    return `${h12}${m ? ":" + String(m).padStart(2, "0") : ""}${h < 12 ? "am" : "pm"}`;
  }

  // When a closed service next opens, in plain words
  function nextOpen(s, now) {
    const start = now.mins - (now.mins % 15); // step on the quarter hour, so it says 6pm, not 6:10pm
    for (let k = 1; k <= 7 * 96; k++) {
      const total = start + k * 15;
      const day = (now.day + Math.floor(total / 1440)) % 7;
      const mins = total % 1440;
      if (isOpen(s, day, mins)) {
        const daysAhead = Math.floor(total / 1440);
        const dayWord = daysAhead === 0 ? "today" : daysAhead === 1 ? "tomorrow" : DAY_NAMES[day];
        return `Opens ${dayWord} at ${clock(mins)}`;
      }
    }
    return "";
  }

  function card(s, open, now) {
    const status = open
      ? `<p class="status status-open"><span aria-hidden="true">✓</span> Open now</p>`
      : `<p class="status status-closed"><span aria-hidden="true">✕</span> Closed. ${esc(nextOpen(s, now))}</p>`;
    return `
      <li class="help-card${open ? "" : " help-card-closed"}">
        <h3>${esc(s.name)}</h3>
        ${status}
        <p>${esc(s.what)}</p>
        <p class="help-facts">For: ${esc(s.who)}. Open: ${esc(s.always ? "all day, every day" : s.hoursText)}.</p>
        ${s.note ? `<p class="help-facts">${esc(s.note)}</p>` : ""}
        ${open ? `<p class="help-actions">${s.contacts.map((c) =>
          `<a class="button" href="${esc(c.href)}"${c.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(c.label)}</a>`).join("")}</p>` : ""}
      </li>`;
  }

  window.SCREENS["help-now"] = {
    render() {
      const now = when();
      const all = window.DATA.helpNow;
      const open = all.filter((s) => isOpen(s, now.day, now.mins));
      const closed = all.filter((s) => !isOpen(s, now.day, now.mins));
      return `
        <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
        <h1>Help right now</h1>
        <p class="lead">These people are kind and won't judge you. You can talk about anything.</p>
        <p class="help-time">It's ${esc(DAY_NAMES[now.day])}, ${esc(clock(now.mins))}.</p>

        <h2>Open now</h2>
        <ul class="help-list">${open.map((s) => card(s, true, now)).join("")}</ul>

        ${closed.length ? `<h2>Closed right now</h2>
        <ul class="help-list">${closed.map((s) => card(s, false, now)).join("")}</ul>` : ""}

        <p class="urgent"><a href="tel:999">${esc(window.CONTENT.emergency)}</a></p>

        <p class="demo-note">Opening times checked on 22 October 2026. They can change, so check the service's website too.</p>
        <p class="demo-note">
          <label for="help-pretend">Prototype only. See the page at a different time:</label>
          <select id="help-pretend">${PRETEND.map((p) =>
            `<option value="${p.id}"${p.id === pretendId ? " selected" : ""}>${esc(p.label)}</option>`).join("")}</select>
        </p>`;
    },
    mount(main) {
      main.querySelector("#help-pretend").addEventListener("change", (e) => {
        pretendId = e.target.value;
        main.innerHTML = this.render();
        this.mount(main);
        main.querySelector("#help-pretend").focus();
      });
    }
  };
})();
