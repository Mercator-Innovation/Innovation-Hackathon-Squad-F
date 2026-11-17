# Business case and scope

## Problem statement

We're helping children and young people whose family member is showing signs of harmful drug or alcohol use, who've kept it hidden for a long time and struggle to take the first step, the moment they realise they can't cope alone.

## Background

Challenge 2 (based on CivTech Challenge 12.1) asks how to connect people affected by substance use with support out of hours. Most services open Monday to Friday, 9 to 5, but people are often most vulnerable at night and at weekends.

The squad chose to focus on the family and friends in the "circle of support", and specifically children and young people, because:

- **Reach.** The Scottish Government quotes Scottish Families' estimate that an average of 11 people are harmed for every person using substances. Source: [Scottish Government, Improving holistic family support (2021)](https://gov.scot/publications/improving-holistic-family-support-towards-whole-family-approach-family-inclusive-practice-drug-alcohol-services)
- **They reach help late.** Shame, guilt, and fear that social work will get involved where there are children keep the problem hidden for years. Sources: [UK Drug Policy Commission and Scottish Families (2012)](https://www.ukdpc.org.uk/wp-content/uploads/Scottish-families-of-drug-users.pdf); [University of Edinburgh study of family harms](https://www.research.ed.ac.uk/en/publications/exploring-the-impact-and-harms-on-families-of-those-experiencing-/)

## The idea

An online hub for children and young people, reached as a plug-in inside apps they already use. It has:

1. a guide for situations they may be in with a family member who is struggling
2. a chat function
3. a "text a safe adult" function

In the prototype, the chat and "text a safe adult" became one feature: a text-style chat with a checked volunteer that ends in one agreed next step for tomorrow.

## Why a plug-in inside a game

- Children already spend time in games and apps. A plug-in meets them there instead of asking them to find and install a support app.
- A support app on a shared phone can be seen. A plug-in inside a game looks like part of the game.
- It lowers the first step: tapping "Need to talk?" is smaller than phoning a helpline.

## Goals

| # | Goal | How the prototype shows it |
|---|---|---|
| G1 | Help a child take a first step, at the moment they realise they can't cope | Plug-in in the game, four clear choices on the hub home |
| G2 | Make it safe and discreet to look for help | Quick exit, no name needed, disguised notification, history that doesn't reveal the hub |
| G3 | Point to help that is actually open right now, out of hours | "Who's open now?" works out open and closed from real opening hours |
| G4 | Reduce the fear of telling | "What happens if I tell?" gives honest answers, with no false promises |
| G5 | Turn tonight's worry into something they can do tomorrow | Safe adult chat agrees one step, then "How did it go?" follows it up |
| G6 | Keep working with poor signal or no data | Offline help page saved on the phone |

## Scope

### In scope (prototype)

- Pretend host game (Blockville, "Gem Hop") with the Turtle Toast plug-in
- Hub home with four choices
- Guide: six situations, with steps and things to say
- Explore: the same guide as a walk-around game, with calming activities
- Text a safe adult: scripted chat with a made-up volunteer, next steps saved on the device
- How did it go? follow-up on an agreed step
- Who's open now: real services and opening hours
- What happens if I tell: honest answers to common fears
- Offline help page
- Quick exit and 999 links on every hub screen

### Out of scope (prototype)

- Real messaging with real volunteers, and the systems behind it (rota, moderation, escalation)
- Accounts, sign-in or any data leaving the device
- Integration with a real game or platform
- Content signed off by a safeguarding lead or clinician
- Adults in the circle of support (the adult personas in `sketches/personas-draft.md` are parked)
- Services for the person using substances

### Not this (from the challenge sheet)

- Not another service directory or call centre. "Who's open now" is one part, not the answer.
- Not a crisis service and not a replacement for 999. It's supportive, and points to 999 when someone is in danger.

## Stakeholders

| Stakeholder | Interest | What they'd need from us |
|---|---|---|
| Children and young people (primary users) | Help that's private, kind, and doesn't get anyone in trouble | Plain words, no name needed, honest answers |
| The family member using substances | Not to be reported or shamed | Person-first, non-blaming language |
| Other trusted adults (teachers, relatives) | To know how to respond when a child tells them | Out of scope for now; a possible follow-on |
| Volunteers ("safe adults") | Training, supervision, clear escalation | PVG checks, scripts, safeguarding process |
| Charities and helplines (Childline, Shout, Nacoa, Breathing Space, Scottish Families) | Referrals that are appropriate and accurate | Correct numbers and hours, a way to keep them current |
| Challenge sponsors (DHI, Simon Community Scotland, With You) | Out-of-hours help that isn't another directory | Evidence it reaches people earlier |
| Game and app platforms | Safe, low-risk content that doesn't harm their brand or players | Clear safeguarding model, no data collection |
| Child protection and social work | Children at risk are identified and protected | Clear duty-to-act rules for volunteers |
| Alcohol and Drug Partnerships, NHS, Scottish Ambulance Service | Fewer avoidable emergency calls; earlier support | Data on gaps and demand (anonymised) |

## Success measures (proposed for a real pilot, not tested)

These are suggestions for what a pilot could measure. None has been measured.

| Measure | Why it matters |
|---|---|
| Share of hub visits that happen out of hours (evenings, nights, weekends) | Shows it fills the gap the challenge describes |
| Share of safe adult chats that end with an agreed next step | Shows chats turn into action |
| Share of check-ins answered "Yes, I did it" or "I tried" | Shows the step happened |
| Number of times "Who's open now" leads to tapping a call or text button | Shows people reach real services |
| Children's own rating of "Did this help?" and "Did you feel safe using it?" | The outcome that matters most |
| Number of safeguarding escalations, and how quickly they were handled | Safety of the service itself |

Any measurement must be anonymous and agreed with a safeguarding lead and data protection officer.
