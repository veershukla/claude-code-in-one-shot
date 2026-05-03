import React from 'react'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'

export default function App() {
  return (
    <main className="min-h-screen bg-background text-text-primary">
      <Hero />
      <div className="mx-6 md:mx-16 lg:mx-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <Projects />
    </main>
  )
}
