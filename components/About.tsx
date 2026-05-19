'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 3,  suffix: '+', label: 'Stages Effectués' },
  { value: 10, suffix: '+', label: 'Projets Réalisés' },
  { value: 2,  suffix: '+', label: "Ans d'Expérience" },
  { value: 15, suffix: '+', label: 'Technologies' },
]

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: value, duration: 2.4, ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.val).toString() },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    })
  }, [value])
  return <><span ref={ref}>0</span>{suffix}</>
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)

  // 3D photo tilt
  const onPhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current; if (!el) return
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      rotateY: ((e.clientX - r.left) / r.width  - 0.5) * 24,
      rotateX: ((e.clientY - r.top)  / r.height - 0.5) * -24,
      transformPerspective: 900, scale: 1.03,
      duration: 0.25, ease: 'power2.out',
    })
  }
  const onPhotoLeave = () =>
    gsap.to(photoRef.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.9, ease: 'power3.out' })

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-line', {
        y: 50, opacity: 0, duration: 0.85, stagger: 0.13, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 78%' },
      })
      gsap.from('.about-photo-wrap', {
        x: 70, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-photo-wrap', start: 'top 80%' },
      })
      gsap.from('.stat-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.stats-grid', start: 'top 88%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-36 px-6 overflow-hidden">

      {/* CSS decorative blobs — replaces the canvas trail */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-indigo-400/5 rounded-full blur-3xl pointer-events-none translate-x-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left: text */}
          <div className="about-text space-y-6">
            <p className="about-line text-xs tracking-[0.35em] uppercase text-indigo-400 font-medium">À propos</p>

            <h2 className="about-line text-[clamp(2.6rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
              Développeur<br />
              <em className="not-italic text-indigo-400">Full Stack</em><br />
              &amp; Mobile
            </h2>

            <p className="about-line text-gray-400 text-lg leading-relaxed">
              Élève-Ingénieur 5ème année MIAGE à l&rsquo;EMSI Casablanca.
            </p>

            <p className="about-line text-gray-500 leading-relaxed text-[0.95rem]">
              Passionné par le développement web et mobile full stack, je conçois des
              applications performantes, modernes et orientées utilisateur.
            </p>

            <div className="about-line flex flex-col gap-3 pt-1">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <svg className="w-4 h-4 text-indigo-400 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Casablanca, Maroc</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <svg className="w-4 h-4 text-indigo-400 flex-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:younesbraim7@gmail.com"
                  className="text-gray-500 hover:text-indigo-400 transition-colors duration-200">
                  younesbraim7@gmail.com
                </a>
              </div>
            </div>

            <div className="stats-grid grid grid-cols-2 gap-4 pt-6">
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} className="stat-card border border-white/[0.07] rounded-sm p-5 bg-white/[0.025] hover:border-indigo-500/30 transition-colors duration-300">
                  <p className="text-3xl font-bold text-indigo-400 tabular-nums">
                    <StatCounter value={value} suffix={suffix} />
                  </p>
                  <p className="text-gray-500 text-xs mt-1 tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo */}
          <div className="about-photo-wrap flex justify-center lg:justify-end">
            <div ref={photoRef} onMouseMove={onPhotoMove} onMouseLeave={onPhotoLeave}
              style={{ transformStyle: 'preserve-3d' }} className="relative cursor-none">
              <div className="absolute -inset-4 rounded-2xl blur-2xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)' }} />
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden
                              transition-transform duration-300 ease-out hover:scale-[1.03]"
                style={{ border: '2px solid rgba(99,102,241,0.6)', boxShadow: '0 0 0 1px rgba(99,102,241,0.15), 0 0 40px rgba(99,102,241,0.2)' }}>
                <Image src="/images/profile.png" alt="Younes Ait Braym" fill
                  className="object-cover object-top" sizes="(max-width: 768px) 288px, 320px" priority />
              </div>
              <div className="absolute inset-0 -z-10 translate-x-5 translate-y-6 rounded-2xl blur-lg"
                style={{ background: 'rgba(99,102,241,0.15)' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
