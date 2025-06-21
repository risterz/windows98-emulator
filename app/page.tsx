"use client"

import { useState, useEffect } from "react"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { StartMenu } from "@/components/start-menu"
import { WindowManager } from "@/components/window-manager"
import { useWindows } from "@/hooks/use-windows"
import { SystemSettingsProvider } from "@/hooks/use-system-settings"

export default function Windows98Emulator() {
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { windows, openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindow } = useWindows()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu)
  }

  const handleDesktopClick = () => {
    setShowStartMenu(false)
  }

  return (
    <SystemSettingsProvider>
      <div className="h-screen w-full overflow-hidden bg-[#008080] relative font-['Tahoma',_sans-serif] text-xs">
        <Desktop onClick={handleDesktopClick} onOpenWindow={openWindow} />

        <WindowManager
          windows={windows}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onUpdate={updateWindow}
        />

        {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} onOpenWindow={openWindow} />}

        <Taskbar
          onStartClick={handleStartClick}
          currentTime={currentTime}
          windows={windows}
          onWindowClick={focusWindow}
        />
      </div>
    </SystemSettingsProvider>
  )
}
