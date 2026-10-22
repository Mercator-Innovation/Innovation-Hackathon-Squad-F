# Safe Space: a Roblox walkthrough world

A calm evening path for families and friends of people who are showing signs of harmful drug or alcohol use. It has 7 stops and a quiet garden at the end:

1. You are not alone
2. Is it an emergency? (signs of overdose, call 999)
3. The recovery position
4. Naloxone can save a life
5. Look after yourself too
6. Someone to talk to, tonight (helplines and their hours)
7. When you're ready (next steps)
8. The quiet garden: a breathing exercise

Beside the path, by the start, is **the lookout trail**: an obstacle course just for fun. Jump across stepping stones, walk logs over a pond, climb floating blocks, bounce up to a lookout tower and slide down. Falling in the water takes you back to the last flag; nothing bad happens. There are 6 lights to find on the trail, and finding them all lights up the quiet garden.

The stops are little houses with tiled roofs, a stream crosses the path under a wooden bridge, and the garden has a gazebo over the pond.

A red bar at the top of the screen always says what to do in an emergency. The **Who can I talk to?** button opens the helplines from anywhere.

This is a hackathon prototype, not a real service. Phone numbers and hours were checked on 22 October 2026.

## Open it in Roblox Studio

1. Open Roblox Studio.
2. **File → Open from File**, then pick `SafeSpace.rbxlx`.
3. Press **Play** (F5). The world builds itself when the game starts, so it looks empty until you press Play.
4. Walk with WASD. Press **E** at a sign to read more. Press **Q** or **Close** to close.

## If the file won't open

Start a new **Baseplate** place and add three scripts by hand, pasting in each file:

| In Explorer | Add a… | Name it | Paste in |
|---|---|---|---|
| ReplicatedStorage | ModuleScript | `SafeSpaceContent` | `SafeSpaceContent.lua` |
| ServerScriptService | Script | `BuildSafeSpace` | `BuildSafeSpace.server.lua` |
| StarterPlayer → StarterPlayerScripts | LocalScript | `SafeSpaceUI` | `SafeSpaceUI.client.lua` |

## Changing the words

All the words are in `SafeSpaceContent.lua`. After changing any `.lua` file, run `python3 build_place.py` to rebuild `SafeSpace.rbxlx`.
