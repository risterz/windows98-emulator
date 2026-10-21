"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Square, Circle, SkipBack, SkipForward, Volume2 } from "lucide-react"

export function SoundRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [length, setLength] = useState(60)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [speed, setSpeed] = useState(1)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioElemRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<any>(null)
  const animFrameRef = useRef<any>(null)

  // Draw classic green oscilloscope waveform
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let phase = 0

    const draw = () => {
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Green grid
      ctx.strokeStyle = "#003300"
      ctx.lineWidth = 1
      for (let y = 0; y < canvas.height; y += 10) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Center baseline
      ctx.strokeStyle = "#006600"
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()

      // Waveform
      ctx.strokeStyle = "#00ff00"
      ctx.lineWidth = 1.5
      ctx.beginPath()

      const midY = canvas.height / 2
      const amp = isRecording ? 18 : isPlaying ? 12 : 2

      for (let x = 0; x < canvas.width; x += 2) {
        const y =
          midY +
          Math.sin(phase + x * 0.1) * amp * (isRecording || isPlaying ? Math.random() * 0.5 + 0.5 : 0.2)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      phase += (isRecording || isPlaying ? 0.3 : 0.05) * speed
      animFrameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [isRecording, isPlaying, speed])

  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        audioChunksRef.current = []

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data)
        }

        recorder.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
          const url = URL.createObjectURL(blob)
          setAudioUrl(url)
          stream.getTracks().forEach((track) => track.stop())
        }

        recorder.start()
        mediaRecorderRef.current = recorder
        setIsRecording(true)
        setPosition(0)

        timerRef.current = setInterval(() => {
          setPosition((prev) => {
            const next = prev + 0.1
            if (next >= length) {
              stopRecording()
              return length
            }
            return next
          })
        }, 100)
      }
    } catch (e) {
      alert("Microphone access unavailable or denied. Simulating recording mode.")
      setIsRecording(true)
      timerRef.current = setInterval(() => {
        setPosition((prev) => prev + 0.1)
      }, 100)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    clearInterval(timerRef.current)
    setIsRecording(false)
  }

  const playRecording = () => {
    if (audioUrl) {
      if (!audioElemRef.current) {
        audioElemRef.current = new Audio(audioUrl)
      }
      audioElemRef.current.playbackRate = speed
      audioElemRef.current.play()
      setIsPlaying(true)
      audioElemRef.current.onended = () => {
        setIsPlaying(false)
        setPosition(0)
      }
    } else {
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 3000)
    }
  }

  const stopPlayback = () => {
    if (audioElemRef.current) {
      audioElemRef.current.pause()
      audioElemRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-xs select-none p-2 gap-2">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] pb-1 flex gap-3 -mx-2 -mt-2 px-2 pt-1">
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Edit</span>
        <span
          className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer"
          onClick={() => setSpeed((s) => (s >= 2 ? 1 : s * 1.5))}
        >
          Effects ({speed}x)
        </span>
        <span className="hover:bg-blue-600 hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Waveform Display */}
      <div className="bg-black border-2 border-[#808080] border-b-white border-r-white p-1">
        <canvas ref={canvasRef} width={290} height={70} className="w-full h-18 block bg-black" />
      </div>

      {/* Position & Length */}
      <div className="flex justify-between items-center text-gray-800 font-mono text-[11px] px-1">
        <span>Position: {position.toFixed(2)} sec.</span>
        <span>Length: {length.toFixed(2)} sec.</span>
      </div>

      {/* Progress slider */}
      <input
        type="range"
        min={0}
        max={length}
        step={0.1}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full h-3 accent-blue-600 cursor-pointer"
      />

      {/* Controls Bar */}
      <div className="flex justify-center items-center gap-1.5 p-1 bg-[#d4d0c8] border border-white border-r-[#808080] border-b-[#808080]">
        <Button
          onClick={() => setPosition(0)}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-black"
          title="Seek to Start"
        >
          <SkipBack size={14} />
        </Button>
        <Button
          onClick={() => setPosition(length)}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-black"
          title="Seek to End"
        >
          <SkipForward size={14} />
        </Button>
        <Button
          onClick={playRecording}
          disabled={isRecording}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-black"
          title="Play"
        >
          <Play size={14} className="fill-black" />
        </Button>
        <Button
          onClick={isRecording ? stopRecording : stopPlayback}
          className="w-8 h-8 p-0 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-black"
          title="Stop"
        >
          <Square size={14} className="fill-black" />
        </Button>
        <Button
          onClick={startRecording}
          disabled={isRecording}
          className={`w-8 h-8 p-0 border-2 border-white border-r-[#808080] border-b-[#808080] text-red-600 ${
            isRecording ? "bg-red-200 animate-pulse" : "bg-[#c0c0c0]"
          }`}
          title="Record"
        >
          <Circle size={14} className="fill-red-600" />
        </Button>
      </div>
    </div>
  )
}
