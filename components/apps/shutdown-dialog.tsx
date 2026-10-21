"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Power } from "lucide-react"

interface ShutDownDialogProps {
  onClose: () => void
  onOpenWindow: (app: string) => void
}

export function ShutDownDialog({ onClose, onOpenWindow }: ShutDownDialogProps) {
  const [action, setAction] = useState<"shutdown" | "restart" | "dos">("shutdown")
  const [isShutDown, setIsShutDown] = useState(false)

  const handleOK = () => {
    if (action === "shutdown") {
      setIsShutDown(true)
    } else if (action === "restart") {
      window.location.reload()
    } else if (action === "dos") {
      onOpenWindow("cmd")
      onClose()
    }
  }

  if (isShutDown) {
    return (
      <div
        className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer z-[9999]"
        onClick={() => window.location.reload()}
      >
        <p className="text-[#ff8800] font-bold text-2xl font-serif text-center mb-4 tracking-wider">
          It's now safe to turn off your computer.
        </p>
        <p className="text-gray-500 text-xs">Click anywhere to restart Windows 98</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-[#c0c0c0] text-xs flex flex-col gap-3 select-none">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-yellow-500 rounded flex items-center justify-center shrink-0">
          <Power size={24} className="text-white" />
        </div>
        <div>
          <p className="font-bold text-black mb-1">Shut Down Windows</p>
          <p className="text-gray-700">What do you want the computer to do?</p>
        </div>
      </div>

      <div className="space-y-1.5 ml-4 text-black">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="shutdown"
            checked={action === "shutdown"}
            onChange={() => setAction("shutdown")}
            className="accent-blue-600"
          />
          <span>Shut down</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="shutdown"
            checked={action === "restart"}
            onChange={() => setAction("restart")}
            className="accent-blue-600"
          />
          <span>Restart</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="shutdown"
            checked={action === "dos"}
            onChange={() => setAction("dos")}
            className="accent-blue-600"
          />
          <span>Restart in MS-DOS mode</span>
        </label>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button
          onClick={handleOK}
          className="h-6 px-4 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black font-bold"
        >
          OK
        </Button>
        <Button
          onClick={onClose}
          className="h-6 px-4 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
