"use client"

import { useState, useRef } from "react"

export function Notepad() {
  const [content, setContent] = useState(
    "Welcome to Notepad!\n\nThis is a classic Windows 98 text editor.\nFeel free to type anything here...\n\nTry the menu options above!",
  )
  const [fileName, setFileName] = useState("Untitled")
  const [showFileMenu, setShowFileMenu] = useState(false)
  const [showEditMenu, setShowEditMenu] = useState(false)
  const [showSearchMenu, setShowSearchMenu] = useState(false)
  const [showHelpMenu, setShowHelpMenu] = useState(false)
  const [findText, setFindText] = useState("")
  const [showFindDialog, setShowFindDialog] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleNew = () => {
    setContent("")
    setFileName("Untitled")
    setShowFileMenu(false)
  }

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.txt`
    a.click()
    URL.revokeObjectURL(url)
    setShowFileMenu(false)
  }

  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
    }
    setShowEditMenu(false)
  }

  const handleCopy = () => {
    if (textareaRef.current) {
      const selectedText = textareaRef.current.value.substring(
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd,
      )
      navigator.clipboard.writeText(selectedText)
    }
    setShowEditMenu(false)
  }

  const handleFind = () => {
    setShowFindDialog(true)
    setShowSearchMenu(false)
  }

  const performFind = () => {
    if (findText && textareaRef.current) {
      const text = textareaRef.current.value
      const index = text.toLowerCase().indexOf(findText.toLowerCase())
      if (index !== -1) {
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(index, index + findText.length)
      } else {
        alert("Text not found!")
      }
    }
    setShowFindDialog(false)
  }

  const handleAbout = () => {
    alert("Notepad\nA simple text editor\nWindows 98 Emulator Version")
    setShowHelpMenu(false)
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-1 relative">
        <div className="flex gap-4 text-xs">
          <div className="relative">
            <span
              className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer"
              onClick={() => setShowFileMenu(!showFileMenu)}
            >
              File
            </span>
            {showFileMenu && (
              <div className="absolute top-full left-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-10 min-w-32">
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer" onClick={handleNew}>
                  New
                </div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Open...</div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer" onClick={handleSave}>
                  Save
                </div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Save As...</div>
                <div className="border-t border-[#808080] my-1"></div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Exit</div>
              </div>
            )}
          </div>

          <div className="relative">
            <span
              className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer"
              onClick={() => setShowEditMenu(!showEditMenu)}
            >
              Edit
            </span>
            {showEditMenu && (
              <div className="absolute top-full left-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-10 min-w-32">
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Undo</div>
                <div className="border-t border-[#808080] my-1"></div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Cut</div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer" onClick={handleCopy}>
                  Copy
                </div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Paste</div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Delete</div>
                <div className="border-t border-[#808080] my-1"></div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer" onClick={handleSelectAll}>
                  Select All
                </div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Time/Date</div>
              </div>
            )}
          </div>

          <div className="relative">
            <span
              className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer"
              onClick={() => setShowSearchMenu(!showSearchMenu)}
            >
              Search
            </span>
            {showSearchMenu && (
              <div className="absolute top-full left-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-10 min-w-32">
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer" onClick={handleFind}>
                  Find...
                </div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Find Next</div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Replace...</div>
              </div>
            )}
          </div>

          <div className="relative">
            <span
              className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer"
              onClick={() => setShowHelpMenu(!showHelpMenu)}
            >
              Help
            </span>
            {showHelpMenu && (
              <div className="absolute top-full left-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-lg z-10 min-w-32">
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer">Help Topics</div>
                <div className="border-t border-[#808080] my-1"></div>
                <div className="hover:bg-blue-600 hover:text-white px-3 py-1 cursor-pointer" onClick={handleAbout}>
                  About Notepad
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 p-2 bg-white border-2 border-[#808080] border-t-white border-l-white resize-none outline-none font-mono text-sm"
        style={{ fontFamily: "Courier New, monospace" }}
        placeholder="Type your text here..."
      />

      {/* Find Dialog */}
      {showFindDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] p-4 min-w-64">
            <div className="mb-4 font-bold">Find</div>
            <div className="mb-4">
              <label className="block text-xs mb-1">Find what:</label>
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-full p-1 border-2 border-[#808080] border-t-white border-l-white"
                autoFocus
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={performFind}
                className="px-4 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs"
              >
                Find Next
              </button>
              <button
                onClick={() => setShowFindDialog(false)}
                className="px-4 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close menus */}
      {(showFileMenu || showEditMenu || showSearchMenu || showHelpMenu) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowFileMenu(false)
            setShowEditMenu(false)
            setShowSearchMenu(false)
            setShowHelpMenu(false)
          }}
        />
      )}
    </div>
  )
}
