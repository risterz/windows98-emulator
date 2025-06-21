"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"

interface Position {
  x: number
  y: number
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"

export function Snake() {
  const BOARD_SIZE = 20
  const INITIAL_SNAKE = [{ x: 10, y: 10 }]
  const INITIAL_FOOD = { x: 15, y: 15 }
  const GAME_SPEED = 150

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [gameStatus, setGameStatus] = useState<"playing" | "paused" | "gameOver">("paused")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("snake-high-score") || "0")
    }
    return 0
  })

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      }
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setDirection("RIGHT")
    setGameStatus("paused")
    setScore(0)
  }

  const startGame = () => {
    if (gameStatus === "gameOver") {
      resetGame()
    }
    setGameStatus("playing")
  }

  const pauseGame = () => {
    setGameStatus(gameStatus === "playing" ? "paused" : "playing")
  }

  const moveSnake = useCallback(() => {
    if (gameStatus !== "playing") return

    setSnake(currentSnake => {
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1
          break
        case "DOWN":
          head.y += 1
          break
        case "LEFT":
          head.x -= 1
          break
        case "RIGHT":
          head.x += 1
          break
      }

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameStatus("gameOver")
        return currentSnake
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameStatus("gameOver")
        return currentSnake
      }

      newSnake.unshift(head)

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => {
          const newScore = prev + 10
          if (newScore > highScore) {
            setHighScore(newScore)
            if (typeof window !== "undefined") {
              localStorage.setItem("snake-high-score", newScore.toString())
            }
          }
          return newScore
        })
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [direction, food, gameStatus, generateFood, highScore])

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStatus === "gameOver") return

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault()
          setDirection(prev => prev !== "DOWN" ? "UP" : prev)
          break
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault()
          setDirection(prev => prev !== "UP" ? "DOWN" : prev)
          break
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault()
          setDirection(prev => prev !== "RIGHT" ? "LEFT" : prev)
          break
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault()
          setDirection(prev => prev !== "LEFT" ? "RIGHT" : prev)
          break
        case " ":
          e.preventDefault()
          pauseGame()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameStatus])

  const getCellContent = (x: number, y: number) => {
    // Check if it's the snake head
    if (snake.length > 0 && snake[0].x === x && snake[0].y === y) {
      return "🐍"
    }
    // Check if it's snake body
    if (snake.some((segment, index) => index > 0 && segment.x === x && segment.y === y)) {
      return "🟢"
    }
    // Check if it's food
    if (food.x === x && food.y === y) {
      return "🍎"
    }
    return ""
  }

  const getCellStyle = (x: number, y: number) => {
    if (snake.some(segment => segment.x === x && segment.y === y)) {
      return "bg-green-500"
    }
    if (food.x === x && food.y === y) {
      return "bg-red-500"
    }
    return "bg-[#c0c0c0] border border-[#808080]"
  }

  return (
    <div className="p-4 bg-[#c0c0c0] h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 p-2 bg-[#c0c0c0] border-2 border-[#808080] border-t-white border-l-white">
        <div className="bg-black text-green-400 px-2 py-1 font-mono text-sm">
          Score: {score.toString().padStart(3, "0")}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={startGame}
            className="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-xs"
          >
            {gameStatus === "gameOver" ? "New Game" : "Start"}
          </Button>
          <Button
            onClick={pauseGame}
            disabled={gameStatus === "gameOver"}
            className="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-xs disabled:opacity-50"
          >
            {gameStatus === "playing" ? "Pause" : "Resume"}
          </Button>
        </div>
        <div className="bg-black text-green-400 px-2 py-1 font-mono text-sm">
          High: {highScore.toString().padStart(3, "0")}
        </div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          className="grid gap-0 border-2 border-[#808080] border-t-white border-l-white bg-black"
          style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}
        >
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
            const x = index % BOARD_SIZE
            const y = Math.floor(index / BOARD_SIZE)
            return (
              <div
                key={`${x}-${y}`}
                className={`w-4 h-4 flex items-center justify-center text-xs ${getCellStyle(x, y)}`}
              >
                {getCellContent(x, y)}
              </div>
            )
          })}
        </div>
      </div>

      {/* Status Messages */}
      <div className="mt-4 text-center">
        {gameStatus === "paused" && (
          <div className="text-blue-600 font-bold text-sm">
            Press Start to begin! Use arrow keys or WASD to move, Space to pause.
          </div>
        )}
        {gameStatus === "gameOver" && (
          <div className="text-red-600 font-bold text-sm">
            Game Over! Final Score: {score} 🎮
          </div>
        )}
        {gameStatus === "playing" && (
          <div className="text-green-600 font-bold text-sm">
            Playing... Use arrow keys or WASD to move, Space to pause.
          </div>
        )}
      </div>
    </div>
  )
}
