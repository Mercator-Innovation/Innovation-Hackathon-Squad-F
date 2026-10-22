// Hub home: the landing page a child sees after tapping the plugin.
// Three ways to get help, with simple pictures so it's easy to choose.
window.SCREENS = window.SCREENS || {};
window.SCREENS.hub = {
  render() {
    const H = window.CONTENT.home;

    // Small line pictures for each choice. Decorative only.
    const icons = {
      guide: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>`,
      chat: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/></svg>`,
      adult: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.8-3.3 3-5 5.5-5s4.7 1.7 5.5 5"/><path d="M17 7.5c1.5-1.6 4.2-.4 3.6 1.8-.4 1.4-2.1 2.5-3.6 3.5-1.5-1-3.2-2.1-3.6-3.5-.6-2.2 2.1-3.4 3.6-1.8z"/></svg>`
    };

    const card = (href, cls, icon, o) => `
      <li><a class="card ${cls}" href="${href}">
        <span class="card-icon">${icon}</span>
        <span class="card-body">
          <span class="card-title">${esc(o.title)}</span>
          <span class="card-text">${esc(o.text)}</span>
        </span>
        <span class="card-arrow" aria-hidden="true">›</span>
      </a></li>`;

    return `
      <section class="hello">
        <svg class="hello-art" viewBox="0 0 168 84" aria-hidden="true">
          <rect x="4" y="34" width="46" height="46" rx="12" fill="var(--primary-soft)"/>
          <rect x="61" y="10" width="46" height="70" rx="12" fill="var(--primary)"/>
          <rect x="118" y="26" width="46" height="54" rx="12" fill="var(--adult-soft)"/>
          <circle cx="76" cy="36" r="3.5" fill="var(--primary-text)"/>
          <circle cx="92" cy="36" r="3.5" fill="var(--primary-text)"/>
          <path d="M75 48c5 5 13 5 18 0" fill="none" stroke="var(--primary-text)" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <h1>${esc(H.title)}</h1>
        <p class="lead">${esc(H.intro)}</p>
        <p class="private-note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>
          ${esc(H.privateNote)}
        </p>
      </section>

      <h2 class="pick-heading">${esc(H.pickHeading)}</h2>
      <ul class="cards cards-hub">
        ${card("#/guide", "card-guide", icons.guide, H.options.guide)}
        ${card("#/chat", "card-chat", icons.chat, H.options.chat)}
        ${card("#/safe-adult", "card-adult", icons.adult, H.options.safeAdult)}
      </ul>

      <p class="reassure reassure-big">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>
        ${esc(H.notYourFault)}
      </p>`;
  }
};
