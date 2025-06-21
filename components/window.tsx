"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Square, X } from "lucide-react"

interface WindowProps {
  id: string
  title: string
  x: number
  y: number
  width: number
  height: number
  focused: boolean
  maximized: boolean
  minimized: boolean
  children: React.ReactNode
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
  onMaximize: () => void
  onMove: (x: number, y: number) => void
  onResize: (width: number, height: number) => void
}

export function Window({
  id,
  title,
  x,
  y,
  width,
  height,
  focused,
  maximized,
  minimized,
  children,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  if (minimized) return null

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("title-bar")) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - x,
        y: e.clientY - y,
      })
      onFocus()
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !maximized) {
      onMove(e.clientX - dragStart.x, e.clientY - dragStart.y)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !maximized) {
        onMove(e.clientX - dragStart.x, e.clientY - dragStart.y)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, maximized, onMove])

  const windowStyle = maximized
    ? { top: 0, left: 0, width: "100vw", height: "calc(100vh - 32px)" }
    : { top: y, left: x, width, height }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg ${
        focused ? "z-50" : "z-40"
      }`}
      style={windowStyle}
      onMouseDown={handleMouseDown}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`title-bar h-6 px-1 flex items-center justify-between ${
          focused ? "bg-gradient-to-r from-blue-600 to-blue-800" : "bg-[#808080]"
        }`}
      >
        <span className="text-white text-xs font-bold truncate">{title}</span>
        <div className="flex gap-1">
          <Button
            onClick={onMinimize}
            className="w-4 h-4 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black"
          >
            <Minus size={8} />
          </Button>
          <Button
            onClick={onMaximize}
            className="w-4 h-4 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black"
          >
            <Square size={8} />
          </Button>
          <Button
            onClick={onClose}
            className="w-4 h-4 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black"
          >
            <X size={8} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-24px)] overflow-hidden">{children}</div>

      {/* Resize Handle */}
      {!maximized && (
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
          onMouseDown={(e) => {
            e.stopPropagation()
            setIsResizing(true)
          }}
        />
      )}
    </div>
  )
}
