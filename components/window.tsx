"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Square, X, Copy } from "lucide-react"

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"

interface ResizeState {
  direction: ResizeDirection
  startX: number
  startY: number
  startWidth: number
  startHeight: number
  startXPos: number
  startYPos: number
}

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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeState, setResizeState] = useState<ResizeState | null>(null)
  const windowRef = useRef<HTMLDivElement>(null)

  if (minimized) return null

  // Title bar drag start
  const handleTitleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    onFocus()
    if (maximized) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    setIsDragging(true)
    setDragStart({
      x: clientX - x,
      y: clientY - y,
    })
  }

  // Edge / Corner resize start
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent, direction: ResizeDirection) => {
    e.stopPropagation()
    e.preventDefault()
    onFocus()
    if (maximized) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

    setResizeState({
      direction,
      startX: clientX,
      startY: clientY,
      startWidth: width,
      startHeight: height,
      startXPos: x,
      startYPos: y,
    })
  }

  // Global mouse & touch movement for drag and resize
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX
      const clientY = "touches" in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY

      // 1. Window Dragging
      if (isDragging && !maximized) {
        const newX = clientX - dragStart.x
        const newY = Math.max(0, clientY - dragStart.y)
        onMove(newX, newY)
      }

      // 2. Window Resizing
      if (resizeState && !maximized) {
        const deltaX = clientX - resizeState.startX
        const deltaY = clientY - resizeState.startY
        const minW = 220
        const minH = 140

        let newW = resizeState.startWidth
        let newH = resizeState.startHeight
        let newX = resizeState.startXPos
        let newY = resizeState.startYPos

        // Horizontal resizing
        if (resizeState.direction.includes("e")) {
          newW = Math.max(minW, resizeState.startWidth + deltaX)
        } else if (resizeState.direction.includes("w")) {
          const potentialW = resizeState.startWidth - deltaX
          if (potentialW >= minW) {
            newW = potentialW
            newX = resizeState.startXPos + deltaX
          } else {
            newW = minW
            newX = resizeState.startXPos + (resizeState.startWidth - minW)
          }
        }

        // Vertical resizing
        if (resizeState.direction.includes("s")) {
          newH = Math.max(minH, resizeState.startHeight + deltaY)
        } else if (resizeState.direction.includes("n")) {
          const potentialH = resizeState.startHeight - deltaY
          if (potentialH >= minH) {
            newH = potentialH
            newY = resizeState.startYPos + deltaY
          } else {
            newH = minH
            newY = resizeState.startYPos + (resizeState.startHeight - minH)
          }
        }

        onResize(newW, newH)
        if (newX !== resizeState.startXPos || newY !== resizeState.startYPos) {
          onMove(newX, newY)
        }
      }
    }

    const handleEnd = () => {
      setIsDragging(false)
      setResizeState(null)
    }

    if (isDragging || resizeState) {
      window.addEventListener("mousemove", handleMove)
      window.addEventListener("mouseup", handleEnd)
      window.addEventListener("touchmove", handleMove)
      window.addEventListener("touchend", handleEnd)
      return () => {
        window.removeEventListener("mousemove", handleMove)
        window.removeEventListener("mouseup", handleEnd)
        window.removeEventListener("touchmove", handleMove)
        window.removeEventListener("touchend", handleEnd)
      }
    }
  }, [isDragging, resizeState, maximized, dragStart, onMove, onResize])

  const windowStyle = maximized
    ? { top: 0, left: 0, width: "100vw", height: "calc(100vh - 32px)" }
    : { top: y, left: x, width, height }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-xl select-none ${
        focused ? "z-30" : "z-20"
      }`}
      style={windowStyle}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`title-bar h-6 px-1 flex items-center justify-between cursor-move select-none ${
          focused ? "bg-gradient-to-r from-blue-700 to-blue-900" : "bg-[#808080]"
        }`}
        onMouseDown={handleTitleMouseDown}
        onTouchStart={handleTitleMouseDown}
        onDoubleClick={onMaximize}
      >
        <span className="text-white text-xs font-bold truncate pl-0.5">{title}</span>
        <div className="flex gap-1 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          <Button
            onClick={onMinimize}
            className="w-4 h-4 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
            title="Minimize"
          >
            <Minus size={9} />
          </Button>
          <Button
            onClick={onMaximize}
            className="w-4 h-4 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
            title={maximized ? "Restore" : "Maximize"}
          >
            {maximized ? <Copy size={9} /> : <Square size={9} />}
          </Button>
          <Button
            onClick={onClose}
            className="w-4 h-4 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
            title="Close"
          >
            <X size={9} />
          </Button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-24px)] overflow-auto bg-[#c0c0c0] relative select-auto">
        {children}
      </div>

      {/* Resize Handles (8 directions) - Only when not maximized */}
      {!maximized && (
        <>
          {/* Borders */}
          <div
            className="absolute top-0 left-2 right-2 h-1.5 cursor-ns-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "n")}
            onTouchStart={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-2 cursor-ns-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "s")}
            onTouchStart={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1.5 cursor-ew-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "w")}
            onTouchStart={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-2 cursor-ew-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, "e")}
            onTouchStart={(e) => handleResizeStart(e, "e")}
          />

          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-30"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
            onTouchStart={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-30"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
            onTouchStart={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-30"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
            onTouchStart={(e) => handleResizeStart(e, "sw")}
          />
          {/* Bottom-Right Corner with authentic diagonal grip */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-30 flex items-end justify-end p-0.5"
            onMouseDown={(e) => handleResizeStart(e, "se")}
            onTouchStart={(e) => handleResizeStart(e, "se")}
            title="Drag to resize"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-[#808080] fill-current">
              <circle cx="8" cy="8" r="1" />
              <circle cx="5" cy="8" r="1" />
              <circle cx="8" cy="5" r="1" />
              <circle cx="2" cy="8" r="1" />
              <circle cx="5" cy="5" r="1" />
              <circle cx="8" cy="2" r="1" />
            </svg>
          </div>
        </>
      )}
    </div>
  )
}
