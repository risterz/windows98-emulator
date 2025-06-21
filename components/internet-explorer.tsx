"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCcw, Home, Search, Star, Globe } from "lucide-react"

export function InternetExplorer() {
  const [url, setUrl] = useState("http://www.microsoft.com")
  const [currentPage, setCurrentPage] = useState("microsoft")
  const [history, setHistory] = useState(["microsoft"])
  const [historyIndex, setHistoryIndex] = useState(0)

  const pages = {
    microsoft: {
      title: "Microsoft Corporation",
      content: (
        <div className="p-4 bg-white">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Welcome to Microsoft</h1>
          <div className="space-y-4">
            <p>Microsoft Corporation is an American multinational technology company.</p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-600 underline" onClick={() => navigate("windows98")}>
                Windows 98
              </a>
              <a href="#" className="text-blue-600 underline" onClick={() => navigate("office")}>
                Microsoft Office
              </a>
              <a href="#" className="text-blue-600 underline" onClick={() => navigate("games")}>
                Games
              </a>
            </div>
            <img src="/placeholder.svg?height=200&width=400" alt="Microsoft Logo" className="border border-gray-300" />
          </div>
        </div>
      ),
    },
    windows98: {
      title: "Windows 98 - Microsoft",
      content: (
        <div className="p-4 bg-white">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Windows 98</h1>
          <div className="space-y-4">
            <p>Windows 98 is a consumer-oriented operating system developed by Microsoft.</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Improved user interface</li>
              <li>Better hardware support</li>
              <li>Internet integration</li>
              <li>Enhanced multimedia capabilities</li>
            </ul>
            <a href="#" className="text-blue-600 underline" onClick={() => navigate("microsoft")}>
              ← Back to Microsoft
            </a>
          </div>
        </div>
      ),
    },
    office: {
      title: "Microsoft Office",
      content: (
        <div className="p-4 bg-white">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Microsoft Office</h1>
          <div className="space-y-4">
            <p>A suite of productivity applications including:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Microsoft Word</li>
              <li>Microsoft Excel</li>
              <li>Microsoft PowerPoint</li>
              <li>Microsoft Access</li>
            </ul>
            <a href="#" className="text-blue-600 underline" onClick={() => navigate("microsoft")}>
              ← Back to Microsoft
            </a>
          </div>
        </div>
      ),
    },
    games: {
      title: "Microsoft Games",
      content: (
        <div className="p-4 bg-white">
          <h1 className="text-2xl font-bold text-blue-600 mb-4">Microsoft Games</h1>
          <div className="space-y-4">
            <p>Classic games included with Windows:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Solitaire</li>
              <li>Minesweeper</li>
              <li>FreeCell</li>
              <li>Hearts</li>
              <li>3D Pinball Space Cadet</li>
            </ul>
            <a href="#" className="text-blue-600 underline" onClick={() => navigate("microsoft")}>
              ← Back to Microsoft
            </a>
          </div>
        </div>
      ),
    },
  }

  const navigate = (page: string) => {
    setCurrentPage(page)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(page)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setUrl(`http://www.${page}.com`)
  }

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      const page = history[historyIndex - 1]
      setCurrentPage(page)
      setUrl(`http://www.${page}.com`)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      const page = history[historyIndex + 1]
      setCurrentPage(page)
      setUrl(`http://www.${page}.com`)
    }
  }

  const currentPageData = pages[currentPage as keyof typeof pages] || pages.microsoft

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
      <div className="flex items-center gap-1 p-1 border-b border-[#808080]">
        <Button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black disabled:opacity-50"
        >
          <ArrowLeft size={16} />
        </Button>
        <Button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black disabled:opacity-50"
        >
          <ArrowRight size={16} />
        </Button>
        <Button className="w-8 h-8 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black">
          <RotateCcw size={16} />
        </Button>
        <Button
          onClick={() => navigate("microsoft")}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black"
        >
          <Home size={16} />
        </Button>
        <Button className="w-8 h-8 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black">
          <Search size={16} />
        </Button>
        <Button className="w-8 h-8 p-0 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black">
          <Star size={16} />
        </Button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-1 border-b border-[#808080]">
        <span className="text-xs">Address:</span>
        <div className="flex-1 flex items-center">
          <Globe size={16} className="mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 p-1 border border-[#808080] text-xs"
          />
        </div>
        <Button className="px-3 py-1 bg-[#c0c0c0] border border-[#808080] hover:bg-[#c0c0c0] text-black text-xs">
          Go
        </Button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white h-full">{currentPageData.content}</div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-1 text-xs">
        <span>Done</span>
      </div>
    </div>
  )
}
