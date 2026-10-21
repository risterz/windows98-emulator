"use client"

import { useState, useEffect, useRef } from "react"
import { Desktop } from "@/components/desktop"
import { Taskbar } from "@/components/taskbar"
import { StartMenu } from "@/components/start-menu"
import { WindowManager } from "@/components/window-manager"
import { Screensaver } from "@/components/screensaver"
import { useWindows } from "@/hooks/use-windows"
import { SystemSettingsProvider } from "@/hooks/use-system-settings"
import { playStartupSound } from "@/lib/sounds"

export default function Windows98Emulator() {
  const [showStartMenu, setShowStartMenu] = useState(false)
  const [showScreensaver, setShowScreensaver] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const hasPlayedAudioRef = useRef(false)
  const idleTimerRef = useRef<any>(null)

  const { windows, openWindow, closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindow } = useWindows()

  // Real-time taskbar clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Play startup sound on first user gesture
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!hasPlayedAudioRef.current) {
        hasPlayedAudioRef.current = true
        playStartupSound()
      }
    }

    window.addEventListener("click", handleFirstGesture, { once: true })
    window.addEventListener("keydown", handleFirstGesture, { once: true })
    return () => {
      window.removeEventListener("click", handleFirstGesture)
      window.removeEventListener("keydown", handleFirstGesture)
    }
  }, [])

  // Idle timer for screensaver (2 minutes)
  useEffect(() => {
    const resetIdle = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        setShowScreensaver(true)
      }, 120000)
    }

    resetIdle()
    window.addEventListener("mousemove", resetIdle)
    window.addEventListener("keydown", resetIdle)
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      window.removeEventListener("mousemove", resetIdle)
      window.removeEventListener("keydown", resetIdle)
    }
  }, [])

  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu)
  }

  const handleDesktopClick = () => {
    setShowStartMenu(false)
  }

  const handleOpenWindow = (app: string) => {
    if (app === "screensaver") {
      setShowScreensaver(true)
      setShowStartMenu(false)
    } else {
      openWindow(app)
    }
  }

  return (
    <SystemSettingsProvider>
      <div className="h-screen w-full overflow-hidden bg-[#008080] relative font-['Tahoma',_sans-serif] text-xs">
        <Desktop onClick={handleDesktopClick} onOpenWindow={handleOpenWindow} />

        <WindowManager
          windows={windows}
          onClose={closeWindow}
          onFocus={focusWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onUpdate={updateWindow}
          onOpenWindow={handleOpenWindow}
        />

        {showStartMenu && <StartMenu onClose={() => setShowStartMenu(false)} onOpenWindow={handleOpenWindow} />}

        <Taskbar
          onStartClick={handleStartClick}
          currentTime={currentTime}
          windows={windows}
          onWindowClick={focusWindow}
          onOpenWindow={handleOpenWindow}
        />

        {showScreensaver && (
          <Screensaver type="Starfield" onExit={() => setShowScreensaver(false)} />
        )}
      </div>
    </SystemSettingsProvider>
  )
}
