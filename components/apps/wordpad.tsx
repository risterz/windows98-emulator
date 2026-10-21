"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Save,
  FolderOpen,
  Printer,
  FilePlus,
  Scissors,
  Copy,
  Clipboard,
  RotateCcw,
} from "lucide-react"

export function WordPad() {
  const [content, setContent] = useState(
    "Welcome to Windows 98 WordPad!\n\nWordPad is a basic word processor included with Microsoft Windows 98. It can be used to create and edit letters, memos, notes, and other simple documents.\n\nEnjoy the classic retro desktop experience!"
  )
  const [fontFamily, setFontFamily] = useState("Arial")
  const [fontSize, setFontSize] = useState("14px")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left")
  const [statusMessage, setStatusMessage] = useState("Ready")

  const handleSave = () => {
    setStatusMessage("Document saved successfully.")
    setTimeout(() => setStatusMessage("Ready"), 2000)
  }

  const handleNew = () => {
    setContent("")
    setStatusMessage("New document created.")
    setTimeout(() => setStatusMessage("Ready"), 2000)
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-xs select-none">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex gap-3">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Insert</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Format</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Toolbar 1 */}
      <div className="flex items-center gap-1 p-1 bg-[#c0c0c0] border-b border-[#808080]">
        <Button
          onClick={handleNew}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="New"
        >
          <FilePlus size={12} />
        </Button>
        <Button
          onClick={() => {
            setContent("Opened existing retro document.")
            setStatusMessage("Document opened.")
          }}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="Open"
        >
          <FolderOpen size={12} />
        </Button>
        <Button
          onClick={handleSave}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="Save"
        >
          <Save size={12} />
        </Button>
        <Button
          onClick={() => window.print()}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="Print"
        >
          <Printer size={12} />
        </Button>
        <div className="w-[1px] h-4 bg-[#808080] mx-1" />
        <Button
          onClick={() => {
            navigator.clipboard?.writeText(content)
            setContent("")
          }}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="Cut"
        >
          <Scissors size={12} />
        </Button>
        <Button
          onClick={() => navigator.clipboard?.writeText(content)}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="Copy"
        >
          <Copy size={12} />
        </Button>
        <Button
          onClick={async () => {
            try {
              const text = await navigator.clipboard?.readText()
              if (text) setContent((prev) => prev + text)
            } catch (e) {}
          }}
          className="w-6 h-6 p-0 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black"
          title="Paste"
        >
          <Clipboard size={12} />
        </Button>
      </div>

      {/* Formatting Bar */}
      <div className="flex items-center gap-1 p-1 bg-[#c0c0c0] border-b border-[#808080]">
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="h-6 px-1 text-xs border border-[#808080] bg-white text-black"
        >
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Tahoma">Tahoma</option>
        </select>

        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="h-6 px-1 text-xs border border-[#808080] bg-white text-black w-14"
        >
          <option value="10px">10</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="20px">20</option>
        </select>

        <div className="w-[1px] h-4 bg-[#808080] mx-0.5" />

        <Button
          onClick={() => setIsBold(!isBold)}
          className={`w-6 h-6 p-0 text-black border ${
            isBold
              ? "bg-[#a0a0a0] border-inset border-[#808080]"
              : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
          }`}
          title="Bold"
        >
          <Bold size={12} />
        </Button>
        <Button
          onClick={() => setIsItalic(!isItalic)}
          className={`w-6 h-6 p-0 text-black border ${
            isItalic
              ? "bg-[#a0a0a0] border-inset border-[#808080]"
              : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
          }`}
          title="Italic"
        >
          <Italic size={12} />
        </Button>
        <Button
          onClick={() => setIsUnderline(!isUnderline)}
          className={`w-6 h-6 p-0 text-black border ${
            isUnderline
              ? "bg-[#a0a0a0] border-inset border-[#808080]"
              : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
          }`}
          title="Underline"
        >
          <Underline size={12} />
        </Button>

        <div className="w-[1px] h-4 bg-[#808080] mx-0.5" />

        <Button
          onClick={() => setTextAlign("left")}
          className={`w-6 h-6 p-0 text-black border ${
            textAlign === "left"
              ? "bg-[#a0a0a0] border-inset border-[#808080]"
              : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
          }`}
          title="Align Left"
        >
          <AlignLeft size={12} />
        </Button>
        <Button
          onClick={() => setTextAlign("center")}
          className={`w-6 h-6 p-0 text-black border ${
            textAlign === "center"
              ? "bg-[#a0a0a0] border-inset border-[#808080]"
              : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
          }`}
          title="Align Center"
        >
          <AlignCenter size={12} />
        </Button>
        <Button
          onClick={() => setTextAlign("right")}
          className={`w-6 h-6 p-0 text-black border ${
            textAlign === "right"
              ? "bg-[#a0a0a0] border-inset border-[#808080]"
              : "bg-[#c0c0c0] border-white border-r-[#808080] border-b-[#808080]"
          }`}
          title="Align Right"
        >
          <AlignRight size={12} />
        </Button>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-2 bg-[#808080] overflow-auto flex justify-center">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full max-w-2xl h-full p-4 bg-white shadow-md border border-[#404040] focus:outline-none resize-none text-black"
          style={{
            fontFamily,
            fontSize,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
            textAlign,
          }}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-0.5 flex justify-between text-gray-700">
        <span>{statusMessage}</span>
        <span>
          {content.length} characters | {content.trim().split(/\s+/).filter(Boolean).length} words
        </span>
      </div>
    </div>
  )
}
