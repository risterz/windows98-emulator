"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSystemSettings } from "@/hooks/use-system-settings"
import { wallpapers } from "@/components/wallpapers"
import {
  Monitor,
  Volume2,
  Mouse,
  Keyboard,
  Settings,
  Palette,
  Clock,
  Globe,
  HardDrive,
  Users,
  Printer,
  Network,
  Shield,
} from "lucide-react"

export function ControlPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { settings, updateSettings } = useSystemSettings()

  const categories = [
    { name: "Display", icon: Monitor, description: "Change your display settings" },
    { name: "Sounds", icon: Volume2, description: "Assign sounds to program events" },
    { name: "Mouse", icon: Mouse, description: "Change mouse settings" },
    { name: "Keyboard", icon: Keyboard, description: "Change keyboard settings" },
    { name: "System", icon: Settings, description: "View system information" },
    { name: "Desktop Themes", icon: Palette, description: "Change desktop appearance" },
    { name: "Date/Time", icon: Clock, description: "Set date and time" },
    { name: "Regional Settings", icon: Globe, description: "Change regional settings" },
    { name: "Add/Remove Programs", icon: HardDrive, description: "Install or remove programs" },
    { name: "Users", icon: Users, description: "Manage user accounts" },
    { name: "Network", icon: Network, description: "Configure network settings" },
    { name: "Security", icon: Shield, description: "Security and privacy settings" },
    { name: "Printers", icon: Printer, description: "Add and configure printers" },
  ]

  const DisplaySettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Display Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Screen resolution:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.display.resolution}
            onChange={(e) => updateSettings("display", { resolution: e.target.value })}
          >
            <option>640 x 480</option>
            <option>800 x 600</option>
            <option>1024 x 768</option>
            <option>1280 x 1024</option>
            <option>1600 x 1200</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Color quality:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.display.colorDepth}
            onChange={(e) => updateSettings("display", { colorDepth: e.target.value })}
          >
            <option>16 colors</option>
            <option>256 colors</option>
            <option>High Color (16 bit)</option>
            <option>True Color (32 bit)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Wallpaper:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.display.wallpaper}
            onChange={(e) => updateSettings("display", { wallpaper: e.target.value })}
          >
            {Object.keys(wallpapers).map((wallpaper) => (
              <option key={wallpaper} value={wallpaper}>
                {wallpaper}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Wallpaper Preview:</label>
          <div
            className="w-full h-24 border border-[#808080] rounded"
            style={wallpapers[settings.display.wallpaper as keyof typeof wallpapers]?.style}
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Screen saver:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.display.screenSaver}
            onChange={(e) => updateSettings("display", { screenSaver: e.target.value })}
          >
            <option>None</option>
            <option>Flying Windows</option>
            <option>Starfield Simulation</option>
            <option>3D Maze</option>
            <option>Mystify Your Mind</option>
            <option>Beziers</option>
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={settings.display.extendDesktop}
              onChange={(e) => updateSettings("display", { extendDesktop: e.target.checked })}
            />
            Extend my Windows desktop onto this monitor
          </label>
        </div>
        <div className="flex gap-2">
          <Button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] text-xs">Apply</Button>
          <Button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] text-xs">Preview</Button>
        </div>
      </div>
    </div>
  )

  const SoundSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Sounds Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Sound scheme:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.sounds.scheme}
            onChange={(e) => updateSettings("sounds", { scheme: e.target.value })}
          >
            <option>Windows Default</option>
            <option>No Sounds</option>
            <option>Jungle</option>
            <option>Musica</option>
            <option>Robotz</option>
            <option>Utopia</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Master Volume: {settings.sounds.volume}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.sounds.volume}
            onChange={(e) => updateSettings("sounds", { volume: Number.parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Program events:</label>
          <div className="border border-[#808080] h-32 p-2 text-xs overflow-y-auto bg-white">
            <div className="space-y-1">
              <div className="font-bold">Windows</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Asterisk</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Critical Stop</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Default Beep</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Exclamation</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Exit Windows</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Question</div>
              <div className="ml-4 cursor-pointer hover:bg-blue-100 p-1">• Start Windows</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] text-xs">Play</Button>
          <Button className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] text-xs">Browse...</Button>
          <Button className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] text-xs">Details</Button>
        </div>
      </div>
    </div>
  )

  const MouseSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Mouse Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={settings.mouse.leftHanded}
              onChange={(e) => updateSettings("mouse", { leftHanded: e.target.checked })}
            />
            Left-handed
          </label>
        </div>
        <div>
          <label className="block text-xs mb-1">Double-click speed:</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">Slow</span>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.mouse.doubleClickSpeed}
              onChange={(e) => updateSettings("mouse", { doubleClickSpeed: Number.parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-xs">Fast</span>
          </div>
        </div>
        <div>
          <label className="block text-xs mb-1">Pointer speed:</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">Slow</span>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.mouse.pointerSpeed}
              onChange={(e) => updateSettings("mouse", { pointerSpeed: Number.parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-xs">Fast</span>
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={settings.mouse.showTrails}
              onChange={(e) => updateSettings("mouse", { showTrails: e.target.checked })}
            />
            Show pointer trails
          </label>
        </div>
        <div className="border border-[#808080] p-4 bg-gray-100">
          <div className="text-xs mb-2">Test area - Double-click the folder:</div>
          <div className="w-8 h-8 bg-yellow-300 border border-black cursor-pointer"></div>
        </div>
      </div>
    </div>
  )

  const KeyboardSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Keyboard Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Repeat delay:</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">Long</span>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.keyboard.repeatDelay}
              onChange={(e) => updateSettings("keyboard", { repeatDelay: Number.parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-xs">Short</span>
          </div>
        </div>
        <div>
          <label className="block text-xs mb-1">Repeat rate:</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">Slow</span>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.keyboard.repeatRate}
              onChange={(e) => updateSettings("keyboard", { repeatRate: Number.parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-xs">Fast</span>
          </div>
        </div>
        <div>
          <label className="block text-xs mb-1">Cursor blink rate:</label>
          <div className="flex items-center gap-2">
            <span className="text-xs">None</span>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.keyboard.cursorBlinkRate}
              onChange={(e) => updateSettings("keyboard", { cursorBlinkRate: Number.parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="text-xs">Fast</span>
          </div>
        </div>
        <div className="border border-[#808080] p-4 bg-white">
          <div className="text-xs mb-2">Click here and hold down a key to test repeat rate:</div>
          <input type="text" className="w-full p-2 border border-[#808080]" placeholder="Test typing here..." />
        </div>
      </div>
    </div>
  )

  const SystemSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">System Properties</h3>
      <div className="space-y-4">
        <div className="border border-[#808080] p-3 bg-gray-50">
          <div className="text-xs font-bold mb-2">System:</div>
          <div className="text-xs">Microsoft Windows 98</div>
          <div className="text-xs">Version 4.10.2222 A</div>
          <div className="text-xs">Copyright © 1981-1998 Microsoft Corporation</div>
        </div>
        <div>
          <label className="block text-xs mb-1">Computer name:</label>
          <input
            type="text"
            value={settings.system.computerName}
            onChange={(e) => updateSettings("system", { computerName: e.target.value })}
            className="w-full p-1 border border-[#808080]"
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Workgroup:</label>
          <input
            type="text"
            value={settings.system.workgroup}
            onChange={(e) => updateSettings("system", { workgroup: e.target.value })}
            className="w-full p-1 border border-[#808080]"
          />
        </div>
        <div>
          <label className="block text-xs mb-1">Computer description:</label>
          <input
            type="text"
            value={settings.system.description}
            onChange={(e) => updateSettings("system", { description: e.target.value })}
            className="w-full p-1 border border-[#808080]"
          />
        </div>
        <div className="border border-[#808080] p-3 bg-gray-50">
          <div className="text-xs font-bold mb-2">Registered to:</div>
          <div className="text-xs">Windows 98 User</div>
          <div className="text-xs">Emulator Version</div>
          <div className="text-xs">12345-67890-12345-67890</div>
        </div>
      </div>
    </div>
  )

  const DateTimeSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Date/Time Properties</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Time zone:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.dateTime.timeZone}
            onChange={(e) => updateSettings("dateTime", { timeZone: e.target.value })}
          >
            <option>Pacific Standard Time</option>
            <option>Mountain Standard Time</option>
            <option>Central Standard Time</option>
            <option>Eastern Standard Time</option>
            <option>Greenwich Mean Time</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Time format:</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="timeFormat"
                value="12-hour"
                checked={settings.dateTime.format === "12-hour"}
                onChange={(e) => updateSettings("dateTime", { format: e.target.value })}
              />
              12-hour (3:30 PM)
            </label>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="radio"
                name="timeFormat"
                value="24-hour"
                checked={settings.dateTime.format === "24-hour"}
                onChange={(e) => updateSettings("dateTime", { format: e.target.value })}
              />
              24-hour (15:30)
            </label>
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={settings.dateTime.showSeconds}
              onChange={(e) => updateSettings("dateTime", { showSeconds: e.target.checked })}
            />
            Show seconds in taskbar clock
          </label>
        </div>
        <div className="border border-[#808080] p-3 bg-gray-50">
          <div className="text-xs font-bold mb-2">Current date and time:</div>
          <div className="text-xs">{new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  )

  const RegionalSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Regional Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Language:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.regional.language}
            onChange={(e) => updateSettings("regional", { language: e.target.value })}
          >
            <option>English (United States)</option>
            <option>English (United Kingdom)</option>
            <option>Spanish (Spain)</option>
            <option>French (France)</option>
            <option>German (Germany)</option>
            <option>Japanese</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Country/Region:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.regional.country}
            onChange={(e) => updateSettings("regional", { country: e.target.value })}
          >
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Currency:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.regional.currency}
            onChange={(e) => updateSettings("regional", { currency: e.target.value })}
          >
            <option>Dollar</option>
            <option>Euro</option>
            <option>Pound</option>
            <option>Yen</option>
            <option>Canadian Dollar</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Date format:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.regional.dateFormat}
            onChange={(e) => updateSettings("regional", { dateFormat: e.target.value })}
          >
            <option>M/d/yyyy</option>
            <option>d/M/yyyy</option>
            <option>yyyy-MM-dd</option>
            <option>dd.MM.yyyy</option>
          </select>
        </div>
      </div>
    </div>
  )

  const DesktopSettings = () => (
    <div className="p-4 bg-white">
      <h3 className="font-bold mb-4">Desktop Themes</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Theme:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.desktop.theme}
            onChange={(e) => updateSettings("desktop", { theme: e.target.value })}
          >
            <option>Windows Standard</option>
            <option>Windows Classic</option>
            <option>High Contrast</option>
            <option>Jungle</option>
            <option>Baseball</option>
            <option>Mystery</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1">Icon size:</label>
          <select
            className="w-full p-1 border border-[#808080]"
            value={settings.desktop.iconSize}
            onChange={(e) => updateSettings("desktop", { iconSize: e.target.value })}
          >
            <option>Small</option>
            <option>Normal</option>
            <option>Large</option>
          </select>
        </div>
        <div>
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={settings.desktop.showDesktopIcons}
              onChange={(e) => updateSettings("desktop", { showDesktopIcons: e.target.checked })}
            />
            Show desktop icons
          </label>
        </div>
        <div className="border border-[#808080] p-3 bg-gray-50">
          <div className="text-xs font-bold mb-2">Preview:</div>
          <div className="w-full h-20 bg-teal-600 border border-black relative">
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-300 border-t border-black"></div>
            <div className="absolute top-2 left-2 w-4 h-4 bg-white border border-black"></div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSettings = () => {
    switch (selectedCategory) {
      case "Display":
        return <DisplaySettings />
      case "Sounds":
        return <SoundSettings />
      case "Mouse":
        return <MouseSettings />
      case "Keyboard":
        return <KeyboardSettings />
      case "System":
        return <SystemSettings />
      case "Date/Time":
        return <DateTimeSettings />
      case "Regional Settings":
        return <RegionalSettings />
      case "Desktop Themes":
        return <DesktopSettings />
      default:
        return (
          <div className="p-4 bg-white">
            <h3 className="font-bold mb-4">{selectedCategory} Settings</h3>
            <p className="text-sm text-gray-600">Settings for {selectedCategory} would appear here.</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-xs">Enable {selectedCategory}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">Configuration:</span>
                <select className="p-1 border border-[#808080] text-xs">
                  <option>Default</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-full bg-[#c0c0c0] flex">
      {!selectedCategory ? (
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white border border-[#808080] cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedCategory(category.name)}
              >
                <category.icon size={32} className="text-blue-600" />
                <div>
                  <div className="font-bold text-sm">{category.name}</div>
                  <div className="text-xs text-gray-600">{category.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-[#c0c0c0] border-b border-[#808080] p-2 flex items-center gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] text-xs hover:bg-[#c0c0c0]"
            >
              ← Back
            </Button>
            <span className="font-bold">{selectedCategory}</span>
          </div>
          <div className="flex-1 overflow-auto">{renderSettings()}</div>
          <div className="bg-[#c0c0c0] border-t border-[#808080] p-2 flex justify-end gap-2">
            <Button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] text-xs hover:bg-[#c0c0c0]">OK</Button>
            <Button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] text-xs hover:bg-[#c0c0c0]"
            >
              Cancel
            </Button>
            <Button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] text-xs hover:bg-[#c0c0c0]">Apply</Button>
          </div>
        </div>
      )}
    </div>
  )
}
