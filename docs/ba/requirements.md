# Requirements

User stories with acceptance criteria, written from the prototype as built. **Status** says whether the prototype meets it: **Met**, **Partly** (simulated or incomplete) or **Not met**.

Personas (made up, see `sketches/personas-children-draft.md`): **Ellie**, 9, lives with her dad who drinks most evenings. **Kai**, 13, looks after his little brother while his mum uses drugs. **Sophie**, 16, worried about her older brother.

## Epic 1: Finding the hub

### US-01 Open help from inside a game
**As** a child playing a game, **I want** a small, private way into help, **so that** I don't have to find or install a separate app.

- Given I'm on the Blockville game page, when I tap "Open Turtle Toast", then a pop-up opens with "Need to talk?", a privacy note, "Open Turtle Toast" and "Not now".
- Given the pop-up is open, when I press Escape, tap "Not now" or tap ✕, then it closes and focus returns to the launcher.
- The pop-up says "Private. Nobody in the game can see this."

**Status:** Met (pretend host). `src/screens/host.js`

### US-02 Choose what would help
**As** a child who's just opened the hub, **I want** a few clear choices, **so that** I can get to the right help quickly.

- The hub home shows exactly four choices: What do I do?, Text a safe adult, Who's open now?, What happens if I tell?
- It says I don't have to give my name, and that it's not my fault.

**Status:** Met. `src/screens/home.js`, `src/content.js`

## Epic 2: Staying safe and discreet

### US-03 Quick exit
**As** a child who might be overheard or seen, **I want** to leave instantly, **so that** nobody sees what I was looking at.

- Every hub screen shows a "Quick exit" button at the top.
- When I tap it, I go straight back to the game.
- When I then press the browser's Back button, I do not see a hub screen.

**Status:** Met. Moving between screens replaces the history entry instead of adding one. `src/app.js`

### US-04 Emergency route always visible
**As** a child in danger, **I want** 999 to be one tap away on every screen, **so that** I don't have to search for it.

- Every hub screen shows "In danger right now? Call 999" (a `tel:999` link) and "Won't wake up? What to do".
- Screens that cover danger (the "won't wake up" guide, the chat when I say I'm not safe, How did it go?, Who's open now, What happens if I tell) also show 999 in the page.

**Status:** Met. `src/index.html`, `src/screens/*`

### US-05 Disguised notification
**As** a child on a shared phone, **I want** reminders that don't say what they're about, **so that** nobody finds out.

- When a next step is agreed, the notification says only "Turtle Toast: You've got 1 thing for tomorrow".

**Status:** Partly. Shown inside the page only; no real phone notification. `src/screens/safe-adult.js`

## Epic 3: Knowing what to do

### US-06 Guide for what's happening
**As** Ellie, **I want** simple steps for what's happening right now, **so that** I know what to do.

- I can pick from six situations: they won't wake up properly; they haven't come home; there's shouting; I've been asked to keep a secret; I'm worried about my brother, sister or friend; I just feel worried all the time.
- Each shows numbered steps and "Things you could say".
- The "won't wake up" situation is marked urgent and shows a 999 link at the top.
- Each links to "Text a safe adult" and "What happens if I tell?".

**Status:** Met. Content is made up and not clinically checked. `src/data/scenarios.js`, `src/screens/guide.js`

### US-07 Explore the guide as a game
**As** a child who'd rather play than read, **I want** to walk around a little world where each house holds help, **so that** it feels less scary.

- I can move with arrow keys, WASD, on-screen buttons, or by tapping.
- There's a plain list of every house for anyone who'd rather not play.
- Houses include each guide situation (its steps open inside the house with "Read what to do"), the safe adult, Childline, and three calming activities: calm pond (breathing), star hill (join the stars), 5 4 3 2 1 garden (grounding).
- What I type in the garden is not saved or sent.

**Status:** Met. `src/screens/world.js`, `src/world.css`

## Epic 4: Talking to someone

### US-08 Text a safe adult
**As** Kai, **I want** to text a checked, trained adult privately, **so that** I can ask for help without it feeling like reporting my mum.

- I'm told I'm being connected to "a real person", then see the volunteer's name, a "Vetted volunteer" badge and a drawn avatar (never a photo).
- I can tap a starter message, which goes into the box so I can change it, or type my own.
- The volunteer asks first whether I'm safe right now.
- The volunteer asks up to four short questions (what's happening, how long, how I feel, who knows). Each has quick replies, and I can type instead. "I'd rather not say" is always an option for the first.
- We agree one small step for tomorrow: phone a support charity, talk to a teacher, or talk to the person I'm worried about.
- I pick when (morning, lunchtime, after school) and whether the volunteer checks in (tomorrow evening, in 2 days, or no thanks).
- I see a summary card "Our plan for tomorrow", and the step is saved to "My next steps".

**Status:** Partly. The volunteer is scripted and made up; nothing is sent. `src/screens/safe-adult.js`, `src/data/people.js`

### US-09 Safety check in the chat
**As** a child who isn't safe, **I want** to be told clearly to call 999, **so that** I get emergency help.

- When I answer "No, I don't feel safe", the volunteer tells me to call 999 and that I won't be in trouble, and a "Call 999" button appears.
- The chat waits until I say "I'm safe now" before carrying on.

**Status:** Met (scripted). In a real service this must trigger human escalation. `src/screens/safe-adult.js`

### US-10 My next steps
**As** a child, **I want** to see the steps I agreed and tick them off, **so that** I remember and feel progress.

- "My next steps" lists each step with when, a tip, and who agreed it.
- I can tick "I've done this", and tick "I've called them" against each helpline.
- I can delete all my steps.
- It says steps are only saved on this phone.

**Status:** Met. `src/screens/safe-adult.js`

### US-11 How did it go?
**As** a child who agreed a step, **I want** to be asked how it went, **so that** I get support whatever happened.

- When I return to the hub with a step not yet followed up, a "How did it go?" banner shows.
- I can answer: Yes, I did it / I tried, but it didn't go well / Not yet / I changed my mind.
- Each answer gets a kind response and three next options.
- "Yes" ticks the step off. "Keep it for tomorrow" asks me again after 12 hours.
- There's a "Try it with an example step" button for demos.

**Status:** Met (on this device only). `src/screens/check-in.js`

### US-12 Who's open now
**As** Sophie at 1am, **I want** to see who I can contact right now, **so that** I don't phone somewhere that's closed.

- Services are split into "Open now" and "Closed right now", using the current day and time in UK time.
- Open and closed are shown in words and a symbol (✓ / ✕), not colour alone.
- A closed service says when it next opens, for example "Opens tomorrow at 10am".
- Call, text or chat buttons show only for services that are open.
- Each card shows who it's for (age) and opening hours.
- The page says when the hours were checked and to check the service's own website.
- For demos, a "See the page at a different time" picker shows Friday 11:30pm, Saturday 3am and Sunday 2pm.

**Status:** Met. `src/screens/help-now.js`, `src/data/help-now.js`

## Epic 5: Reducing fear of telling

### US-13 What happens if I tell?
**As** Ellie, who's scared she'll be taken away, **I want** honest answers, **so that** I can decide whether to tell someone.

- Seven questions open one at a time: Will I be taken away? Will my mum or dad get in trouble? Am I letting my family down? Will anyone listen? Who will find out? What if I do need to stay somewhere else? Can I ask without giving my name?
- Answers never promise something that might not be true (for example, never "you won't be taken away").
- It links to "Who's open now" and "Text a safe adult".
- It says the wording needs checking by a safeguarding lead.

**Status:** Met, pending safeguarding review. `src/screens/if-i-tell.js`

## Epic 6: Low data, battery and signal

### US-14 Offline help
**As** Kai with no phone credit, **I want** basic help to work without the internet, **so that** I'm not left with nothing.

- The first visit saves an offline help page on the phone.
- If the connection drops while the hub is open, a calm bar says "No internet? Your offline help is still here" with a link.
- The offline page covers: if a grown-up won't wake up, if you feel scared right now, who you can talk to, and a reminder it's not your fault.

**Status:** Met when served from a web address; doesn't work when opened as a file. `src/offline.html`, `src/sw.js`, `src/offline-banner.js`

## Business rules

| ID | Rule | Where |
|---|---|---|
| BR-01 | Moving between hub screens replaces the browser history entry, so the hub is only ever one step in history | `src/app.js` |
| BR-02 | Quick exit goes back to the game and replaces history | `src/app.js` |
| BR-03 | A service is open if it's marked "always", or the current UK day and time fall within one of its time slots. A slot that ends at or before it starts runs past midnight | `src/screens/help-now.js` |
| BR-04 | "Next opens" is worked out in 15-minute steps up to a week ahead | `src/screens/help-now.js` |
| BR-05 | The chat always asks "are you safe right now?" before anything else, and won't move on while the child says they aren't | `src/screens/safe-adult.js` |
| BR-06 | Exactly one next step is agreed per chat | `src/screens/safe-adult.js` |
| BR-07 | A step is "waiting for a check-in" if it's not done, has no answer yet, and isn't snoozed. The hub shows the oldest one | `src/screens/check-in.js` |
| BR-08 | Answering "Yes" to How did it go? marks the step done. "Keep it for tomorrow" snoozes it for 12 hours | `src/screens/check-in.js` |
| BR-09 | Volunteers are shown with a drawn avatar, never a photo | `src/data/people.js` |
| BR-10 | Answers about telling never make promises that might not hold | `src/screens/if-i-tell.js` |
| BR-11 | Decorative animation is switched off when the device asks for reduced motion | `src/wow.js`, `src/easter-egg.js` |

## Non-functional requirements

| ID | Requirement | Status |
|---|---|---|
| NFR-01 Accessibility | Headings in order; labels on fields; works with a keyboard; visible focus; contrast at least 4.5:1; nothing shown by colour alone; focus moves to the heading on each new screen | Met as far as checked; no formal audit |
| NFR-02 Phone width | Works at about 375 pixels wide | Met as far as checked |
| NFR-03 Reduced motion | Animations stop or slow when the device asks for reduced motion | Met |
| NFR-04 Content | Short sentences, "you", no jargon, reading age about 9; person-first, non-stigmatising language | Met as far as checked; not tested with children |
| NFR-05 Privacy | No name needed; nothing sent off the device; only what's needed is stored | Met (see [Data and privacy](data-and-privacy.md)) |
| NFR-06 Low connectivity | Core safety help available offline | Met over a web address |
| NFR-07 No build step | Plain HTML, CSS and JavaScript that opens from the file | Met |
| NFR-08 Not a real brand | The prototype says on every screen that it's not a real service | Met (banner) |
