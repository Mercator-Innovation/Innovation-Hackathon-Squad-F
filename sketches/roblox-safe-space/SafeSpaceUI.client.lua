-- SafeSpaceUI (LocalScript in StarterPlayer > StarterPlayerScripts)
-- The on-screen parts of the Safe Space world: the emergency bar, the
-- "Who can I talk to?" button, the reading panel, the breathing exercise,
-- and the lookout trail's lights counter, messages and bounce pad.

local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")
local ProximityPromptService = game:GetService("ProximityPromptService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")

local Content = require(ReplicatedStorage:WaitForChild("SafeSpaceContent"))
local player = Players.LocalPlayer

local CREAM = Color3.fromRGB(253, 250, 244)
local INK = Color3.fromRGB(30, 30, 40)
local WHITE = Color3.new(1, 1, 1)
local EMERGENCY_RED = Color3.fromRGB(170, 30, 40)
local LIGHT_YELLOW = Color3.fromRGB(255, 220, 90)
local BOUNCE = 85 -- how hard the pink pad throws you up
local messages = Content.messages

local byId = {}
for _, stop in ipairs(Content.stops) do
	byId[stop.id] = stop
end
for _, extra in ipairs({ Content.garden, Content.trail, Content.lookout }) do
	byId[extra.id] = extra
end

local function make(className, props, parent)
	local obj = Instance.new(className)
	for key, value in pairs(props) do
		obj[key] = value
	end
	obj.Parent = parent
	return obj
end

local gui = make("ScreenGui", {
	Name = "SafeSpaceUI",
	ResetOnSpawn = false,
	ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
}, player:WaitForChild("PlayerGui"))

-- Top of the screen: the emergency bar, always showing, and the talk button.
local topBar = make("Frame", {
	Name = "TopBar",
	BackgroundTransparency = 1,
	Size = UDim2.new(1, 0, 0, 0),
	AutomaticSize = Enum.AutomaticSize.Y,
}, gui)
make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	HorizontalAlignment = Enum.HorizontalAlignment.Center,
	Padding = UDim.new(0, 8),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, topBar)

local emergency = make("TextLabel", {
	Name = "Emergency",
	LayoutOrder = 1,
	Size = UDim2.new(1, 0, 0, 0),
	AutomaticSize = Enum.AutomaticSize.Y,
	BackgroundColor3 = EMERGENCY_RED,
	BorderSizePixel = 0,
	Font = Enum.Font.GothamBold,
	TextSize = 18,
	TextColor3 = WHITE,
	TextWrapped = true,
	Text = Content.emergency,
}, topBar)
make("UIPadding", {
	PaddingTop = UDim.new(0, 10),
	PaddingBottom = UDim.new(0, 10),
	PaddingLeft = UDim.new(0, 16),
	PaddingRight = UDim.new(0, 16),
}, emergency)

local buttonRow = make("Frame", {
	Name = "ButtonRow",
	LayoutOrder = 2,
	BackgroundTransparency = 1,
	Size = UDim2.new(1, 0, 0, 44),
}, topBar)
local contacts = byId[Content.contactsId]
local talkButton = make("TextButton", {
	Name = "TalkButton",
	AnchorPoint = Vector2.new(1, 0),
	Position = UDim2.new(1, -12, 0, 0),
	Size = UDim2.new(0, 220, 0, 44),
	BackgroundColor3 = contacts.colour,
	Font = Enum.Font.GothamBold,
	TextSize = 18,
	TextColor3 = WHITE,
	Text = "Who can I talk to?",
}, buttonRow)
make("UICorner", { CornerRadius = UDim.new(0, 10) }, talkButton)

-- How many of the trail's lights you've found.
local lightsLabel = make("TextLabel", {
	Name = "Lights",
	Visible = false,
	Position = UDim2.new(0, 12, 0, 0),
	Size = UDim2.new(0, 0, 0, 44),
	AutomaticSize = Enum.AutomaticSize.X,
	BackgroundColor3 = INK,
	BackgroundTransparency = 0.15,
	Font = Enum.Font.GothamBold,
	TextSize = 18,
	TextColor3 = LIGHT_YELLOW,
	Text = "",
}, buttonRow)
make("UICorner", { CornerRadius = UDim.new(0, 10) }, lightsLabel)
make("UIPadding", { PaddingLeft = UDim.new(0, 14), PaddingRight = UDim.new(0, 14) }, lightsLabel)

-- A short message that pops up under the buttons, then goes.
local toast = make("TextLabel", {
	Name = "Toast",
	LayoutOrder = 3,
	Visible = false,
	Size = UDim2.new(0.9, 0, 0, 0),
	AutomaticSize = Enum.AutomaticSize.Y,
	BackgroundColor3 = INK,
	BackgroundTransparency = 0.1,
	Font = Enum.Font.GothamBold,
	TextSize = 20,
	TextColor3 = WHITE,
	TextWrapped = true,
	Text = "",
}, topBar)
make("UISizeConstraint", { MaxSize = Vector2.new(520, math.huge) }, toast)
make("UICorner", { CornerRadius = UDim.new(0, 10) }, toast)
make("UIPadding", {
	PaddingTop = UDim.new(0, 12),
	PaddingBottom = UDim.new(0, 12),
	PaddingLeft = UDim.new(0, 16),
	PaddingRight = UDim.new(0, 16),
}, toast)
local toastRun = 0
local function showToast(words)
	toastRun = toastRun + 1
	local myRun = toastRun
	toast.Text = words
	toast.Visible = true
	task.delay(4, function()
		if myRun == toastRun then
			toast.Visible = false
		end
	end)
end

-- The reading panel.
local panel = make("Frame", {
	Name = "Panel",
	Visible = false,
	AnchorPoint = Vector2.new(0.5, 0.5),
	Position = UDim2.new(0.5, 0, 0.56, 0),
	Size = UDim2.new(0.92, 0, 0.7, 0),
	BackgroundColor3 = CREAM,
	BorderSizePixel = 0,
}, gui)
make("UISizeConstraint", { MaxSize = Vector2.new(560, 620) }, panel)
make("UICorner", { CornerRadius = UDim.new(0, 16) }, panel)
local stroke = make("UIStroke", { Thickness = 3 }, panel)

local header = make("TextLabel", {
	Name = "Title",
	Size = UDim2.new(1, 0, 0, 64),
	BorderSizePixel = 0,
	Font = Enum.Font.GothamBold,
	TextSize = 24,
	TextColor3 = WHITE,
	TextWrapped = true,
	TextXAlignment = Enum.TextXAlignment.Left,
}, panel)
make("UICorner", { CornerRadius = UDim.new(0, 16) }, header)
make("UIPadding", { PaddingLeft = UDim.new(0, 20), PaddingRight = UDim.new(0, 20) }, header)

local body = make("ScrollingFrame", {
	Name = "Body",
	Position = UDim2.new(0, 0, 0, 72),
	Size = UDim2.new(1, 0, 1, -148),
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	CanvasSize = UDim2.new(0, 0, 0, 0),
	AutomaticCanvasSize = Enum.AutomaticSize.Y,
	ScrollBarThickness = 8,
	ScrollBarImageColor3 = INK,
}, panel)
make("UIListLayout", { Padding = UDim.new(0, 10), SortOrder = Enum.SortOrder.LayoutOrder }, body)
make("UIPadding", {
	PaddingLeft = UDim.new(0, 20),
	PaddingRight = UDim.new(0, 24),
	PaddingTop = UDim.new(0, 8),
	PaddingBottom = UDim.new(0, 8),
}, body)

local closeButton = make("TextButton", {
	Name = "Close",
	AnchorPoint = Vector2.new(0.5, 1),
	Position = UDim2.new(0.5, 0, 1, -16),
	Size = UDim2.new(1, -40, 0, 52),
	Font = Enum.Font.GothamBold,
	TextSize = 20,
	TextColor3 = WHITE,
	Text = UserInputService.KeyboardEnabled and "Close (or press Q)" or "Close",
}, panel)
make("UICorner", { CornerRadius = UDim.new(0, 10) }, closeButton)

-- The breathing exercise, shown in place of the text in the garden.
local breathe = make("Frame", {
	Name = "Breathe",
	Visible = false,
	BackgroundTransparency = 1,
	Position = UDim2.new(0, 0, 0, 72),
	Size = UDim2.new(1, 0, 1, -148),
}, panel)
local SMALL, BIG = UDim2.fromScale(0.3, 0.3), UDim2.fromScale(0.72, 0.72)
local circle = make("Frame", {
	Name = "Circle",
	AnchorPoint = Vector2.new(0.5, 0.5),
	Position = UDim2.new(0.5, 0, 0.42, 0),
	Size = SMALL,
	BorderSizePixel = 0,
}, breathe)
make("UIAspectRatioConstraint", { AspectRatio = 1, DominantAxis = Enum.DominantAxis.Height }, circle)
make("UICorner", { CornerRadius = UDim.new(0.5, 0) }, circle)
local breatheText = make("TextLabel", {
	Name = "Words",
	AnchorPoint = Vector2.new(0.5, 1),
	Position = UDim2.new(0.5, 0, 1, -4),
	Size = UDim2.new(1, -40, 0, 40),
	BackgroundTransparency = 1,
	Font = Enum.Font.GothamBold,
	TextSize = 24,
	TextColor3 = INK,
	TextWrapped = true,
	Text = "",
}, breathe)

local openStop = nil
local openPart = nil
local breathRun = 0
local breathTween = nil

local function stopBreathing()
	breathRun = breathRun + 1
	if breathTween then
		breathTween:Cancel()
		breathTween = nil
	end
end

local function runBreathing(colour)
	stopBreathing()
	local myRun = breathRun
	circle.BackgroundColor3 = colour
	circle.Size = SMALL
	task.spawn(function()
		for _ = 1, Content.garden.breaths do
			for _, step in ipairs({ { "Breathe in...", BIG }, { "Breathe out...", SMALL } }) do
				if myRun ~= breathRun then
					return
				end
				breatheText.Text = step[1]
				breathTween = TweenService:Create(
					circle,
					TweenInfo.new(4, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut),
					{ Size = step[2] }
				)
				breathTween:Play()
				task.wait(4)
			end
		end
		if myRun == breathRun then
			breatheText.Text = "Well done. Stay as long as you like."
		end
	end)
end

local function addLine(line, order)
	local words, font, size = line, Enum.Font.Gotham, 20
	if line:sub(1, 3) == "## " then
		words, font, size = line:sub(4), Enum.Font.GothamBold, 22
	elseif line:sub(1, 2) == "- " then
		words = "•  " .. line:sub(3)
	end
	make("TextLabel", {
		LayoutOrder = order,
		Size = UDim2.new(1, 0, 0, 0),
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundTransparency = 1,
		Font = font,
		TextSize = size,
		TextColor3 = INK,
		TextWrapped = true,
		TextXAlignment = Enum.TextXAlignment.Left,
		Text = words,
	}, body)
end

local function closePanel()
	panel.Visible = false
	openStop = nil
	openPart = nil
	stopBreathing()
end

local function openPanel(stop, sourcePart)
	closePanel()
	openStop, openPart = stop, sourcePart
	header.Text = stop.title
	header.BackgroundColor3 = stop.colour
	stroke.Color = stop.colour
	closeButton.BackgroundColor3 = stop.colour

	for _, child in ipairs(body:GetChildren()) do
		if child:IsA("TextLabel") then
			child:Destroy()
		end
	end
	for order, line in ipairs(stop.lines) do
		addLine(line, order)
	end
	body.CanvasPosition = Vector2.new(0, 0)

	local isGarden = stop.id == Content.garden.id
	body.Visible = not isGarden
	breathe.Visible = isGarden
	if isGarden then
		runBreathing(stop.colour)
	end
	panel.Visible = true
end

-- Pressing E at a sign opens its panel; pressing E again closes it.
ProximityPromptService.PromptTriggered:Connect(function(prompt)
	local stop = byId[prompt:GetAttribute("SafeSpaceId") or ""]
	if not stop then
		return
	end
	if openStop == stop then
		closePanel()
	else
		openPanel(stop, prompt.Parent)
	end
end)

talkButton.Activated:Connect(function()
	if openStop == contacts then
		closePanel()
	else
		openPanel(contacts, nil)
	end
end)

closeButton.Activated:Connect(closePanel)

ContextActionService:BindAction("SafeSpaceClose", function(_, state)
	if state ~= Enum.UserInputState.Begin or not panel.Visible then
		return Enum.ContextActionResult.Pass
	end
	closePanel()
	return Enum.ContextActionResult.Sink
end, false, Enum.KeyCode.Q, Enum.KeyCode.ButtonB)

-- Close the panel when the player walks away from the sign they opened it at.
RunService.Heartbeat:Connect(function()
	if not openPart then
		return
	end
	local character = player.Character
	local root = character and character:FindFirstChild("HumanoidRootPart")
	if root and (root.Position - openPart.Position).Magnitude > 24 then
		closePanel()
	end
end)

-- The lookout trail. Lights are found on this screen only, so everyone
-- finds their own. The flags and water are handled by BuildSafeSpace.
local world = workspace:WaitForChild("SafeSpaceWorld")
local lights = {} -- light part -> where it floats, until it's found
local hooked = {}
local found = 0

local function isMe(hit)
	local character = player.Character
	return character ~= nil and hit:IsDescendantOf(character)
end

local function updateCounter()
	local total = world:GetAttribute("LightsTotal") or 0
	lightsLabel.Visible = total > 0
	lightsLabel.Text = string.format(messages.counter, found, total)
end
world:GetAttributeChangedSignal("LightsTotal"):Connect(updateCounter)
updateCounter()

local function lightUpGarden()
	for _, obj in ipairs(world:GetDescendants()) do
		if obj.Name == "GardenLantern" and obj:IsA("BasePart") then
			obj.Color = LIGHT_YELLOW
			local glow = obj:FindFirstChildOfClass("PointLight")
			if glow then
				glow.Color = LIGHT_YELLOW
				glow.Brightness = 3
				glow.Range = 28
			end
		end
	end
end

local function findLight(part)
	if not lights[part] then
		return
	end
	lights[part] = nil
	part.Transparency = 1
	local glow = part:FindFirstChildOfClass("PointLight")
	if glow then
		glow.Enabled = false
	end
	found = found + 1
	updateCounter()
	local total = world:GetAttribute("LightsTotal") or 0
	if found >= total then
		showToast(messages.allLights)
		lightUpGarden()
	else
		showToast(string.format(messages.lightFound, found, total))
	end
end

local bouncing = false
local function hook(obj)
	if hooked[obj] or not obj:IsA("BasePart") then
		return
	end
	if obj:GetAttribute("SafeSpaceLight") then
		hooked[obj] = true
		lights[obj] = obj.CFrame
		obj.Touched:Connect(function(hit)
			if isMe(hit) then
				findLight(obj)
			end
		end)
	elseif obj:GetAttribute("BouncePad") then
		hooked[obj] = true
		obj.Touched:Connect(function(hit)
			local root = player.Character and player.Character:FindFirstChild("HumanoidRootPart")
			if bouncing or not root or not isMe(hit) then
				return
			end
			bouncing = true
			local v = root.AssemblyLinearVelocity
			root.AssemblyLinearVelocity = Vector3.new(v.X, BOUNCE, v.Z)
			task.delay(0.6, function()
				bouncing = false
			end)
		end)
	end
end
for _, obj in ipairs(world:GetDescendants()) do
	hook(obj)
end
world.DescendantAdded:Connect(hook)

-- Lights bob and spin so they're easy to spot.
RunService.Heartbeat:Connect(function()
	local t = os.clock()
	for part, home in pairs(lights) do
		part.CFrame = home * CFrame.new(0, math.sin(t * 2) * 0.4, 0) * CFrame.Angles(0, t, 0)
	end
end)

player:GetAttributeChangedSignal("SafeSpaceFlag"):Connect(function()
	showToast(messages.flag)
end)
player:GetAttributeChangedSignal("SafeSpaceSplash"):Connect(function()
	showToast(messages.splash)
end)
