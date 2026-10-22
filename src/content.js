// The words people see. Edit freely: no code knowledge needed.
// Keep sentences short, kind and plain (reading age about 9).
// Our users: families and friends of people who are showing signs of harmful
// drug or alcohol use. On screen, for children, we say "someone you love".

window.CONTENT = {
  prototypeBanner: "Prototype only. This is not a real service. In an emergency, call 999.",
  quickExit: "Quick exit",
  emergency: "In danger right now? Call 999",
  back: "Back",

  // The pretend app the hub lives inside
  host: {
    appName: "Blockville",
    appTagline: "Build your world",
    playButton: "Play",
    launcher: "Need to talk?",
    launcherHint: "Private. Nobody in the game can see this."
  },

  // Hub home
  home: {
    title: "Hi. You're not on your own",
    intro: "Things at home can feel hard when someone you love drinks too much or takes drugs. Lots of young people feel like this too.",
    privateNote: "This is private. You don't have to give your name.",
    pickHeading: "What would help right now?",
    options: {
      guide: { title: "What do I do?", text: "Help for things that might be happening." },
      chat: { title: "Chat to someone", text: "Type to a friendly helper. You don't have to give your name." },
      safeAdult: { title: "Text a safe adult", text: "Turn tonight's worry into one next step, booked for the morning." }
    },
    notYourFault: "Whatever is happening, it is not your fault."
  },

  // Guide
  guide: {
    title: "What do I do?",
    intro: "Pick the one that is most like what's happening.",
    stepsHeading: "What you can do",
    sayHeading: "Things you could say",
    alsoHeading: "Want more help?",
    chatLink: "Chat to someone",
    safeAdultLink: "Text a safe adult"
  },

  // Chat
  chat: {
    title: "Chat to someone",
    intro: "You can chat about how you feel. You don't have to say who you are.",
    demoNote: "Prototype: replies are made up, and no one is reading this.",
    label: "Your message",
    placeholder: "Type here",
    send: "Send",
    you: "You",
    helper: "Helper"
  },

  // Text a safe adult
  safeAdult: {
    title: "Text a safe adult",
    intro: "Choose a grown-up you trust. We'll help you write a short message.",
    chooseHeading: "Who would you like to text?",
    messageHeading: "Your message",
    messageLabel: "Message (you can change it)",
    templates: [
      "Hi, it's me. I'm OK but I'd like to talk. Can you call me?",
      "Hi, things at home are hard tonight. Can you help?",
      "Please can you come round? I don't feel safe."
    ],
    templatesHeading: "Pick a message to start with",
    send: "Send message",
    sentTitle: "Message sent (pretend)",
    sentText: "In a real service, your safe adult would get this as a text. Nothing was sent.",
    demoNote: "Prototype: these are made-up people, and nothing is really sent.",
    home: "Back to start"
  },

  // Explore: the walk-around game (screens/world.js)
  world: {
    // The way in, at the bottom of "What do I do?"
    entry: { title: "Explore it as a game", text: "Walk around a little world. Each house has help inside." },
    title: "Explore the safe space",
    intro: "Walk along the path and visit the little houses. Each one has help inside.",
    howTo: "Use the arrow keys, the buttons under the game, or tap where you want to go.",
    mapLabel: "A garden with a winding path and little houses. Walk up to a house to open it. Every house is also in the list under the game.",
    listHeading: "Rather not play? Visit any house from this list",
    found: "You found:",
    close: "Close",
    call999: "Call 999",
    guideLink: "Read what to do",
    pad: { up: "Walk up", down: "Walk down", left: "Walk left", right: "Walk right" },
    // Short names on the guide houses. The rest come from the guide.
    labels: {
      "wont-wake": "Can't wake them",
      "not-home": "Not home",
      shouting: "Shouting",
      secret: "Secrets",
      worried: "Worried"
    },
    welcome: {
      label: "Start here",
      title: "Welcome to the safe space",
      text: "Walk to each little house to find help. Take your time. Whatever is happening, it is not your fault."
    },
    chat: {
      label: "Chat",
      title: "The chat hut",
      text: "Want to talk about how you feel? You can chat to a friendly helper. You don't have to give your name.",
      link: "Chat to someone",
      href: "#/chat"
    },
    safeAdult: {
      label: "Safe adult",
      title: "The safe adult house",
      text: "Is there a grown-up you trust? We can help you send them a quick message.",
      link: "Text a safe adult",
      href: "#/safe-adult"
    },
    childline: {
      label: "Childline",
      title: "Childline",
      text: "Childline is free. You can talk to them about anything. Call 0800 1111, or chat to them online.",
      link: "Go to Childline (opens in a new tab)",
      href: "https://www.childline.org.uk",
      external: true
    },
    pond: {
      label: "Calm pond",
      title: "The calm pond",
      text: "Feeling wobbly? Breathe slowly with the circle. Breathe in as it grows. Breathe out as it gets smaller.",
      in: "Breathe in…",
      out: "Breathe out…"
    }
  }
};
