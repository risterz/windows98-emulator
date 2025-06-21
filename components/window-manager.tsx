"use client"

import { Window } from "@/components/window"
import { Notepad } from "@/components/apps/notepad"
import { Calculator } from "@/components/apps/calculator"
import { Minesweeper } from "@/components/apps/minesweeper"
import { Paint } from "@/components/apps/paint"
import { Explorer } from "@/components/apps/explorer"
import { Solitaire } from "@/components/apps/solitaire"
import { ControlPanel } from "@/components/apps/control-panel"
import { InternetExplorer } from "@/components/apps/internet-explorer"
import { Snake } from "@/components/apps/snake"
// Generic fallback for apps we haven't built yet
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-4 text-xs">{name} is not implemented yet. Stay tuned!</div>
)

interface WindowManagerProps {
  windows: any[]
  onClose: (id: string) => void
  onFocus: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onUpdate: (id: string, updates: any) => void
}

export function WindowManager({ windows, onClose, onFocus, onMinimize, onMaximize, onUpdate }: WindowManagerProps) {
  const renderApp = (app: string) => {
    switch (app) {
      case "notepad":
        return <Notepad />
      case "calculator":
        return <Calculator />
      case "minesweeper":
        return <Minesweeper />
      case "snake":
        return <Snake />
      case "paint":
        return <Paint />
      case "explorer":
      case "documents":
      case "network":
        return <Explorer />
      case "solitaire":
        return <Solitaire />
      case "control":
        return <ControlPanel />
      case "ie":
        return <InternetExplorer />
      /* ---- not-yet-implemented apps fall through ---- */
      default:
        return <Placeholder name={app} />
    }
  }

  return (
    <>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          x={window.x}
          y={window.y}
          width={window.width}
          height={window.height}
          focused={window.focused}
          maximized={window.maximized}
          minimized={window.minimized}
          onClose={() => onClose(window.id)}
          onFocus={() => onFocus(window.id)}
          onMinimize={() => onMinimize(window.id)}
          onMaximize={() => onMaximize(window.id)}
          onMove={(x, y) => onUpdate(window.id, { x, y })}
          onResize={(width, height) => onUpdate(window.id, { width, height })}
        >
          {renderApp(window.app)}
        </Window>
      ))}
    </>
  )
}
