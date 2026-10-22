// Real services for children and young people, with their opening hours.
// Hours checked on 22 October 2026 from each service's own website (or listings
// where the site didn't say). They can change, so the page tells people to check.
// Days: 0 = Sunday ... 6 = Saturday. Times are UK time, 24-hour.
// A time slot that ends at or before it starts runs past midnight.
//
// Sources:
//   Childline   childline.org.uk/get-support/contacting-childline (24/7, chats shorter overnight)
//   Shout       giveusashout.org/get-help (24/7 text)
//   Nacoa       nacoa.org.uk/calling-the-helpline (Mon to Sat, 10am to 7pm)
//   Breathing Space  breathingspace.scot (16+, Mon to Thu 6pm to 2am, Fri 6pm to Mon 6am)
//   Scottish Families  sfad.org.uk (Mon to Fri 9am to 11pm, call back at weekends)
window.DATA = window.DATA || {};
window.DATA.helpNow = [
  {
    id: "childline",
    name: "Childline",
    what: "Talk to a counsellor about anything. You don't have to give your name.",
    who: "Under 19",
    always: true,
    note: "Late at night, chats may be shorter.",
    contacts: [
      { label: "Call 0800 1111", href: "tel:08001111" },
      { label: "Chat online", href: "https://www.childline.org.uk/get-support/1-2-1-counsellor-chat/" }
    ]
  },
  {
    id: "shout",
    name: "Shout",
    what: "Text if you're struggling. A trained volunteer texts back.",
    who: "Any age",
    always: true,
    contacts: [
      { label: "Text SHOUT to 85258", href: "sms:85258?&body=SHOUT" }
    ]
  },
  {
    id: "nacoa",
    name: "Nacoa",
    what: "For anyone worried about a parent's drinking.",
    who: "Any age",
    hours: [{ days: [1, 2, 3, 4, 5, 6], from: "10:00", to: "19:00" }],
    hoursText: "Monday to Saturday, 10am to 7pm",
    contacts: [
      { label: "Call 0800 358 3456", href: "tel:08003583456" }
    ]
  },
  {
    id: "breathing-space",
    name: "Breathing Space",
    what: "Talk to someone if you're feeling low or worried. In Scotland.",
    who: "16 and over",
    hours: [
      { days: [1, 2, 3, 4], from: "18:00", to: "02:00" },
      { days: [5], from: "18:00", to: "24:00" },
      { days: [6, 0], from: "00:00", to: "24:00" },
      { days: [1], from: "00:00", to: "06:00" }
    ],
    hoursText: "Weeknights 6pm to 2am, and all weekend",
    contacts: [
      { label: "Call 0800 83 85 87", href: "tel:0800838587" }
    ]
  },
  {
    id: "scottish-families",
    name: "Scottish Families",
    what: "For families worried about someone's drinking or drug use. In Scotland.",
    who: "Any age",
    hours: [{ days: [1, 2, 3, 4, 5], from: "09:00", to: "23:00" }],
    hoursText: "Monday to Friday, 9am to 11pm",
    note: "At weekends, leave a message and they'll call you back.",
    contacts: [
      { label: "Call 08080 10 10 11", href: "tel:08080101011" }
    ]
  }
];
