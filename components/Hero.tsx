'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Avatar from '@/components/Avatar'

function rand(seed: number, salt = 0) {
  const x = Math.sin(seed * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const particles = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: rand(i, 0) * 100,
  y: rand(i, 1) * 100,
  size: rand(i, 2) * 3 + 1,
  duration: rand(i, 3) * 12 + 8,
  delay: rand(i, 4) * -20,
  opacity: rand(i, 5) * 0.18 + 0.04,
}))

const SCRAMBLE_POOL = '!<>-_\\/[]{}=+*^?#@$%&'
const scrambleChar  = () => SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)]

const NAME   = 'Younes Ait Braym'
const TITLES = [
  'Full Stack Developer',
  '< Software Engineer />',
  '{ Mobile Developer }',
  '// Problem Solver',
  'const coder = true;',
]

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef   = useRef<HTMLDivElement>(null)
  const btnRef   = useRef<HTMLButtonElement>(null)
  const [typed,        setTyped]        = useState('')
  const [caretVisible, setCaretVisible] = useState(true)

  // GSAP char reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.char', { yPercent: 110, duration: 0.9, stagger: 0.03, ease: 'power4.out', delay: 0.2 })
      gsap.from(ctaRef.current, { y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.6 })
    }, titleRef)
    return () => ctx.revert()
  }, [])

  // Cycling typewriter with scramble effect
  useEffect(() => {
    let cancelled                                             = false
    let idx                                                   = 0
    let phase: 'scrambling' | 'waiting' | 'erasing'          = 'scrambling'
    let scrambleStart: number | null                          = null
    let eraseCount                                            = 0

    function step() {
      if (cancelled) return
      const target = TITLES[idx]

      if (phase === 'scrambling') {
        // Initialise timer on first call of this phase
        if (scrambleStart === null) scrambleStart = Date.now()

        const progress = Math.min(1, (Date.now() - scrambleStart) / 1200)
        const locked   = Math.floor(progress * target.length)

        // Locked chars show real letters; remaining chars scramble every tick
        setTyped(
          target.slice(0, locked) +
          Array.from({ length: target.length - locked }, scrambleChar).join('')
        )

        if (progress >= 1) {
          setTyped(target)       // lock the final word cleanly
          scrambleStart = null
          phase         = 'waiting'
          setTimeout(step, 2200) // pause before erasing
        } else {
          setTimeout(step, 40)   // re-scramble ~25 fps
        }

      } else if (phase === 'waiting') {
        phase      = 'erasing'
        eraseCount = target.length
        step()                   // start erasing immediately

      } else {                   // erasing
        if (eraseCount > 0) {
          eraseCount--
          setTyped(target.slice(0, eraseCount))
          setTimeout(step, 30)
        } else {
          idx           = (idx + 1) % TITLES.length
          phase         = 'scrambling'
          scrambleStart = null
          setTimeout(step, 350)  // brief pause before next word
        }
      }
    }

    const t = setTimeout(step, 1000)
    return () => { cancelled = true; clearTimeout(t) }
  }, [])

  // Caret blink
  useEffect(() => {
    const iv = setInterval(() => setCaretVisible(v => !v), 530)
    return () => clearInterval(iv)
  }, [])

  // CTA magnetic
  const onBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current; if (!btn) return
    const r = btn.getBoundingClientRect()
    gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3, ease: 'power2.out' })
  }
  const onBtnLeave = () => gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' })

  return (
    <section id="home" className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 45%, rgba(99,102,241,0.14) 0%, transparent 70%)' }} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map(p => (
          <span key={p.id} className="absolute rounded-full bg-indigo-400" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ${p.delay}s infinite ease-in-out alternate`,
          }} />
        ))}
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-8">
        <p className="text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium opacity-80">
          Disponible · Casablanca, Maroc
        </p>

        <h1 ref={titleRef} className="text-[clamp(2.6rem,8vw,7rem)] font-bold leading-none tracking-tight glitch-name">
          {NAME.split('').map((char, i) =>
            char === ' '
              ? <span key={i} style={{ display: 'inline-block', width: '0.28em' }} />
              : (
                <span key={i} className="char-wrap">
                  <span className="char">{char}</span>
                </span>
              )
          )}
        </h1>

        <p className="font-mono text-lg md:text-xl text-gray-400 font-light tracking-wide min-h-[1.75rem]">
          {typed}
          <span className="inline-block w-[2px] h-[1.1em] bg-indigo-500 ml-[2px] align-middle"
            style={{ opacity: caretVisible ? 1 : 0, transition: 'opacity 0.05s' }} />
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <button ref={btnRef} onMouseMove={onBtnMove} onMouseLeave={onBtnLeave}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative mt-4 px-9 py-4 text-xs font-semibold tracking-[0.25em] uppercase
                       border border-indigo-500/60 text-indigo-300 overflow-hidden
                       transition-colors duration-300 hover:text-white">
            <span className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0
                             transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            <span className="btn-shimmer" />
            <span className="relative flex items-center gap-3">
              Voir mes projets
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>

          <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 px-7 py-4 text-xs font-semibold tracking-[0.25em] uppercase
                       border border-indigo-500 text-indigo-400
                       hover:bg-indigo-600 hover:border-indigo-600 hover:text-white
                       transition-all duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Télécharger CV
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/in/younes-ait-braym-22109b311/"
            target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-200">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/Younes2026"
            target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-200">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:younesbraim7@gmail.com"
            title="Email" aria-label="Email"
            className="text-white/70 hover:text-indigo-400 transition-colors duration-200">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </a>
        </div>
      </div>

      {/* Avatar — absolute bottom-right corner, 120×120 */}
      <div className="absolute bottom-6 right-6 w-[120px] h-[120px] opacity-90 hidden sm:block">
        <Avatar />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
