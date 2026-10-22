// What happens if I tell? Honest answers to the fears that stop children telling anyone.
// The biggest is being taken away from home, so we never promise it can't happen:
// a false promise could stop a child who isn't safe from getting help.
//
// Facts checked on 22 October 2026:
//   Childline confidentiality: childline.org.uk/about/confidentiality-promise
//   The Promise (Scotland): children safe and loved at home should stay, with support; children's voices heard.
//     gov.scot/publications/future-foster-care-consultation/pages/3
//   Kinship care (living with family or a family friend) is the largest group of looked-after children
//     in Scotland: gov.scot Children's Social Work Statistics 2021-22
// A real service would need this wording checked by a safeguarding lead and tested with young people.
window.SCREENS = window.SCREENS || {};
(function () {
  const QUESTIONS = [
    {
      q: "Will I be taken away from home?",
      a: [
        "Telling someone is how your family can start to get help.",
        "In Scotland, if you're safe and loved at home, you should stay at home, and your family should get support.",
        "Sometimes home isn't safe for a while. Then you might stay with someone else, often a gran, an aunt or a family friend. If that happens, it's to keep you safe. It's not a punishment."
      ]
    },
    {
      q: "Will my mum or dad get in trouble?",
      a: [
        "Telling isn't about getting anyone in trouble. It's about getting help, for you and for them.",
        "Grown-ups can get help to drink less or stop taking drugs."
      ]
    },
    {
      q: "Am I letting my family down?",
      a: [
        "No. Telling someone because you're worried is brave and caring.",
        "It's not your fault, and it's not your job to fix it on your own."
      ]
    },
    {
      q: "Will anyone listen to what I want?",
      a: [
        "Yes. In Scotland, adults should listen to you and include you when they make decisions about your life.",
        "You can tell them what you're worried about and what you'd like to happen."
      ]
    },
    {
      q: "Who will find out?",
      a: [
        "Childline is private. They only tell someone in a few serious cases, like if someone's life is in danger. If they need to, they'll try to talk to you about it first.",
        "If you tell a teacher, they might need to tell someone whose job is to keep children safe. You can ask them what they'll do before you tell them everything."
      ]
    },
    {
      q: "What if I do need to stay somewhere else?",
      a: [
        "Someone should tell you what's happening and why.",
        "You can say how you feel and ask about seeing your family.",
        "It's still not your fault."
      ]
    },
    {
      q: "Can I ask without giving my name?",
      a: [
        "Yes. You can call Childline on 0800 1111, or chat online, without giving your name.",
        "You can just ask: \"What would happen if I told you…?\""
      ]
    }
  ];

  window.SCREENS["if-i-tell"] = {
    render() {
      return `
        <a class="back" href="#/hub">${esc(window.CONTENT.back)}</a>
        <h1>What happens if I tell?</h1>
        <p class="lead">It's normal to feel scared about telling someone. Here are honest answers to questions lots of young people ask.</p>
        <p class="tell-hint">Tap a question to see the answer.</p>

        <div class="tell-list">
          ${QUESTIONS.map((x) => `
            <details class="tell-item">
              <summary>${esc(x.q)}</summary>
              ${x.a.map((p) => `<p>${esc(p)}</p>`).join("")}
            </details>`).join("")}
        </div>

        <p class="urgent"><a href="tel:999">${esc(window.CONTENT.emergency)}</a></p>

        <h2>Ready to talk?</h2>
        <p class="actions">
          <a class="button" href="#/help-now">See who's open now</a>
          <a class="button button-secondary" href="#/safe-adult">Text a safe adult</a>
        </p>

        <p class="demo-note">Prototype. This wording would need checking by a safeguarding lead and testing with young people before real use.</p>`;
    }
  };
})();
