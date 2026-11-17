# Traceability

Links each user story to the goal it supports, the persona it was written for, the screen and files that deliver it, and its status. Goals are in [Business case](business-case.md), stories in [Requirements](requirements.md).

| Story | Goal | Persona | Screen (address) | Files | Status |
|---|---|---|---|---|---|
| US-01 Open help from a game | G1, G2 | Kai | Blockville `#/` | `screens/host.js` | Met (pretend host) |
| US-02 Choose what would help | G1 | All | Hub home `#/hub` | `screens/home.js`, `content.js` | Met |
| US-03 Quick exit | G2 | Ellie, Kai | Every hub screen | `app.js`, `index.html` | Met |
| US-04 Emergency route | G1 | Ellie | Every hub screen | `index.html`, `screens/*` | Met |
| US-05 Disguised notification | G2 | Kai | Safe adult `#/safe-adult` | `screens/safe-adult.js` | Partly |
| US-06 Guide | G1 | Ellie | Guide `#/guide`, `#/guide/<id>` | `screens/guide.js`, `data/scenarios.js` | Met (content not signed off) |
| US-07 Explore world | G1 | Ellie | Explore `#/world` | `screens/world.js`, `world.css` | Met |
| US-08 Text a safe adult | G5 | Kai | Safe adult `#/safe-adult` | `screens/safe-adult.js`, `data/people.js` | Partly (scripted) |
| US-09 Safety check in chat | G1, G5 | Ellie | Safe adult `#/safe-adult` | `screens/safe-adult.js` | Met (scripted) |
| US-10 My next steps | G5 | Kai | `#/safe-adult/steps` | `screens/safe-adult.js` | Met |
| US-11 How did it go? | G5 | Kai | `#/how-did-it-go` | `screens/check-in.js`, `content.js` | Met (device only) |
| US-12 Who's open now | G3 | Sophie | `#/help-now` | `screens/help-now.js`, `data/help-now.js` | Met |
| US-13 What happens if I tell? | G4 | Ellie | `#/if-i-tell` | `screens/if-i-tell.js` | Met (needs review) |
| US-14 Offline help | G6 | Kai | `offline.html` | `offline.html`, `sw.js`, `offline-banner.js` | Met over a web address |

## Challenge needs to stories

How the stories answer "What people need" on the challenge sheet.

| Challenge need | Stories |
|---|---|
| Trusted, non-judgemental support when they need it, wherever they are | US-01, US-08, US-12 |
| Feel safer and less alone, especially at night | US-07, US-08, US-12, US-14 |
| Families and friends part of the support, and supported themselves | US-06, US-08, US-11, US-13 |
| Services pool what they have for out-of-hours cover | US-12 (partly: shows existing services; no pooling) |

## Challenge barriers to stories

| Barrier | Stories |
|---|---|
| Help closes evenings and weekends | US-12, US-08 |
| Hard to know what exists | US-12 |
| Stigma, low trust in statutory services | US-13, US-08, US-03 |
| Limited phone data, battery or signal | US-14 |
| Families and friends don't know how to help | US-06, US-07 |
