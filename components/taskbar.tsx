"use client"
import { Button } from "@/components/ui/button"
import { Volume2, Wifi } from "lucide-react"

interface TaskbarProps {
  onStartClick: () => void
  currentTime: Date
  windows: any[]
  onWindowClick: (id: string) => void
}

export function Taskbar({ onStartClick, currentTime, windows, onWindowClick }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#c0c0c0] border-t-2 border-white border-l-2 border-r border-b border-[#808080] flex items-center px-1">
      {/* Start Button */}
      <Button
        onClick={onStartClick}
        className="h-6 px-2 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black text-xs font-bold flex items-center gap-1"
      >
        <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-sm"></div>
        </div>
        Start
      </Button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1 ml-1">
        {windows
          .filter((w) => !w.minimized)
          .map((window) => (
            <Button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-6 px-2 text-xs bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black truncate max-w-32 ${
                window.focused ? "border-inset" : ""
              }`}
            >
              {window.title}
            </Button>
          ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-1 mr-1">
        <Volume2 size={12} className="text-black" />
        <Wifi size={12} className="text-black" />
        <div className="bg-[#c0c0c0] border border-[#808080] px-2 py-1 text-xs text-black">
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
