'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    num: '01', accent: '#44B78B',
    name: 'Medical Appointment App',
    description: "Plateforme complète de prise de rendez-vous médicaux avec espaces dédiés aux patients, médecins et administrateurs.",
    stack: ['Django', 'Bootstrap', 'Python'],
    github: '#', demo: '#',
  },
  {
    num: '02', accent: '#6366f1',
    name: 'SMART MRAYA', sub: 'AI Mirror',
    description: "Miroir intelligent connecté intégrant de l'IA pour afficher des informations personnalisées en temps réel via IoT.",
    stack: ['Python', 'IoT', 'AI'],
    github: '#', demo: '#',
  },
  {
    num: '03', accent: '#6DB33F',
    name: 'Charity Management App',
    description: "Application de gestion d'associations caritatives avec suivi des dons, bénéficiaires et campagnes.",
    stack: ['Spring Boot', 'MongoDB', 'Docker'],
    github: '#', demo: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-header > *', { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: '.projects-header', start: 'top 82%' } })
      gsap.from('.project-card',       { y: 60, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power3.out', scrollTrigger: { trigger: '.projects-grid',   start: 'top 80%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 30%, rgba(99,102,241,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="projects-header mb-16 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium mb-4">Réalisations</p>
          <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-tight">Mes Projets</h2>
        </div>

        <div className="projects-grid grid md:grid-cols-3 gap-6">
          {PROJECTS.map(({ num, name, sub, description, stack, accent, github, demo }) => (
            <div key={num}
              className="project-card group relative flex flex-col border border-white/[0.07] rounded-sm
                         bg-white/[0.02] hover:border-white/20 overflow-hidden cursor-none"
              style={{ transition: 'transform .35s ease, border-color .3s, box-shadow .35s' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = 'translateY(-8px)'
                el.style.boxShadow = `0 24px 64px ${accent}28`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = ''
                el.style.boxShadow = ''
              }}
            >
              {/* Gradient top border */}
              <span className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

              <div className="p-6 flex flex-col flex-1 gap-4">
                {/* Number */}
                <span className="text-[2.5rem] font-black leading-none select-none"
                  style={{ color: `${accent}18` }}>{num}</span>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-indigo-300 transition-colors duration-200">{name}</h3>
                  {sub && <p className="text-xs tracking-widest uppercase mt-0.5" style={{ color: accent }}>{sub}</p>}
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2">
                  {stack.map(tag => (
                    <span key={tag} className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border"
                      style={{ color: accent, borderColor: `${accent}40`, background: `${accent}0d` }}>{tag}</span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-3 border-t border-white/[0.05]">
                  <a href={github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors duration-200">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href={demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs transition-colors duration-200 ml-auto"
                    style={{ color: accent }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
