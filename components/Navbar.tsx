'use client'
import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Home',       id: 'home' },
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? 'backdrop-blur-2xl bg-[#0a0a0a]/75 border-b border-white/5 shadow-[0_1px_40px_rgba(0,0,0,0.6)]' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('home')}
          className="text-sm font-black tracking-[0.3em] text-indigo-400 uppercase hover:text-indigo-300 transition-colors">
          YB
        </button>
        <ul className="flex items-center gap-7">
          {LINKS.map(({ label, id }) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} className="relative text-sm group pb-0.5">
                <span className={`transition-colors duration-200 ${active === id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  {label}
                </span>
                <span className={`absolute bottom-0 left-0 h-px bg-indigo-500 transition-[width] duration-300 ease-out ${
                  active === id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
