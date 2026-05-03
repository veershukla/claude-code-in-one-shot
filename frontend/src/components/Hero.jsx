import React from 'react'
import Clock from './Clock.jsx'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-16 lg:px-32 py-24">
      <p className="font-mono text-accent text-sm mb-3 tracking-widest">
        ~/portfolio $
      </p>

      <h1
        className="font-mono text-4xl md:text-6xl lg:text-7xl font-semibold text-accent overflow-hidden whitespace-nowrap border-r-4 border-accent"
        style={{
          animation:
            'typing 2.5s steps(12, end) forwards, blink 0.75s step-end infinite',
          width: '0',
        }}
      >
        Veer Shukla
      </h1>

      <p className="mt-6 text-text-primary font-sans text-xl md:text-2xl font-medium">
        Building things with{' '}
        <span className="text-accent">code</span> &amp; curiosity.
      </p>

      <p className="mt-4 text-text-muted font-sans text-base md:text-lg max-w-xl leading-relaxed">
        Software engineer. I build tools, explore agentic AI systems, and solve
        algorithmic problems.
      </p>

      <Clock />

      <div className="mt-16 flex items-center gap-2 text-text-muted text-sm font-mono">
        <span className="animate-bounce">↓</span>
        <span>scroll to projects</span>
      </div>

      <style>{`
        @keyframes typing {
          from { width: 0; }
          to   { width: 12ch; }
        }
        @keyframes blink {
          0%, 100% { border-color: #00ff88; }
          50%       { border-color: transparent; }
        }
      `}</style>
    </section>
  )
}
