"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface TaskManagerProps {
  windows: Array<{ id: string; title: string; app: string; focused: boolean }>
  onCloseWindow: (id: string) => void
  onFocusWindow: (id: string) => void
  onOpenWindow: (app: string) => void
}

export function TaskManager({ windows, onCloseWindow, onFocusWindow, onOpenWindow }: TaskManagerProps) {
  const [activeTab, setActiveTab] = useState<"applications" | "processes" | "performance">("applications")
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [cpuUsage, setCpuUsage] = useState(12)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const historyRef = useRef<number[]>(Array(30).fill(10))

  // Live CPU history animation
  useEffect(() => {
    const timer = setInterval(() => {
      const newUsage = Math.floor(Math.random() * 25) + (windows.length > 2 ? 20 : 5)
      setCpuUsage(newUsage)

      historyRef.current = [...historyRef.current.slice(1), newUsage]

      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.fillStyle = "#001100"
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Grid lines
          ctx.strokeStyle = "#004400"
          ctx.lineWidth = 1
          for (let y = 10; y < canvas.height; y += 15) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(canvas.width, y)
            ctx.stroke()
          }

          // Graph line
          ctx.strokeStyle = "#00ff00"
          ctx.lineWidth = 2
          ctx.beginPath()
          historyRef.current.forEach((val, i) => {
            const x = (i / (historyRef.current.length - 1)) * canvas.width
            const y = canvas.height - (val / 100) * canvas.height
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          })
          ctx.stroke()
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [windows.length])

  const handleEndTask = () => {
    if (selectedTask) {
      onCloseWindow(selectedTask)
      setSelectedTask(null)
    }
  }

  const handleSwitchTo = () => {
    if (selectedTask) {
      onFocusWindow(selectedTask)
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-xs select-none">
      {/* Tabs */}
      <div className="flex border-b border-[#808080] pt-1 px-1 bg-[#c0c0c0] gap-1">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-3 py-1 text-xs border border-b-0 border-[#808080] ${
            activeTab === "applications"
              ? "bg-[#c0c0c0] font-bold border-t-2 border-t-white -mb-[1px] z-10"
              : "bg-[#b0b0b0] text-gray-700"
          }`}
        >
          Applications
        </button>
        <button
          onClick={() => setActiveTab("processes")}
          className={`px-3 py-1 text-xs border border-b-0 border-[#808080] ${
            activeTab === "processes"
              ? "bg-[#c0c0c0] font-bold border-t-2 border-t-white -mb-[1px] z-10"
              : "bg-[#b0b0b0] text-gray-700"
          }`}
        >
          Processes
        </button>
        <button
          onClick={() => setActiveTab("performance")}
          className={`px-3 py-1 text-xs border border-b-0 border-[#808080] ${
            activeTab === "performance"
              ? "bg-[#c0c0c0] font-bold border-t-2 border-t-white -mb-[1px] z-10"
              : "bg-[#b0b0b0] text-gray-700"
          }`}
        >
          Performance
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-2 flex flex-col">
        {activeTab === "applications" && (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex-1 bg-white border border-inset border-[#808080] overflow-y-auto p-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#d0d0d0] border-b border-[#808080]">
                    <th className="p-1 font-normal">Task</th>
                    <th className="p-1 font-normal w-24">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {windows.map((w) => (
                    <tr
                      key={w.id}
                      onClick={() => setSelectedTask(w.id)}
                      className={`cursor-pointer ${
                        selectedTask === w.id ? "bg-blue-700 text-white" : "hover:bg-blue-50 text-black"
                      }`}
                    >
                      <td className="p-1 truncate">{w.title}</td>
                      <td className="p-1 text-green-700 font-semibold">Running</td>
                    </tr>
                  ))}
                  {windows.length === 0 && (
                    <tr>
                      <td colSpan={2} className="p-4 text-center text-gray-500">
                        No applications currently running.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={handleEndTask}
                disabled={!selectedTask}
                className="h-6 px-3 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black disabled:opacity-50"
              >
                End Task
              </Button>
              <Button
                onClick={handleSwitchTo}
                disabled={!selectedTask}
                className="h-6 px-3 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black disabled:opacity-50"
              >
                Switch To
              </Button>
              <Button
                onClick={() => onOpenWindow("run")}
                className="h-6 px-3 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
              >
                New Task...
              </Button>
            </div>
          </div>
        )}

        {activeTab === "processes" && (
          <div className="flex-1 bg-white border border-inset border-[#808080] overflow-y-auto p-1">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#d0d0d0] border-b border-[#808080]">
                  <th className="p-1 font-normal">Image Name</th>
                  <th className="p-1 font-normal">PID</th>
                  <th className="p-1 font-normal">Mem Usage</th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr className="hover:bg-blue-50">
                  <td className="p-1">System</td>
                  <td className="p-1 font-mono">0</td>
                  <td className="p-1">216 K</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-1">explorer.exe</td>
                  <td className="p-1 font-mono">148</td>
                  <td className="p-1">4,280 K</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-1">taskmgr.exe</td>
                  <td className="p-1 font-mono">220</td>
                  <td className="p-1">1,120 K</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-1">kernel32.dll</td>
                  <td className="p-1 font-mono">48</td>
                  <td className="p-1">840 K</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-1">systray.exe</td>
                  <td className="p-1 font-mono">160</td>
                  <td className="p-1">640 K</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="flex-1 flex flex-col gap-3">
            {/* CPU Graph */}
            <div className="border border-[#808080] p-2 bg-[#d4d0c8]">
              <div className="flex justify-between font-bold mb-1">
                <span>CPU Usage: {cpuUsage}%</span>
                <span className="font-mono text-green-700">Intel Pentium II 300MHz</span>
              </div>
              <canvas ref={canvasRef} width={280} height={90} className="w-full h-24 bg-black rounded" />
            </div>

            {/* Memory Usage */}
            <div className="border border-[#808080] p-2 bg-[#d4d0c8]">
              <div className="font-bold mb-1">Physical Memory (K)</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>Total: 65,536 K</div>
                <div>Available: 41,208 K</div>
                <div>File Cache: 12,340 K</div>
                <div>Kernel Mem: 8,192 K</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-0.5 text-gray-700 flex justify-between">
        <span>Processes: {windows.length + 5}</span>
        <span>CPU Usage: {cpuUsage}%</span>
        <span>Mem: 24328K / 65536K</span>
      </div>
    </div>
  )
}
