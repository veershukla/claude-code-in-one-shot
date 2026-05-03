import { useState, useEffect } from 'react'

const ZONES = [
  { label: 'Pacific',  tz: 'America/Los_Angeles', abbr: 'PT'  },
  { label: 'Turkey',   tz: 'Europe/Istanbul',      abbr: 'TRT' },
  { label: 'India',    tz: 'Asia/Kolkata',          abbr: 'IST' },
]

function formatTime(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

function formatDate(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
}

export default function Clock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="mt-10 flex flex-wrap gap-3">
      {ZONES.map(({ label, tz, abbr }) => (
        <div
          key={tz}
          className="flex flex-col gap-1 px-4 py-3 rounded-lg border border-white/10 bg-surface hover:border-accent/30 transition-colors duration-200 min-w-[172px]"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            {label} · {abbr}
          </span>
          <span className="font-mono text-xl text-text-primary tabular-nums leading-none">
            {formatTime(now, tz)}
          </span>
          <span className="font-mono text-xs text-text-muted mt-0.5">
            {formatDate(now, tz)}
          </span>
        </div>
      ))}
    </div>
  )
}
