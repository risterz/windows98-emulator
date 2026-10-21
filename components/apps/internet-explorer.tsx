"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCcw, Home, Search, Star, Globe } from "lucide-react"

export function InternetExplorer() {
  const [url, setUrl] = useState("http://www.google.com")
  const [currentPage, setCurrentPage] = useState("google")
  const [history, setHistory] = useState(["google"])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFavorites, setShowFavorites] = useState(false)

  const navigate = (page: string, pageUrl?: string) => {
    setCurrentPage(page)
    setUrl(pageUrl || `http://www.${page}.com`)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(page)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
    setShowFavorites(false)
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = url.toLowerCase().replace(/https?:\/\//, "").replace(/www\./, "").replace(/\.com.*$/, "")
    if (pages[clean as keyof typeof pages]) {
      navigate(clean, url)
    } else {
      navigate("search_result", url)
    }
  }

  const goBack = () => {
    if (historyIndex > 0) {
      const prevPage = history[historyIndex - 1]
      setHistoryIndex(historyIndex - 1)
      setCurrentPage(prevPage)
      setUrl(`http://www.${prevPage}.com`)
    }
  }

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextPage = history[historyIndex + 1]
      setHistoryIndex(historyIndex + 1)
      setCurrentPage(nextPage)
      setUrl(`http://www.${nextPage}.com`)
    }
  }

  const pages = {
    google: {
      title: "Google! Beta (1998)",
      content: (
        <div className="p-8 bg-white flex flex-col items-center justify-center min-h-[360px] text-black">
          <div className="text-4xl font-serif font-bold mb-4 tracking-tight">
            <span className="text-blue-600">G</span>
            <span className="text-red-600">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-600">g</span>
            <span className="text-green-600">l</span>
            <span className="text-red-600">e</span>
            <span className="text-blue-600 text-2xl align-super">!</span>
            <span className="text-xs text-gray-500 ml-2 font-sans font-normal">BETA</span>
          </div>

          <div className="w-full max-w-md flex flex-col items-center gap-3">
            <div className="w-full flex">
              <input
                type="text"
                value={searchQuery}
                placeholder="Search the 1998 Web using Google..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-2 border-[#808080] p-1.5 text-xs text-black focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate("search_result", `http://www.google.com/search?q=${searchQuery}`)}
                className="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs font-bold hover:bg-[#d0d0d0]"
              >
                Google Search
              </button>
              <button
                onClick={() => navigate("geocities")}
                className="px-3 py-1 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-xs hover:bg-[#d0d0d0]"
              >
                I'm feeling lucky
              </button>
            </div>

            <div className="text-[11px] text-gray-600 mt-4 text-center">
              Special Searches: <a href="#" onClick={() => navigate("stanford")} className="text-blue-600 underline">Stanford Search</a> | <a href="#" onClick={() => navigate("linux")} className="text-blue-600 underline">Linux Search</a>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Copyright ©1998 Google Inc.</p>
          </div>
        </div>
      ),
    },

    search_result: {
      title: "Google Search Results",
      content: (
        <div className="p-4 bg-white text-xs text-black">
          <div className="flex items-center gap-3 border-b pb-2 mb-3">
            <span className="font-serif font-bold text-lg text-blue-600">Google!</span>
            <span className="text-gray-500">Searched the web for: <strong>{searchQuery || "windows 98"}</strong></span>
          </div>

          <div className="space-y-4">
            <div>
              <a href="#" onClick={() => navigate("windows98")} className="text-blue-700 underline text-sm font-bold">
                Microsoft Windows 98 Official Site
              </a>
              <p className="text-gray-700">Windows 98 works better, plays better. Explore features, drivers, and downloads.</p>
              <span className="text-green-700 text-[10px]">http://www.microsoft.com/windows98/</span>
            </div>

            <div>
              <a href="#" onClick={() => navigate("geocities")} className="text-blue-700 underline text-sm font-bold">
                ~CyberDave's Rad 90s Homepage~
              </a>
              <p className="text-gray-700">Welcome to my personal corner on the World Wide Web! Built with Netscape Gold.</p>
              <span className="text-green-700 text-[10px]">http://www.geocities.com/SiliconValley/Pebble/1998/</span>
            </div>

            <div>
              <a href="#" onClick={() => navigate("yahoo")} className="text-blue-700 underline text-sm font-bold">
                Yahoo! Internet Directory
              </a>
              <p className="text-gray-700">The premier guide to what's new and cool on the Internet.</p>
              <span className="text-green-700 text-[10px]">http://www.yahoo.com/</span>
            </div>
          </div>
        </div>
      ),
    },

    geocities: {
      title: "CyberDave's GeoCities Page",
      content: (
        <div className="p-6 bg-black text-yellow-300 font-mono text-xs min-h-[400px]">
          <div className="border-4 border-dashed border-red-600 p-2 text-center mb-4">
            <span className="text-red-500 text-lg font-bold animate-pulse">
              ⚠️ UNDER CONSTRUCTION ⚠️
            </span>
          </div>

          <marquee className="text-cyan-400 font-bold mb-4">
            ★ WELCOME TO CYBERDAVE'S RETRO VAULT - BEST VIEWED IN 800x600 16-BIT COLOR WITH NETSCAPE NAVIGATOR 4.0 ★
          </marquee>

          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="border border-green-500 p-3 bg-[#0a180a]">
              <h3 className="text-green-400 font-bold text-sm mb-2">🔥 My Favorite Things:</h3>
              <ul className="list-disc ml-4 space-y-1 text-gray-200">
                <li>Dial-up 56k modems</li>
                <li>Napster MP3 downloads</li>
                <li>Playing Doom II & Quake over LAN</li>
                <li>Windows 98 Second Edition</li>
              </ul>
            </div>

            <div className="border border-purple-500 p-3 bg-[#180a18]">
              <h3 className="text-purple-400 font-bold text-sm mb-2">📬 Webmaster Contact:</h3>
              <p className="text-gray-300">Sign my guestbook or send ICQ message to: <strong>#8192019</strong></p>
              <div className="mt-3 p-1 bg-yellow-400 text-black font-bold text-center">
                VISITOR COUNTER: 004,291
              </div>
            </div>
          </div>
        </div>
      ),
    },

    yahoo: {
      title: "Yahoo! - What's New",
      content: (
        <div className="p-4 bg-white text-xs text-black">
          <div className="text-red-600 font-serif text-3xl font-bold mb-3 tracking-wider">YAHOO!</div>
          <div className="grid grid-cols-2 gap-3 border-t border-gray-300 pt-3">
            <div>
              <p className="font-bold text-blue-700 underline cursor-pointer" onClick={() => navigate("google")}>Arts & Humanities</p>
              <p className="text-gray-600 text-[11px]">Literature, Photography, Design...</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 underline cursor-pointer" onClick={() => navigate("microsoft")}>Computers & Internet</p>
              <p className="text-gray-600 text-[11px]">Internet, WWW, Software, Games...</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 underline cursor-pointer" onClick={() => navigate("geocities")}>Entertainment</p>
              <p className="text-gray-600 text-[11px]">Cool Links, Movies, Humor, Music...</p>
            </div>
            <div>
              <p className="font-bold text-blue-700 underline cursor-pointer" onClick={() => navigate("windows98")}>News & Media</p>
              <p className="text-gray-600 text-[11px]">Current Events, Magazines, TV...</p>
            </div>
          </div>
        </div>
      ),
    },

    microsoft: {
      title: "Microsoft Corporation",
      content: (
        <div className="p-4 bg-white text-black">
          <h1 className="text-2xl font-bold text-blue-700 mb-2">Where do you want to go today?</h1>
          <p className="text-xs text-gray-700 mb-4">Welcome to the official Microsoft Internet headquarters.</p>
          <div className="flex gap-4 text-xs">
            <button onClick={() => navigate("windows98")} className="text-blue-600 underline font-bold">
              Windows 98 Overview
            </button>
            <button onClick={() => navigate("yahoo")} className="text-blue-600 underline">
              Yahoo! Directory
            </button>
            <button onClick={() => navigate("geocities")} className="text-blue-600 underline">
              GeoCities Community
            </button>
          </div>
        </div>
      ),
    },

    windows98: {
      title: "Windows 98 - Microsoft",
      content: (
        <div className="p-4 bg-white text-black">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">Microsoft Windows 98</h1>
          <p className="text-xs text-gray-700 mb-3">
            The groundbreaking operating system that brings the power of the World Wide Web directly to your desktop.
          </p>
          <ul className="list-disc ml-5 space-y-1.5 text-xs text-gray-800">
            <li>Built-in Internet Explorer 4.0 integration</li>
            <li>USB support and Plug & Play improvements</li>
            <li>FAT32 file system for large hard drives</li>
            <li>DirectX 6.0 gaming acceleration</li>
          </ul>
        </div>
      ),
    },
  }

  const activePage = pages[currentPage as keyof typeof pages] || pages.google

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-xs select-none">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex gap-3 text-black">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Go</span>
        <div className="relative">
          <span
            className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer font-bold"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            Favorites
          </span>
          {showFavorites && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-xl z-50 p-1 flex flex-col gap-1">
              <button
                onClick={() => navigate("google")}
                className="text-left px-2 py-1 hover:bg-blue-600 hover:text-white text-black"
              >
                ★ Google! Beta (1998)
              </button>
              <button
                onClick={() => navigate("yahoo")}
                className="text-left px-2 py-1 hover:bg-blue-600 hover:text-white text-black"
              >
                ★ Yahoo! Web Directory
              </button>
              <button
                onClick={() => navigate("geocities")}
                className="text-left px-2 py-1 hover:bg-blue-600 hover:text-white text-black"
              >
                ★ GeoCities 90s Homepage
              </button>
              <button
                onClick={() => navigate("windows98")}
                className="text-left px-2 py-1 hover:bg-blue-600 hover:text-white text-black"
              >
                ★ Windows 98 Showcase
              </button>
            </div>
          )}
        </div>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 bg-[#c0c0c0] border-b border-[#808080]">
        <Button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="h-6 px-2 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-black disabled:opacity-40 flex items-center gap-1"
          title="Back"
        >
          <ArrowLeft size={12} /> Back
        </Button>
        <Button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="h-6 px-2 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-black disabled:opacity-40 flex items-center gap-1"
          title="Forward"
        >
          <ArrowRight size={12} /> Forward
        </Button>
        <Button
          onClick={() => navigate(currentPage)}
          className="h-6 px-2 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-black flex items-center gap-1"
          title="Refresh"
        >
          <RotateCcw size={12} /> Refresh
        </Button>
        <Button
          onClick={() => navigate("google")}
          className="h-6 px-2 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-black flex items-center gap-1"
          title="Home"
        >
          <Home size={12} /> Home
        </Button>
        <Button
          onClick={() => setShowFavorites(!showFavorites)}
          className="h-6 px-2 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-black flex items-center gap-1"
          title="Favorites"
        >
          <Star size={12} /> Favorites
        </Button>
      </div>

      {/* Address Bar */}
      <form onSubmit={handleUrlSubmit} className="flex items-center gap-2 p-1 bg-[#c0c0c0] border-b border-[#808080]">
        <span className="text-gray-700 font-bold ml-1">Address:</span>
        <div className="flex-1 bg-white border border-[#808080] flex items-center px-1">
          <Globe size={13} className="text-blue-600 mr-1.5 shrink-0" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full h-5 text-xs text-black border-none outline-none font-mono"
          />
        </div>
        <Button
          type="submit"
          className="h-5 px-3 bg-[#c0c0c0] border border-white border-r-[#808080] border-b-[#808080] text-black font-bold"
        >
          Go
        </Button>
      </form>

      {/* Web Page Content */}
      <div className="flex-1 bg-white overflow-auto border border-inset border-[#808080]">
        {activePage.content}
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-0.5 text-gray-700 flex justify-between">
        <span className="flex items-center gap-1">
          <Globe size={12} className="text-blue-600" />
          Internet zone
        </span>
        <span>Done</span>
      </div>
    </div>
  )
}
