"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { playClick, playDing } from "@/lib/sounds"

interface Bumper {
  x: number
  y: number
  r: number
  color: string
  points: number
  hitTime: number
}

interface Target {
  x: number
  y: number
  w: number
  h: number
  active: boolean
  points: number
}

export function SpaceCadetPinball() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(15000)
  const [ballsLeft, setBallsLeft] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const stateRef = useRef({
    ball: { x: 355, y: 460, vx: 0, vy: 0, r: 7 },
    plunger: { y: 470, maxPull: 30, currentPull: 0, pulling: false },
    leftFlipper: { angle: 0.45, active: false, x: 120, y: 450, length: 50 },
    rightFlipper: { angle: Math.PI - 0.45, active: false, x: 240, y: 450, length: 50 },
    bumpers: [
      { x: 140, y: 160, r: 20, color: "#ff007f", points: 500, hitTime: 0 },
      { x: 220, y: 160, r: 20, color: "#00ffff", points: 500, hitTime: 0 },
      { x: 180, y: 225, r: 22, color: "#ffcc00", points: 1000, hitTime: 0 },
    ] as Bumper[],
    targets: [
      { x: 45, y: 180, w: 10, h: 22, active: true, points: 250 },
      { x: 45, y: 215, w: 10, h: 22, active: true, points: 250 },
      { x: 45, y: 250, w: 10, h: 22, active: true, points: 250 },
    ] as Target[],
    inPlay: false,
    score: 0,
    ballsLeft: 3,
  })

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("w98_pinball_highscore")
      if (saved) setHighScore(parseInt(saved, 10))
    } catch (e) {}
  }, [])

  const startNewGame = () => {
    stateRef.current.ball = { x: 355, y: 460, vx: 0, vy: 0, r: 7 }
    stateRef.current.inPlay = false
    stateRef.current.score = 0
    stateRef.current.ballsLeft = 3
    setScore(0)
    setBallsLeft(3)
    setGameOver(false)
    setGameStarted(true)
  }

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyZ") {
        stateRef.current.leftFlipper.active = true
      }
      if (e.code === "ArrowRight" || e.code === "Slash") {
        stateRef.current.rightFlipper.active = true
      }
      if (e.code === "Space" || e.code === "ArrowDown") {
        e.preventDefault()
        stateRef.current.plunger.pulling = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyZ") {
        stateRef.current.leftFlipper.active = false
      }
      if (e.code === "ArrowRight" || e.code === "Slash") {
        stateRef.current.rightFlipper.active = false
      }
      if (e.code === "Space" || e.code === "ArrowDown") {
        if (stateRef.current.plunger.pulling) {
          stateRef.current.plunger.pulling = false
          // Launch ball if in plunger lane
          if (stateRef.current.ball.x > 330 && stateRef.current.ball.y > 400) {
            const power = (stateRef.current.plunger.currentPull / stateRef.current.plunger.maxPull) * 16 + 6
            stateRef.current.ball.vy = -power
            stateRef.current.ball.vx = -1.2
            stateRef.current.inPlay = true
            playClick()
          }
          stateRef.current.plunger.currentPull = 0
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Main game physics & rendering loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number

    const loop = () => {
      const state = stateRef.current
      const { ball, leftFlipper, rightFlipper, plunger, bumpers, targets } = state

      // 1. Physics update
      if (plunger.pulling) {
        if (plunger.currentPull < plunger.maxPull) plunger.currentPull += 1.2
      }

      // Flipper angles
      const leftTargetAngle = leftFlipper.active ? -0.4 : 0.45
      leftFlipper.angle += (leftTargetAngle - leftFlipper.angle) * 0.45

      const rightTargetAngle = rightFlipper.active ? Math.PI + 0.4 : Math.PI - 0.45
      rightFlipper.angle += (rightTargetAngle - rightFlipper.angle) * 0.45

      // Ball physics
      if (state.inPlay) {
        ball.vy += 0.22 // gravity
        ball.vx *= 0.995 // air friction
        ball.vy *= 0.995

        ball.x += ball.vx
        ball.y += ball.vy

        // Walls
        // Left wall
        if (ball.x - ball.r < 30) {
          ball.x = 30 + ball.r
          ball.vx = Math.abs(ball.vx) * 0.7
        }
        // Right outer wall
        if (ball.x + ball.r > 370) {
          ball.x = 370 - ball.r
          ball.vx = -Math.abs(ball.vx) * 0.7
        }
        // Plunger lane separator
        if (ball.y > 180 && ball.x > 330 && ball.x < 342) {
          if (ball.vx > 0) {
            ball.x = 330 - ball.r
            ball.vx = -Math.abs(ball.vx) * 0.7
          } else {
            ball.x = 342 + ball.r
            ball.vx = Math.abs(ball.vx) * 0.7
          }
        }
        // Top curved arch
        if (ball.y - ball.r < 30) {
          ball.y = 30 + ball.r
          ball.vy = Math.abs(ball.vy) * 0.7
        }
        // Corner deflectors
        if (ball.x < 100 && ball.y < 90) {
          const dist = Math.hypot(ball.x - 100, ball.y - 90)
          if (dist > 70) {
            ball.vx += 0.5
            ball.vy += 0.5
          }
        }

        // Bumper collisions
        bumpers.forEach((b) => {
          const dx = ball.x - b.x
          const dy = ball.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < ball.r + b.r) {
            const angle = Math.atan2(dy, dx)
            ball.vx = Math.cos(angle) * 8.5
            ball.vy = Math.sin(angle) * 8.5
            b.hitTime = Date.now()
            state.score += b.points
            setScore(state.score)
            playDing()
          }
        })

        // Target collisions
        targets.forEach((t) => {
          if (
            t.active &&
            ball.x + ball.r > t.x &&
            ball.x - ball.r < t.x + t.w &&
            ball.y + ball.r > t.y &&
            ball.y - ball.r < t.y + t.h
          ) {
            ball.vx = Math.abs(ball.vx) * 1.2
            t.active = false
            state.score += t.points
            setScore(state.score)
            playClick()
          }
        })

        // Flipper collisions
        const checkFlipper = (f: typeof leftFlipper, isLeft: boolean) => {
          const fx2 = f.x + Math.cos(f.angle) * f.length
          const fy2 = f.y + Math.sin(f.angle) * f.length

          // Check line segment distance
          const lineLen = f.length
          const u = ((ball.x - f.x) * (fx2 - f.x) + (ball.y - f.y) * (fy2 - f.y)) / (lineLen * lineLen)
          if (u >= 0 && u <= 1) {
            const px = f.x + u * (fx2 - f.x)
            const py = f.y + u * (fy2 - f.y)
            const dist = Math.hypot(ball.x - px, ball.y - py)
            if (dist < ball.r + 6) {
              const normalAngle = f.angle - Math.PI / 2
              const impulse = f.active ? 12 : 5
              ball.vx = Math.cos(normalAngle) * impulse
              ball.vy = Math.sin(normalAngle) * impulse
              state.score += 50
              setScore(state.score)
              playClick()
            }
          }
        }

        checkFlipper(leftFlipper, true)
        checkFlipper(rightFlipper, false)

        // Drain / Out of bounds
        if (ball.y > 510) {
          state.ballsLeft -= 1
          setBallsLeft(state.ballsLeft)
          if (state.ballsLeft <= 0) {
            setGameOver(true)
            state.inPlay = false
            if (state.score > highScore) {
              setHighScore(state.score)
              try {
                localStorage.setItem("w98_pinball_highscore", state.score.toString())
              } catch (e) {}
            }
          } else {
            // Reset to plunger
            ball.x = 355
            ball.y = 460
            ball.vx = 0
            ball.vy = 0
            state.inPlay = false
          }
        }
      }

      // 2. Render graphics
      ctx.fillStyle = "#0c0824"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Background space grid lines
      ctx.strokeStyle = "#1b1448"
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Table outer borders
      ctx.strokeStyle = "#4338ca"
      ctx.lineWidth = 4
      ctx.beginPath()
      // Left border & curved top
      ctx.moveTo(30, 500)
      ctx.lineTo(30, 80)
      ctx.arcTo(30, 20, 100, 20, 50)
      ctx.arcTo(340, 20, 340, 80, 50)
      ctx.lineTo(340, 500)
      ctx.stroke()

      // Plunger lane wall
      ctx.strokeStyle = "#3730a3"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(340, 160)
      ctx.lineTo(340, 500)
      ctx.stroke()

      // Bumpers
      bumpers.forEach((b) => {
        const isLit = Date.now() - b.hitTime < 250
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = isLit ? "#ffffff" : b.color
        ctx.shadowColor = b.color
        ctx.shadowBlur = isLit ? 20 : 8
        ctx.fill()
        ctx.lineWidth = 3
        ctx.strokeStyle = "#ffffff"
        ctx.stroke()
        ctx.shadowBlur = 0

        // Bumper cap
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r * 0.45, 0, Math.PI * 2)
        ctx.fillStyle = isLit ? b.color : "#ffffff"
        ctx.fill()
      })

      // Drop Targets
      targets.forEach((t) => {
        ctx.fillStyle = t.active ? "#eab308" : "#374151"
        ctx.fillRect(t.x, t.y, t.w, t.h)
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 1
        ctx.strokeRect(t.x, t.y, t.w, t.h)
      })

      // Inlane guides
      ctx.strokeStyle = "#6366f1"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(40, 360)
      ctx.lineTo(110, 440)
      ctx.moveTo(330, 360)
      ctx.lineTo(250, 440)
      ctx.stroke()

      // Flippers
      const drawFlipper = (f: typeof leftFlipper, isLeft: boolean) => {
        const fx2 = f.x + Math.cos(f.angle) * f.length
        const fy2 = f.y + Math.sin(f.angle) * f.length

        ctx.strokeStyle = isLeft ? "#f43f5e" : "#06b6d4"
        ctx.lineWidth = 8
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(f.x, f.y)
        ctx.lineTo(fx2, fy2)
        ctx.stroke()

        // Pivot cap
        ctx.beginPath()
        ctx.arc(f.x, f.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = "#ffffff"
        ctx.fill()
      }

      drawFlipper(leftFlipper, true)
      drawFlipper(rightFlipper, false)

      // Plunger spring
      ctx.fillStyle = "#9ca3af"
      const plungerY = 470 + plunger.currentPull
      ctx.fillRect(350, plungerY, 14, 25)
      ctx.strokeStyle = "#4b5563"
      ctx.lineWidth = 2
      for (let sy = plungerY; sy < 505; sy += 5) {
        ctx.beginPath()
        ctx.moveTo(348, sy)
        ctx.lineTo(366, sy + 3)
        ctx.stroke()
      }

      // Ball
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
      const grad = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 1, ball.x, ball.y, ball.r)
      grad.addColorStop(0, "#ffffff")
      grad.addColorStop(0.4, "#d1d5db")
      grad.addColorStop(1, "#4b5563")
      ctx.fillStyle = grad
      ctx.shadowColor = "#60a5fa"
      ctx.shadowBlur = 5
      ctx.fill()
      ctx.shadowBlur = 0

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [highScore])

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-xs select-none">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex gap-3">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer" onClick={startNewGame}>
          Game
        </span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Options</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Score Header */}
      <div className="bg-[#1e1b4b] text-white px-3 py-1.5 flex justify-between items-center border-b border-[#4338ca]">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-mono text-[11px]">SCORE:</span>
          <span className="text-yellow-400 font-mono text-base font-bold tracking-wider">
            {score.toString().padStart(7, "0")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-300 font-mono text-xs">BALLS: {ballsLeft}</span>
          <span className="text-gray-400 font-mono text-xs">HIGH: {highScore}</span>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex justify-center items-center bg-[#050414] p-1 relative overflow-hidden">
        <canvas ref={canvasRef} width={380} height={510} className="rounded shadow-2xl border border-[#312e81]" />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-3 z-20">
            <h2 className="text-2xl font-bold font-mono text-red-500 animate-pulse">GAME OVER</h2>
            <p className="text-yellow-400 font-mono text-sm">FINAL SCORE: {score}</p>
            <Button
              onClick={startNewGame}
              className="h-7 px-4 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black font-bold"
            >
              Play Again
            </Button>
          </div>
        )}

        {/* Start Game Prompt */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center gap-2 z-20">
            <div className="text-center mb-2">
              <h1 className="text-xl font-bold font-serif text-yellow-400">3D PINBALL</h1>
              <p className="text-cyan-300 text-xs tracking-wider">SPACE CADET</p>
            </div>
            <p className="text-gray-300 text-[11px] text-center max-w-[260px] mb-2">
              Hold <strong>SPACEBAR</strong> or <strong>DOWN ARROW</strong> to pull plunger and launch!
              <br />
              Use <strong>LEFT ARROW / Z</strong> and <strong>RIGHT ARROW / /</strong> for flippers.
            </p>
            <Button
              onClick={startNewGame}
              className="h-7 px-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold border-2 border-white"
            >
              Launch Mission
            </Button>
          </div>
        )}
      </div>

      {/* On-screen Controls (for Touch / Mobile / Fast Clicking) */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] p-1.5 flex justify-between items-center gap-2">
        <Button
          onMouseDown={() => (stateRef.current.leftFlipper.active = true)}
          onMouseUp={() => (stateRef.current.leftFlipper.active = false)}
          onTouchStart={() => (stateRef.current.leftFlipper.active = true)}
          onTouchEnd={() => (stateRef.current.leftFlipper.active = false)}
          className="flex-1 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] active:border-inset active:border-[#808080] text-black font-bold text-xs"
        >
          ◀ LEFT FLIPPER (Z)
        </Button>

        <Button
          onMouseDown={() => (stateRef.current.plunger.pulling = true)}
          onMouseUp={() => {
            if (stateRef.current.plunger.pulling) {
              stateRef.current.plunger.pulling = false
              if (stateRef.current.ball.x > 330 && stateRef.current.ball.y > 400) {
                const power = (stateRef.current.plunger.currentPull / stateRef.current.plunger.maxPull) * 16 + 6
                stateRef.current.ball.vy = -power
                stateRef.current.ball.vx = -1.2
                stateRef.current.inPlay = true
                playClick()
              }
              stateRef.current.plunger.currentPull = 0
            }
          }}
          className="w-24 h-8 bg-[#d4d0c8] border-2 border-white border-r-[#808080] border-b-[#808080] active:border-inset text-black font-bold text-xs"
        >
          🚀 PLUNGE
        </Button>

        <Button
          onMouseDown={() => (stateRef.current.rightFlipper.active = true)}
          onMouseUp={() => (stateRef.current.rightFlipper.active = false)}
          onTouchStart={() => (stateRef.current.rightFlipper.active = true)}
          onTouchEnd={() => (stateRef.current.rightFlipper.active = false)}
          className="flex-1 h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] active:border-inset active:border-[#808080] text-black font-bold text-xs"
        >
          RIGHT FLIPPER (/) ▶
        </Button>
      </div>
    </div>
  )
}
