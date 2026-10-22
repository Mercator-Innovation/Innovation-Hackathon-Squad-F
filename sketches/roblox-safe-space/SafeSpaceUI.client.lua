-- SafeSpaceUI (LocalScript in StarterPlayer > StarterPlayerScripts)
-- The on-screen parts of the Safe Space world: the emergency bar, the
-- "Who can I talk to?" button, the reading panel and the breathing exercise.

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

local byId = {}
for _, stop in ipairs(Content.stops) do
	byId[stop.id] = stop
end
byId[Content.garden.id] = Content.garden

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
