"""Pack the three Lua scripts into SafeSpace.rbxlx, a place file Roblox Studio can open.

Run it again after changing any .lua file:  python3 build_place.py
"""

from pathlib import Path
from xml.dom import minidom

HERE = Path(__file__).parent

# (service, child folder or None, script class, script name, source file)
SCRIPTS = [
    ("ReplicatedStorage", None, "ModuleScript", "SafeSpaceContent", "SafeSpaceContent.lua"),
    ("ServerScriptService", None, "Script", "BuildSafeSpace", "BuildSafeSpace.server.lua"),
    ("StarterPlayer", "StarterPlayerScripts", "LocalScript", "SafeSpaceUI", "SafeSpaceUI.client.lua"),
]

ref_count = 0


def ref():
    global ref_count
    ref_count += 1
    return f"RBX{ref_count:04d}"


def item(cls, name, inner="", source=None):
    props = f'<string name="Name">{name}</string>'
    if source is not None:
        if "]]>" in source:
            raise ValueError(f"{name} contains ']]>', which can't go inside the place file")
        props += f'<ProtectedString name="Source"><![CDATA[{source}]]></ProtectedString>'
    return f'<Item class="{cls}" referent="{ref()}"><Properties>{props}</Properties>{inner}</Item>'


def main():
    parts = [item("Workspace", "Workspace")]
    for service, folder, cls, name, filename in SCRIPTS:
        script = item(cls, name, source=(HERE / filename).read_text(encoding="utf-8"))
        if folder:
            script = item(folder, folder, script)
        parts.append(item(service, service, script))

    xml = '<roblox version="4">' + "".join(parts) + "</roblox>"
    minidom.parseString(xml)  # fails loudly if the XML is broken
    (HERE / "SafeSpace.rbxlx").write_text(xml, encoding="utf-8")
    print("Wrote SafeSpace.rbxlx")


if __name__ == "__main__":
    main()
