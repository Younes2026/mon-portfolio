'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/younes-ait-braym-22109b311/',
    sub: 'Profil professionnel',
    bg: '#0A66C2',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Younes2026',
    sub: 'Mes projets open source',
    bg: '#333',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:younesbraim7@gmail.com',
    sub: 'younesbraim7@gmail.com',
    bg: '#6366f1',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

const INPUT_CLS = `w-full px-4 py-3 rounded-sm bg-transparent border border-white/10 text-white text-sm
  placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors duration-200`

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-header > *', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.contact-header', start: 'top 82%' } })
      gsap.from('.contact-form',      { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',                scrollTrigger: { trigger: '.contact-form',   start: 'top 82%' } })
      gsap.from('.contact-social',    { x: 40, opacity: 0, duration: 0.8, ease: 'power3.out',                scrollTrigger: { trigger: '.contact-social', start: 'top 82%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="contact-header text-center mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium mb-4">Contact</p>
          <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-tight">Travaillons ensemble</h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Disponible pour des stages, projets freelance ou opportunités full-time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <form onSubmit={onSubmit} className="contact-form flex flex-col gap-4">
            {sent ? (
              <div className="border border-green-500/30 rounded-sm p-8 text-center bg-green-500/5">
                <p className="text-green-400 font-semibold text-lg">Message envoyé ✓</p>
                <p className="text-gray-500 text-sm mt-2">Je vous répondrai dans les plus brefs délais.</p>
                <button type="button" onClick={() => setSent(false)}
                  className="mt-5 text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <input name="name"  value={form.name}    onChange={onChange} required placeholder="Nom complet"     className={INPUT_CLS} />
                <input name="email" value={form.email}   onChange={onChange} required placeholder="Adresse email" type="email" className={INPUT_CLS} />
                <textarea name="message" value={form.message} onChange={onChange} required placeholder="Votre message..." rows={5} className={INPUT_CLS + ' resize-none'} />
                <button type="submit"
                  className="group relative px-8 py-4 text-xs font-semibold tracking-[0.25em] uppercase
                             border border-indigo-500/60 text-indigo-300 overflow-hidden
                             transition-colors duration-300 hover:text-white text-left">
                  <span className="absolute inset-0 bg-indigo-600 -translate-x-full group-hover:translate-x-0
                                   transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
                  <span className="relative flex items-center gap-3">
                    Envoyer le message
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </>
            )}
          </form>

          {/* Social links */}
          <div className="contact-social flex flex-col gap-4">
            <p className="text-xs tracking-[0.35em] uppercase text-gray-600 mb-2">Me retrouver sur</p>
            {SOCIALS.map(({ label, href, sub, bg, icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 border border-white/[0.07] rounded-sm
                           bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300">
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-none text-white"
                  style={{ background: `${bg}25`, color: bg }}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-gray-500 truncate">{sub}</p>
                </div>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 flex-none transition-colors"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
