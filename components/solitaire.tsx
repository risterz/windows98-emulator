"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface Card {
  suit: "hearts" | "diamonds" | "clubs" | "spades"
  rank: number
  faceUp: boolean
  id: string
}

export function Solitaire() {
  const [deck, setDeck] = useState<Card[]>([])
  const [tableau, setTableau] = useState<Card[][]>([[], [], [], [], [], [], []])
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], []])
  const [waste, setWaste] = useState<Card[]>([])
  const [stock, setStock] = useState<Card[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)

  const suits = ["hearts", "diamonds", "clubs", "spades"] as const
  const suitSymbols = { hearts: "♥", diamonds: "♦", clubs: "♣", spades: "♠" }
  const suitColors = { hearts: "red", diamonds: "red", clubs: "black", spades: "black" }

  const createDeck = (): Card[] => {
    const newDeck: Card[] = []
    suits.forEach((suit) => {
      for (let rank = 1; rank <= 13; rank++) {
        newDeck.push({
          suit,
          rank,
          faceUp: false,
          id: `${suit}-${rank}`,
        })
      }
    })
    return shuffleDeck(newDeck)
  }

  const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const dealCards = () => {
    const newDeck = createDeck()
    const newTableau: Card[][] = [[], [], [], [], [], [], []]
    let deckIndex = 0

    // Deal cards to tableau
    for (let col = 0; col < 7; col++) {
      for (let row = 0; row <= col; row++) {
        const card = newDeck[deckIndex++]
        card.faceUp = row === col
        newTableau[col].push(card)
      }
    }

    setTableau(newTableau)
    setStock(newDeck.slice(deckIndex))
    setWaste([])
    setFoundations([[], [], [], []])
    setScore(0)
    setMoves(0)
  }

  const drawFromStock = () => {
    if (stock.length === 0) {
      // Reset stock from waste
      const newStock = [...waste].reverse().map((card) => ({ ...card, faceUp: false }))
      setStock(newStock)
      setWaste([])
    } else {
      const newCard = { ...stock[0], faceUp: true }
      setWaste([newCard, ...waste])
      setStock(stock.slice(1))
    }
    setMoves(moves + 1)
  }

  const getRankDisplay = (rank: number): string => {
    if (rank === 1) return "A"
    if (rank === 11) return "J"
    if (rank === 12) return "Q"
    if (rank === 13) return "K"
    return rank.toString()
  }

  const canPlaceOnFoundation = (card: Card, foundationIndex: number): boolean => {
    const foundation = foundations[foundationIndex]
    if (foundation.length === 0) {
      return card.rank === 1 // Only Ace can start foundation
    }
    const topCard = foundation[foundation.length - 1]
    return card.suit === topCard.suit && card.rank === topCard.rank + 1
  }

  const canPlaceOnTableau = (card: Card, tableauIndex: number): boolean => {
    const column = tableau[tableauIndex]
    if (column.length === 0) {
      return card.rank === 13 // Only King can go on empty tableau
    }
    const topCard = column[column.length - 1]
    return suitColors[card.suit] !== suitColors[topCard.suit] && card.rank === topCard.rank - 1 && topCard.faceUp
  }

  useEffect(() => {
    dealCards()
  }, [])

  const CardComponent = ({ card, onClick }: { card: Card; onClick?: () => void }) => (
    <div
      className={`w-12 h-16 border border-black rounded cursor-pointer text-xs flex flex-col items-center justify-center ${
        card.faceUp
          ? `bg-white ${suitColors[card.suit] === "red" ? "text-red-600" : "text-black"}`
          : "bg-blue-800 text-white"
      }`}
      onClick={onClick}
    >
      {card.faceUp ? (
        <>
          <div>{getRankDisplay(card.rank)}</div>
          <div>{suitSymbols[card.suit]}</div>
        </>
      ) : (
        <div className="text-center">🂠</div>
      )}
    </div>
  )

  return (
    <div className="h-full bg-green-700 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 text-white">
        <div className="flex gap-4">
          <span>Score: {score}</span>
          <span>Moves: {moves}</span>
        </div>
        <Button
          onClick={dealCards}
          className="px-4 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-black text-xs"
        >
          New Game
        </Button>
      </div>

      {/* Game Area */}
      <div className="flex flex-col gap-4">
        {/* Top Row - Stock, Waste, and Foundations */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            {/* Stock */}
            <div onClick={drawFromStock} className="cursor-pointer">
              {stock.length > 0 ? (
                <CardComponent card={{ suit: "spades", rank: 1, faceUp: false, id: "stock" }} />
              ) : (
                <div className="w-12 h-16 border-2 border-dashed border-white rounded flex items-center justify-center text-white text-xs">
                  Empty
                </div>
              )}
            </div>

            {/* Waste */}
            <div>
              {waste.length > 0 ? (
                <CardComponent card={waste[0]} />
              ) : (
                <div className="w-12 h-16 border-2 border-dashed border-white rounded"></div>
              )}
            </div>
          </div>

          {/* Foundations */}
          <div className="flex gap-2">
            {foundations.map((foundation, index) => (
              <div key={index}>
                {foundation.length > 0 ? (
                  <CardComponent card={foundation[foundation.length - 1]} />
                ) : (
                  <div className="w-12 h-16 border-2 border-dashed border-white rounded flex items-center justify-center text-white text-xs">
                    {suits[index][0].toUpperCase()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tableau */}
        <div className="flex gap-2 justify-center">
          {tableau.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-1">
              {column.length === 0 ? (
                <div className="w-12 h-16 border-2 border-dashed border-white rounded"></div>
              ) : (
                column.map((card, cardIndex) => (
                  <div key={card.id} style={{ marginTop: cardIndex > 0 ? "-40px" : "0" }}>
                    <CardComponent card={card} />
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-white text-xs">
        <p>Click the deck to draw cards. Build foundations from Ace to King by suit.</p>
        <p>Build tableau columns in descending order, alternating colors.</p>
      </div>
    </div>
  )
}
