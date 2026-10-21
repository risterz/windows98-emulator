"use client"
import { Button } from "@/components/ui/button"
import { Volume2, Wifi } from "lucide-react"

interface TaskbarProps {
  onStartClick: () => void
  currentTime: Date
  windows: any[]
  onWindowClick: (id: string) => void
  onOpenWindow?: (app: string) => void
}

export function Taskbar({ onStartClick, currentTime, windows, onWindowClick, onOpenWindow }: TaskbarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#c0c0c0] border-t-2 border-white border-l-2 border-r border-b border-[#808080] flex items-center px-1 z-40 select-none">
      {/* Start Button */}
      <Button
        onClick={onStartClick}
        className="h-6 px-2 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] active:border-inset active:border-[#808080] text-black text-xs font-bold flex items-center gap-1 shadow-sm"
      >
        <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-yellow-500 rounded-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-sm"></div>
        </div>
        Start
      </Button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1 ml-1 overflow-x-auto">
        {windows
          .filter((w) => !w.minimized)
          .map((window) => (
            <Button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-6 px-2 text-xs text-black truncate max-w-36 flex items-center gap-1 border-2 ${
                window.focused
                  ? "bg-[#dcdcdc] border-[#808080] border-r-white border-b-white font-bold"
                  : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
              }`}
            >
              <span className="truncate">{window.title}</span>
            </Button>
          ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-1.5 mr-1 pl-1 border-l border-[#808080] bg-[#c0c0c0]">
        <button
          onClick={() => onOpenWindow?.("volume")}
          className="p-1 hover:bg-[#d0d0d0] rounded"
          title="Volume Control"
        >
          <Volume2 size={13} className="text-black" />
        </button>
        <Wifi size={13} className="text-black" />
        <div className="bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white px-2 py-0.5 text-xs text-black font-mono">
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}
