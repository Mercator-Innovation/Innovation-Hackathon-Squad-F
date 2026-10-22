// Chat: a pretend, scripted helper. Nothing leaves the page.
window.SCREENS = window.SCREENS || {};
window.SCREENS.chat = {
  render() {
    const C = window.CONTENT.chat;
    return `
      <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
      <h1>${esc(C.title)}</h1>
      <p class="lead">${esc(C.intro)}</p>
      <p class="demo-note">${esc(C.demoNote)}</p>
      <ol class="chat-log" id="chat-log" aria-live="polite"></ol>
      <form class="chat-form" id="chat-form">
        <label for="chat-input">${esc(C.label)}</label>
        <div class="chat-row">
          <input id="chat-input" type="text" autocomplete="off" placeholder="${esc(C.placeholder)}">
          <button type="submit" class="button">${esc(C.send)}</button>
        </div>
      </form>`;
  },
  mount(root) {
    const C = window.CONTENT.chat;
    const replies = window.DATA.chatReplies;
    const log = root.querySelector("#chat-log");
    const input = root.querySelector("#chat-input");
    let n = 0;

    const add = (who, text, cls) => {
      const li = document.createElement("li");
      li.className = "msg " + cls;
      li.innerHTML = `<span class="msg-who">${esc(who)}</span> ${esc(text)}`;
      log.appendChild(li);
      li.scrollIntoView({ block: "nearest" });
    };

    add(C.helper, replies[0], "msg-helper");
    n = 1;

    root.querySelector("#chat-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      add(C.you, text, "msg-you");
      input.value = "";
      setTimeout(() => {
        add(C.helper, replies[Math.min(n, replies.length - 1)], "msg-helper");
        n++;
      }, 700);
    });
  }
};
