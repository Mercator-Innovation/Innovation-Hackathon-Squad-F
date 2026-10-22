// Text a safe adult: made-up vetted volunteers, the scripted conversation,
// the next steps a volunteer can agree, and real helpline numbers.
// The volunteers are NOT real people. Their avatars are drawings.
window.DATA = window.DATA || {};

// In a real service each volunteer would be checked (PVG scheme in Scotland)
// and trained. The avatar would be a drawing that looks like them, never a photo.
window.DATA.volunteers = [
  {
    id: "sam",
    name: "Sam",
    replyTime: "Usually replies in a few minutes",
    // Drawn avatar: short curly hair, glasses, warm smile
    avatar: `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="32" fill="#ffd9a8"/>
      <path d="M12 60c3-11 11-16 20-16s17 5 20 16" fill="#2a9d8f"/>
      <rect x="27" y="38" width="10" height="8" rx="3" fill="#a86b45"/>
      <ellipse cx="32" cy="28" rx="14" ry="16" fill="#c68a5e"/>
      <path d="M17 26c-2-12 6-18 15-18s18 6 15 18c-2-5-5-8-9-8-3 3-9 4-15 3-3 1-5 3-6 5z" fill="#2b1d16"/>
      <circle cx="19" cy="20" r="4" fill="#2b1d16"/><circle cx="25" cy="13" r="4" fill="#2b1d16"/>
      <circle cx="33" cy="11" r="4" fill="#2b1d16"/><circle cx="41" cy="13" r="4" fill="#2b1d16"/><circle cx="46" cy="20" r="4" fill="#2b1d16"/>
      <circle cx="26" cy="29" r="5" fill="none" stroke="#2b1d16" stroke-width="2"/>
      <circle cx="38" cy="29" r="5" fill="none" stroke="#2b1d16" stroke-width="2"/>
      <line x1="31" y1="29" x2="33" y2="29" stroke="#2b1d16" stroke-width="2"/>
      <circle cx="26" cy="29" r="1.6" fill="#2b1d16"/><circle cx="38" cy="29" r="1.6" fill="#2b1d16"/>
      <path d="M26 37c3 3 9 3 12 0" fill="none" stroke="#5a2e1a" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  }
];

// Real, free helplines (checked on each charity's own website, 22 October 2026)
window.DATA.helplines = [
  { id: "childline", name: "Childline", number: "0800 1111", tel: "08001111",
    about: "Free, any time. For anyone under 19, about anything." },
  { id: "scottish-families", name: "Scottish Families Affected by Alcohol & Drugs", number: "08080 10 10 11", tel: "08080101011",
    about: "Free helpline for anyone worried about someone's drinking or drug use." }
];

// What the young person can tap to start
window.DATA.starters = [
  "Things at home are hard tonight.",
  "I'm worried about someone in my family.",
  "I don't know who to talk to."
];

// The next steps a volunteer can agree for tomorrow
window.DATA.nextSteps = [
  {
    id: "charity",
    choice: "Phone a support charity",
    title: "Phone a support charity",
    volunteerSays: "That's a good step. These lines are free and the people there are kind. They won't be shocked by anything you say.",
    showHelplines: true
  },
  {
    id: "teacher",
    choice: "Talk to my teacher",
    title: "Talk to a teacher I trust",
    volunteerSays: "Talking to a teacher is brave. Pick one you feel OK with. You could start with: \"Things at home are hard. Can I talk to you?\"",
    tip: "You could say: \"Things at home are hard. Can I talk to you?\""
  },
  {
    id: "person",
    choice: "Talk to the person I'm worried about",
    title: "Talk to the person I'm worried about",
    volunteerSays: "Pick a calm moment, when they haven't been drinking or using. You could start with: \"I've been worried about you.\" Only do this if you feel safe. It's OK if it doesn't go perfectly.",
    tip: "Pick a calm moment. You could say: \"I've been worried about you.\""
  }
];

window.DATA.whenOptions = ["In the morning", "At lunchtime", "After school"];
window.DATA.checkInOptions = [
  { label: "Yes, tomorrow evening", value: "Tomorrow evening" },
  { label: "Yes, in 2 days", value: "In 2 days" },
  { label: "No thanks", value: "" }
];
