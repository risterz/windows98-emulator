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
import { SpaceCadetPinball } from "@/components/apps/pinball"
import { FreeCell } from "@/components/apps/freecell"
import { RecycleBin } from "@/components/apps/recycle-bin"
import { MediaPlayer } from "@/components/apps/media-player"
import { WordPad } from "@/components/apps/wordpad"
import { SoundRecorder } from "@/components/apps/sound-recorder"
import { TaskManager } from "@/components/apps/task-manager"
import { CmdPrompt } from "@/components/apps/cmd-prompt"
import { RunDialog } from "@/components/apps/run-dialog"
import { ShutDownDialog } from "@/components/apps/shutdown-dialog"
import { VolumeControl } from "@/components/apps/volume-control"

const Placeholder = ({ name }: { name: string }) => (
  <div className="p-6 text-xs bg-[#c0c0c0] h-full flex flex-col items-center justify-center gap-2 text-black">
    <div className="font-bold text-sm">{name}</div>
    <p className="text-gray-600 text-center">This Windows 98 component is being prepared.</p>
  </div>
)

interface WindowManagerProps {
  windows: any[]
  onClose: (id: string) => void
  onFocus: (id: string) => void
  onMinimize: (id: string) => void
  onMaximize: (id: string) => void
  onUpdate: (id: string, updates: any) => void
  onOpenWindow?: (app: string) => void
}

export function WindowManager({
  windows,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onUpdate,
  onOpenWindow = () => {},
}: WindowManagerProps) {
  const renderApp = (window: any) => {
    switch (window.app) {
      case "notepad":
        return <Notepad />
      case "calculator":
        return <Calculator />
      case "minesweeper":
        return <Minesweeper />
      case "snake":
        return <Snake />
      case "pinball":
        return <SpaceCadetPinball />
      case "freecell":
        return <FreeCell />
      case "paint":
        return <Paint />
      case "explorer":
        return <Explorer />
      case "documents":
        return <Explorer />
      case "network":
        return <Explorer />
      case "recycle":
        return <RecycleBin />
      case "mediaplayer":
        return <MediaPlayer />
      case "soundrec":
        return <SoundRecorder />
      case "wordpad":
        return <WordPad />
      case "taskmgr":
        return (
          <TaskManager
            windows={windows}
            onCloseWindow={onClose}
            onFocusWindow={onFocus}
            onOpenWindow={onOpenWindow}
          />
        )
      case "cmd":
        return <CmdPrompt onOpenWindow={onOpenWindow} />
      case "run":
        return <RunDialog onOpenWindow={onOpenWindow} onClose={() => onClose(window.id)} />
      case "shutdown":
        return <ShutDownDialog onClose={() => onClose(window.id)} onOpenWindow={onOpenWindow} />
      case "volume":
        return <VolumeControl />
      case "solitaire":
        return <Solitaire />
      case "control":
        return <ControlPanel />
      case "ie":
        return <InternetExplorer />
      default:
        return <Placeholder name={window.title || window.app} />
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
          {renderApp(window)}
        </Window>
      ))}
    </>
  )
}
