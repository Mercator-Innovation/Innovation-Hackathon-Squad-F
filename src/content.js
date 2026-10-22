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
    appTagline: "Gem Hop: collect the gems, dodge the rocks",
    howTo: "Use the arrow keys or the buttons to hop. Grab gems for points. Rocks block your way.",
    boardLabel: "Gem Hop game board",
    score: "Gems",
    best: "Best",
    restart: "New game",
    stuck: "You're boxed in! Start a new game.",
    pad: { up: "Hop up", down: "Hop down", left: "Hop left", right: "Hop right" },

    // The Turtle Toast plug-in that sits on top of the game
    plugin: {
      open: "Open Turtle Toast",
      name: "Turtle Toast",
      title: "Need to talk?",
      text: "If things at home feel hard, you can get help here. You don't have to give your name.",
      private: "Private. Nobody in the game can see this.",
      go: "Open Turtle Toast",
      later: "Not now",
      close: "Close"
    }
  },

  // Hub home
  home: {
    title: "Hi. You're not on your own",
    intro: "Things at home can feel hard when someone you love drinks too much or takes drugs. Lots of young people feel like this too.",
    privateNote: "This is private. You don't have to give your name.",
    pickHeading: "What would help right now?",
    options: {
      guide: { title: "What do I do?", text: "Help for things that might be happening." },
      safeAdult: { title: "Text a safe adult", text: "Turn tonight's worry into one next step, booked for the morning." },
      helpNow: { title: "Who's open now?", text: "See who you can call or text right now." },
      ifITell: { title: "What happens if I tell?", text: "Honest answers if you're scared about telling someone." }
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
    safeAdultLink: "Text a safe adult"
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


  // How did it go? (screens/check-in.js): follows up a next step from Text a safe adult
  checkIn: {
    bannerTitle: "How did it go?",
    bannerText: "You planned to:",
    title: "How did it go?",
    youPlanned: "Your step was:",
    agreedWith: "You agreed it with",
    didYou: "Did you do it?",
    answers: [
      { id: "yes", label: "Yes, I did it" },
      { id: "tried", label: "I tried, but it didn't go well" },
      { id: "notyet", label: "Not yet" },
      { id: "changed", label: "I changed my mind" }
    ],
    notSafe: "Not safe right now?",
    call999: "Call 999",
    none: "You don't have a next step to check on yet. You can plan one with a volunteer.",
    planOne: "Plan a next step",
    demoNote: "Prototype: try this with a made-up step.",
    demoButton: "Try it with an example step",
    demoStep: { title: "Talk to a teacher I trust", when: "In the morning", volunteer: "Sam", tip: "You could say: \"Things at home are hard. Can I talk to you?\"" },
    responses: {
      yes: {
        title: "You did it. That was brave.",
        text: "Taking a step like that is hard. Be proud of yourself. How you feel now is OK, whatever it is.",
        nextHeading: "What next?",
        next: [
          { title: "Plan another small step", text: "Talk to a volunteer about what could help next.", href: "#/safe-adult" },
          { title: "Tell a volunteer how it went", text: "They'd love to hear how you got on.", href: "#/safe-adult" },
          { title: "Back to the start", text: "", href: "#/hub" }
        ]
      },
      tried: {
        title: "Trying is the hardest part",
        text: "It didn't go how you hoped, and that's not your fault. Lots of people need a few tries. You were brave to try.",
        nextHeading: "What would help now?",
        next: [
          { title: "Try a different step", text: "A volunteer can help you think of another way.", href: "#/safe-adult" },
          { title: "Talk to someone now", text: "See who's open right now.", href: "#/help-now" },
          { title: "Take a calm moment", text: "Visit the calm pond in the safe space.", href: "#/world" }
        ]
      },
      notyet: {
        title: "That's OK. There's no rush.",
        text: "Big steps can take time. You can still do it when you feel ready.",
        nextHeading: "What would you like to do?",
        next: [
          { title: "Keep it for tomorrow", text: "We'll ask you again later.", href: "#/hub", keep: true },
          { title: "Pick an easier step", text: "A volunteer can help you find a smaller one.", href: "#/safe-adult" },
          { title: "Say what's getting in the way", text: "Talk it through with a volunteer.", href: "#/safe-adult" }
        ]
      },
      changed: {
        title: "That's OK. You're in charge.",
        text: "You don't have to do anything you're not ready for. Help is still here whenever you want it.",
        nextHeading: "Other things that might help",
        next: [
          { title: "Talk to someone now", text: "See who's open right now.", href: "#/help-now" },
          { title: "What do I do?", text: "Help for things that might be happening.", href: "#/world" },
          { title: "Back to the start", text: "", href: "#/hub" }
        ]
      }
    }
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
    safeAdult: {
      label: "Safe adult",
      title: "The safe adult house",
      text: "Text a checked volunteer who's there to listen, not judge. Together you'll plan one small step for tomorrow.",
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
    },
    stars: {
      label: "Star hill",
      title: "Star-gazing hill",
      text: "Lie back and look up. Tap the stars to join them up and make your own shape. There's no right answer.",
      skyLabel: "Night sky. Tap stars to join them with a line.",
      star: "Star {n}",
      made: "You joined {n} stars.",
      clear: "Start again"
    },
    garden: {
      label: "5 4 3 2 1",
      title: "The 5 4 3 2 1 garden",
      text: "This helps when your mind is racing. Look around you, wherever you are right now. Type each thing you notice to fill a block.",
      steps: [
        { count: 5, ask: "Find 5 things you can see.", label: "Something I can see", hint: "like a lamp, or my shoes", summary: "You saw" },
        { count: 4, ask: "Find 4 things you can hear.", label: "Something I can hear", hint: "like a car, or the fridge", summary: "You heard" },
        { count: 3, ask: "Find 3 things you can touch.", label: "Something I can touch", hint: "like my jumper, or a pillow", summary: "You touched" },
        { count: 2, ask: "Find 2 things you can smell.", label: "Something I can smell", hint: "like soap, or toast", summary: "You smelled" },
        { count: 1, ask: "Find 1 thing you can taste.", label: "Something I can taste", hint: "like toothpaste, or water", summary: "You tasted" }
      ],
      add: "Add",
      empty: "Type something first.",
      privateNote: "What you type stays on this screen. It isn't saved or sent.",
      progress: "{done} of {count}",
      finished: "Well done. You slowed your mind down. You can do this any time, anywhere.",
      again: "Do it again"
    },
    pet: {
      foundBone: "You picked up a bone! Is anyone hungry?",
      hungry: "This dog looks hungry. Maybe it would like a bone?",
      fed: "The dog loves the bone! It's your pet now, and it will follow you.",
      happy: "Your dog is happy to see you."
    },
    // Hidden treasure chests. Each one holds a kind message.
    treasure: {
      hint: "Treasure chests are hidden around the edges. Can you find them all?",
      counter: "Treasure found: {found} of {total}",
      title: "You found treasure!",
      allFound: "You found every chest. You're amazing.",
      affirmations: [
        "You are brave for being here.",
        "Your feelings matter.",
        "It's not your fault.",
        "You deserve to feel safe.",
        "You are not alone. Lots of people care about you."
      ]
    }
  }
};
