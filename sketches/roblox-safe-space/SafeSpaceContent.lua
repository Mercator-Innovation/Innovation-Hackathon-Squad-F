-- SafeSpaceContent (ModuleScript in ReplicatedStorage)
-- All the words in the Safe Space world live here, so anyone can change them
-- without touching the building or screen code.
--
-- For families and friends of people who are showing signs of harmful drug or
-- alcohol use. Phone numbers and hours were checked on 22 October 2026.
--
-- In "lines": "## " starts a heading and "- " starts a bullet point.

return {
	emergency = "Emergency? If they won't wake up, or aren't breathing normally, call 999 now.",

	-- The stop the "Who can I talk to?" button opens.
	contactsId = "talk",

	stops = {
		{
			id = "welcome",
			title = "You are not alone",
			sign = "A quiet place to find out what to do. Walk the path at your own pace.",
			colour = Color3.fromRGB(0, 105, 110),
			lines = {
				"Worrying about someone's drug or alcohol use is hard.",
				"Lots of families and friends feel this way. It is not your fault.",
				"This path has 7 stops and a quiet garden at the end. Each stop tells you one thing.",
				"## How to use this place",
				"- Walk along the path.",
				"- Press E at a sign to read more.",
				"- Sit on a bench any time you need a rest.",
				"- The red bar at the top says what to do in an emergency.",
				"- Want a break? Try the lookout trail, on the right by the start.",
				"## Please note",
				"This is a prototype made at a hackathon. It is not a real service.",
			},
		},
		{
			id = "emergency",
			title = "Is it an emergency?",
			sign = "Call 999 if they won't wake up, or their breathing is slow, noisy or has stopped.",
			colour = Color3.fromRGB(170, 30, 40),
			lines = {
				"## Look for these signs",
				"- They don't wake up when you shout or shake them.",
				"- They are snoring or making gurgling sounds.",
				"- Their breathing is very slow, or has stopped.",
				"- Their lips or skin look blue or pale.",
				"## What to do",
				"- Call 999 and ask for an ambulance.",
				"- Tell them what you think the person has taken, if you know.",
				"- Give naloxone if you have it. Stop 4 tells you about it.",
				"- If they are breathing, put them in the recovery position. Stop 3 shows you how.",
				"- If they are not breathing, the 999 call handler will help you start CPR.",
				"- Stay with them until help comes.",
				"You don't have to know it all. The person on the phone will tell you what to do.",
			},
		},
		{
			id = "recovery",
			title = "The recovery position",
			sign = "If they are breathing but won't wake up, lay them on their side. It helps them breathe.",
			colour = Color3.fromRGB(30, 80, 150),
			lines = {
				"This helps if they are breathing but won't wake up. It stops them choking.",
				"## Step by step",
				"1. They lie on their back. Kneel next to them.",
				"2. Put the arm nearest you out at a right angle.",
				"3. Put the back of their other hand against their cheek, nearest you.",
				"4. Bend their far knee up.",
				"5. Pull the bent knee towards you. They roll onto their side.",
				"6. Tilt their head back a little, so they can breathe.",
				"7. Stay with them. Keep checking their breathing.",
				"If they stop breathing, call 999. The call handler will tell you what to do.",
			},
		},
		{
			id = "naloxone",
			title = "Naloxone can save a life",
			sign = "Naloxone is a medicine. It can reverse an opioid overdose for a short time.",
			colour = Color3.fromRGB(95, 55, 140),
			lines = {
				"Opioids include heroin and methadone.",
				"Naloxone comes as a nose spray or an injection.",
				"It won't harm someone who has not taken opioids. So if you're not sure, you can still give it.",
				"It wears off. So always call 999 too.",
				"## How to get it",
				"- Ask your local drug service.",
				"- Ask at a pharmacy.",
				"- Order it online from Scottish Families: sfad.org.uk",
			},
		},
		{
			id = "you",
			title = "Look after yourself too",
			sign = "It is not your fault. You don't have to cope with this on your own.",
			colour = Color3.fromRGB(40, 105, 60),
			lines = {
				"You might feel worried, angry, tired or ashamed. All of these feelings are normal.",
				"You can't fix someone else's drug or alcohol use. But you can look after yourself.",
				"## Small things that help",
				"- Talk to someone you trust.",
				"- Try to eat, drink water and rest.",
				"- Take a break when you need to. Even 5 minutes helps.",
				"- Stop 6 has people you can talk to tonight.",
			},
		},
		{
			id = "talk",
			title = "Someone to talk to, tonight",
			sign = "Free numbers you can call, including at night and at weekends.",
			colour = Color3.fromRGB(20, 90, 120),
			lines = {
				"## Any time, day or night",
				"- Samaritans: 116 123. Talk about anything.",
				"- NHS 24: 111. If you're worried about someone's health.",
				"## Evenings and weekends",
				"- Breathing Space: 0800 83 85 87. Monday to Thursday, 6pm to 2am. Friday 6pm to Monday 6am.",
				"## For families and friends",
				"- Scottish Families Affected by Alcohol and Drugs: 08080 10 10 11. Weekdays 9am to 11pm. You can ask for a call back at weekends. Web chat at sfad.org.uk.",
				"## About drugs",
				"- Know the Score: 0800 587 5879. Weekdays 9am to 9pm. Weekends 10am to 4pm.",
				"Hours were checked on 22 October 2026. They can change.",
				"In an emergency, always call 999.",
			},
		},
		{
			id = "next",
			title = "When you're ready",
			sign = "You don't have to do everything today. Here are some small next steps.",
			colour = Color3.fromRGB(150, 75, 20),
			lines = {
				"## Talking to them",
				"- Pick a calm time to talk.",
				"- Say how you feel: \"I'm worried about you.\"",
				"- Listen more than you talk.",
				"- It's OK if it doesn't go well the first time.",
				"## Finding support near you",
				"- Scottish Families can help you find support where you live.",
				"- Your GP can help too.",
				"## Keep these safe",
				"- Save 999, 111 and 116 123 in your phone.",
			},
		},
	},

	-- The lookout trail: an obstacle course just for fun, beside the path.
	trail = {
		id = "trail",
		title = "The lookout trail",
		sign = "Want a break from thinking? Jump, balance and climb to the lookout. Or stay on the path. It's up to you.",
		colour = Color3.fromRGB(190, 95, 25),
		lines = {
			"This trail is just for fun. You can leave it any time.",
			"## How it works",
			"- Jump across the stepping stones.",
			"- Walk along the logs over the pond.",
			"- Climb the blocks. Then jump on the pink pad to bounce up to the lookout.",
			"- Slide down the other side.",
			"Press Space (or the jump button) to jump.",
			"## Falling in the water?",
			"Nothing bad happens. You go back to the last flag you reached.",
			"## Find the lights",
			"There are 6 lights on the trail. Find them all to light up the quiet garden.",
		},
	},

	-- The sign at the top of the lookout tower.
	lookout = {
		id = "lookout",
		title = "You made it to the top",
		sign = "Look how far you've come. Small steps add up.",
		colour = Color3.fromRGB(190, 95, 25),
		lines = {
			"Take a moment to look around.",
			"Every stop on the path was a small step too.",
			"When you're ready, slide down the other side. The way back to the path is at the bottom.",
		},
	},

	-- Short messages that pop up on screen. %d is replaced by a number.
	messages = {
		counter = "Lights found: %d of %d",
		lightFound = "You found a light! That's %d of %d.",
		allLights = "You found all the lights! Go to the quiet garden and see what happens.",
		flag = "You reached a flag. If you fall in the water, you'll come back here.",
		splash = "Splash! Back to the last flag. Have another go.",
	},

	-- The quiet garden at the end of the path, with the breathing exercise.
	garden = {
		id = "breathe",
		title = "Take a breath",
		sign = "Sit by the water for a while. Press E to breathe slowly with the circle.",
		colour = Color3.fromRGB(0, 105, 110),
		breaths = 6,
		lines = {},
	},
}
