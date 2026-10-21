"use client"

import { useState, useRef, useEffect } from "react"

interface CmdPromptProps {
  onOpenWindow?: (app: string) => void
}

export function CmdPrompt({ onOpenWindow }: CmdPromptProps) {
  const [history, setHistory] = useState<string[]>([
    "Microsoft(R) Windows 98",
    "   (C)Copyright Microsoft Corp 1981-1998.",
    "",
    "C:\\WINDOWS> ",
  ])
  const [inputVal, setInputVal] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = inputVal.trim()
      const cmdLower = command.toLowerCase()

      const newLines = [`C:\\WINDOWS> ${inputVal}`]

      switch (cmdLower) {
        case "":
          break
        case "help":
          newLines.push(
            "Supported commands:",
            "  DIR        Displays a list of files and subdirectories",
            "  VER        Displays the Windows 98 version",
            "  CLS        Clears the screen",
            "  DATE       Displays current system date",
            "  TIME       Displays current system time",
            "  NOTEPAD    Opens Notepad editor",
            "  CALC       Opens Calculator",
            "  SNAKE      Opens classic Snake game",
            "  PAINT      Opens Paint",
            "  WIN        Starts Windows GUI",
            "  EXIT       Closes the command prompt"
          )
          break
        case "ver":
          newLines.push("Windows 98 [Version 4.10.1998]")
          break
        case "cls":
          setHistory(["C:\\WINDOWS> "])
          setInputVal("")
          return
        case "dir":
          newLines.push(
            " Volume in drive C has no label",
            " Volume Serial Number is 1337-W980",
            " Directory of C:\\WINDOWS",
            "",
            "SYSTEM       <DIR>        05-11-98  8:01p",
            "SYSTEM32     <DIR>        05-11-98  8:01p",
            "NOTEPAD  EXE       69,632 05-11-98  8:01p",
            "CALC     EXE      114,688 05-11-98  8:01p",
            "EXPLORER EXE      172,544 05-11-98  8:01p",
            "WIN      COM       25,120 05-11-98  8:01p",
            "SNAKE    EXE       84,200 10-21-98  3:14p",
            "        7 file(s)        466,184 bytes",
            "        2 dir(s)   1,240,432,640 bytes free"
          )
          break
        case "date":
          newLines.push(`Current date is: ${new Date().toLocaleDateString()}`)
          break
        case "time":
          newLines.push(`Current time is: ${new Date().toLocaleTimeString()}`)
          break
        case "notepad":
          onOpenWindow?.("notepad")
          newLines.push("Starting Notepad...")
          break
        case "calc":
          onOpenWindow?.("calculator")
          newLines.push("Starting Calculator...")
          break
        case "snake":
          onOpenWindow?.("snake")
          newLines.push("Launching Snake Game...")
          break
        case "paint":
          onOpenWindow?.("paint")
          newLines.push("Starting Paint...")
          break
        case "win":
          newLines.push("You are already running Windows 98 GUI environment.")
          break
        default:
          if (cmdLower.startsWith("echo ")) {
            newLines.push(command.slice(5))
          } else {
            newLines.push(`Bad command or file name: "${command}"`)
          }
      }

      newLines.push("")
      newLines.push("C:\\WINDOWS> ")
      setHistory((prev) => [...prev, ...newLines])
      setInputVal("")
    }
  }

  return (
    <div
      className="h-full bg-black text-white p-2 font-mono text-xs overflow-y-auto cursor-text select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, idx) => (
        <div key={idx} className="whitespace-pre-wrap leading-tight">
          {line}
        </div>
      ))}
      <div className="flex items-center">
        <span className="whitespace-pre">C:\WINDOWS&gt; </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs caret-white"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
