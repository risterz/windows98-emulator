"use client"

import { useState } from "react"

interface WindowState {
  id: string
  title: string
  app: string
  x: number
  y: number
  width: number
  height: number
  focused: boolean
  minimized: boolean
  maximized: boolean
}

export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>([])

  const openWindow = (app: string) => {
    const appConfigs: { [key: string]: { title: string; width: number; height: number } } = {
      notepad: { title: "Untitled - Notepad", width: 500, height: 400 },
      calculator: { title: "Calculator", width: 260, height: 320 },
      minesweeper: { title: "Minesweeper", width: 300, height: 360 },
      snake: { title: "Snake", width: 400, height: 500 },
      paint: { title: "untitled - Paint", width: 620, height: 460 },
      explorer: { title: "Exploring - C:\\", width: 620, height: 420 },
      documents: { title: "My Documents", width: 620, height: 420 },
      network: { title: "Network Neighborhood", width: 620, height: 420 },
      recycle: { title: "Recycle Bin", width: 560, height: 380 },
      solitaire: { title: "Solitaire", width: 700, height: 500 },
      control: { title: "Control Panel", width: 620, height: 450 },
      ie: { title: "Internet Explorer", width: 800, height: 560 },
      mediaplayer: { title: "Windows Media Player", width: 420, height: 340 },
      taskmgr: { title: "Windows Task Manager", width: 420, height: 360 },
      sysinfo: { title: "System Information", width: 500, height: 400 },
      wordpad: { title: "Document - WordPad", width: 640, height: 480 },
      charmap: { title: "Character Map", width: 450, height: 350 },
      volume: { title: "Volume Control", width: 340, height: 260 },
      soundrec: { title: "Sound Recorder", width: 350, height: 180 },
      freecell: { title: "FreeCell", width: 700, height: 500 },
      cmd: { title: "MS-DOS Prompt", width: 600, height: 360 },
      sysmon: { title: "System Monitor", width: 500, height: 400 },
      regedit: { title: "Registry Editor", width: 600, height: 450 },
      find: { title: "Find: All Files", width: 500, height: 350 },
      run: { title: "Run", width: 360, height: 170 },
      shutdown: { title: "Shut Down Windows", width: 360, height: 210 },
      cdplayer: { title: "CD Player", width: 320, height: 200 },
      outlook: { title: "Outlook Express", width: 700, height: 500 },
      defrag: { title: "Disk Defragmenter", width: 500, height: 350 },
    }

    const config = appConfigs[app] || { title: app, width: 450, height: 320 }

    const singleInstanceApps = [
      "calculator",
      "minesweeper",
      "snake",
      "solitaire",
      "control",
      "mediaplayer",
      "taskmgr",
      "volume",
      "paint",
      "recycle",
      "ie",
      "run",
      "shutdown",
      "cmd",
      "wordpad",
    ]

    setWindows((prev) => {
      // If single-instance app already exists, unminimize & focus it
      if (singleInstanceApps.includes(app)) {
        const existingIndex = prev.findIndex((w) => w.app === app)
        if (existingIndex !== -1) {
          return prev.map((w, idx) => ({
            ...w,
            focused: idx === existingIndex,
            minimized: idx === existingIndex ? false : w.minimized,
          }))
        }
      }

      const winWidth = typeof window !== "undefined" ? window.innerWidth : 1024
      const winHeight = typeof window !== "undefined" ? window.innerHeight : 768

      const targetWidth = Math.min(config.width, winWidth - 40)
      const targetHeight = Math.min(config.height, winHeight - 80)

      const maxX = Math.max(40, winWidth - targetWidth - 40)
      const maxY = Math.max(30, winHeight - targetHeight - 80)

      const initialX = Math.floor(Math.random() * (maxX - 40)) + 40
      const initialY = Math.floor(Math.random() * (maxY - 30)) + 30

      const newWindow: WindowState = {
        id: `${app}-${Date.now()}`,
        title: config.title,
        app,
        x: initialX,
        y: initialY,
        width: targetWidth,
        height: targetHeight,
        focused: true,
        minimized: false,
        maximized: false,
      }

      return [...prev.map((w) => ({ ...w, focused: false })), newWindow]
    })
  }

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  const focusWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        focused: w.id === id,
        minimized: w.id === id ? false : w.minimized,
      })),
    )
  }

  const minimizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true, focused: false } : w)))
  }

  const maximizeWindow = (id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)))
  }

  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, ...updates } : w)))
  }

  return {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindow,
  }
}
