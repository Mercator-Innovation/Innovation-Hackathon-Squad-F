// Visual wows on the hub home (styles in wow.css):
//  - little pixel Turtle Toast turtles swim slowly across the background
//  - tap the big logo and a burst of baby turtles pops out
// All decoration: hidden from screen readers, can't be clicked, and switched off
// for anyone whose device asks for reduced motion.
(function () {
  const SPRITE = "images/turtle-sprite.svg";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Three swimmers at different heights, sizes and speeds. One swims the other way.
  const swimmers = document.createElement("div");
  swimmers.className = "tt-swimmers";
  swimmers.setAttribute("aria-hidden", "true");
  swimmers.innerHTML = [1, 2, 3].map((n) =>
    `<span class="tt-swim tt-swim-${n}"><img src="${SPRITE}" alt=""></span>`).join("");
  document.body.appendChild(swimmers);

  function update() {
    swimmers.hidden = document.body.dataset.screen !== "hub" || reduce.matches;
  }
  window.addEventListener("hashchange", update);
  reduce.addEventListener("change", update);
  update();

  // Baby turtle burst from the logo
  document.addEventListener("click", (e) => {
    const logo = e.target.closest(".hub-art");
    if (!logo || reduce.matches) return;
    const box = logo.getBoundingClientRect();
    const x = box.left + box.width / 2, y = box.top + box.height / 2;
    for (let i = 0; i < 8; i++) {
      const baby = document.createElement("img");
      baby.src = SPRITE;
      baby.alt = "";
      baby.className = "tt-baby";
      baby.setAttribute("aria-hidden", "true");
      baby.style.left = x + "px";
      baby.style.top = y + "px";
      document.body.appendChild(baby);
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
      const dist = 110 + Math.random() * 70;
      const dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist - 40;
      const flip = dx < 0 ? -1 : 1;
      baby.animate([
        { transform: `translate(-50%, -50%) scale(.3) scaleX(${flip})`, opacity: 0 },
        { transform: `translate(calc(-50% + ${dx * .6}px), calc(-50% + ${dy * .6}px)) scale(1) scaleX(${flip})`, opacity: 1, offset: .4 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy - 60}px)) scale(.8) scaleX(${flip}) rotate(${flip * 15}deg)`, opacity: 0 }
      ], { duration: 1400 + Math.random() * 400, easing: "cubic-bezier(.2,.8,.3,1)" }).onfinish = () => baby.remove();
    }
  });
})();
