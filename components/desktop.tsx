"use client"

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
} from "lucide-react"
import { useSystemSettings } from "@/hooks/use-system-settings"
import { getWallpaperStyle } from "@/components/wallpapers"

interface DesktopProps {
  onClick: () => void
  onOpenWindow: (app: string) => void
}

export function Desktop({ onClick, onOpenWindow }: DesktopProps) {
  const { settings } = useSystemSettings()

  const desktopIcons = [
    { name: "My Computer", icon: Monitor, app: "explorer" },
    { name: "Recycle Bin", icon: Trash2, app: "recycle" },
    { name: "Internet Explorer", icon: Globe, app: "ie" },
    { name: "My Documents", icon: Folder, app: "documents" },
    { name: "Network Neighborhood", icon: HardDrive, app: "network" },
    { name: "Control Panel", icon: Settings, app: "control" },
    { name: "Notepad", icon: FileText, app: "notepad" },
    { name: "Calculator", icon: Calculator, app: "calculator" },
    { name: "Paint", icon: Palette, app: "paint" },
    { name: "Solitaire", icon: Gamepad2, app: "solitaire" },
    { name: "Minesweeper", icon: Gamepad2, app: "minesweeper" },
    { name: "Snake", icon: Gamepad2, app: "snake" },
    { name: "Media Player", icon: Music, app: "mediaplayer" },
  ]

  const wallpaperStyle = getWallpaperStyle(settings.display.wallpaper)

  return (
    <div className="absolute inset-0 p-2" onClick={onClick} style={wallpaperStyle}>
      {settings.desktop.showDesktopIcons && (
        <div className="grid grid-cols-1 gap-4 w-20">
          {desktopIcons.map((icon, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:bg-blue-600/20 p-2 rounded transition-colors"
              onDoubleClick={(e) => {
                e.stopPropagation()
                onOpenWindow(icon.app)
              }}
              style={{
                fontSize:
                  settings.desktop.iconSize === "Small"
                    ? "10px"
                    : settings.desktop.iconSize === "Large"
                      ? "14px"
                      : "12px",
              }}
            >
              <div
                className="mb-1 text-white drop-shadow-lg"
                style={{
                  width:
                    settings.desktop.iconSize === "Small"
                      ? "24px"
                      : settings.desktop.iconSize === "Large"
                        ? "40px"
                        : "32px",
                  height:
                    settings.desktop.iconSize === "Small"
                      ? "24px"
                      : settings.desktop.iconSize === "Large"
                        ? "40px"
                        : "32px",
                }}
              >
                <icon.icon
                  size={settings.desktop.iconSize === "Small" ? 24 : settings.desktop.iconSize === "Large" ? 40 : 32}
                />
              </div>
              <span className="text-white text-center leading-tight drop-shadow-lg font-bold">{icon.name}</span>
            </div>
          ))}
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
