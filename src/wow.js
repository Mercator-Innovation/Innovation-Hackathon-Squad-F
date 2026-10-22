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

  // Tap a swimming turtle: it spins, and says something kind with a few pixel hearts.
  // The turtles swim behind the page, so we check where the tap landed. Anything a child
  // can use for help (tiles, links, buttons, form fields) always wins over a turtle.
  const KIND = [
    "It's not your fault",
    "You're brave",
    "You matter",
    "You're not on your own",
    "Be kind to yourself",
    "Well done for being here"
  ];
  let kindIndex = 0;

  function cheer(swim) {
    const img = swim.querySelector("img");
    img.classList.remove("tt-happy");
    void img.offsetWidth; // restart the spin if tapped again
    img.classList.add("tt-happy");
    img.addEventListener("animationend", () => img.classList.remove("tt-happy"), { once: true }); // back to paddling

    const box = swim.getBoundingClientRect();
    const bubble = document.createElement("div");
    bubble.className = "tt-bubble";
    bubble.setAttribute("aria-hidden", "true");
    bubble.textContent = KIND[kindIndex++ % KIND.length];
    // Keep the bubble on screen, even when the turtle is near an edge
    const x = Math.min(Math.max(box.left + box.width / 2, 90), window.innerWidth - 90);
    bubble.style.left = x + "px";
    bubble.style.top = Math.max(box.top - 12, 60) + "px";
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2600);

    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("span");
      heart.className = "tt-heart";
      heart.setAttribute("aria-hidden", "true");
      heart.style.left = box.left + box.width / 2 + "px";
      heart.style.top = box.top + box.height / 2 + "px";
      document.body.appendChild(heart);
      const dx = (Math.random() - 0.5) * 120, dy = -60 - Math.random() * 80;
      heart.animate([
        { transform: "translate(-50%, -50%) scale(.4)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1)`, opacity: 0 }
      ], { duration: 1100 + Math.random() * 400, easing: "ease-out" }).onfinish = () => heart.remove();
    }
  }

  document.addEventListener("click", (e) => {
    if (swimmers.hidden || reduce.matches) return;
    if (e.target.closest("a, button, input, select, textarea, summary, label, .hub-art")) return;
    const hit = [...swimmers.querySelectorAll(".tt-swim")].find((s) => {
      const r = s.getBoundingClientRect();
      const pad = 12; // a little extra room, so small fingers can catch a moving turtle
      return e.clientX >= r.left - pad && e.clientX <= r.right + pad && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad;
    });
    if (hit) cheer(hit);
  });

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
