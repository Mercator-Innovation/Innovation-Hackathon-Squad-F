-- BuildSafeSpace (Script in ServerScriptService)
-- Builds the Safe Space walkthrough world when the game starts: a calm
-- evening path with 7 stops, benches, lanterns, trees and a quiet garden.
-- The words for each stop come from ReplicatedStorage.SafeSpaceContent.

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Lighting = game:GetService("Lighting")

local Content = require(ReplicatedStorage:WaitForChild("SafeSpaceContent"))

local GROUND = 0.2 -- height of the top of the grass
local STOP_GAP = 36 -- distance between stops along the path
local WHITE = Color3.new(1, 1, 1)
local CREAM = Color3.fromRGB(250, 246, 236)
local INK = Color3.fromRGB(30, 30, 40)
local STONE = Color3.fromRGB(214, 206, 190)
local WOOD = Color3.fromRGB(120, 85, 60)
local LAMP_GLOW = Color3.fromRGB(255, 214, 170)
local rng = Random.new(42) -- the same trees every time

-- Turn off any spawn points already in the place, so everyone starts at ours.
for _, obj in ipairs(workspace:GetDescendants()) do
	if obj:IsA("SpawnLocation") then
		obj.Enabled = false
	end
end

local world = Instance.new("Folder")
world.Name = "SafeSpaceWorld"
world.Parent = workspace

local function make(className, props, parent)
	local obj = Instance.new(className)
	if obj:IsA("BasePart") then
		obj.Anchored = true
		obj.TopSurface = Enum.SurfaceType.Smooth
		obj.BottomSurface = Enum.SurfaceType.Smooth
	end
	for key, value in pairs(props) do
		obj[key] = value
	end
	obj.Parent = parent or world
	return obj
end

-- Text that shrinks to fit its box, up to maxSize.
local function text(parent, props, maxSize)
	local label = make("TextLabel", {
		BackgroundTransparency = 1,
		Font = Enum.Font.Gotham,
		TextColor3 = INK,
		TextWrapped = true,
		TextScaled = true,
		TextXAlignment = Enum.TextXAlignment.Left,
	}, parent)
	for key, value in pairs(props) do
		label[key] = value
	end
	make("UITextSizeConstraint", { MaxTextSize = maxSize }, label)
	return label
end

local function stopZ(index)
	return -10 - (index - 1) * STOP_GAP
end

local function upright(cframe)
	-- Roblox cylinders lie along X; this stands them up.
	return cframe * CFrame.Angles(0, 0, math.rad(90))
end

-- Lighting: early evening, warm and soft.
Lighting.ClockTime = 18
Lighting.Brightness = 2
Lighting.Ambient = Color3.fromRGB(110, 100, 120)
Lighting.OutdoorAmbient = Color3.fromRGB(150, 140, 155)
local atmosphere = Lighting:FindFirstChildOfClass("Atmosphere") or Instance.new("Atmosphere")
atmosphere.Density = 0.3
atmosphere.Offset = 0.25
atmosphere.Color = Color3.fromRGB(230, 200, 190)
atmosphere.Decay = Color3.fromRGB(120, 100, 140)
atmosphere.Glare = 0
atmosphere.Haze = 1
atmosphere.Parent = Lighting

-- Ground, with invisible walls round the edge so nobody falls off.
make("Part", {
	Name = "Grass",
	Size = Vector3.new(600, 2, 600),
	CFrame = CFrame.new(0, GROUND - 1, -150),
	Color = Color3.fromRGB(110, 150, 95),
	Material = Enum.Material.Grass,
})
for _, wall in ipairs({
	{ Vector3.new(2, 40, 600), Vector3.new(300, 20, -150) },
	{ Vector3.new(2, 40, 600), Vector3.new(-300, 20, -150) },
	{ Vector3.new(600, 40, 2), Vector3.new(0, 20, 150) },
	{ Vector3.new(600, 40, 2), Vector3.new(0, 20, -450) },
}) do
	make("Part", { Name = "Edge", Size = wall[1], CFrame = CFrame.new(wall[2]), Transparency = 1 })
end

local stops = Content.stops
local gardenZ = stopZ(#stops) - 52

-- The path, from the start to the garden.
local pathStart, pathEnd = 30, gardenZ + 20
make("Part", {
	Name = "Path",
	Size = Vector3.new(12, 0.2, pathStart - pathEnd),
	CFrame = CFrame.new(0, GROUND + 0.1, (pathStart + pathEnd) / 2),
	Color = Color3.fromRGB(222, 205, 170),
	Material = Enum.Material.Pebble,
})

make("SpawnLocation", {
	Name = "Start",
	Size = Vector3.new(8, 0.4, 8),
	CFrame = CFrame.new(0, GROUND + 0.4, 22),
	Color = Color3.fromRGB(150, 200, 195),
	Material = Enum.Material.SmoothPlastic,
	Neutral = true,
	Duration = 0,
})

-- Welcome arch over the path.
for _, x in ipairs({ -8, 8 }) do
	make("Part", {
		Name = "ArchPillar",
		Size = Vector3.new(2, 14, 2),
		CFrame = CFrame.new(x, GROUND + 7, 10),
		Color = CREAM,
		Material = Enum.Material.Wood,
	})
end
local archPos = Vector3.new(0, GROUND + 13, 10)
local arch = make("Part", {
	Name = "ArchSign",
	Size = Vector3.new(20, 3.6, 1),
	CFrame = CFrame.lookAt(archPos, archPos + Vector3.new(0, 0, 1)),
	Color = stops[1].colour,
	Material = Enum.Material.SmoothPlastic,
})
for face, words in pairs({ [Enum.NormalId.Front] = "Safe Space", [Enum.NormalId.Back] = "Take your time" }) do
	local gui = make("SurfaceGui", {
		Face = face,
		SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud,
		PixelsPerStud = 40,
		LightInfluence = 0,
	}, arch)
	text(gui, {
		Text = words,
		Font = Enum.Font.GothamBold,
		TextColor3 = WHITE,
		TextXAlignment = Enum.TextXAlignment.Center,
		Size = UDim2.new(1, -40, 1, -20),
		Position = UDim2.new(0, 20, 0, 10),
	}, 100)
end

local function buildLantern(position)
	make("Part", {
		Name = "LanternPost",
		Size = Vector3.new(0.5, 6, 0.5),
		CFrame = CFrame.new(position + Vector3.new(0, 3, 0)),
		Color = Color3.fromRGB(60, 55, 60),
		Material = Enum.Material.Metal,
	})
	local glow = make("Part", {
		Name = "Lantern",
		Size = Vector3.new(1, 1.2, 1),
		CFrame = CFrame.new(position + Vector3.new(0, 6.6, 0)),
		Color = LAMP_GLOW,
		Material = Enum.Material.Neon,
		CanCollide = false,
	})
	make("PointLight", { Range = 14, Brightness = 0.8, Color = LAMP_GLOW }, glow)
end

-- A bench you can sit on, facing lookDir.
local function buildBench(position, lookDir)
	local cf = CFrame.lookAt(position, position + lookDir)
	make("Seat", {
		Name = "Bench",
		Size = Vector3.new(5, 0.5, 2),
		CFrame = cf * CFrame.new(0, 1.6, 0),
		Color = WOOD,
		Material = Enum.Material.Wood,
	})
	make("Part", {
		Name = "BenchBack",
		Size = Vector3.new(5, 2, 0.4),
		CFrame = cf * CFrame.new(0, 2.85, 0.9),
		Color = WOOD,
		Material = Enum.Material.Wood,
	})
	for _, dx in ipairs({ -2, 2 }) do
		make("Part", {
			Name = "BenchLeg",
			Size = Vector3.new(0.4, 1.4, 1.6),
			CFrame = cf * CFrame.new(dx, 0.65, 0),
			Color = Color3.fromRGB(80, 60, 45),
			Material = Enum.Material.Wood,
		})
	end
end

-- A sign board with a short message and a "Press E" prompt.
local function buildSign(stop, cframe, label, actionText)
	local board = make("Part", {
		Name = stop.id .. "Sign",
		Size = Vector3.new(12, 8, 0.6),
		CFrame = cframe,
		Color = CREAM,
		Material = Enum.Material.SmoothPlastic,
	})
	local gui = make("SurfaceGui", {
		Face = Enum.NormalId.Front,
		SizingMode = Enum.SurfaceGuiSizingMode.PixelsPerStud,
		PixelsPerStud = 50,
		LightInfluence = 0,
	}, board)
	local header = make("Frame", {
		Size = UDim2.new(1, 0, 0, 130),
		BackgroundColor3 = stop.colour,
		BorderSizePixel = 0,
	}, gui)
	text(header, {
		Text = label,
		Font = Enum.Font.GothamMedium,
		TextColor3 = WHITE,
		Size = UDim2.new(1, -40, 0, 34),
		Position = UDim2.new(0, 20, 0, 12),
	}, 26)
	text(header, {
		Text = stop.title,
		Font = Enum.Font.GothamBold,
		TextColor3 = WHITE,
		Size = UDim2.new(1, -40, 0, 70),
		Position = UDim2.new(0, 20, 0, 50),
	}, 48)
	text(gui, {
		Text = stop.sign,
		Size = UDim2.new(1, -48, 1, -220),
		Position = UDim2.new(0, 24, 0, 150),
		TextYAlignment = Enum.TextYAlignment.Top,
	}, 36)
	text(gui, {
		Text = "Press E: " .. actionText,
		Font = Enum.Font.GothamBold,
		TextColor3 = stop.colour,
		Size = UDim2.new(1, -48, 0, 40),
		Position = UDim2.new(0, 24, 1, -58),
	}, 28)

	local prompt = make("ProximityPrompt", {
		ActionText = actionText,
		ObjectText = stop.title,
		MaxActivationDistance = 14,
		RequiresLineOfSight = false,
		HoldDuration = 0,
	}, board)
	prompt:SetAttribute("SafeSpaceId", stop.id)
	return board
end

-- One stop: a small covered pavilion beside the path, with a sign and a lamp.
local function buildStop(stop, index)
	local side = (index % 2 == 1) and -1 or 1
	local centre = Vector3.new(side * 18, GROUND, stopZ(index))
	local towardsPath = Vector3.new(-side, 0, 0)

	make("Part", {
		Name = "Floor",
		Size = Vector3.new(18, 0.6, 18),
		CFrame = CFrame.new(centre + Vector3.new(0, 0.3, 0)),
		Color = STONE,
		Material = Enum.Material.Slate,
	})
	make("Part", {
		Name = "Step",
		Size = Vector3.new(4, 0.3, 6),
		CFrame = CFrame.new(side * 7.5, GROUND + 0.15, centre.Z),
		Color = STONE,
		Material = Enum.Material.Slate,
	})
	for _, dx in ipairs({ -7.5, 7.5 }) do
		for _, dz in ipairs({ -7.5, 7.5 }) do
			make("Part", {
				Name = "Post",
				Size = Vector3.new(1, 10, 1),
				CFrame = CFrame.new(centre + Vector3.new(dx, 5.6, dz)),
				Color = WOOD,
				Material = Enum.Material.Wood,
			})
		end
	end
	make("Part", {
		Name = "Roof",
		Size = Vector3.new(20, 1, 20),
		CFrame = CFrame.new(centre + Vector3.new(0, 11.1, 0)),
		Color = stop.colour,
		Material = Enum.Material.SmoothPlastic,
	})
	make("Part", {
		Name = "RoofTop",
		Size = Vector3.new(13, 1, 13),
		CFrame = CFrame.new(centre + Vector3.new(0, 12.1, 0)),
		Color = stop.colour,
		Material = Enum.Material.SmoothPlastic,
	})
	local lamp = make("Part", {
		Name = "Lamp",
		Shape = Enum.PartType.Ball,
		Size = Vector3.new(1.5, 1.5, 1.5),
		CFrame = CFrame.new(centre + Vector3.new(0, 10, 0)),
		Color = LAMP_GLOW,
		Material = Enum.Material.Neon,
		CanCollide = false,
	})
	make("PointLight", { Range = 18, Brightness = 1.2, Color = LAMP_GLOW }, lamp)

	local signPos = centre + Vector3.new(side * 2, 4.6, 0)
	buildSign(stop, CFrame.lookAt(signPos, signPos + towardsPath), "Stop " .. index .. " of " .. #stops, "Read more")

	-- A bench by the path, halfway to the next stop.
	if index < #stops then
		buildBench(Vector3.new(side * 10, GROUND, stopZ(index) - STOP_GAP / 2), towardsPath)
	end
end

for index, stop in ipairs(stops) do
	buildStop(stop, index)
end

-- Lanterns along both sides of the path.
for z = pathStart - 6, pathEnd, -24 do
	buildLantern(Vector3.new(-7.5, GROUND, z))
	buildLantern(Vector3.new(7.5, GROUND, z))
end

-- The quiet garden: a round space with a pond, benches and the breathing sign.
local garden = Content.garden
make("Part", {
	Name = "GardenFloor",
	Shape = Enum.PartType.Cylinder,
	Size = Vector3.new(0.6, 44, 44),
	CFrame = upright(CFrame.new(0, GROUND + 0.3, gardenZ)),
	Color = STONE,
	Material = Enum.Material.Slate,
})
make("Part", {
	Name = "Pond",
	Shape = Enum.PartType.Cylinder,
	Size = Vector3.new(0.7, 16, 16),
	CFrame = upright(CFrame.new(0, GROUND + 0.35, gardenZ)),
	Color = Color3.fromRGB(90, 150, 190),
	Material = Enum.Material.Glass,
	Transparency = 0.15,
	Reflectance = 0.1,
})
for _, degrees in ipairs({ 45, 135, 225, 315 }) do
	local angle = math.rad(degrees)
	local position = Vector3.new(math.sin(angle) * 13, GROUND + 0.6, gardenZ + math.cos(angle) * 13)
	buildBench(position, Vector3.new(0, position.Y, gardenZ) - position)
end
for i = 1, 6 do
	local angle = math.rad(30 + i * 60)
	buildLantern(Vector3.new(math.sin(angle) * 20, GROUND + 0.6, gardenZ + math.cos(angle) * 20))
end
local gardenSignPos = Vector3.new(0, GROUND + 4.6, gardenZ - 17)
buildSign(garden, CFrame.lookAt(gardenSignPos, gardenSignPos + Vector3.new(0, 0, 1)), "The quiet garden", "Start breathing")

-- Trees, kept well back from the path and the stops.
local greens = {
	Color3.fromRGB(70, 120, 70),
	Color3.fromRGB(90, 140, 80),
	Color3.fromRGB(60, 105, 75),
	Color3.fromRGB(110, 150, 90),
}
for _ = 1, 170 do
	local side = rng:NextInteger(0, 1) == 0 and -1 or 1
	local x = side * rng:NextNumber(34, 285)
	local z = rng:NextNumber(-440, 140)
	local height = rng:NextNumber(7, 12)
	local leaves = rng:NextNumber(9, 14)
	make("Part", {
		Name = "Trunk",
		Shape = Enum.PartType.Cylinder,
		Size = Vector3.new(height, 1.6, 1.6),
		CFrame = upright(CFrame.new(x, GROUND + height / 2, z)),
		Color = Color3.fromRGB(105, 75, 55),
		Material = Enum.Material.Wood,
	})
	make("Part", {
		Name = "Leaves",
		Shape = Enum.PartType.Ball,
		Size = Vector3.new(leaves, leaves, leaves),
		CFrame = CFrame.new(x, GROUND + height + leaves * 0.3, z),
		Color = greens[rng:NextInteger(1, #greens)],
		Material = Enum.Material.Grass,
	})
end

-- Flowers along the edges of the path.
local flowerColours = {
	Color3.fromRGB(240, 200, 90),
	Color3.fromRGB(230, 140, 170),
	Color3.fromRGB(180, 160, 230),
	Color3.fromRGB(250, 250, 245),
}
for _ = 1, 140 do
	local side = rng:NextInteger(0, 1) == 0 and -1 or 1
	local z = rng:NextNumber(pathEnd, pathStart)
	local nearStep = false
	for index = 1, #stops do
		if math.abs(z - stopZ(index)) < 4 then
			nearStep = true
		end
	end
	if not nearStep then
		make("Part", {
			Name = "Flower",
			Shape = Enum.PartType.Ball,
			Size = Vector3.new(0.8, 0.8, 0.8),
			CFrame = CFrame.new(side * rng:NextNumber(6.6, 8.4), GROUND + 0.3, z),
			Color = flowerColours[rng:NextInteger(1, #flowerColours)],
			Material = Enum.Material.SmoothPlastic,
			CanCollide = false,
		})
	end
end
