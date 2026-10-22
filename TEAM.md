# Our squad

<!-- The organisers fill in Members before the day, and mark the squad lead. The squad lead adds Roles by Wed 21 Oct. On the day, the product owner adds the squad name first (at 15:05, through /start-here), then the challenge and the idea. Only the product owner's Claude writes the decisions here; everyone else says "get the latest". -->

**Repo:** Innovation-Hackathon-Squad-F
**Squad name:** JJARY
**Challenge:** Challenge 2: Help when it's needed (connecting people affected by substance use with support, out of hours)
**Why we chose it:**
- It reaches a lot of people. The Scottish Government quotes Scottish Families’ estimate that an average of 11 people are harmed for every person using substances. “Family” means anyone affected, not only relatives. Source: [Scottish Government, Improving holistic family support (2021)](https://gov.scot/publications/improving-holistic-family-support-towards-whole-family-approach-family-inclusive-practice-drug-alcohol-services)
- They reach help late, often only once they can’t cope. Shame, guilt, and fear that social work will get involved where there are children keep the problem hidden for years. Sources: [UK Drug Policy Commission and Scottish Families, Scottish families of drug users (2012)](https://www.ukdpc.org.uk/wp-content/uploads/Scottish-families-of-drug-users.pdf); [University of Edinburgh study of family harms](https://www.research.ed.ac.uk/en/publications/exploring-the-impact-and-harms-on-families-of-those-experiencing-/)

**The idea:** An online hub for children and young people, reached through apps they already use as a plugin. It has:

1. an online guide for different scenarios they may be in with a family member who is struggling with harmful drug or alcohol use
2. an online chat function
3. a “text a safe adult” function

**Problem statement:** We’re helping children and young people whose family member is showing signs of harmful drug or alcohol use, who’ve kept it hidden for a long time and struggle to take the first step, the moment they realise they can’t cope alone.

## Members

| Name | Profession | Location | Squad lead |
|---|---|---|---|
| Andrew Boyce | QA Engineer | In person |  |
| Rebecca Stringer | User Researcher | In person | Yes |
| Yasmin Tasker | Business Analyst | In person |  |
| Jodie Stanley | Service Designer | In person |  |
| Jordan Hemsworth | Software Developer | In person |  |

The **squad lead** runs the squad's setup before the day: agreeing the two roles and getting everyone into the Teams chat. They're the product owner unless the squad agrees otherwise.

## Roles

| Role | Who |
|---|---|
| Product owner | Rebecca Stringer |
| Merge captain | Andrew Boyce |

- **Product owner:** chairs the squad's conversations, records what the squad decides (the challenge, the idea), makes the call on what matters next and keeps an eye on time.
- **Merge captain:** drives the shared screen, gets the first version up, keeps the screen on the latest version, and sorts out the order when two people would change the same files.
- **Everyone, both roles included:** builds. The squad chooses who presents at show and tell.

## Look together (17:15)

<!-- At the look together, the squad uses the prototype as the person it's helping. The product owner's session writes one short line for each, then what the squad will do next, and shares it. -->

**What's working:** _(at 17:15)_
**What's confusing:** _(at 17:15)_
**What's missing:** _(at 17:15)_
**What we'll do next:** _(the product owner's call)_
**Presenting at show and tell:** _(chosen at 17:15)_

## User research report

_Written 22 October 2026 by Rebecca Stringer (product owner) with Claude. Personas are made up and the persona walk-through is an expert review, not testing with real users. Nothing here uses real personal data._

### 1. Problem statement

We're helping children and young people whose family member is showing signs of harmful drug or alcohol use, who've kept it hidden for a long time and struggle to take the first step, the moment they realise they can't cope alone.

### 2. User groups

Our users are families and friends of people who are showing signs of harmful drug or alcohol use. Within that group, we focused on **children and young people**. The challenge sheet also names support workers and charities, Alcohol and Drug Partnerships, the NHS and the Scottish Ambulance Service.

### 3. What the evidence says

| Finding | Source |
|---|---|
| An estimated 11 people are harmed for every person using substances. "Family" means anyone affected | [Scottish Government, Improving holistic family support (2021)](https://gov.scot/publications/improving-holistic-family-support-towards-whole-family-approach-family-inclusive-practice-drug-alcohol-services) |
| Families reach help late, often only once they can't cope. Shame, guilt and fear that social work will get involved keep it hidden for years | [UKDPC and Scottish Families (2012)](https://www.ukdpc.org.uk/wp-content/uploads/Scottish-families-of-drug-users.pdf); [University of Edinburgh](https://www.research.ed.ac.uk/en/publications/exploring-the-impact-and-harms-on-families-of-those-experiencing-/) |
| Stigma leads to isolation and stops families seeking support | [Adfam, Challenging Stigma (2012)](https://www.drugsandalcohol.ie/18706/1/adfam_challenging_stigma.pdf) |
| Most support is 9 to 5 on weekdays, but people are most vulnerable at night | Challenge 2 sheet |
| Gap: we found no evidence on what families need specifically at night | Our own search |

### 4. Personas (children and young people)

From `sketches/personas-children-draft.md`:

- **Ellie, 9:** at 9pm her dad won't wake up properly. She doesn't know who to tell and fears being taken away.
- **Kai, 13:** late on a Friday his mum hasn't come home. He's looking after his brother, has no phone credit, and would never call a helpline.
- **Sophie, 16:** at 1am she gets a worrying message from her brother. She promised not to tell, and doesn't know what's open at night.

### 5. User needs

1. Know what to do **right now**, in words a child understands
2. Ask for help **privately**, without giving a name
3. Know **what happens if I tell**, so fear doesn't stop them
4. Not feel like they're **reporting a parent**
5. Reach a **real, trusted person**, including out of hours
6. Turn tonight's worry into **one next step** for tomorrow
7. Hear that **it's not their fault**, and feel less alone
8. Get help **with no credit, data or Wi-Fi**
9. Find help for **someone other than a parent**, such as a brother, sister or friend
10. Know clearly **when it's an emergency**

### 6. The idea: Turtle Toast

An online hub for children and young people, reached through apps they already use as a plugin. It pops up privately inside a game ("Private. Nobody in the game can see this."). It contains:

- **What do I do?** guides, plus a walk-around explore game
- **Text a safe adult:** a checked volunteer, ending in an agreed next step
- **How did it go?** follows up that step
- **What happens if I tell?**
- **Who's open now?**
- **Need urgent help**, in the top bar on every screen

**What makes it different:** you can say it for the first time, privately, at any hour, and leave with a plan for tonight and a booked step for tomorrow.

### 7. Testing the needs: persona walk-through

| Need | Where it's met | Ellie | Kai | Sophie |
|---|---|---|---|---|
| 1. What to do right now | Need urgent help; What do I do? guides | ✅ | ✅ | ✅ |
| 2. Private, no name | Plug-in pop-up; Text a safe adult | ✅ | ✅ | ✅ |
| 3. What happens if I tell | What happens if I tell?, linked from every guide | ✅ | ✅ | ✅ |
| 4. Not reporting a parent | If I tell; the volunteer talks about how *they* feel | ✅ | ✅ | ⚠️ |
| 5. Real person, out of hours | Text a safe adult; Who's open now? | ✅ | ✅ | ⚠️ assumes night volunteers |
| 6. One next step | Text a safe adult, then How did it go? | ✅ | ✅ | ✅ |
| 7. Not their fault, less alone | Every screen; kind messages and calm spots in the game | ✅ | ✅ | ⚠️ the look may feel too young |
| 8. No credit or data | "Calls to 999 are free"; offline help page (works only from a web address) | ⚠️ | ⚠️ partly met | ✅ |
| 9. Someone other than a parent | New "brother, sister or friend" guide | ⚠️ | ⚠️ | ✅ |
| 10. When it's an emergency | Need urgent help page | ✅ | ✅ | ✅ |

✅ met · ⚠️ partly met or not tested

**Changes made because of the walk-through:**
- A "Need urgent help" page in the top bar
- "What happens if I tell?" linked from every guide
- A brother, sister or friend scenario
- "How did it go?" to close the loop on the next step

### 8. Gaps and next steps

- **Test with real children and young people,** with safeguarding in place. Everything above is an assumption until then.
- **Safeguarding sign-off** for the urgent steps, the guides and the volunteer model
- **Night-time staffing:** who answers Text a safe adult at 1am?
- **Age range:** one look and tone for ages 9 to 16. Older teenagers may need a different way in.
- **Discovery:** we've assumed a game plug-in. How would a 16-year-old who doesn't game find it?
- **Offline:** make the whole hub work with no data, not only the help page

## Links

- Discovery Wall (optional): _(added if the squad makes one)_
- Later List (ideas, questions and findings to come back to): https://claude.ai/artifact/FWsBTVcpWdu5DBu3U4qjJ8
- JJARY Build Plan (functions to build and who's on each): https://claude.ai/artifact/BCLaaPP59gekuYPUwXCEqV

## Working agreements

<!-- Optional. Anything the squad agrees about how it works, for example "say what you're grabbing in the Teams chat". -->

- **How we name our users:** always "families and friends of people who are showing signs of harmful drug or alcohol use". Claude uses this wording in everything it writes, says and builds for the squad.
