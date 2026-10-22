// Synthetic guide scenarios for the prototype. Made up, not clinical advice.
// A real service would need specialist and safeguarding sign-off.
window.DATA = window.DATA || {};
window.DATA.scenarios = [
  {
    id: "wont-wake",
    title: "They won't wake up properly",
    emergency: true,
    steps: [
      "Try to wake them by saying their name loudly.",
      "If they don't wake up, or their breathing is strange, call 999 now.",
      "Stay on the phone. The person on the phone will tell you what to do.",
      "If there's another grown-up in the house, wake them too."
    ],
    say: ["\"I can't wake my mum up and I'm scared.\"", "\"My address is ...\""]
  },
  {
    id: "not-home",
    title: "They haven't come home",
    emergency: false,
    steps: [
      "Lock the door and stay inside.",
      "If you look after a brother or sister, keep them with you.",
      "Text a safe adult and tell them you're on your own.",
      "If you feel scared or unsafe, call 999."
    ],
    say: ["\"Mum's not home yet and I don't know where she is.\""]
  },
  {
    id: "shouting",
    title: "There's shouting and I feel scared",
    emergency: false,
    steps: [
      "Go somewhere in the house where you feel safer, like your room.",
      "Put on headphones or hug something soft if it helps.",
      "If anyone is getting hurt, call 999.",
      "Tomorrow, think about telling a teacher or another adult you trust."
    ],
    say: ["\"Things got loud at home last night and it scared me.\""]
  },
  {
    id: "secret",
    title: "I've been asked to keep a secret",
    emergency: false,
    steps: [
      "Some secrets are too big for you to carry on your own.",
      "Telling a safe adult is not getting anyone in trouble. It's getting help.",
      "You can start by chatting to someone here, without giving your name."
    ],
    say: ["\"I've been keeping something to myself and it's getting too much.\""]
  },
  {
    id: "someone-else",
    title: "I'm worried about my brother, sister or friend",
    emergency: false,
    steps: [
      "If they might be in danger right now, call 999. That's always OK, even if you promised not to tell.",
      "Tell them you care. You don't have to say it perfectly.",
      "You can't make someone stop drinking or taking drugs. It's not your job to fix it.",
      "Keeping a promise matters, but not if someone could get hurt. Telling a grown-up you trust isn't breaking their trust. It's looking after them.",
      "Look after yourself too. Talk to a safe adult about how you feel."
    ],
    say: ["\"I'm not angry. I'm worried about you.\"", "\"I can't keep this to myself. Can we tell someone together?\""]
  },
  {
    id: "worried",
    title: "I just feel worried all the time",
    emergency: false,
    steps: [
      "It's OK to feel worried, angry or sad. Lots of young people feel like this.",
      "Try breathing in for 4, holding for 4, and out for 4.",
      "Chat to someone here, or text a safe adult."
    ],
    say: ["\"I keep worrying about my dad and I don't know what to do.\""]
  }
];
