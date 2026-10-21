"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { playClick, playDing } from "@/lib/sounds"

interface Card {
  id: string
  suit: "hearts" | "diamonds" | "clubs" | "spades"
  rank: number
}

const SUITS = ["hearts", "diamonds", "clubs", "spades"] as const
const SYMBOLS = { hearts: "♥", diamonds: "♦", clubs: "♣", spades: "♠" }
const COLORS = { hearts: "text-red-600", diamonds: "text-red-600", clubs: "text-black", spades: "text-black" }

export function FreeCell() {
  const [freeCells, setFreeCells] = useState<(Card | null)[]>([null, null, null, null])
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []])
  const [columns, setColumns] = useState<Card[][]>([[], [], [], [], [], [], [], []])
  const [selected, setSelected] = useState<{ source: "col" | "free"; index: number; cardIndex?: number } | null>(null)
  const [moves, setMoves] = useState(0)
  const [gameNumber, setGameNumber] = useState(11988)
  const [gameWon, setGameWon] = useState(false)

  const initGame = (num = Math.floor(Math.random() * 32000) + 1) => {
    setGameNumber(num)
    setFreeCells([null, null, null, null])
    setFoundations([[], [], [], []])
    setSelected(null)
    setMoves(0)
    setGameWon(false)

    // Build 52-card deck
    const deck: Card[] = []
    SUITS.forEach((suit) => {
      for (let r = 1; r <= 13; r++) {
        deck.push({ id: `${suit}-${r}`, suit, rank: r })
      }
    })

    // Microsoft pseudo-random FreeCell shuffle
    let seed = num
    const nextRand = () => {
      seed = (seed * 214013 + 2531011) & 0x7fffffff
      return (seed >> 16) & 0x7fff
    }

    const shuffled = [...deck]
    for (let i = 51; i > 0; i--) {
      const j = nextRand() % (i + 1)
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    // Deal into 8 columns
    const cols: Card[][] = [[], [], [], [], [], [], [], []]
    shuffled.forEach((card, idx) => {
      cols[idx % 8].push(card)
    })
    setColumns(cols)
  }

  useEffect(() => {
    initGame()
  }, [])

  const rankLabel = (rank: number) => {
    if (rank === 1) return "A"
    if (rank === 11) return "J"
    if (rank === 12) return "Q"
    if (rank === 13) return "K"
    return rank.toString()
  }

  const isOppositeColor = (c1: Card, c2: Card) => {
    const isRed1 = c1.suit === "hearts" || c1.suit === "diamonds"
    const isRed2 = c2.suit === "hearts" || c2.suit === "diamonds"
    return isRed1 !== isRed2
  }

  // Handle clicking a column
  const handleColumnClick = (colIdx: number) => {
    const col = columns[colIdx]

    if (!selected) {
      if (col.length > 0) {
        setSelected({ source: "col", index: colIdx, cardIndex: col.length - 1 })
        playClick()
      }
      return
    }

    // Attempt moving to this column
    let cardToMove: Card | null = null
    if (selected.source === "col") {
      const sourceCol = columns[selected.index]
      if (sourceCol.length > 0) cardToMove = sourceCol[sourceCol.length - 1]
    } else {
      cardToMove = freeCells[selected.index]
    }

    if (!cardToMove) {
      setSelected(null)
      return
    }

    // Validation
    const destTop = col.length > 0 ? col[col.length - 1] : null
    const canMove = !destTop || (isOppositeColor(cardToMove, destTop) && destTop.rank === cardToMove.rank + 1)

    if (canMove) {
      // Execute move
      if (selected.source === "col") {
        setColumns((prev) =>
          prev.map((c, idx) => {
            if (idx === selected.index) return c.slice(0, -1)
            if (idx === colIdx) return [...c, cardToMove!]
            return c
          })
        )
      } else {
        setFreeCells((prev) => prev.map((c, idx) => (idx === selected.index ? null : c)))
        setColumns((prev) => prev.map((c, idx) => (idx === colIdx ? [...c, cardToMove!] : c)))
      }
      setMoves((m) => m + 1)
      playClick()
    }

    setSelected(null)
  }

  // Handle clicking a free cell
  const handleFreeCellClick = (cellIdx: number) => {
    if (!selected) {
      if (freeCells[cellIdx]) {
        setSelected({ source: "free", index: cellIdx })
        playClick()
      }
      return
    }

    if (selected.source === "col" && !freeCells[cellIdx]) {
      const sourceCol = columns[selected.index]
      if (sourceCol.length > 0) {
        const card = sourceCol[sourceCol.length - 1]
        setColumns((prev) => prev.map((c, idx) => (idx === selected.index ? c.slice(0, -1) : c)))
        setFreeCells((prev) => prev.map((c, idx) => (idx === cellIdx ? card : c)))
        setMoves((m) => m + 1)
        playClick()
      }
    }
    setSelected(null)
  }

  // Handle auto-move to foundations
  const moveToFoundation = (card: Card, fromColIdx?: number, fromFreeIdx?: number) => {
    // Find matching foundation
    for (let fIdx = 0; fIdx < 4; fIdx++) {
      const f = foundations[fIdx]
      const top = f.length > 0 ? f[f.length - 1] : null
      if ((!top && card.rank === 1) || (top && top.suit === card.suit && card.rank === top.rank + 1)) {
        setFoundations((prev) => prev.map((pile, idx) => (idx === fIdx ? [...pile, card] : pile)))
        if (fromColIdx !== undefined) {
          setColumns((prev) => prev.map((c, idx) => (idx === fromColIdx ? c.slice(0, -1) : c)))
        }
        if (fromFreeIdx !== undefined) {
          setFreeCells((prev) => prev.map((c, idx) => (idx === fromFreeIdx ? null : c)))
        }
        setMoves((m) => m + 1)
        playDing()

        // Check win
        const totalInFoundations = foundations.reduce((acc, pile) => acc + pile.length, 0) + 1
        if (totalInFoundations === 52) {
          setGameWon(true)
        }
        return true
      }
    }
    return false
  }

  return (
    <div className="h-full flex flex-col bg-[#008000] text-xs select-none p-2">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] p-1 flex justify-between items-center -mx-2 -mt-2 mb-2 text-black">
        <div className="flex gap-3 px-1">
          <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer" onClick={() => initGame()}>
            Game #{gameNumber}
          </span>
          <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer" onClick={() => initGame()}>
            Restart
          </span>
          <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
        </div>
        <div className="px-2 font-mono text-[11px] font-bold">Moves: {moves}</div>
      </div>

      {/* Top Section: Free Cells & Foundation Piles */}
      <div className="flex justify-between items-start mb-4">
        {/* 4 Free Cells */}
        <div className="flex gap-1.5">
          {freeCells.map((card, idx) => {
            const isSel = selected?.source === "free" && selected.index === idx
            return (
              <div
                key={idx}
                onClick={() => handleFreeCellClick(idx)}
                onDoubleClick={() => card && moveToFoundation(card, undefined, idx)}
                className={`w-12 h-16 rounded border-2 border-[#006000] bg-[#004d00]/60 flex items-center justify-center cursor-pointer ${
                  isSel ? "ring-2 ring-yellow-300" : ""
                }`}
              >
                {card ? (
                  <div className="w-full h-full bg-white rounded border border-gray-400 p-1 flex flex-col justify-between shadow">
                    <span className={`font-bold leading-none ${COLORS[card.suit]}`}>
                      {rankLabel(card.rank)}
                      {SYMBOLS[card.suit]}
                    </span>
                    <span className={`text-base leading-none text-center ${COLORS[card.suit]}`}>
                      {SYMBOLS[card.suit]}
                    </span>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* 4 Foundation Piles */}
        <div className="flex gap-1.5">
          {foundations.map((pile, idx) => {
            const top = pile.length > 0 ? pile[pile.length - 1] : null
            return (
              <div
                key={idx}
                className="w-12 h-16 rounded border-2 border-[#006000] bg-[#004d00]/60 flex items-center justify-center"
              >
                {top ? (
                  <div className="w-full h-full bg-white rounded border border-gray-400 p-1 flex flex-col justify-between shadow">
                    <span className={`font-bold leading-none ${COLORS[top.suit]}`}>
                      {rankLabel(top.rank)}
                      {SYMBOLS[top.suit]}
                    </span>
                    <span className={`text-base leading-none text-center ${COLORS[top.suit]}`}>
                      {SYMBOLS[top.suit]}
                    </span>
                  </div>
                ) : (
                  <span className="text-[#00aa00] text-lg opacity-40 font-serif">K</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 8 Tableau Columns */}
      <div className="flex-1 flex gap-1.5 justify-between overflow-x-auto">
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            onClick={() => handleColumnClick(colIdx)}
            className="flex-1 min-w-[48px] max-w-[64px] relative"
          >
            {col.length === 0 ? (
              <div className="w-full h-16 rounded border-2 border-dashed border-[#006000]" />
            ) : (
              col.map((card, cardIdx) => {
                const isTop = cardIdx === col.length - 1
                const isSel = selected?.source === "col" && selected.index === colIdx && isTop
                return (
                  <div
                    key={card.id}
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      if (isTop) moveToFoundation(card, colIdx)
                    }}
                    style={{ top: `${cardIdx * 18}px` }}
                    className={`absolute w-full h-16 bg-white rounded border border-gray-400 p-1 flex flex-col justify-between shadow cursor-pointer transition-transform ${
                      isSel ? "-translate-y-1 ring-2 ring-yellow-400" : ""
                    }`}
                  >
                    <span className={`font-bold text-[11px] leading-none ${COLORS[card.suit]}`}>
                      {rankLabel(card.rank)}
                      {SYMBOLS[card.suit]}
                    </span>
                    <span className={`text-sm leading-none text-center ${COLORS[card.suit]}`}>
                      {SYMBOLS[card.suit]}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        ))}
      </div>

      {/* Win Modal */}
      {gameWon && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-30">
          <h2 className="text-2xl font-bold text-yellow-400 animate-bounce">Congratulations! You Won!</h2>
          <p className="text-white">Completed Game #{gameNumber} in {moves} moves!</p>
          <Button
            onClick={() => initGame()}
            className="h-7 px-4 bg-[#c0c0c0] border-2 border-white text-black font-bold"
          >
            Play Next Game
          </Button>
        </div>
      )}
    </div>
  )
}
