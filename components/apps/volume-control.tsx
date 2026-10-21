"use client"

import { useState } from "react"

interface Channel {
  name: string
  volume: number
  muted: boolean
}

export function VolumeControl() {
  const [channels, setChannels] = useState<Channel[]>([
    { name: "Volume Control", volume: 75, muted: false },
    { name: "Wave", volume: 80, muted: false },
    { name: "MIDI", volume: 65, muted: false },
    { name: "CD Audio", volume: 50, muted: false },
    { name: "Line In", volume: 40, muted: true },
  ])

  const updateChannel = (index: number, updates: Partial<Channel>) => {
    setChannels((prev) => prev.map((ch, i) => (i === index ? { ...ch, ...updates } : ch)))
  }

  return (
    <div className="h-full bg-[#c0c0c0] text-xs select-none flex flex-col">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex gap-3 text-xs">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Options</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      <div className="flex-1 p-2 flex gap-2 overflow-x-auto justify-center">
        {channels.map((ch, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-2 bg-[#d4d0c8] border border-white border-r-[#808080] border-b-[#808080] w-20"
          >
            <div className="font-bold text-center text-[10px] h-6 flex items-center justify-center text-black">
              {ch.name}
            </div>

            <div className="text-[10px] text-gray-600 mt-1">Balance</div>
            <input type="range" min={-50} max={50} defaultValue={0} className="w-14 h-2 accent-blue-600 mb-2" />

            <div className="text-[10px] text-gray-600">Volume</div>
            <div className="h-24 flex items-center justify-center my-1">
              <input
                type="range"
                min={0}
                max={100}
                value={ch.muted ? 0 : ch.volume}
                onChange={(e) => updateChannel(idx, { volume: Number(e.target.value) })}
                className="h-20 -rotate-90 accent-blue-600 cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-1 mt-auto text-[10px] cursor-pointer text-black">
              <input
                type="checkbox"
                checked={ch.muted}
                onChange={(e) => updateChannel(idx, { muted: e.target.checked })}
              />
              <span>Mute</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
