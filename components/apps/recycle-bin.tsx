"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, RotateCcw, FileText, ArrowLeft, ArrowRight, ArrowUp, HardDrive } from "lucide-react"

interface RecycleItem {
  id: string
  name: string
  originalLocation: string
  dateDeleted: string
  size: string
  type: string
}

const INITIAL_ITEMS: RecycleItem[] = [
  {
    id: "1",
    name: "bad_idea.txt",
    originalLocation: "C:\\My Documents",
    dateDeleted: "10/18/98 4:12 PM",
    size: "12 KB",
    type: "Text Document",
  },
  {
    id: "2",
    name: "setup_corrupted.log",
    originalLocation: "C:\\Windows\\Temp",
    dateDeleted: "10/19/98 9:45 AM",
    size: "45 KB",
    type: "Log File",
  },
  {
    id: "3",
    name: "budget_1997_draft.xls",
    originalLocation: "C:\\My Documents",
    dateDeleted: "10/15/98 2:30 PM",
    size: "128 KB",
    type: "Worksheet",
  },
  {
    id: "4",
    name: "dialup_modem_recording.wav",
    originalLocation: "C:\\Windows\\Media",
    dateDeleted: "10/20/98 11:15 AM",
    size: "350 KB",
    type: "Wave Sound",
  },
  {
    id: "5",
    name: "secret_passwords.doc",
    originalLocation: "C:\\My Documents",
    dateDeleted: "10/21/98 8:05 AM",
    size: "14 KB",
    type: "Word Document",
  },
]

export function RecycleBin() {
  const [items, setItems] = useState<RecycleItem[]>(INITIAL_ITEMS)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleEmpty = () => {
    setShowConfirm(true)
  }

  const confirmEmpty = () => {
    setItems([])
    setSelectedId(null)
    setShowConfirm(false)
  }

  const handleRestore = () => {
    if (selectedId) {
      setItems((prev) => prev.filter((item) => item.id !== selectedId))
      setSelectedId(null)
    } else {
      setItems([])
    }
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] select-none text-xs">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex gap-3">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Go</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-[#808080] bg-[#c0c0c0]">
        <Button
          onClick={handleEmpty}
          disabled={items.length === 0}
          className="h-6 px-2 text-xs bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black disabled:opacity-50 flex items-center gap-1"
        >
          <Trash2 size={12} />
          Empty Recycle Bin
        </Button>
        <Button
          onClick={handleRestore}
          disabled={items.length === 0}
          className="h-6 px-2 text-xs bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black disabled:opacity-50 flex items-center gap-1"
        >
          <RotateCcw size={12} />
          Restore {selectedId ? "Item" : "All"}
        </Button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-2 py-1 bg-[#c0c0c0] border-b border-[#808080]">
        <span className="text-gray-600">Address:</span>
        <div className="flex-1 bg-white border border-[#808080] px-2 py-0.5 text-xs flex items-center gap-1">
          <Trash2 size={12} className="text-gray-500" />
          <span>Recycle Bin</span>
        </div>
      </div>

      {/* File List Table */}
      <div className="flex-1 bg-white border border-inset overflow-auto">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <Trash2 size={48} className="mb-2 opacity-30" />
            <p>The Recycle Bin is empty.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#c0c0c0] border-b border-[#808080] text-black sticky top-0">
                <th className="p-1 border-r border-[#808080] font-normal">Name</th>
                <th className="p-1 border-r border-[#808080] font-normal">Original Location</th>
                <th className="p-1 border-r border-[#808080] font-normal">Date Deleted</th>
                <th className="p-1 border-r border-[#808080] font-normal">Size</th>
                <th className="p-1 font-normal">Type</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const isSelected = selectedId === item.id
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`cursor-pointer ${
                      isSelected ? "bg-blue-700 text-white" : "hover:bg-blue-50 text-black"
                    }`}
                  >
                    <td className="p-1 flex items-center gap-1.5 whitespace-nowrap">
                      <FileText size={14} className={isSelected ? "text-white" : "text-blue-600"} />
                      <span>{item.name}</span>
                    </td>
                    <td className="p-1 whitespace-nowrap">{item.originalLocation}</td>
                    <td className="p-1 whitespace-nowrap">{item.dateDeleted}</td>
                    <td className="p-1 whitespace-nowrap">{item.size}</td>
                    <td className="p-1 whitespace-nowrap">{item.type}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] border-t border-[#808080] px-2 py-0.5 text-xs text-gray-700 flex justify-between">
        <span>{items.length} object(s)</span>
        <span>
          {items.reduce((acc, item) => acc + parseInt(item.size), 0)} KB total
        </span>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] shadow-xl p-4 w-72">
            <div className="flex items-start gap-3 mb-4">
              <Trash2 size={28} className="text-yellow-600 shrink-0" />
              <div>
                <p className="font-bold text-xs mb-1">Confirm File Delete</p>
                <p className="text-xs">
                  Are you sure you want to permanently delete all {items.length} items?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={confirmEmpty}
                className="h-6 px-4 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black text-xs font-bold"
              >
                Yes
              </Button>
              <Button
                onClick={() => setShowConfirm(false)}
                className="h-6 px-4 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#d0d0d0] text-black text-xs"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
