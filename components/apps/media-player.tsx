"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, VolumeX, Music } from "lucide-react"

interface Track {
  id: number
  title: string
  artist: string
  duration: number
  notes: number[]
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Canyon.mid (Retro MIDI)",
    artist: "George Stone",
    duration: 38,
    notes: [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 349.23, 440.0, 587.33, 440.0, 349.23],
  },
  {
    id: 2,
    title: "Passport.mid",
    artist: "Windows 98 Sound Team",
    duration: 32,
    notes: [329.63, 392.0, 493.88, 587.33, 493.88, 392.0, 261.63, 329.63, 392.0, 523.25],
  },
  {
    id: 3,
    title: "Chiptune Odyssey",
    artist: "8-bit Nostalgia",
    duration: 28,
    notes: [440.0, 493.88, 523.25, 587.33, 659.25, 587.33, 523.25, 493.88, 440.0, 392.0],
  },
  {
    id: 4,
    title: "Welcom98.wav Synth",
    artist: "Microsoft Sound",
    duration: 15,
    notes: [220.0, 277.18, 329.63, 440.0, 554.37, 659.25, 880.0],
  },
]

export function MediaPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<any>(null)
  const animFrameRef = useRef<any>(null)

  const currentTrack = TRACKS[currentTrackIndex]

  // Synthesize sound note
  const playBeep = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      const vol = isMuted ? 0 : volume * 0.15
      gain.gain.setValueAtTime(vol, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.35)
    } catch (e) {
      // AudioContext not allowed before user interaction
    }
  }

  // Playback timer & melody loop
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1
          if (next >= currentTrack.duration) {
            handleNext()
            return 0
          }
          // Play note corresponding to current second
          const noteIndex = next % currentTrack.notes.length
          playBeep(currentTrack.notes[noteIndex])
          return next
        })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, currentTrackIndex, volume, isMuted])

  // Canvas visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let phase = 0

    const render = () => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barCount = 20
      const barWidth = canvas.width / barCount - 2

      for (let i = 0; i < barCount; i++) {
        const heightMultiplier = isPlaying
          ? Math.abs(Math.sin(phase + i * 0.4) * 0.8) + Math.random() * 0.2
          : 0.05
        const barHeight = heightMultiplier * (canvas.height - 4)

        const hue = 120 - (barHeight / canvas.height) * 120
        ctx.fillStyle = isPlaying ? `hsl(${hue}, 100%, 50%)` : "#005500"

        const x = i * (barWidth + 2) + 2
        const y = canvas.height - barHeight
        ctx.fillRect(x, y, barWidth, barHeight)
      }

      phase += 0.15
      animFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleStop = () => {
    setIsPlaying(false)
    setProgress(0)
  }

  const handleNext = () => {
    setProgress(0)
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
  }

  const handlePrev = () => {
    setProgress(0)
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-xs select-none">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 flex gap-3">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Playback</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      <div className="p-3 flex-1 flex flex-col gap-2">
        {/* LCD Display / Visualizer Box */}
        <div className="bg-black border-2 border-[#808080] border-b-white border-r-white p-2 rounded">
          <div className="flex justify-between items-center text-green-400 font-mono text-xs mb-1">
            <span className="truncate max-w-[180px]">{currentTrack.title}</span>
            <span className="text-right">
              {formatTime(progress)} / {formatTime(currentTrack.duration)}
            </span>
          </div>

          <canvas ref={canvasRef} width={280} height={60} className="w-full h-16 bg-black rounded" />
        </div>

        {/* Progress Slider */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-gray-700">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={currentTrack.duration}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="flex-1 h-3 accent-blue-600 cursor-pointer"
          />
          <span className="font-mono text-xs text-gray-700">{formatTime(currentTrack.duration)}</span>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between bg-[#d4d0c8] p-2 border-2 border-white border-r-[#808080] border-b-[#808080]">
          <div className="flex items-center gap-1">
            <Button
              onClick={handlePrev}
              className="w-7 h-7 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#e0e0e0] text-black"
              title="Previous Track"
            >
              <SkipBack size={12} />
            </Button>
            <Button
              onClick={handlePlayPause}
              className="w-7 h-7 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#e0e0e0] text-black font-bold"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </Button>
            <Button
              onClick={handleStop}
              className="w-7 h-7 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#e0e0e0] text-black"
              title="Stop"
            >
              <Square size={12} />
            </Button>
            <Button
              onClick={handleNext}
              className="w-7 h-7 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] hover:bg-[#e0e0e0] text-black"
              title="Next Track"
            >
              <SkipForward size={12} />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:bg-gray-300 rounded"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={14} className="text-red-600" /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value))
                if (isMuted) setIsMuted(false)
              }}
              className="w-16 h-2 accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Playlist */}
        <div className="flex-1 bg-white border border-[#808080] p-1 overflow-y-auto">
          <div className="text-[11px] font-bold text-gray-600 mb-1 px-1">TRACK LIST:</div>
          {TRACKS.map((track, idx) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrackIndex(idx)
                setProgress(0)
                setIsPlaying(true)
              }}
              className={`flex items-center justify-between px-2 py-1 cursor-pointer text-xs ${
                currentTrackIndex === idx ? "bg-blue-700 text-white font-bold" : "hover:bg-blue-50 text-black"
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Music size={12} />
                <span className="truncate">{track.title}</span>
              </div>
              <span className="font-mono text-[10px] ml-2">{formatTime(track.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
