// Easter egg on the Blockville game page (styles in easter-egg.css):
// reach a score of 30 in Gem Hop and a crowd of pixel Turtle Toast turtles
// swims across the background, behind the game. They stay until you start a new
// game or leave the page. Decoration only: hidden from screen readers and can't
// be clicked. With reduced motion turned on, the turtles appear but stay still.
(function () {
  const SPRITE = "images/turtle-sprite.svg"; // the same turtle that swims on the hub page
  const TARGET = 30;
  const COUNT = 24;

  const party = document.createElement("div");
  party.className = "tt-party";
  party.setAttribute("aria-hidden", "true");
  party.hidden = true;
  document.body.appendChild(party);

  function start() {
    party.innerHTML = Array.from({ length: COUNT }, (_, i) => {
      const left = i % 2 === 1;                     // half swim each way
      const size = 36 + Math.round(Math.random() * 56);
      const top = Math.round(Math.random() * 92);
      const speed = (9 + Math.random() * 14).toFixed(1);
      const delay = (-Math.random() * 20).toFixed(1); // already mid-swim, so the screen fills at once
      const x = Math.round(Math.random() * 95);        // where it sits if motion is reduced
      return `<span class="tt-party-swim${left ? " is-left" : ""}"
        style="top:${top}%;width:${size}px;--x:${x}vw;animation-duration:${speed}s;animation-delay:${delay}s">
        <img src="${SPRITE}" alt=""></span>`;
    }).join("");
    party.hidden = false;
  }

  function stop() {
    party.hidden = true;
    party.innerHTML = "";
  }

  // Watch the game's score. Reaching 30 starts the party; a new game (score back to 0) ends it.
  function check() {
    const scoreEl = document.getElementById("gh-score");
    if (!scoreEl || document.body.dataset.screen !== "host") { stop(); return; }
    const score = Number(scoreEl.textContent) || 0;
    if (score >= TARGET && party.hidden) start();
    else if (score < TARGET && !party.hidden) stop();
  }

  new MutationObserver(check).observe(document.getElementById("main"),
    { childList: true, subtree: true, characterData: true });
  window.addEventListener("hashchange", check);
})();
