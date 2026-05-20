'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  {
    company: 'SMEIA', role: 'Stage en cours', period: 'Avril 2026 → présent',
    current: true, accent: '#6366f1',
    description: 'Développement mobile cross-platform avec React Native et Directus CMS. Gestion de données via SQL Server.',
    stack: ['React Native', 'Directus', 'SQL Server'],
  },
  {
    company: 'ONP', role: 'Stage', period: 'Août – Octobre 2025',
    current: false, accent: '#3776AB',
    description: "Développement d'une application web de gestion d'inventaire.",
    stack: [],
  },
  {
    company: 'ANP', role: 'Stage', period: 'Juillet – Août 2024',
    current: false, accent: '#6DB33F',
    description: "Développement d'une application web de facturation.",
    stack: [],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-header > *', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.exp-header', start: 'top 82%' } })
      gsap.from('.exp-entry',     { x: -40, opacity: 0, duration: 0.7, stagger: 0.2,  ease: 'power3.out', scrollTrigger: { trigger: '.exp-list', start: 'top 80%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 50% at 20% 60%, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="exp-header mb-16 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium mb-4">Parcours</p>
          <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-tight">Expériences</h2>
        </div>

        <div className="exp-list relative">
          {/* Timeline line — indigo */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(99,102,241,0.1))' }} />

          <div className="flex flex-col gap-10">
            {EXPERIENCES.map(({ company, role, period, description, stack, accent, current }) => (
              <div key={company} className="exp-entry relative pl-16">

                {/* Company initials badge */}
                <div
                  className="absolute left-[8px] top-0 w-9 h-9 rounded-full border-2 border-[#0a0a0a]
                             flex items-center justify-center text-[8px] font-black leading-none"
                  style={{ background: accent, color: '#fff', boxShadow: `0 0 16px ${accent}60` }}
                >
                  {company}
                </div>

                <div className="relative group border border-white/[0.07] rounded-sm p-6 bg-white/[0.02]
                               hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300">
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-indigo-500 rounded-l-sm
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-bold text-white">{company}</h3>
                        {current && (
                          <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full
                                          bg-green-500/15 text-green-400 border border-green-500/25">
                            En cours
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{role}</p>
                    </div>
                    <span className="text-xs font-medium tracking-wide whitespace-nowrap px-3 py-1.5 rounded-sm border self-start"
                      style={{ color: accent, borderColor: `${accent}35`, background: `${accent}0d` }}>
                      {period}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>

                  {stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {stack.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                          style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0d` }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
