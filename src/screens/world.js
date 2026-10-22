// Explore: a small walk-around game, in the hub's blocky night-time game look.
// You walk along a glowing path and visit little block houses. Each house has
// help inside and links to the rest of the hub. Move with the arrow keys or
// WASD, the on-screen buttons, or tap where to go. There's also a plain list
// of every house, for anyone who'd rather not play.
window.SCREENS = window.SCREENS || {};
window.SCREENS.world = (function () {
  const WORLD_W = 400;   // the world is this wide, in world units
  const STOP_GAP = 150;  // distance between houses along the path
  const TILE = 20;       // size of one ground block
  const NEAR = 55;       // how close you need to be to open a house
  const SPEED = 170;     // world units a second

  // The same colours as the hub's game look in styles.css
  const G = {
    bg: "#0b1222", panel: "#131d33", line: "#24345a", text: "#eef5ff", muted: "#b9c7e0",
    guide: "#3ee6c8", chat: "#7fb4ff", adult: "#ffc45c", danger: "#ff8f87", outside: "#c9a7ff"
  };
  const COLOURS = {
    welcome: G.guide, guide: G.guide, urgent: G.danger, chat: G.chat,
    adult: G.adult, outside: G.outside, pond: G.chat, treasure: G.adult,
    stars: G.outside, garden: G.guide
  };
  // Where the stars sit in the night sky (x out of 100, y out of 60)
  const STARS = [[10, 12], [24, 30], [35, 8], [48, 22], [58, 46], [66, 14], [78, 34], [88, 10], [16, 48], [92, 50]];

  // Star-gazing hill: tap stars to join them into your own shape
  function mountStars(panel) {
    const W = window.CONTENT.world.stars;
    const line = panel.querySelector(".sky-lines polyline");
    const made = panel.querySelector(".sky-made");
    let chain = [];
    const draw = () => {
      line.setAttribute("points", chain.map((i) => STARS[i].join(",")).join(" "));
      panel.querySelectorAll(".sky-star").forEach((b) => b.setAttribute("aria-pressed", String(chain.includes(+b.dataset.star))));
      made.textContent = chain.length > 1 ? W.made.replace("{n}", chain.length) : "";
    };
    panel.querySelector(".sky").addEventListener("click", (e) => {
      const b = e.target.closest("[data-star]");
      if (b) { chain.push(+b.dataset.star); draw(); }
    });
    panel.querySelector(".sky-clear").addEventListener("click", () => { chain = []; draw(); });
  }

  // 5 4 3 2 1 garden: notice things around you, one sense at a time
  function mountGarden(panel) {
    const W = window.CONTENT.world.garden;
    const box = panel.querySelector(".garden-body");
    // What they've typed for each sense. Only kept on this screen, never saved or sent.
    let step = 0, noticed = W.steps.map(() => []);
    const show = (moveFocus) => {
      if (step >= W.steps.length) {
        box.innerHTML = `<p class="garden-ask" tabindex="-1">${esc(W.finished)}</p>
          <ul class="garden-summary">${W.steps.map((s, i) =>
            `<li><strong>${esc(s.summary)}:</strong> ${esc(noticed[i].join(", "))}</li>`).join("")}</ul>
          <button type="button" class="world-button garden-again">${esc(W.again)}</button>`;
      } else {
        const s = W.steps[step], got = noticed[step];
        box.innerHTML = `<p class="garden-ask" tabindex="-1">${esc(s.ask)}</p>
          <ol class="garden-blocks" aria-label="${esc(W.progress.replace("{done}", got.length).replace("{count}", s.count))}">
            ${Array.from({ length: s.count }, (_, i) => i < got.length
              ? `<li class="garden-block is-on">${esc(got[i])}</li>`
              : `<li class="garden-block" aria-hidden="true">?</li>`).join("")}
          </ol>
          <form class="garden-form">
            <label for="garden-input">${esc(s.label)} <span class="garden-hint">(${esc(s.hint)})</span></label>
            <div class="garden-row">
              <input id="garden-input" type="text" autocomplete="off" maxlength="40">
              <button type="submit" class="world-button">${esc(W.add)}</button>
            </div>
            <p class="garden-error" aria-live="polite"></p>
          </form>
          <p class="garden-private">${esc(W.privateNote)}</p>`;
      }
      if (moveFocus) box.querySelector(moveFocus).focus();
    };
    box.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = box.querySelector("#garden-input");
      const text = input.value.trim();
      if (!text) { box.querySelector(".garden-error").textContent = W.empty; input.focus(); return; }
      noticed[step].push(text);
      if (noticed[step].length >= W.steps[step].count) {
        step++;
        show(step >= W.steps.length ? ".garden-ask" : "#garden-input");
      }
      else show("#garden-input");
    });
    box.addEventListener("click", (e) => {
      if (!e.target.closest(".garden-again")) return;
      step = 0; noticed = W.steps.map(() => []);
      show("#garden-input");
    });
    show(null);
  }

  // The pet dog: kept while the page is open
  const pet = { hasBone: false, adopted: false };
  const CHEST_NEAR = 32;   // how close you need to be to open a chest
  const found = new Set(); // chests found, kept while the page is open

  function treasureCounter() {
    const T = window.CONTENT.world.treasure;
    return T.counter.replace("{found}", found.size).replace("{total}", T.affirmations.length);
  }

  // Mix two #rrggbb colours: amount 0 is all a, 1 is all b
  function mix(a, b, amount) {
    const n = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
    const part = (i) => Math.round(n(a, i) + (n(b, i) - n(a, i)) * amount).toString(16).padStart(2, "0");
    return "#" + part(0) + part(1) + part(2);
  }

  // Every house, in order along the path. The guide houses come from the guide's own data.
  function buildStops() {
    const W = window.CONTENT.world;
    const stops = [Object.assign({ id: "welcome", kind: "welcome" }, W.welcome)];
    window.DATA.scenarios.forEach((s) => stops.push({
      id: s.id,
      kind: s.emergency ? "urgent" : "guide",
      title: s.title,
      label: W.labels[s.id] || s.title.split(" ").slice(0, 2).join(" "),
      scenario: s
    }));
    stops.push(Object.assign({ id: "safe-adult", kind: "adult" }, W.safeAdult));
    stops.push(Object.assign({ id: "childline", kind: "outside" }, W.childline));
    stops.push(Object.assign({ id: "stars", kind: "stars" }, W.stars));
    stops.push(Object.assign({ id: "garden", kind: "garden" }, W.garden));
    stops.push(Object.assign({ id: "pond", kind: "pond" }, W.pond));
    return stops;
  }

  function panelHTML(s) {
    const W = window.CONTENT.world;
    let body;
    if (s.kind === "treasure") {
      const T = W.treasure;
      body = `<p class="treasure-message">${esc(s.text)}</p>
        <p class="treasure-count">${esc(treasureCounter())}</p>
        ${found.size === T.affirmations.length ? `<p>${esc(T.allFound)}</p>` : ""}`;
    } else if (s.scenario) {
      // The first 2 steps show straight away. "Read what to do" opens the rest
      // here in the game, so nobody has to leave it.
      const G = window.CONTENT.guide;
      const steps = s.scenario.steps;
      body = `
        <ol>${steps.slice(0, 2).map((t) => `<li>${esc(t)}</li>`).join("")}</ol>
        <div class="world-more" id="world-more" hidden>
          ${steps.length > 2 ? `<ol start="3">${steps.slice(2).map((t) => `<li>${esc(t)}</li>`).join("")}</ol>` : ""}
          <h3>${esc(G.sayHeading)}</h3>
          <ul>${s.scenario.say.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
        <p class="world-actions">
          ${s.scenario.emergency ? `<a class="world-button world-button-urgent" href="tel:999">${esc(W.call999)}</a>` : ""}
          <button type="button" class="world-button" data-more aria-expanded="false" aria-controls="world-more">${esc(W.guideLink)}</button>
        </p>`;
    } else {
      body = `<p>${esc(s.text)}</p>`;
      if (s.kind === "pond") {
        body += `<p class="breathe-word"></p>
          <div class="breathe" aria-hidden="true"><div class="breathe-circle"></div></div>`;
      }
      if (s.kind === "stars") {
        body += `<div class="sky" role="group" aria-label="${esc(W.stars.skyLabel)}">
            <svg class="sky-lines" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden="true"><polyline points=""/></svg>
            ${STARS.map(([x, y], i) => `<button type="button" class="sky-star" data-star="${i}"
              style="left:${x}%;top:${(y / 60) * 100}%" aria-label="${esc(W.stars.star.replace("{n}", i + 1))}" aria-pressed="false"></button>`).join("")}
          </div>
          <p class="sky-made" aria-live="polite"></p>
          <button type="button" class="world-button sky-clear">${esc(W.stars.clear)}</button>`;
      }
      if (s.kind === "garden") body += `<div class="garden-body"></div>`;
      if (s.href) {
        const outside = s.external ? ' target="_blank" rel="noopener"' : "";
        body += `<p class="world-actions"><a class="world-button" href="${esc(s.href)}"${outside}>${esc(s.link)}</a></p>`;
      }
    }
    return `
      <div class="world-panel-head">
        <h2 id="world-panel-title" tabindex="-1">${esc(s.title)}</h2>
        <button type="button" class="world-close" data-close>${esc(W.close)}</button>
      </div>
      ${body}`;
  }

  return {
    render() {
      const W = window.CONTENT.world;
      const stops = buildStops();
      const pad = (dir, arrow) =>
        `<button type="button" data-dir="${dir}" aria-label="${esc(W.pad[dir])}">${arrow}</button>`;
      return `
        <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
        <h1>${esc(W.title)}</h1>
        <p class="lead">${esc(W.intro)}</p>
        <p class="world-how">${esc(W.howTo)}</p>
        <p class="world-how">${esc(W.treasure.hint)}</p>
        <p class="treasure-counter" id="treasure-counter">${esc(treasureCounter())}</p>
        <div class="world">
          <canvas class="world-canvas" tabindex="0" role="img" aria-label="${esc(W.mapLabel)}"></canvas>
          <section class="world-panel" hidden aria-labelledby="world-panel-title"></section>
          <p class="world-toast" hidden aria-hidden="true"></p>
        </div>
        <p class="visually-hidden" aria-live="polite" id="world-live"></p>
        <div class="world-pad">
          ${pad("up", "▲")}${pad("left", "◀")}${pad("down", "▼")}${pad("right", "▶")}
        </div>
        <h2 class="world-list-heading">${esc(W.listHeading)}</h2>
        <ul class="world-list">
          ${stops.map((s) => `<li><button type="button" data-stop="${esc(s.id)}" style="--c:${COLOURS[s.kind]}">
            <span>${esc(s.title)}</span><span aria-hidden="true">▶</span></button></li>`).join("")}
        </ul>`;
    },

    mount(main) {
      const W = window.CONTENT.world;
      const stops = buildStops();
      const canvas = main.querySelector(".world-canvas");
      const ctx = canvas.getContext("2d");
      const panel = main.querySelector(".world-panel");
      const live = main.querySelector("#world-live");

      // Lay out the world: a winding path from the bottom up to the pond at the top
      const regular = stops.length - 1;
      const worldH = regular * STOP_GAP + 420;
      const pathX = (y) => WORLD_W / 2 + 70 * Math.sin(y / 170);
      stops.forEach((s, i) => {
        if (s.kind === "pond") { s.x = pathX(150); s.y = 150; return; }
        s.y = worldH - 220 - i * STOP_GAP;
        const side = i % 2 ? 1 : -1;
        s.x = Math.min(WORLD_W - 70, Math.max(70, pathX(s.y) + side * 110));
      });
      const pond = stops[stops.length - 1];
      const startY = worldH - 90;

      // Hidden treasure chests, tucked against the edge on the far side from a house,
      // so no house or label covers them
      const chests = window.CONTENT.world.treasure.affirmations.map((text, k) => {
        const i = Math.min(regular - 1, 1 + Math.round(k * 1.75)); // which house it sits beside
        const houseOnRight = i % 2 === 1;
        return {
          id: "chest-" + k, kind: "treasure", text,
          title: window.CONTENT.world.treasure.title,
          x: houseOnRight ? 34 : WORLD_W - 34,
          y: stops[i].y + 10
        };
      });
      const counterEl = main.querySelector("#treasure-counter");

      // A bone near the start, and a hungry dog further along
      const bone = { x: Math.round(pathX(startY - 40) + 85), y: startY - 40 };
      const dogHome = { x: Math.round(Math.min(WORLD_W - 40, pathX(stops[2].y + 30) + 95)), y: stops[2].y + 30 };
      const dog = { x: dogHome.x, y: dogHome.y, face: -1, moving: false, near: false };

      // Trees and flowers, the same every time
      let seed = 7;
      const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
      const clear = (x, y, gap) =>
        Math.abs(x - pathX(y)) > 60 &&
        chests.every((c) => Math.hypot(c.x - x, c.y - y) > 45) &&
        [bone, dogHome].every((p) => Math.hypot(p.x - x, p.y - y) > 45) &&
        stops.every((s) => Math.hypot(s.x - x, s.y + 20 - y) > (s.kind === "pond" ? 120 : gap));
      const trees = [];
      for (let tries = 0; trees.length < 60 && tries < 2000; tries++) {
        const x = rand() * WORLD_W, y = rand() * worldH;
        if (clear(x, y, 95)) trees.push({ x: Math.round(x / 4) * 4, y: Math.round(y / 4) * 4, size: 26 + Math.floor(rand() * 3) * 6, shade: Math.floor(rand() * 3) });
      }

      // The ground never changes, so draw it once onto a hidden canvas
      const ground = document.createElement("canvas");
      const GROUND_SCALE = 2;
      ground.width = WORLD_W * GROUND_SCALE;
      ground.height = worldH * GROUND_SCALE;
      (function drawGround() {
        const g = ground.getContext("2d");
        g.scale(GROUND_SCALE, GROUND_SCALE);
        const onPath = (cx, cy) => {
          if (cy > pond.y && cy < worldH - 30 && Math.abs(cx - pathX(cy)) < 28) return true;
          return stops.some((s) => s.kind !== "pond" && Math.abs(cy - (s.y + 30)) < 14 &&
            cx > Math.min(s.x, pathX(s.y + 30)) - 10 && cx < Math.max(s.x, pathX(s.y + 30)) + 10);
        };
        const inPond = (cx, cy, grow) => ((cx - pond.x) / (90 + grow)) ** 2 + ((cy - pond.y) / (60 + grow)) ** 2 < 1;
        const flowerColours = [G.guide, G.adult, G.chat, G.outside];
        for (let y = 0; y < worldH; y += TILE) {
          for (let x = 0; x < WORLD_W; x += TILE) {
            const cx = x + TILE / 2, cy = y + TILE / 2;
            let fill = ((x + y) / TILE) % 2 ? "#0f2a2a" : "#11302f";
            let top = null, grass = false;
            if (inPond(cx, cy, 0)) { fill = (x / TILE + y / TILE) % 3 ? "#173a6b" : "#1f4f8f"; }
            else if (inPond(cx, cy, 16) || onPath(cx, cy)) { fill = G.line; top = "#2f4677"; }
            else grass = true;
            g.fillStyle = fill;
            g.fillRect(x, y, TILE, TILE);
            if (top) { g.fillStyle = top; g.fillRect(x, y, TILE, 4); }
            else if (grass && rand() < 0.12 && Math.abs(cx - pathX(cy)) < 70) {
              g.fillStyle = flowerColours[Math.floor(rand() * 4)];
              g.fillRect(x + 6, y + 6, 6, 6);
            }
          }
        }
        // Faint grid lines, like the hub's background
        g.strokeStyle = "rgba(127, 180, 255, .07)";
        g.lineWidth = 1;
        for (let x = 0; x <= WORLD_W; x += TILE) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, worldH); g.stroke(); }
        for (let y = 0; y <= worldH; y += TILE) { g.beginPath(); g.moveTo(0, y); g.lineTo(WORLD_W, y); g.stroke(); }
      })();

      const player = { x: pathX(startY), y: startY, face: 1, moving: false };
      if (pet.adopted) { dog.x = player.x - 24; dog.y = player.y + 6; }

      // A short message over the game, also read out by screen readers
      const toast = main.querySelector(".world-toast");
      let toastTimer = null;
      function say(text) {
        toast.textContent = text;
        toast.hidden = false;
        live.textContent = text;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.hidden = true; }, 4000);
      }

      function updatePet(dt) {
        if (!pet.hasBone && !pet.adopted && Math.hypot(bone.x - player.x, bone.y - player.y) < 26) {
          pet.hasBone = true;
          say(window.CONTENT.world.pet.foundBone);
        }
        const P = window.CONTENT.world.pet;
        const near = Math.hypot(dog.x - player.x, dog.y - player.y) < 45;
        if (near && !dog.near && !pet.adopted) {
          if (pet.hasBone) { pet.hasBone = false; pet.adopted = true; say(P.fed); }
          else say(P.hungry);
        }
        dog.near = near;
        // Once adopted, the dog trots along just behind you
        dog.moving = false;
        if (pet.adopted) {
          const tx = player.x - player.face * 24, ty = player.y + 6;
          const ax = tx - dog.x, ay = ty - dog.y, d = Math.hypot(ax, ay);
          if (d > 6) {
            const step = Math.min(d, SPEED * 1.05 * dt);
            dog.x += (ax / d) * step; dog.y += (ay / d) * step;
            dog.moving = true;
            if (Math.abs(ax) > 1) dog.face = Math.sign(ax);
          }
        }
      }
      let target = null;
      const held = new Set();  // directions held down on the keyboard or the buttons
      let inside = null;       // the house you're standing at
      let openStop = null;
      let breathTimer = null;
      let scale = 1, dpr = 1, viewW = 0, viewH = 0;
      const cam = { x: 0, y: 0 };

      function resize() {
        dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth, h = canvas.clientHeight;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        scale = Math.min(1.15, w / 400);
        viewW = w / scale;
        viewH = h / scale;
      }

      function stopBreathing() {
        clearInterval(breathTimer);
        clearTimeout(breathTimer);
        breathTimer = null;
      }

      function startBreathing() {
        const circle = panel.querySelector(".breathe-circle");
        const word = panel.querySelector(".breathe-word");
        let breatheIn = true;
        const step = () => {
          circle.classList.toggle("is-in", breatheIn);
          word.textContent = breatheIn ? W.pond.in : W.pond.out;
          breatheIn = !breatheIn;
        };
        breathTimer = setTimeout(() => { step(); breathTimer = setInterval(step, 4000); }, 60);
      }

      function open(s, moveFocus) {
        stopBreathing();
        openStop = s;
        panel.style.setProperty("--c", COLOURS[s.kind]);
        panel.innerHTML = panelHTML(s);
        panel.hidden = false;
        if (s.kind === "treasure") {
          found.add(s.id);
          panel.innerHTML = panelHTML(s); // again, so the count includes this chest
          counterEl.textContent = treasureCounter();
          live.textContent = `${s.title} ${s.text} ${treasureCounter()}`;
        } else {
          live.textContent = `${W.found} ${s.title}`;
        }
        if (s.kind === "pond") startBreathing();
        if (s.kind === "stars") mountStars(panel);
        if (s.kind === "garden") mountGarden(panel);
        if (moveFocus) panel.querySelector("h2").focus();
      }

      function close() {
        const hadFocus = panel.contains(document.activeElement);
        stopBreathing();
        panel.hidden = true;
        openStop = null;
        if (hadFocus) canvas.focus({ preventScroll: true });
      }

      panel.addEventListener("click", (e) => {
        if (e.target.closest("[data-close]")) close();
        const more = e.target.closest("[data-more]");
        if (more) {
          const box = panel.querySelector(".world-more");
          const opening = box.hidden;
          box.hidden = !opening;
          more.setAttribute("aria-expanded", String(opening));
          more.textContent = opening ? W.guideLess : W.guideLink;
          if (opening) panel.scrollTop = box.offsetTop - 8;
        }
      });

      // The plain list: jump straight to a house
      main.querySelector(".world-list").addEventListener("click", (e) => {
        const button = e.target.closest("[data-stop]");
        if (!button) return;
        const s = stops.find((x) => x.id === button.dataset.stop);
        player.x = s.x;
        player.y = s.y + (s.kind === "pond" ? 80 : 50);
        target = null;
        inside = s;
        open(s, true);
      });

      // Keyboard
      const KEYS = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right", W: "up", S: "down", A: "left", D: "right"
      };
      const typing = () => {
        const el = document.activeElement;
        return el && el !== canvas && el.matches("a, button, input, textarea, select");
      };
      function onKeyDown(e) {
        if (e.key === "Escape" && openStop) { close(); return; }
        const dir = KEYS[e.key];
        if (!dir || typing()) return;
        e.preventDefault();
        held.add(dir);
      }
      function onKeyUp(e) { const dir = KEYS[e.key]; if (dir) held.delete(dir); }
      function onBlur() { held.clear(); }
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      window.addEventListener("blur", onBlur);

      // On-screen buttons: hold to walk. With a keyboard, each press takes a step.
      const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
      main.querySelectorAll(".world-pad button").forEach((b) => {
        const dir = b.dataset.dir;
        b.addEventListener("pointerdown", (e) => { b.setPointerCapture(e.pointerId); held.add(dir); });
        ["pointerup", "pointercancel", "lostpointercapture"].forEach((t) =>
          b.addEventListener(t, () => held.delete(dir)));
        b.addEventListener("click", (e) => {
          if (e.detail !== 0) return; // a mouse or finger already walked while held
          target = { x: player.x + STEP[dir][0] * 50, y: player.y + STEP[dir][1] * 50 };
        });
      });

      // Tap or click the world to walk there
      canvas.addEventListener("pointerdown", (e) => {
        const r = canvas.getBoundingClientRect();
        target = { x: cam.x + (e.clientX - r.left) / scale, y: cam.y + (e.clientY - r.top) / scale };
        canvas.focus({ preventScroll: true });
      });

      function update(dt) {
        let dx = 0, dy = 0;
        held.forEach((dir) => { dx += STEP[dir][0]; dy += STEP[dir][1]; });
        if (dx || dy) {
          target = null;
        } else if (target) {
          const ax = target.x - player.x, ay = target.y - player.y, d = Math.hypot(ax, ay);
          if (d < 4) target = null; else { dx = ax / d; dy = ay / d; }
        }
        const len = Math.hypot(dx, dy);
        player.moving = len > 0;
        if (len) {
          player.x = Math.min(WORLD_W - 16, Math.max(16, player.x + (dx / len) * SPEED * dt));
          player.y = Math.min(worldH - 16, Math.max(16, player.y + (dy / len) * SPEED * dt));
          if (dx) player.face = Math.sign(dx);
        }

        updatePet(dt);

        // Walking up to a chest or a house opens it; walking away closes it
        const near = chests.find((c) => Math.hypot(c.x - player.x, c.y - player.y) < CHEST_NEAR) ||
          stops.find((s) =>
            Math.hypot(s.x - player.x, s.y + (s.kind === "pond" ? 0 : 30) - player.y) < (s.kind === "pond" ? 110 : NEAR));
        if (near !== inside) {
          inside = near || null;
          if (inside) open(inside, false);
          else if (openStop) close();
        }
      }

      // Follow the player, staying inside the world. When a house is open, keep
      // the player near the top so the panel doesn't cover them.
      function moveCamera(dt) {
        const want = {
          x: viewW >= WORLD_W ? (WORLD_W - viewW) / 2 : Math.min(WORLD_W - viewW, Math.max(0, player.x - viewW / 2)),
          y: Math.min(worldH - viewH * (openStop ? 0.45 : 1), Math.max(0, player.y - viewH * (openStop ? 0.25 : 0.6)))
        };
        const ease = dt === null ? 1 : Math.min(1, dt * 6);
        cam.x += (want.x - cam.x) * ease;
        cam.y += (want.y - cam.y) * ease;
      }

      // Drawing: everything is square blocks, like the hub
      const FONT = '900 14px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif';
      function block(x, y, w, h, colour) {
        // A block with a lighter top edge and a darker right side, for a 3D feel
        ctx.fillStyle = colour; ctx.fillRect(x, y, w, h);
        ctx.fillStyle = mix(colour, "#ffffff", 0.25); ctx.fillRect(x, y, w, 4);
        ctx.fillStyle = mix(colour, G.bg, 0.35); ctx.fillRect(x + w - 5, y + 4, 5, h - 4);
      }
      function shadow(x, y, w) {
        ctx.fillStyle = "rgba(0, 0, 0, .35)";
        ctx.fillRect(x - w / 2, y, w, 6);
      }
      function label(text, x, y, colour) {
        ctx.font = FONT;
        const w = Math.ceil(ctx.measureText(text).width) + 16;
        ctx.fillStyle = mix(colour, G.bg, 0.55);
        ctx.fillRect(x - w / 2, y - 9, w, 24);
        ctx.fillStyle = G.panel;
        ctx.fillRect(x - w / 2, y - 12, w, 24);
        ctx.lineWidth = 2; ctx.strokeStyle = colour;
        ctx.strokeRect(x - w / 2 + 1, y - 11, w - 2, 22);
        ctx.fillStyle = colour; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(text, x, y + 1);
      }

      function drawTree(t) {
        const greens = ["#1f6f5c", "#23806a", "#1a5e50"];
        shadow(t.x, t.y, t.size);
        ctx.fillStyle = "#5a3d2b";
        ctx.fillRect(t.x - 4, t.y - 12, 8, 12);
        block(t.x - t.size / 2, t.y - 12 - t.size, t.size, t.size, greens[t.shade]);
        block(t.x - t.size / 4, t.y - 12 - t.size * 1.4, t.size / 2, t.size * 0.45, greens[(t.shade + 1) % 3]);
      }

      function drawHouse(s, now) {
        const c = COLOURS[s.kind];
        if (s === inside) {
          const grow = 3 + 3 * Math.sin(now / 250);
          ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.globalAlpha = 0.6;
          ctx.strokeRect(s.x - 42 - grow, s.y - 50 - grow, 84 + grow * 2, 90 + grow * 2);
          ctx.globalAlpha = 1;
        }
        // Base and body, with the same chunky drop shadow as the hub tiles
        ctx.fillStyle = mix(c, G.bg, 0.55);
        ctx.fillRect(s.x - 30, s.y - 12, 60, 46);
        ctx.fillStyle = G.panel;
        ctx.fillRect(s.x - 30, s.y - 18, 60, 46);
        ctx.lineWidth = 3; ctx.strokeStyle = c;
        ctx.strokeRect(s.x - 28.5, s.y - 16.5, 57, 43);
        // Stepped roof
        ctx.fillStyle = c;
        ctx.fillRect(s.x - 36, s.y - 26, 72, 8);
        ctx.fillRect(s.x - 26, s.y - 34, 52, 8);
        ctx.fillRect(s.x - 16, s.y - 42, 32, 8);
        // Door and glowing windows
        ctx.fillRect(s.x - 8, s.y + 6, 16, 22);
        ctx.fillStyle = G.adult;
        ctx.fillRect(s.x - 22, s.y - 8, 10, 10);
        ctx.fillRect(s.x + 12, s.y - 8, 10, 10);
        if (s.kind === "urgent") {
          ctx.fillStyle = G.bg; ctx.font = FONT; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText("!", s.x, s.y - 29);
        }
      }

      function drawPond(now) {
        // A slow ripple: a square ring that grows and fades
        const ripple = (now / 2500) % 1;
        ctx.strokeStyle = `rgba(127, 180, 255, ${0.8 * (1 - ripple)})`;
        ctx.lineWidth = 2;
        const rw = 12 + ripple * 100, rh = 8 + ripple * 64;
        ctx.strokeRect(pond.x - rw / 2, pond.y - rh / 2, rw, rh);
        [[-50, -18], [42, 14], [-20, 30]].forEach(([dx, dy]) => block(pond.x + dx - 7, pond.y + dy - 7, 14, 14, "#2a8c74"));
      }

      function drawChest(c, now) {
        // A small wooden chest. Closed ones twinkle; found ones are open and glowing.
        const open = found.has(c.id);
        const x = c.x - 14, y = c.y - 20;
        shadow(c.x, c.y, 30);
        if (open) {
          ctx.fillStyle = `rgba(255, 196, 92, ${0.25 + 0.15 * Math.sin(now / 300)})`;
          ctx.fillRect(x - 4, y - 14, 36, 16);
          block(x, y - 12, 28, 6, "#6b4226");          // lid, tipped back
          ctx.fillStyle = G.adult; ctx.fillRect(x + 4, y - 2, 20, 4); // gold inside
        } else {
          block(x, y - 6, 28, 8, "#7a4a2a");           // lid
          if (Math.sin(now / 400 + c.x) > 0.6) {       // twinkle
            ctx.fillStyle = G.adult;
            ctx.fillRect(x + 24, y - 14, 4, 4);
            ctx.fillRect(x + 22, y - 12, 8, 1);
          }
        }
        block(x, y + 2, 28, 18, "#8b5a34");            // body
        ctx.fillStyle = G.adult;
        ctx.fillRect(x, y + 6, 28, 3);                 // gold band
        ctx.fillRect(x + 11, y + 4, 6, 7);             // lock
      }

      function drawBone(x, y) {
        ctx.fillStyle = "#f4ecd8";
        ctx.fillRect(x - 8, y - 2, 16, 4);
        ctx.fillRect(x - 11, y - 5, 5, 4); ctx.fillRect(x - 11, y + 1, 5, 4);
        ctx.fillRect(x + 6, y - 5, 5, 4); ctx.fillRect(x + 6, y + 1, 5, 4);
      }

      function drawDog(now) {
        // A little block dog. Its tail wags when it's your pet.
        const hop = dog.moving ? Math.abs(Math.sin(now / 80)) * 3 : 0;
        const f = dog.face;
        const x = dog.x, y = dog.y - hop;
        const fur = "#c8874a", dark = "#7a4a2a";
        shadow(dog.x, dog.y, 26);
        block(x - 12, y - 16, 24, 12, fur);                       // body
        ctx.fillStyle = dark;
        ctx.fillRect(x - 10, y - 4, 4, 4); ctx.fillRect(x + 6, y - 4, 4, 4); // legs
        block(x + f * 10 - 7, y - 26, 14, 12, fur);               // head
        ctx.fillStyle = dark;
        ctx.fillRect(x + f * 10 - (f > 0 ? 7 : -3), y - 28, 4, 8); // ear
        ctx.fillStyle = G.bg;
        ctx.fillRect(x + f * 13 - 1, y - 22, 3, 3);              // eye
        ctx.fillRect(x + f * 17 - 1, y - 19, 3, 3);              // nose
        const wag = pet.adopted ? Math.sin(now / 90) * 4 : 0;
        ctx.fillStyle = fur;
        ctx.fillRect(x - f * 14 - 2, y - 22 + wag, 4, 8);          // tail
        if (pet.adopted) {                                        // a little heart
          ctx.fillStyle = G.danger;
          const hx = x - 3, hy = y - 40 - Math.abs(Math.sin(now / 500)) * 3;
          ctx.fillRect(hx, hy, 3, 3); ctx.fillRect(hx + 4, hy, 3, 3); ctx.fillRect(hx, hy + 2, 7, 3); ctx.fillRect(hx + 2, hy + 5, 3, 2);
        }
      }

      function drawHill(s, now) {
        // A grassy mound under a patch of twinkling stars
        const c = COLOURS.stars;
        ctx.fillStyle = "#1f6f5c";
        ctx.fillRect(s.x - 40, s.y + 4, 80, 26);
        ctx.fillRect(s.x - 28, s.y - 6, 56, 10);
        ctx.fillRect(s.x - 14, s.y - 14, 28, 8);
        ctx.fillStyle = "#23806a"; ctx.fillRect(s.x - 40, s.y + 4, 80, 4);
        [[-30, -40], [-6, -52], [18, -44], [34, -30], [-40, -22]].forEach(([dx, dy], i) => {
          const on = Math.sin(now / 350 + i * 1.7) > -0.3;
          ctx.fillStyle = on ? c : mix(c, G.bg, 0.6);
          ctx.fillRect(s.x + dx, s.y + dy, 4, 4);
          if (on) { ctx.fillRect(s.x + dx - 3, s.y + dy + 1, 10, 2); ctx.fillRect(s.x + dx + 1, s.y + dy - 3, 2, 10); }
        });
        if (s === inside) { ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.strokeRect(s.x - 46, s.y - 58, 92, 92); }
      }

      function drawGardenBed(s) {
        // A raised flower bed with five rows of flowers, from 5 down to 1
        const c = COLOURS.garden;
        block(s.x - 40, s.y - 14, 80, 40, "#5a3d2b");
        ctx.fillStyle = "#3b2a1e"; ctx.fillRect(s.x - 34, s.y - 8, 68, 30);
        const flowers = [G.guide, G.adult, G.chat, G.outside, G.danger];
        [5, 4, 3, 2, 1].forEach((n, row) => {
          for (let k = 0; k < n; k++) {
            ctx.fillStyle = flowers[(row + k) % 5];
            ctx.fillRect(s.x - 30 + row * 6 + k * 12, s.y - 6 + row * 6, 5, 5);
          }
        });
        if (s === inside) { ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.strokeRect(s.x - 46, s.y - 20, 92, 52); }
      }

      function drawPlayer(now) {
        // The blue block buddy from the hub's picture
        const hop = player.moving ? Math.abs(Math.sin(now / 90)) * 4 : 0;
        const x = player.x - 13, y = player.y - 30 - hop;
        shadow(player.x, player.y + 2, 26);
        block(x, y, 26, 30, G.chat);
        ctx.fillStyle = G.bg;
        const look = player.face > 0 ? 2 : -2;
        ctx.fillRect(x + 7 + look, y + 9, 4, 5);
        ctx.fillRect(x + 15 + look, y + 9, 4, 5);
        ctx.fillRect(x + 7 + look, y + 19, 12, 3);
        ctx.fillRect(x + 6 + look, y + 17, 3, 3);
        ctx.fillRect(x + 17 + look, y + 17, 3, 3);
        if (pet.hasBone) drawBone(player.x, y - 10); // carrying the bone
      }

      function draw(now) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = G.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.setTransform(dpr * scale, 0, 0, dpr * scale, -cam.x * dpr * scale, -cam.y * dpr * scale);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(ground, 0, 0, WORLD_W, worldH);
        drawPond(now);

        if (target) {
          ctx.strokeStyle = G.adult; ctx.lineWidth = 2;
          ctx.strokeRect(target.x - 7, target.y - 7, 14, 14);
        }

        // Draw things further down the screen on top, so the player can walk behind trees
        const things = trees.map((t) => ({ y: t.y, draw: () => drawTree(t) }))
          .concat(stops.filter((s) => s.kind !== "pond").map((s) => ({ y: s.y + 30, draw: () =>
            s.kind === "stars" ? drawHill(s, now) : s.kind === "garden" ? drawGardenBed(s) : drawHouse(s, now) })))
          .concat(chests.map((c) => ({ y: c.y, draw: () => drawChest(c, now) })))
          .concat(pet.hasBone || pet.adopted ? [] : [{ y: bone.y, draw: () => drawBone(bone.x, bone.y) }])
          .concat([{ y: dog.y, draw: () => drawDog(now) }])
          .concat([{ y: player.y + 2, draw: () => drawPlayer(now) }]);
        things.sort((a, b) => a.y - b.y).forEach((t) => t.draw());

        // Names on top of everything, so trees never hide them
        stops.forEach((s) => {
          if (s.kind === "pond") label(s.label, s.x, s.y - 86, COLOURS.pond);
          else label(s.label, s.x, s.y + 48, COLOURS[s.kind]);
        });
      }

      // The game loop stops by itself when you leave this screen
      let last = performance.now();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
      resize();
      moveCamera(null);
      function frame(now) {
        if (!document.body.contains(canvas)) {
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("keyup", onKeyUp);
          window.removeEventListener("blur", onBlur);
          resizeObserver.disconnect();
          stopBreathing();
          return;
        }
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        update(dt);
        moveCamera(dt);
        draw(now);
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
  };
})();
