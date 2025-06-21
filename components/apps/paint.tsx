"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Palette, Square, Circle, Minus, Eraser } from "lucide-react"

export function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState("brush")
  const [currentColor, setCurrentColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(2)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [showColorPicker, setShowColorPicker] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setLastX(x)
    setLastY(y)

    if (currentTool === "brush" || currentTool === "eraser") {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.beginPath()
        ctx.moveTo(x, y)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (currentTool === "brush") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = brushSize * 2
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (currentTool === "line") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.stroke()
    } else if (currentTool === "rectangle") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize
      ctx.strokeRect(lastX, lastY, x - lastX, y - lastY)
    } else if (currentTool === "circle") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize
      const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2))
      ctx.beginPath()
      ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI)
      ctx.stroke()
    }

    setIsDrawing(false)
    ctx.beginPath()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const fillCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = currentColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  const saveImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement("a")
      link.download = "paint-drawing.png"
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const colors = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#800080",
    "#008080",
    "#C0C0C0",
    "#808080",
    "#FF8080",
    "#80FF80",
    "#8080FF",
    "#FFFF80",
    "#FF80FF",
    "#80FFFF",
    "#FFC080",
    "#C080FF",
  ]

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-1">
        <div className="flex gap-4 text-xs">
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">File</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Edit</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">View</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Image</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Colors</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Help</span>
        </div>
      </div>

      {/* Tool Bar */}
      <div className="flex gap-2 p-2 border-b border-[#808080] flex-wrap">
        <Button
          onClick={() => setCurrentTool("brush")}
          className={`w-8 h-8 p-0 ${currentTool === "brush" ? "bg-blue-600" : "bg-[#c0c0c0]"} border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0]`}
          title="Brush"
        >
          <Palette size={16} />
        </Button>
        <Button
          onClick={() => setCurrentTool("eraser")}
          className={`w-8 h-8 p-0 ${currentTool === "eraser" ? "bg-blue-600" : "bg-[#c0c0c0]"} border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0]`}
          title="Eraser"
        >
          <Eraser size={16} />
        </Button>
        <Button
          onClick={() => setCurrentTool("line")}
          className={`w-8 h-8 p-0 ${currentTool === "line" ? "bg-blue-600" : "bg-[#c0c0c0]"} border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0]`}
          title="Line"
        >
          <Minus size={16} />
        </Button>
        <Button
          onClick={() => setCurrentTool("rectangle")}
          className={`w-8 h-8 p-0 ${currentTool === "rectangle" ? "bg-blue-600" : "bg-[#c0c0c0]"} border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0]`}
          title="Rectangle"
        >
          <Square size={16} />
        </Button>
        <Button
          onClick={() => setCurrentTool("circle")}
          className={`w-8 h-8 p-0 ${currentTool === "circle" ? "bg-blue-600" : "bg-[#c0c0c0]"} border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0]`}
          title="Circle"
        >
          <Circle size={16} />
        </Button>
        <div className="border-l border-[#808080] mx-2"></div>
        <Button
          onClick={fillCanvas}
          className="px-3 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black text-xs"
          title="Fill with color"
        >
          Fill
        </Button>
        <Button
          onClick={clearCanvas}
          className="px-3 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black text-xs"
        >
          Clear
        </Button>
        <Button
          onClick={saveImage}
          className="px-3 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black text-xs"
        >
          Save
        </Button>
      </div>

      <div className="flex flex-1">
        {/* Color Palette */}
        <div className="w-20 p-2 border-r border-[#808080] bg-[#c0c0c0]">
          <div className="grid grid-cols-2 gap-1 mb-4">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setCurrentColor(color)}
                className={`w-6 h-6 border-2 ${currentColor === color ? "border-black" : "border-[#808080]"}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          <div className="mb-4">
            <div className="text-xs mb-1">Current:</div>
            <div className="w-8 h-8 border-2 border-[#808080]" style={{ backgroundColor: currentColor }}></div>
          </div>

          <div className="mb-4">
            <label className="text-xs block mb-1">Size: {brushSize}</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs block mb-1">Custom:</label>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              className="w-full h-6"
            />
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-2 overflow-auto">
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            className="border-2 border-[#808080] border-t-white border-l-white bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  )
}
