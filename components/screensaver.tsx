"use client"

import { useEffect, useRef } from "react"

interface ScreensaverProps {
  type?: "Starfield" | "Pipes" | "Mystify" | "FlyingWindows"
  onExit: () => void
}

export function Screensaver({ type = "Starfield", onExit }: ScreensaverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animId: number

    // Exit on any user interaction
    const handleExit = () => {
      onExit()
    }

    window.addEventListener("mousemove", handleExit, { once: true })
    window.addEventListener("keydown", handleExit, { once: true })
    window.addEventListener("mousedown", handleExit, { once: true })
    window.addEventListener("touchstart", handleExit, { once: true })

    if (type === "Starfield") {
      const numStars = 400
      const stars = Array.from({ length: numStars }, () => ({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * canvas.width,
      }))

      const render = () => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const cx = canvas.width / 2
        const cy = canvas.height / 2

        stars.forEach((star) => {
          star.z -= 4
          if (star.z <= 0) {
            star.z = canvas.width
            star.x = (Math.random() - 0.5) * canvas.width * 2
            star.y = (Math.random() - 0.5) * canvas.height * 2
          }

          const k = 250 / star.z
          const px = star.x * k + cx
          const py = star.y * k + cy

          if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
            const size = Math.max(1, (1 - star.z / canvas.width) * 3.5)
            const brightness = Math.min(255, Math.floor((1 - star.z / canvas.width) * 255))
            ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`
            ctx.beginPath()
            ctx.arc(px, py, size, 0, Math.PI * 2)
            ctx.fill()
          }
        })

        animId = requestAnimationFrame(render)
      }
      render()
    } else if (type === "Mystify") {
      // Bouncing colorful wireframe polygon
      const points = [
        { x: 100, y: 100, vx: 3, vy: 2 },
        { x: 300, y: 200, vx: -2, vy: 3 },
        { x: 200, y: 400, vx: 4, vy: -2 },
        { x: 50, y: 300, vx: -3, vy: -3 },
      ]
      let hue = 0

      const render = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        points.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        })

        ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.closePath()
        ctx.stroke()

        hue = (hue + 1) % 360
        animId = requestAnimationFrame(render)
      }
      render()
    } else {
      // 3D Pipes / Flying Windows
      let angle = 0
      const render = () => {
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const radius = Math.min(canvas.width, canvas.height) * 0.35

        for (let i = 0; i < 6; i++) {
          const a = angle + (i * Math.PI) / 3
          const x = cx + Math.cos(a) * radius
          const y = cy + Math.sin(a) * radius * 0.6

          // Windows 98 4-color flag
          const s = 40
          ctx.fillStyle = "#f25022"
          ctx.fillRect(x - s, y - s, s - 2, s - 2)
          ctx.fillStyle = "#7fba00"
          ctx.fillRect(x, y - s, s - 2, s - 2)
          ctx.fillStyle = "#00a4ef"
          ctx.fillRect(x - s, y, s - 2, s - 2)
          ctx.fillStyle = "#ffb900"
          ctx.fillRect(x, y, s - 2, s - 2)
        }

        angle += 0.02
        animId = requestAnimationFrame(render)
      }
      render()
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", handleExit)
      window.removeEventListener("keydown", handleExit)
      window.removeEventListener("mousedown", handleExit)
      window.removeEventListener("touchstart", handleExit)
    }
  }, [type, onExit])

  return (
    <div className="fixed inset-0 bg-black cursor-none z-[99999] select-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
