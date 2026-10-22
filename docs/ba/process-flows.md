# Process flows

Diagrams are in Mermaid, which GitHub draws automatically.

## 1. As is: a child at 9pm on a school night (from the Ellie persona)

```mermaid
flowchart TD
    A[Someone at home has been drinking or using] --> B{Child realises they can't cope}
    B --> C[Doesn't know who to tell]
    C --> D{Worried about getting<br/>them in trouble or being taken away?}
    D -- Yes --> E[Keeps it hidden]
    E --> F[Problem continues, sometimes for years]
    D -- No --> G[Looks for help]
    G --> H{Is anything open?}
    H -- Most services shut out of hours --> E
    H -- Danger --> I[999]
```

Pain points: fear of the consequences of telling, not knowing what's open, nothing that speaks to a child in their own words, and no private way in.

## 2. To be: overall journey through Turtle Toast

```mermaid
flowchart TD
    G[Playing Blockville] --> L[Tap 'Open Turtle Toast']
    L --> P{Need to talk?}
    P -- Not now --> G
    P -- Open --> H[Hub home]
    H --> W[What do I do?<br/>Explore world or guide]
    H --> S[Text a safe adult]
    H --> N[Who's open now?]
    H --> T[What happens if I tell?]
    W --> S
    W --> T
    T --> N
    T --> S
    S --> ST[My next steps]
    ST -. next visit .-> CI[How did it go?]
    CI --> S
    CI --> N
    H -. any screen .-> QX[Quick exit] --> G
    H -. any screen .-> E999[Call 999]
```

## 3. Text a safe adult: the chat stages

Each box is a stage in `src/screens/safe-adult.js`.

```mermaid
stateDiagram-v2
    [*] --> connecting
    connecting --> start: connected to volunteer
    start --> safety: child sends first message
    safety --> unsafe: "No, I don't feel safe"
    unsafe --> unsafe: shows Call 999, waits
    safety --> explore: "Yes, I'm safe"
    unsafe --> explore: "I'm safe now"
    explore --> explore: next of 4 questions
    explore --> step: questions done
    step --> when: picks charity / teacher / the person
    when --> checkin: picks morning / lunchtime / after school
    checkin --> done: picks check-in time or no thanks
    done --> [*]: step saved to My next steps
```

At any stage after "start", typing free text gets a listening reply and the chat stays on the same stage.

## 4. How did it go?: following up a step

```mermaid
flowchart TD
    A[Child opens hub] --> B{A step is waiting?}
    B -- No --> H[Hub home as normal]
    B -- Yes --> C[Banner: How did it go?]
    C --> D{Did you do it?}
    D -- Yes, I did it --> Y[Well done. Step ticked off]
    D -- I tried --> T[Trying is the hardest part]
    D -- Not yet --> NY[No rush]
    D -- I changed my mind --> CM[You're in charge]
    NY --> K[Keep it for tomorrow:<br/>ask again in 12 hours]
    Y & T & NY & CM --> O[Three next options:<br/>plan another step, talk now,<br/>calm activity, back to start]
```

## 5. Who's open now: deciding open or closed

```mermaid
flowchart TD
    A[Get today's day and time in UK time,<br/>or the pretend time] --> B{Service marked 'always'?}
    B -- Yes --> O[Open now]
    B -- No --> C{Inside any time slot?<br/>Slots can run past midnight}
    C -- Yes --> O
    C -- No --> X[Closed]
    X --> N[Step forward 15 minutes at a time<br/>up to a week to find 'Opens ...']
    O --> BTN[Show call / text / chat buttons]
```

## 6. Swimlane: what a real service would add (to be validated)

How the prototype's chat might work with real people behind it. A starting point for discussion, not a design.

```mermaid
sequenceDiagram
    participant C as Child
    participant TT as Turtle Toast
    participant V as Volunteer
    participant SL as Safeguarding lead
    participant ES as Emergency services
    C->>TT: Opens plug-in, starts chat
    TT->>V: Routes to an available checked volunteer
    V->>C: Are you safe right now?
    alt Not safe
        V->>C: Call 999
        V->>SL: Escalate straight away
        SL->>ES: Acts if the child can't
    else Safe
        V->>C: Explore, agree one step
        TT->>C: Disguised reminder
        V->>C: Check in at agreed time
    end
    V->>SL: Concerns logged and reviewed
```
