'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = [
  {
    name: 'Frontend',
    skills: ['React', 'React Native', 'Next.js', 'HTML / CSS', 'Tailwind', 'Bootstrap', 'JavaScript', 'TypeScript'],
  },
  {
    name: 'Backend',
    skills: ['Spring Boot', 'Django', 'Laravel', 'PHP', 'Java', 'Python', 'C / C++ / C#', 'API REST', 'Microservices', 'Node.js'],
  },
  {
    name: 'Database & Tools',
    skills: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Kubernetes', 'Git', 'Scrum / Agile', 'Azure'],
  },
]

const ALL_NAMES = CATEGORIES.flatMap(c => c.skills)
const ROW_A = [...ALL_NAMES, ...ALL_NAMES, ...ALL_NAMES]
const ROW_B = [...ALL_NAMES.slice(9), ...ALL_NAMES, ...ALL_NAMES, ...ALL_NAMES.slice(0, 9)]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header > *', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-header', start: 'top 82%' },
      })
      gsap.from('.cat-block', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-categories', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="relative py-36 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="skills-header mb-20 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium mb-4">
            What I Work With
          </p>
          <h2 className="text-[clamp(2.4rem,5vw,3.8rem)] font-bold tracking-tight">
            Skills &amp; Tools
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrap mb-20 space-y-5 overflow-hidden select-none">
        <div className="flex">
          <div className="marquee-track flex flex-none gap-10 whitespace-nowrap"
            style={{ animation: 'marquee-left 40s linear infinite' }}>
            {ROW_A.map((name, i) => (
              <span key={i}
                className={`text-[2rem] md:text-[2.6rem] font-black tracking-tight flex-none leading-none ${i % 4 === 0 ? 'text-white/70' : 'text-white/8'}`}>
                {name}<span className="text-indigo-500 text-xl mx-3">·</span>
              </span>
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="marquee-track flex flex-none gap-10 whitespace-nowrap"
            style={{ animation: 'marquee-right 30s linear infinite' }}>
            {ROW_B.map((name, i) => (
              <span key={i}
                className={`text-[1.4rem] md:text-[1.9rem] font-bold tracking-tight flex-none leading-none ${i % 3 === 1 ? 'text-indigo-400/60' : 'text-white/[0.06]'}`}>
                <span className="text-indigo-500/30 text-sm mr-2">/</span>{name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories + pills */}
      <div className="skills-categories relative z-10 max-w-6xl mx-auto px-6 space-y-12">
        {CATEGORIES.map(({ name, skills }) => (
          <div key={name} className="cat-block">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 font-medium mb-5">
              {name}
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="skill-tag"
                  style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    border: '1px solid #6366f1',
                    background: 'transparent',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'default',
                    transition: 'background 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLSpanElement).style.background = '#6366f1'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLSpanElement).style.background = 'transparent'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
