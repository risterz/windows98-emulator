"use client"

// Web Audio API Retro Sound Synthesizer for Windows 98

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
    if (AudioCtx) {
      audioCtx = new AudioCtx()
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

// Windows 98 Startup Chime (Dreamy harmonized chord)
export function playStartupSound() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  // Classic ethereal progression: F, C, G, A, C (Fmaj9 / Cadd9 ambient sweep)
  const notes = [
    { freq: 174.61, delay: 0, duration: 3.5, type: "sine" as OscillatorType },
    { freq: 261.63, delay: 0.1, duration: 3.5, type: "triangle" as OscillatorType },
    { freq: 392.0, delay: 0.25, duration: 3.2, type: "sine" as OscillatorType },
    { freq: 440.0, delay: 0.45, duration: 3.0, type: "sine" as OscillatorType },
    { freq: 523.25, delay: 0.65, duration: 3.0, type: "triangle" as OscillatorType },
    { freq: 659.25, delay: 0.9, duration: 2.8, type: "sine" as OscillatorType },
    { freq: 1046.5, delay: 1.2, duration: 2.5, type: "sine" as OscillatorType },
  ]

  notes.forEach(({ freq, delay, duration, type }) => {
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, now + delay)

      gain.gain.setValueAtTime(0, now + delay)
      gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.3)
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + delay)
      osc.stop(now + delay + duration)
    } catch (e) {}
  })
}

// Classic "chord.wav" (Error / Asterisk sound)
export function playChord() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  const notes = [261.63, 329.63, 392.0, 523.25] // C major chord

  notes.forEach((freq) => {
    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.06, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.6)
    } catch (e) {}
  })
}

// Classic "ding.wav"
export function playDing() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(987.77, now) // B5

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.8)
  } catch (e) {}
}

// Classic click / button tap
export function playClick() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = "triangle"
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04)

    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.04)
  } catch (e) {}
}

// Recycle Bin Empty (Paper rustle sound)
export function playRecycleCrunch() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  try {
    const bufferSize = ctx.sampleRate * 0.4
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.setValueAtTime(1200, now)
    filter.Q.setValueAtTime(3, now)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    noise.start(now)
    noise.stop(now + 0.4)
  } catch (e) {}
}
