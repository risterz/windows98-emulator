"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Folder, FileText, ArrowLeft, ArrowRight, ArrowUp, Home, HardDrive, DiscIcon as Floppy } from "lucide-react"

interface FileItem {
  name: string
  type: "folder" | "file"
  size?: string
  modified?: string
  icon?: any
}

export function Explorer() {
  const [currentPath, setCurrentPath] = useState("C:\\")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [history, setHistory] = useState(["C:\\"])
  const [historyIndex, setHistoryIndex] = useState(0)

  const fileSystem: { [key: string]: FileItem[] } = {
    "C:\\": [
      { name: "Program Files", type: "folder", icon: Folder },
      { name: "Windows", type: "folder", icon: Folder },
      { name: "My Documents", type: "folder", icon: Folder },
      { name: "Temp", type: "folder", icon: Folder },
      { name: "autoexec.bat", type: "file", size: "1 KB", modified: "3/15/98", icon: FileText },
      { name: "config.sys", type: "file", size: "2 KB", modified: "3/15/98", icon: FileText },
      { name: "readme.txt", type: "file", size: "5 KB", modified: "4/20/98", icon: FileText },
    ],
    "C:\\Program Files\\": [
      { name: "Internet Explorer", type: "folder", icon: Folder },
      { name: "Windows Media Player", type: "folder", icon: Folder },
      { name: "Microsoft Office", type: "folder", icon: Folder },
      { name: "Common Files", type: "folder", icon: Folder },
    ],
    "C:\\Windows\\": [
      { name: "System", type: "folder", icon: Folder },
      { name: "System32", type: "folder", icon: Folder },
      { name: "Fonts", type: "folder", icon: Folder },
      { name: "Help", type: "folder", icon: Folder },
      { name: "notepad.exe", type: "file", size: "69 KB", modified: "5/11/98", icon: FileText },
      { name: "calc.exe", type: "file", size: "114 KB", modified: "5/11/98", icon: FileText },
    ],
    "C:\\My Documents\\": [
      { name: "My Pictures", type: "folder", icon: Folder },
      { name: "My Music", type: "folder", icon: Folder },
      { name: "Letter to Mom.doc", type: "file", size: "24 KB", modified: "6/15/98", icon: FileText },
      { name: "Shopping List.txt", type: "file", size: "1 KB", modified: "6/20/98", icon: FileText },
    ],
  }

  const getCurrentFiles = () => {
    return fileSystem[currentPath] || []
  }

  const navigateToFolder = (folderName: string) => {
    const newPath = currentPath + folderName + "\\"
    if (fileSystem[newPath]) {
      setCurrentPath(newPath)
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(newPath)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setSelectedItem(null)
    }
  }

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setCurrentPath(history[historyIndex - 1])
      setSelectedItem(null)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setCurrentPath(history[historyIndex + 1])
      setSelectedItem(null)
    }
  }

  const goUp = () => {
    const pathParts = currentPath.split("\\").filter((part) => part)
    if (pathParts.length > 1) {
      pathParts.pop()
      const newPath = pathParts.join("\\") + "\\"
      setCurrentPath(newPath)
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(newPath)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setSelectedItem(null)
    }
  }

  const goHome = () => {
    setCurrentPath("C:\\")
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push("C:\\")
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setSelectedItem(null)
  }

  const openFile = (fileName: string) => {
    alert(`Opening ${fileName}...\n\nIn a real system, this would launch the associated application.`)
  }

  const files = getCurrentFiles()

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-1">
        <div className="flex gap-4 text-xs">
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">File</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Edit</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">View</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Go</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Favorites</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Tools</span>
          <span className="hover:bg-blue-600 hover:text-white px-2 py-1 cursor-pointer">Help</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-1 p-1 border-b border-[#808080]">
        <Button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black disabled:opacity-50"
          title="Back"
        >
          <ArrowLeft size={16} />
        </Button>
        <Button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black disabled:opacity-50"
          title="Forward"
        >
          <ArrowRight size={16} />
        </Button>
        <Button
          onClick={goUp}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black"
          title="Up"
        >
          <ArrowUp size={16} />
        </Button>
        <Button
          onClick={goHome}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#c0c0c0] text-black"
          title="Home"
        >
          <Home size={16} />
        </Button>
        <div className="border-l border-[#808080] mx-2"></div>
        <div className="flex items-center gap-2">
          <HardDrive size={16} className="text-black" />
          <span className="text-xs">C:</span>
          <Floppy size={16} className="text-black" />
          <span className="text-xs">A:</span>
        </div>
      </div>

      {/* Address Bar */}
      <div className="p-1 border-b border-[#808080]">
        <div className="flex items-center gap-2">
          <span className="text-xs">Address:</span>
          <div className="flex-1 bg-white border-2 border-[#808080] border-t-white border-l-white px-2 py-1 text-xs">
            {currentPath}
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 bg-white border-2 border-[#808080] border-t-white border-l-white m-1">
        <div className="grid grid-cols-4 gap-0 border-b border-[#c0c0c0] bg-[#c0c0c0] text-xs font-bold">
          <div className="p-2 border-r border-[#808080]">Name</div>
          <div className="p-2 border-r border-[#808080]">Size</div>
          <div className="p-2 border-r border-[#808080]">Type</div>
          <div className="p-2">Modified</div>
        </div>

        {files.map((file, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 gap-0 text-xs hover:bg-blue-600 hover:text-white cursor-pointer ${
              selectedItem === file.name ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setSelectedItem(file.name)}
            onDoubleClick={() => {
              if (file.type === "folder") {
                navigateToFolder(file.name)
              } else {
                openFile(file.name)
              }
            }}
          >
            <div className="p-2 flex items-center gap-2">
              {file.icon && <file.icon size={16} />}
              {file.name}
            </div>
            <div className="p-2">{file.size || ""}</div>
            <div className="p-2">{file.type === "folder" ? "File Folder" : "File"}</div>
            <div className="p-2">{file.modified || ""}</div>
          </div>
        ))}

        {files.length === 0 && <div className="p-4 text-center text-gray-500 text-xs">This folder is empty</div>}
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 text-xs flex justify-between">
        <span>{files.length} object(s)</span>
        <span>{selectedItem ? `Selected: ${selectedItem}` : ""}</span>
      </div>
    </div>
  )
}
