"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Settings,
  Search,
  FileText,
  Calculator,
  Gamepad2,
  Palette,
  Power,
  User,
  Folder,
  HelpCircle,
  Globe,
  Music,
  Monitor,
  Zap,
  Wrench,
} from "lucide-react"

interface StartMenuProps {
  onClose: () => void
  onOpenWindow: (app: string) => void
}

export function StartMenu({ onClose, onOpenWindow }: StartMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const menuItems = [
    { name: "Programs", icon: Folder, hasSubmenu: true },
    { name: "Documents", icon: FileText, app: "documents" },
    { name: "Settings", icon: Settings, hasSubmenu: true },
    { name: "Find", icon: Search, app: "find" },
    { name: "Help", icon: HelpCircle, app: "help" },
    { name: "Run...", icon: Zap, app: "run" },
  ]

  const programs = [
    {
      name: "Accessories",
      items: [
        { name: "Notepad", app: "notepad", icon: FileText },
        { name: "Calculator", app: "calculator", icon: Calculator },
        { name: "Paint", app: "paint", icon: Palette },
        { name: "WordPad", app: "wordpad", icon: FileText },
        { name: "Character Map", app: "charmap", icon: FileText },
        { name: "System Information", app: "sysinfo", icon: Monitor },
      ],
    },
    {
      name: "Games",
      items: [
        { name: "Solitaire", app: "solitaire", icon: Gamepad2 },
        { name: "Minesweeper", app: "minesweeper", icon: Gamepad2 },
        { name: "Snake", app: "snake", icon: Gamepad2 },
        { name: "FreeCell", app: "freecell", icon: Gamepad2 },
        { name: "Hearts", app: "hearts", icon: Gamepad2 },
      ],
    },
    {
      name: "Internet Tools",
      items: [
        { name: "Internet Explorer", app: "ie", icon: Globe },
        { name: "Outlook Express", app: "outlook", icon: FileText },
      ],
    },
    {
      name: "Multimedia",
      items: [
        { name: "Media Player", app: "mediaplayer", icon: Music },
        { name: "Sound Recorder", app: "soundrec", icon: Music },
        { name: "CD Player", app: "cdplayer", icon: Music },
        { name: "Volume Control", app: "volume", icon: Music },
      ],
    },
    {
      name: "System Tools",
      items: [
        { name: "Task Manager", app: "taskmgr", icon: Wrench },
        { name: "Registry Editor", app: "regedit", icon: Wrench },
        { name: "System Monitor", app: "sysmon", icon: Monitor },
        { name: "Disk Defragmenter", app: "defrag", icon: Wrench },
      ],
    },
  ]

  const settings = [
    { name: "Control Panel", app: "control", icon: Settings },
    { name: "Printers", app: "printers", icon: Settings },
    { name: "Taskbar & Start Menu", app: "taskbar", icon: Settings },
    { name: "Folder Options", app: "folder", icon: Settings },
    { name: "Active Desktop", app: "desktop", icon: Settings },
  ]

  const handleItemClick = (app?: string) => {
    if (app) {
      onOpenWindow(app)
      onClose()
    }
  }

  return (
    <div className="absolute bottom-8 left-0 w-64 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 flex items-center gap-2">
        <User size={16} />
        <span className="text-sm font-bold">Windows 98</span>
      </div>

      {/* Menu Items */}
      <div className="p-1">
        {menuItems.map((item, index) => (
          <div key={index} className="relative group">
            <Button
              className="w-full justify-start h-8 px-2 bg-transparent hover:bg-blue-600 hover:text-white text-black text-xs border-none"
              onClick={() => (item.hasSubmenu ? null : handleItemClick(item.app))}
            >
              <item.icon size={16} className="mr-2" />
              {item.name}
              {item.hasSubmenu && <span className="ml-auto">▶</span>}
            </Button>

            {item.name === "Programs" && (
              <div className="absolute left-full top-0 w-48 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {programs.map((category, catIndex) => (
                  <div
                    key={catIndex}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Button className="w-full justify-start h-8 px-2 bg-transparent hover:bg-blue-600 hover:text-white text-black text-xs border-none">
                      <Folder size={16} className="mr-2" />
                      {category.name}
                      <span className="ml-auto">▶</span>
                    </Button>
                    {hoveredCategory === category.name && (
                      <div className="absolute left-full top-0 w-44 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-60">
                        {category.items.map((program, progIndex) => (
                          <Button
                            key={progIndex}
                            className="w-full justify-start h-8 px-2 bg-transparent hover:bg-blue-600 hover:text-white text-black text-xs border-none"
                            onClick={() => handleItemClick(program.app)}
                          >
                            <program.icon size={16} className="mr-2" />
                            {program.name}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {item.name === "Settings" && (
              <div className="absolute left-full top-0 w-48 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {settings.map((setting, setIndex) => (
                  <Button
                    key={setIndex}
                    className="w-full justify-start h-8 px-2 bg-transparent hover:bg-blue-600 hover:text-white text-black text-xs border-none"
                    onClick={() => handleItemClick(setting.app)}
                  >
                    <setting.icon size={16} className="mr-2" />
                    {setting.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="border-t border-[#808080] my-1"></div>

        <Button
          className="w-full justify-start h-8 px-2 bg-transparent hover:bg-blue-600 hover:text-white text-black text-xs border-none"
          onClick={() => onOpenWindow("shutdown")}
        >
          <Power size={16} className="mr-2" />
          Shut Down...
        </Button>
      </div>
    </div>
  )
}
