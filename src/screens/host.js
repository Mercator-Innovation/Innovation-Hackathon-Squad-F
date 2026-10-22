// The made-up game app the hub plugs into. Not a real product.
// "Gem Hop": hop round a little board, collect gems, avoid rocks.
// The Turtle Toast plug-in floats on top as a small pop-up, like a chat widget.
window.SCREENS = window.SCREENS || {};
window.SCREENS.host = {
  render() {
    const H = window.CONTENT.host;
    const P = H.plugin;
    const lock = `<svg viewBox="0 0 8 8" width="14" height="14" shape-rendering="crispEdges" aria-hidden="true" fill="currentColor"><path d="M2 0h4v1H2zM1 1h1v2H1zM6 1h1v2H6zM0 3h8v5H0z"/></svg>`;
    return `
      <section class="host">
        <h1 class="host-title">${esc(H.appName)}</h1>
        <p class="host-tagline">${esc(H.appTagline)}</p>

        <div class="gh-scores" aria-live="polite">
          <span>${esc(H.score)}: <strong id="gh-score">0</strong></span>
          <span>${esc(H.best)}: <strong id="gh-best">0</strong></span>
        </div>
        <div class="gh-board" id="gh-board" role="grid" tabindex="0" aria-label="${esc(H.boardLabel)}"></div>
        <p class="gh-msg" id="gh-msg" role="status"></p>
        <div class="gh-pad">
          <button type="button" data-move="up" aria-label="${esc(H.pad.up)}">▲</button>
          <button type="button" data-move="left" aria-label="${esc(H.pad.left)}">◀</button>
          <button type="button" data-move="down" aria-label="${esc(H.pad.down)}">▼</button>
          <button type="button" data-move="right" aria-label="${esc(H.pad.right)}">▶</button>
        </div>
        <p class="gh-how">${esc(H.howTo)}</p>
        <button type="button" class="host-play" id="gh-restart">${esc(H.restart)}</button>
      </section>

      <button type="button" class="tt-launcher" id="tt-launcher" aria-expanded="false" aria-controls="tt-pop">
        <img src="images/turtle-toast-game-a-pixel.svg" alt="">
        <span class="tt-launcher-text">${esc(P.open)}</span>
      </button>

      <div class="tt-pop" id="tt-pop" role="dialog" aria-labelledby="tt-pop-title" hidden>
        <div class="tt-pop-head">
          <span class="tt-pop-brand"><img src="images/turtle-toast-game-a-pixel.svg" alt="">${esc(P.name)}</span>
          <button type="button" class="tt-close" id="tt-close" aria-label="${esc(P.close)}">✕</button>
        </div>
        <h2 id="tt-pop-title" tabindex="-1">${esc(P.title)}</h2>
        <p>${esc(P.text)}</p>
        <p class="tt-private">${lock} ${esc(P.private)}</p>
        <a class="tt-go" href="#/hub">${esc(P.go)}</a>
        <button type="button" class="tt-later" id="tt-later">${esc(P.later)}</button>
      </div>`;
  },

  mount(root) {
    const H = window.CONTENT.host;
    const SIZE = 7;
    const board = root.querySelector("#gh-board");
    const scoreEl = root.querySelector("#gh-score");
    const bestEl = root.querySelector("#gh-best");
    const msg = root.querySelector("#gh-msg");
    let best = 0;
    try { best = Number(localStorage.getItem("gemhop-best")) || 0; } catch (e) {}
    let me, gem, rocks, score;

    const key = (p) => p.x + "," + p.y;
    const free = () => {
      const taken = new Set([key(me), ...rocks.map(key), gem ? key(gem) : ""]);
      const spots = [];
      for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) if (!taken.has(x + "," + y)) spots.push({ x, y });
      return spots[Math.floor(Math.random() * spots.length)];
    };

    function newGame() {
      me = { x: 3, y: 3 }; rocks = []; gem = null; score = 0;
      gem = free();
      msg.textContent = "";
      draw();
    }

    function draw() {
      const rockSet = new Set(rocks.map(key));
      let html = "";
      for (let y = 0; y < SIZE; y++) {
        html += `<div class="gh-row" role="row">`;
        for (let x = 0; x < SIZE; x++) {
          const k = x + "," + y;
          let cls = "", label = "Empty";
          if (k === key(me)) { cls = "me"; label = "You"; }
          else if (k === key(gem)) { cls = "gem"; label = "Gem"; }
          else if (rockSet.has(k)) { cls = "rock"; label = "Rock"; }
          html += `<span class="gh-cell ${cls}" role="gridcell" aria-label="${label}"></span>`;
        }
        html += `</div>`;
      }
      board.innerHTML = html;
      scoreEl.textContent = score;
      bestEl.textContent = best;
    }

    function move(dir) {
      const d = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[dir];
      if (!d) return;
      const nx = me.x + d[0], ny = me.y + d[1];
      if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) return;
      if (rocks.some((r) => r.x === nx && r.y === ny)) return;
      me = { x: nx, y: ny };
      if (me.x === gem.x && me.y === gem.y) {
        score++;
        if (score > best) { best = score; try { localStorage.setItem("gemhop-best", String(best)); } catch (e) {} }
        gem = null;
        if (score % 3 === 0) { const r = free(); if (r) rocks.push(r); }
        gem = free();
      }
      draw();
      const open = ["up", "down", "left", "right"].some((k) => {
        const m = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[k];
        const x = me.x + m[0], y = me.y + m[1];
        return x >= 0 && y >= 0 && x < SIZE && y < SIZE && !rocks.some((r) => r.x === x && r.y === y);
      });
      if (!open) msg.textContent = H.stuck;
    }

    board.addEventListener("keydown", (e) => {
      const dir = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" }[e.key];
      if (dir) { e.preventDefault(); move(dir); }
    });
    root.querySelectorAll("[data-move]").forEach((b) => b.addEventListener("click", () => move(b.dataset.move)));
    root.querySelector("#gh-restart").addEventListener("click", () => { newGame(); board.focus(); });
    newGame();

    // The Turtle Toast pop-up
    const launcher = root.querySelector("#tt-launcher");
    const pop = root.querySelector("#tt-pop");
    const setOpen = (open) => {
      pop.hidden = !open;
      launcher.setAttribute("aria-expanded", String(open));
      if (open) root.querySelector("#tt-pop-title").focus();
      else launcher.focus();
    };
    launcher.addEventListener("click", () => setOpen(pop.hidden));
    root.querySelector("#tt-close").addEventListener("click", () => setOpen(false));
    root.querySelector("#tt-later").addEventListener("click", () => setOpen(false));
    pop.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }
};
