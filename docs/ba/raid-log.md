# RAID log

Risks, assumptions, issues and dependencies for taking Turtle Toast beyond a prototype. Rated High, Medium or Low. Owners are roles, not people, because there's no real project yet.

## Risks

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R1 | A child in danger uses the hub instead of calling 999, and help is delayed | High | Medium | 999 on every screen; chat asks about safety first; "won't wake up" marked urgent; real volunteers escalate |
| R2 | Guide steps or "if I tell" answers are wrong or harmful for a child's situation | High | Medium | Safeguarding lead and clinical sign-off before use; test with children |
| R3 | The adult the child is worried about finds the hub or saved steps on a shared phone | High | Medium | Quick exit; disguised notifications; review whether to store steps on the device (see P1) |
| R4 | A child expects a reply at a time no volunteer is available | High | High | Rota planning; honest "reply time"; route to 24/7 services (Childline, Shout) when no one is free |
| R5 | Helpline numbers or opening hours go out of date | Medium | High | Named owner and regular review; link to each service's own site; ideally a feed from the services |
| R6 | Game platforms won't host it, or host it somewhere children won't find it | High | Medium | Early conversations with platforms; also offer it as a standalone page |
| R7 | It's seen as reporting on families, and children or families distrust it | High | Medium | Person-first language; honest answers; co-design with children and families |
| R8 | A volunteer handles a disclosure badly | High | Low | PVG checks, training, scripts, supervision, safeguarding lead on call |
| R9 | Children use the hub as a game and ignore the help | Low | Medium | Help reachable in one tap from every game element; plain list alongside the world |

## Assumptions

| ID | Assumption | How to test it |
|---|---|---|
| A1 | Children would rather start inside a game than install a support app | Research with children and young people |
| A2 | Texting is a lower barrier than phoning for this group | Research; compare with Childline and Shout experience |
| A3 | Agreeing one small step for tomorrow helps more than open-ended chat | Pilot: check-in outcomes |
| A4 | Volunteers (not professionals) are acceptable as "safe adults" if checked and trained | Safeguarding and sponsor advice |
| A5 | A reading age of about 9 works for 9 to 16-year-olds without putting off older ones | Test content with each age group |
| A6 | The opening hours we found on 22 October 2026 are correct | Confirm with each service |

## Issues (in the prototype now)

| ID | Issue | Effect |
|---|---|---|
| I1 | The hub's "What do I do?" tile goes to the Explore world, not the plain guide list | Each house shows its guide steps inline ("Read what to do"), and the world has a plain list of houses. The separate guide list (`#/guide`) is only reached through the "Won't wake up?" link and then Back. Decide whether it's still needed |
| I2 | The idea had a separate "online chat" and "text a safe adult"; the prototype merged them | Fine for the prototype; a real service needs to decide if both are needed |
| I3 | Offline help only works when the site is served from a web address, not opened as a file | Demos from a file won't show offline help |
| I4 | The volunteer chat is scripted, with one made-up volunteer | Can't show real conversation, waiting or handover |
| I5 | Next steps and check-ins live only on one device | Changing phone or clearing the browser loses them; a volunteer can't really "check in" |

## Dependencies

| ID | Dependency | Needed for |
|---|---|---|
| D1 | A host platform or game willing to embed the plug-in | Reaching children where they already are |
| D2 | A volunteer organisation with PVG-checked, trained volunteers and out-of-hours cover | Text a safe adult |
| D3 | A safeguarding lead and clinical adviser | Signing off all content and escalation |
| D4 | Partner helplines (Childline, Shout, Nacoa, Breathing Space, Scottish Families) agreeing to be listed, and a way to keep details current | Who's open now |
| D5 | A data protection officer and DPIA | Any real data |
| D6 | Funding and a service owner | Everything beyond the prototype |

## Open questions

1. Which age range is it for? The personas run from 9 to 16; Breathing Space is 16 and over.
2. Should the adult personas (Morag, Jay, Priya in `sketches/personas-draft.md`) get their own version, or is that a different service?
3. Who could the plug-in tell, if anyone, when a child is at risk, and how is that explained to the child up front?
4. How would the hub link up with services local to where the child lives, given support varies by area?
5. Does a plug-in in a game risk making help feel trivial?
