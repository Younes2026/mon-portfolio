'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenis.on('scroll', ScrollTrigger.update)
    const fn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(fn)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(fn); lenis.destroy() }
  }, [])
  return null
}
