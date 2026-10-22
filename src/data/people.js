// Synthetic "safe adults" and scripted chat replies. All made up.
window.DATA = window.DATA || {};

window.DATA.safeAdults = [
  { id: "gran", name: "Gran", relation: "Grandparent" },
  { id: "ms-okafor", name: "Ms Okafor", relation: "Teacher" },
  { id: "auntie-lou", name: "Auntie Lou", relation: "Aunt" },
  { id: "coach-sam", name: "Sam", relation: "Football coach" }
];

// The pretend helper replies in this order, then repeats the last one.
window.DATA.chatReplies = [
  "Hi, I'm glad you messaged. You can tell me as much or as little as you like.",
  "That sounds really hard. Thank you for telling me. How are you feeling right now?",
  "It's not your fault. Are you safe where you are tonight?",
  "You're doing the right thing by talking. Would it help to think about a grown-up you trust?"
];
