"use client"

import { useState, createContext, useContext, type ReactNode } from "react"

interface SystemSettings {
  display: {
    resolution: string
    colorDepth: string
    wallpaper: string
    screenSaver: string
    extendDesktop: boolean
  }
  sounds: {
    scheme: string
    volume: number
    events: { [key: string]: string }
  }
  mouse: {
    doubleClickSpeed: number
    pointerSpeed: number
    leftHanded: boolean
    showTrails: boolean
  }
  keyboard: {
    repeatDelay: number
    repeatRate: number
    cursorBlinkRate: number
  }
  system: {
    computerName: string
    workgroup: string
    description: string
  }
  dateTime: {
    timeZone: string
    format: string
    showSeconds: boolean
  }
  regional: {
    language: string
    country: string
    currency: string
    dateFormat: string
  }
  desktop: {
    theme: string
    iconSize: string
    showDesktopIcons: boolean
  }
}

const defaultSettings: SystemSettings = {
  display: {
    resolution: "1024 x 768",
    colorDepth: "True Color (32 bit)",
    wallpaper: "Windows 98",
    screenSaver: "None",
    extendDesktop: false,
  },
  sounds: {
    scheme: "Windows Default",
    volume: 75,
    events: {
      "Windows Logon": "logon.wav",
      "Windows Logoff": "logoff.wav",
      "Critical Stop": "chord.wav",
      Exclamation: "exclamation.wav",
    },
  },
  mouse: {
    doubleClickSpeed: 50,
    pointerSpeed: 50,
    leftHanded: false,
    showTrails: false,
  },
  keyboard: {
    repeatDelay: 50,
    repeatRate: 50,
    cursorBlinkRate: 50,
  },
  system: {
    computerName: "WIN98-PC",
    workgroup: "WORKGROUP",
    description: "Windows 98 Emulator",
  },
  dateTime: {
    timeZone: "Pacific Standard Time",
    format: "12-hour",
    showSeconds: true,
  },
  regional: {
    language: "English (United States)",
    country: "United States",
    currency: "Dollar",
    dateFormat: "M/d/yyyy",
  },
  desktop: {
    theme: "Windows Standard",
    iconSize: "Normal",
    showDesktopIcons: true,
  },
}

const SystemSettingsContext = createContext<{
  settings: SystemSettings
  updateSettings: (category: keyof SystemSettings, updates: any) => void
} | null>(null)

export function SystemSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)

  const updateSettings = (category: keyof SystemSettings, updates: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...updates },
    }))
  }

  return (
    <SystemSettingsContext.Provider value={{ settings, updateSettings }}>{children}</SystemSettingsContext.Provider>
  )
}

export function useSystemSettings() {
  const context = useContext(SystemSettingsContext)
  if (!context) {
    throw new Error("useSystemSettings must be used within SystemSettingsProvider")
  }
  return context
}
