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
    const appConfigs = {
      notepad: { title: "Untitled - Notepad", width: 500, height: 400 },
      calculator: { title: "Calculator", width: 250, height: 300 },
      minesweeper: { title: "Minesweeper", width: 300, height: 350 },
      snake: { title: "Snake", width: 400, height: 500 },
      paint: { title: "untitled - Paint", width: 600, height: 450 },
      explorer: { title: "Exploring - C:\\", width: 600, height: 400 },
      documents: { title: "My Documents", width: 600, height: 400 },
      network: { title: "Network Neighborhood", width: 600, height: 400 },
      recycle: { title: "Recycle Bin", width: 500, height: 350 },
      solitaire: { title: "Solitaire", width: 700, height: 500 },
      control: { title: "Control Panel", width: 600, height: 450 },
      ie: { title: "Internet Explorer", width: 800, height: 600 },
      mediaplayer: { title: "Windows Media Player", width: 400, height: 300 },
      taskmgr: { title: "Task Manager", width: 400, height: 300 },
      sysinfo: { title: "System Information", width: 500, height: 400 },
      wordpad: { title: "Document - WordPad", width: 600, height: 450 },
      charmap: { title: "Character Map", width: 450, height: 350 },
      volume: { title: "Volume Control", width: 300, height: 200 },
      soundrec: { title: "Sound Recorder", width: 350, height: 150 },
      freecell: { title: "FreeCell", width: 700, height: 500 },
      sysmon: { title: "System Monitor", width: 500, height: 400 },
      regedit: { title: "Registry Editor", width: 600, height: 450 },
      find: { title: "Find: All Files", width: 500, height: 350 },
      run: { title: "Run", width: 350, height: 150 },
      shutdown: { title: "Shut Down Windows", width: 350, height: 200 },
      cdplayer: { title: "CD Player", width: 300, height: 200 },
      outlook: { title: "Outlook Express", width: 700, height: 500 },
      defrag: { title: "Disk Defragmenter", width: 500, height: 350 },
    }

    const config = appConfigs[app as keyof typeof appConfigs] || { title: app, width: 400, height: 300 }

    const newWindow: WindowState = {
      id: `${app}-${Date.now()}`,
      title: config.title,
      app,
      x: Math.random() * 200 + 100,
      y: Math.random() * 150 + 50,
      width: config.width,
      height: config.height,
      focused: true,
      minimized: false,
      maximized: false,
    }

    setWindows((prev) => [...prev.map((w) => ({ ...w, focused: false })), newWindow])
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
