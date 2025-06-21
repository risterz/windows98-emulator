"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborCount: number
}

export function Minesweeper() {
  const ROWS = 9
  const COLS = 9
  const MINES = 10

  const [board, setBoard] = useState<Cell[][]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [mineCount, setMineCount] = useState(MINES)

  const initializeBoard = () => {
    // Create empty board
    const newBoard: Cell[][] = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborCount: 0,
          })),
      )

    // Place mines randomly
    let minesPlaced = 0
    while (minesPlaced < MINES) {
      const row = Math.floor(Math.random() * ROWS)
      const col = Math.floor(Math.random() * COLS)

      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

    // Calculate neighbor counts
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i
              const newCol = col + j
              if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                if (newBoard[newRow][newCol].isMine) count++
              }
            }
          }
          newBoard[row][col].neighborCount = count
        }
      }
    }

    setBoard(newBoard)
    setGameStatus("playing")
    setMineCount(MINES)
  }

  useEffect(() => {
    initializeBoard()
  }, [])

  const revealCell = (row: number, col: number) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed || board[row][col].isFlagged) {
      return
    }

    const newBoard = [...board]
    newBoard[row][col].isRevealed = true

    if (newBoard[row][col].isMine) {
      setGameStatus("lost")
      // Reveal all mines
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true
          }
        }
      }
    } else if (newBoard[row][col].neighborCount === 0) {
      // Auto-reveal neighbors for empty cells
      const queue = [[row, col]]
      while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift()!
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = currentRow + i
            const newCol = currentCol + j
            if (
              newRow >= 0 &&
              newRow < ROWS &&
              newCol >= 0 &&
              newCol < COLS &&
              !newBoard[newRow][newCol].isRevealed &&
              !newBoard[newRow][newCol].isFlagged &&
              !newBoard[newRow][newCol].isMine
            ) {
              newBoard[newRow][newCol].isRevealed = true
              if (newBoard[newRow][newCol].neighborCount === 0) {
                queue.push([newRow, newCol])
              }
            }
          }
        }
      }
    }

    setBoard(newBoard)

    // Check for win condition
    let revealedCount = 0
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (newBoard[i][j].isRevealed && !newBoard[i][j].isMine) {
          revealedCount++
        }
      }
    }
    if (revealedCount === ROWS * COLS - MINES) {
      setGameStatus("won")
    }
  }

  const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (gameStatus !== "playing" || board[row][col].isRevealed) {
      return
    }

    const newBoard = [...board]
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    setBoard(newBoard)
    setMineCount(mineCount + (newBoard[row][col].isFlagged ? -1 : 1))
  }

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return "🚩"
    if (!cell.isRevealed) return ""
    if (cell.isMine) return "💣"
    if (cell.neighborCount === 0) return ""
    return cell.neighborCount.toString()
  }

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return "text-black"
    if (cell.isMine) return "text-red-600"
    const colors = [
      "",
      "text-blue-600",
      "text-green-600",
      "text-red-600",
      "text-purple-600",
      "text-yellow-600",
      "text-pink-600",
      "text-black",
      "text-gray-600",
    ]
    return colors[cell.neighborCount] || "text-black"
  }

  return (
    <div className="p-4 bg-[#c0c0c0]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 p-2 bg-[#c0c0c0] border-2 border-[#808080] border-t-white border-l-white">
        <div className="bg-black text-red-500 px-2 py-1 font-mono text-lg">{mineCount.toString().padStart(3, "0")}</div>
        <Button
          onClick={initializeBoard}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-lg"
        >
          {gameStatus === "won" ? "😎" : gameStatus === "lost" ? "😵" : "🙂"}
        </Button>
        <div className="bg-black text-red-500 px-2 py-1 font-mono text-lg">000</div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-9 gap-0 border-2 border-[#808080] border-t-white border-l-white">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => revealCell(rowIndex, colIndex)}
              onContextMenu={(e) => toggleFlag(rowIndex, colIndex, e)}
              className={`w-6 h-6 p-0 text-xs font-bold border ${
                cell.isRevealed
                  ? "bg-[#c0c0c0] border-[#808080]"
                  : "bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0]"
              } ${getCellColor(cell)}`}
            >
              {getCellContent(cell)}
            </Button>
          )),
        )}
      </div>

      {gameStatus === "won" && (
        <div className="mt-4 text-center text-green-600 font-bold">Congratulations! You won! 🎉</div>
      )}
      {gameStatus === "lost" && (
        <div className="mt-4 text-center text-red-600 font-bold">Game Over! Click the smiley to try again.</div>
      )}
    </div>
  )
}
