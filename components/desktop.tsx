"use client"

import { useState } from "react"
import {
  Monitor,
  FileText,
  Calculator,
  Gamepad2,
  Palette,
  Folder,
  Trash2,
  Globe,
  Music,
  Settings,
  HardDrive,
  Terminal,
  Disc,
  Sparkles,
} from "lucide-react"
import { useSystemSettings } from "@/hooks/use-system-settings"
import { getWallpaperStyle } from "@/components/wallpapers"
import { playClick } from "@/lib/sounds"

interface DesktopProps {
  onClick: () => void
  onOpenWindow: (app: string) => void
}

export function Desktop({ onClick, onOpenWindow }: DesktopProps) {
  const { settings } = useSystemSettings()
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  const desktopIcons = [
    { name: "My Computer", icon: Monitor, app: "explorer" },
    { name: "My Documents", icon: Folder, app: "documents" },
    { name: "Internet Explorer", icon: Globe, app: "ie" },
    { name: "Network Neighborhood", icon: HardDrive, app: "network" },
    { name: "Recycle Bin", icon: Trash2, app: "recycle" },
    { name: "Control Panel", icon: Settings, app: "control" },
    { name: "MS-DOS Prompt", icon: Terminal, app: "cmd" },
    { name: "3D Pinball", icon: Disc, app: "pinball" },
    { name: "Notepad", icon: FileText, app: "notepad" },
    { name: "WordPad", icon: FileText, app: "wordpad" },
    { name: "Calculator", icon: Calculator, app: "calculator" },
    { name: "Paint", icon: Palette, app: "paint" },
    { name: "Media Player", icon: Music, app: "mediaplayer" },
    { name: "Sound Recorder", icon: Music, app: "soundrec" },
    { name: "Solitaire", icon: Gamepad2, app: "solitaire" },
    { name: "FreeCell", icon: Gamepad2, app: "freecell" },
    { name: "Minesweeper", icon: Gamepad2, app: "minesweeper" },
    { name: "Snake", icon: Gamepad2, app: "snake" },
  ]

  const wallpaperStyle = getWallpaperStyle(settings.display.wallpaper)

  const handleIconClick = (e: React.MouseEvent, app: string) => {
    e.stopPropagation()
    playClick()
    setSelectedApp(app)
    setContextMenu(null)
    onOpenWindow(app)
  }

  const handleContainerClick = () => {
    setSelectedApp(null)
    setContextMenu(null)
    onClick()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    playClick()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  return (
    <div
      className="absolute inset-x-0 top-0 bottom-8 p-3 overflow-x-auto overflow-y-hidden select-none z-0"
      onClick={handleContainerClick}
      onContextMenu={handleContextMenu}
      style={wallpaperStyle}
    >
      {settings.desktop.showDesktopIcons && (
        <div className="flex flex-col flex-wrap content-start items-start gap-y-1.5 gap-x-3 h-full max-h-full">
          {desktopIcons.map((icon, index) => {
            const isSelected = selectedApp === icon.app
            const iconSize =
              settings.desktop.iconSize === "Small" ? 24 : settings.desktop.iconSize === "Large" ? 40 : 32
            const fontSize =
              settings.desktop.iconSize === "Small"
                ? "10px"
                : settings.desktop.iconSize === "Large"
                  ? "13px"
                  : "11px"

            return (
              <div
                key={index}
                className={`flex flex-col items-center justify-start cursor-pointer w-20 p-1.5 rounded transition-colors group ${
                  isSelected
                    ? "bg-[#000080]/80 outline outline-1 outline-dashed outline-white/80"
                    : "hover:bg-blue-600/25 active:bg-blue-700/50"
                }`}
                onClick={(e) => handleIconClick(e, icon.app)}
                onDoubleClick={(e) => handleIconClick(e, icon.app)}
                title={`Click to open ${icon.name}`}
                style={{ fontSize }}
              >
                <div
                  className="mb-1 text-white drop-shadow-md flex items-center justify-center"
                  style={{ width: iconSize, height: iconSize }}
                >
                  <icon.icon size={iconSize} />
                </div>
                <span
                  className={`text-center leading-tight drop-shadow font-normal px-1 py-0.5 rounded break-words w-full select-none ${
                    isSelected ? "bg-[#000080] text-white font-semibold" : "text-white"
                  }`}
                >
                  {icon.name}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* Right-click Desktop Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-2xl p-0.5 w-48 text-xs z-[80] select-none text-black"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer flex justify-between">
            <span>Arrange Icons</span>
            <span>▶</span>
          </div>
          <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">
            <span>Line up Icons</span>
          </div>
          <div
            className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer"
            onClick={() => {
              setContextMenu(null)
              playClick()
            }}
          >
            <span>Refresh</span>
          </div>
          <div className="border-t border-[#808080] my-1" />
          <div
            className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer"
            onClick={() => {
              onOpenWindow("notepad")
              setContextMenu(null)
            }}
          >
            <span>New Text Document</span>
          </div>
          <div
            className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer"
            onClick={() => {
              onOpenWindow("pinball")
              setContextMenu(null)
            }}
          >
            <span>Launch 3D Pinball</span>
          </div>
          <div className="border-t border-[#808080] my-1" />
          <div
            className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer font-bold"
            onClick={() => {
              onOpenWindow("control")
              setContextMenu(null)
            }}
          >
            <span>Properties</span>
          </div>
        </div>
      )}

      {/* Wallpaper overlay effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            settings.display.wallpaper === "Matrix"
              ? `url("data:image/svg+xml,%3Csvg width='100' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Canimation id='fall' attributeName='y' values='-20;400' dur='3s' repeatCount='indefinite'/%3E%3C/defs%3E%3Ctext x='10' y='0' fontFamily='monospace' fontSize='14' fill='%2300ff00' opacity='0.7'%3E1010110%3Canimation href='%23fall'/%3E%3C/text%3E%3Ctext x='30' y='-50' fontFamily='monospace' fontSize='14' fill='%2300ff00' opacity='0.5'%3E0110101%3Canimation href='%23fall'/%3E%3C/text%3E%3Ctext x='50' y='-100' fontFamily='monospace' fontSize='14' fill='%2300ff00' opacity='0.6'%3E1100110%3Canimation href='%23fall'/%3E%3C/text%3E%3C/svg%3E")`
              : undefined,
        }}
      />
    </div>
  )
}
