# Data and privacy

Substance use and anything about a child's home life is sensitive. Health data, including substance use, is special category data under UK GDPR. This page records what the prototype keeps and what a real service would need to decide.

## What the prototype stores

Nothing leaves the device. Everything below is in the browser's local storage on that phone or computer.

| Key | What's in it | Set by | Cleared by |
|---|---|---|---|
| `turtleToast.nextSteps` | Agreed steps: title, when, tip, volunteer's first name, check-in choice, done, check-in answer, snooze time | Text a safe adult; How did it go? | "Delete my steps" on My next steps |
| `turtleToast.calledNumbers` | Which helplines the child ticked as called | My next steps | "Delete my steps" |
| `gemhop-best` | Best score in the pretend game | Blockville | Never (harmless) |

Not stored: chat messages (kept only while the page is open), anything typed in the 5 4 3 2 1 garden, names, ages or locations.

The offline help page and help-now data are saved by the service worker (`offline-help-v2` cache). They contain no personal data.

## Privacy features in the prototype

- No name, sign-in or account.
- Quick exit, and screen changes that don't build up browser history.
- Disguised notification text.
- Plain statements to the child: "This is private", "Your steps are only saved on this phone", "What you type stays on this screen".

## Gaps and questions for a real service

| # | Question | Why it matters |
|---|---|---|
| P1 | Should next steps be saved on the device at all? Someone else using the phone could open the hub and see them. | A child's plan to talk to a teacher could be found by the adult they're worried about |
| P2 | Real chats would be stored on a server. How long, who can see them, and on what lawful basis? | Special category data about a child, and about a third party (the family member) |
| P3 | When must a volunteer share what a child says, and how is the child told beforehand? | Childline's model: confidential except in a few serious cases, and they try to tell the child first |
| P4 | What data would the host game or platform see? Could it learn that a player opened the plug-in? | "Nobody in the game can see this" has to be true in the real integration |
| P5 | What's the minimum age to use it without a parent's consent? | Children's data rules, and the person whose consent would normally be asked may be the one using substances |
| P6 | Can anonymous usage be measured without identifying anyone? | Needed for the success measures in the business case |
| P7 | A Data Protection Impact Assessment (DPIA) would be required | High-risk processing of children's special category data |
