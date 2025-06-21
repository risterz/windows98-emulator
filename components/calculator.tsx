"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const CalcButton = ({ onClick, className = "", children }: any) => (
    <Button
      onClick={onClick}
      className={`h-8 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black text-sm font-bold ${className}`}
    >
      {children}
    </Button>
  )

  return (
    <div className="p-2 bg-[#c0c0c0]">
      {/* Display */}
      <div className="mb-2 p-2 bg-white border-2 border-[#808080] border-t-white border-l-white text-right text-lg font-mono">
        {display}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-1">
        <CalcButton onClick={clear} className="col-span-2">
          Clear
        </CalcButton>
        <CalcButton onClick={() => inputOperation("÷")}>÷</CalcButton>
        <CalcButton onClick={() => inputOperation("×")}>×</CalcButton>

        <CalcButton onClick={() => inputNumber("7")}>7</CalcButton>
        <CalcButton onClick={() => inputNumber("8")}>8</CalcButton>
        <CalcButton onClick={() => inputNumber("9")}>9</CalcButton>
        <CalcButton onClick={() => inputOperation("-")}>-</CalcButton>

        <CalcButton onClick={() => inputNumber("4")}>4</CalcButton>
        <CalcButton onClick={() => inputNumber("5")}>5</CalcButton>
        <CalcButton onClick={() => inputNumber("6")}>6</CalcButton>
        <CalcButton onClick={() => inputOperation("+")} className="row-span-2">
          +
        </CalcButton>

        <CalcButton onClick={() => inputNumber("1")}>1</CalcButton>
        <CalcButton onClick={() => inputNumber("2")}>2</CalcButton>
        <CalcButton onClick={() => inputNumber("3")}>3</CalcButton>

        <CalcButton onClick={() => inputNumber("0")} className="col-span-2">
          0
        </CalcButton>
        <CalcButton onClick={() => inputNumber(".")}>.</CalcButton>
        <CalcButton onClick={performCalculation}>=</CalcButton>
      </div>
    </div>
  )
}
