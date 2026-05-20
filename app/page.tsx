'use client'
import { useState, useEffect } from 'react'
import Navbar     from '@/components/Navbar'
import Hero       from '@/components/Hero'
import About      from '@/components/About'
import Skills     from '@/components/Skills'
import Projects   from '@/components/Projects'
import Experience     from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Contact        from '@/components/Contact'
import Footer     from '@/components/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <main style={{ background: '#0a0a0a', minHeight: '100vh' }} />

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
