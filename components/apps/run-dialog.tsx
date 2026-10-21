"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface RunDialogProps {
  onOpenWindow: (app: string) => void
  onClose: () => void
}

export function RunDialog({ onOpenWindow, onClose }: RunDialogProps) {
  const [command, setCommand] = useState("notepad")

  const handleRun = () => {
    const cmd = command.trim().toLowerCase()
    const appMap: { [key: string]: string } = {
      notepad: "notepad",
      calc: "calculator",
      calculator: "calculator",
      paint: "paint",
      mspaint: "paint",
      snake: "snake",
      minesweeper: "minesweeper",
      solitaire: "solitaire",
      control: "control",
      explorer: "explorer",
      cmd: "cmd",
      command: "cmd",
      wordpad: "wordpad",
      mediaplayer: "mediaplayer",
      taskmgr: "taskmgr",
      iexplore: "ie",
      ie: "ie",
      recycle: "recycle",
    }

    if (appMap[cmd]) {
      onOpenWindow(appMap[cmd])
      onClose()
    } else {
      alert(`Cannot find the file '${command}' (or one of its components). Make sure the path and filename are correct.`)
    }
  }

  return (
    <div className="p-4 bg-[#c0c0c0] text-xs flex flex-col gap-3 select-none">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shrink-0 shadow">
          <Zap size={24} className="text-yellow-300" />
        </div>
        <p className="text-black">
          Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
        </p>
      </div>

      <div className="flex items-center gap-2 mt-1">
        <label className="font-bold text-black">Open:</label>
        <select
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 bg-white border border-[#808080] p-1 text-xs text-black"
        >
          <option value="notepad">notepad</option>
          <option value="calc">calc</option>
          <option value="paint">paint</option>
          <option value="snake">snake</option>
          <option value="minesweeper">minesweeper</option>
          <option value="solitaire">solitaire</option>
          <option value="cmd">cmd</option>
          <option value="explorer">explorer</option>
          <option value="wordpad">wordpad</option>
          <option value="mediaplayer">mediaplayer</option>
          <option value="control">control</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Button
          onClick={handleRun}
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
