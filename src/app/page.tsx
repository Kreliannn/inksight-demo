"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pencil, TrendingUp, Eye, Brain, Box, Sun, Moon } from "lucide-react"
import Link from "next/link"
import useLightModeStore from "./store/displayModeStore"

export default function Page() {
  const {lightMode, setLightMode} = useLightModeStore()

  // Apply class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (lightMode) {
      root.classList.add("light")
      root.classList.remove("dark")
    } else {
      root.classList.remove("light")
    }
  }, [lightMode])

  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const artistCardsRef = useRef<HTMLDivElement>(null)
  const clientCardsRef = useRef<HTMLDivElement>(null)
  const ctaSectionRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  const loadGSAP = async () => {
    const { gsap } = await import("gsap")
    const { ScrollTrigger } = await import("gsap/ScrollTrigger")
    gsap.registerPlugin(ScrollTrigger)

    // ✅ Capture all refs immediately — before any async gaps
    const heroImgEl     = heroImgRef.current
    const headlineEl    = headlineRef.current
    const subEl         = subRef.current
    const ctaEl         = ctaRef.current
    const statsEl       = statsRef.current
    const artistCardsEl = artistCardsRef.current
    const clientCardsEl = clientCardsRef.current
    const ctaSectionEl  = ctaSectionRef.current

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    if (headlineEl) {
      const words = headlineEl.querySelectorAll(".word")
      tl.fromTo(words, { y: 120, opacity: 0, rotateX: -40 }, { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.08 })
    }

    tl.fromTo(subEl, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
    tl.fromTo(ctaEl, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")

    if (heroImgEl) {
      gsap.fromTo(heroImgEl, { x: 200, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" })
    }

    if (statsEl) {
      ScrollTrigger.create({
        trigger: statsEl, start: "top 80%",
        onEnter: () => gsap.fromTo(statsEl.querySelectorAll(".stat-num"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }),
        once: true,
      })
    }

    if (artistCardsEl) {
      ScrollTrigger.create({
        trigger: artistCardsEl, start: "top 75%",
        onEnter: () => gsap.fromTo(artistCardsEl.querySelectorAll(".feature-card"), { opacity: 0, y: 50, rotateY: 8 }, { opacity: 1, y: 0, rotateY: 0, duration: 0.8, stagger: 0.15 }),
        once: true,
      })
    }

    if (clientCardsEl) {
      ScrollTrigger.create({
        trigger: clientCardsEl, start: "top 75%",
        onEnter: () => gsap.fromTo(clientCardsEl.querySelectorAll(".feature-card"), { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.15 }),
        once: true,
      })
    }

    if (ctaSectionEl) {
      ScrollTrigger.create({
        trigger: ctaSectionEl, start: "top 80%",
        onEnter: () => gsap.fromTo(ctaSectionEl, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.9 }),
        once: true,
      })
    }

    // ✅ Cleanup when component unmounts or lightMode toggles
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }

  const cleanup = loadGSAP()
  return () => { cleanup.then(fn => fn?.()) }
}, []) // ✅ Keep empty — GSAP should only init once, not on every lightMode toggle

  const headline = "The complete platform for tattoo artistry"
  const words = headline.split(" ")

  return (
    <div className="min-h-screen bg-primary relative overflow-x-hidden">

      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.035]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] rounded-full opacity-[0.07] blur-[120px] bg-gold" />

      {/* ─── Header ─── */}
      <header className="border-b border-border fixed w-full bg-primary/85 backdrop-blur-md z-40">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href={"/"} className="flex h-9 w-9 items-center justify-center overflow-hidden">
              <img src="/web/logo.jpg" alt="InkSight logo" className="h-full w-full object-cover" />
            </Link>
            <span
              className="text-text font-light tracking-[0.14em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.15rem" }}
            >
              InkSight
            </span>
          </div>

          {/* Right side nav */}
          <div className="flex items-center gap-2">

            {/* Hidden on mobile */}
            <Link href={"/guest/aboutUs"} className="hidden md:inline-flex">
              <Button variant="ghost" className="text-sm">About Us</Button>
            </Link>
            <Link href={"/guest/clientGuide"} className="hidden md:inline-flex">
              <Button variant="ghost" className="text-sm">Client Guide</Button>
            </Link>
            <div className="w-px h-5 bg-border mx-1 hidden md:block" />
            <Link href={"/guest/register"} className="hidden md:inline-flex">
              <Button variant="outline" className="text-sm">Sign Up</Button>
            </Link>
            <Link href={"/guest/login"} className="hidden md:inline-flex">
              <Button className="text-sm">Sign In</Button>
            </Link>

            {/* Theme toggle — always visible */}
            <button
              onClick={() => setLightMode(!lightMode)}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-alt hover:border-gold transition-colors duration-300"
              aria-label="Toggle light/dark mode"
            >
              {lightMode
                ? <Moon className="h-4 w-4 text-text-muted" />
                : <Sun className="h-4 w-4 text-gold" />
              }
            </button>
          </div>
        </nav>
      </header>

      <main>

        {/* ─── Hero ─── */}
        <section
          ref={heroRef}
          className="mx-auto max-w-7xl px-4 pt-24 pb-20 lg:px-8 lg:pt-36 lg:pb-36"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20 items-center">

            {/* Left — copy */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-3 mb-6 self-start">
                <span className="h-px w-8 bg-gold opacity-60" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Tattoo Platform</span>
                <span className="h-px w-8 bg-gold opacity-60" />
              </div>

              <h1
                ref={headlineRef}
                className="text-4xl font-light tracking-tight leading-[1.05] sm:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] text-text"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.02em" }}
              >
                {words.map((word, i) => (
                  <span key={i} className="word inline-block mr-[0.22em] last:mr-0" style={{ display: "inline-block" }}>
                    {word}
                  </span>
                ))}
              </h1>

              <p ref={subRef} className="mt-6 text-base leading-relaxed text-text-muted lg:text-lg max-w-lg">
                Empower artists with intelligent design tools and smart pricing. Connect clients with portfolios, 3D visualization, and AI-powered decision support.
              </p>

              <div ref={ctaRef} className="mt-8 flex flex-wrap gap-3 items-center">
                <Link href={"/guest/login"}>
                  <Button size="lg" className="text-base px-8">Sign In</Button>
                </Link>
                <Link href={"/guest/register"}>
                  <Button size="lg" variant="outline" className="text-base px-8">Sign Up</Button>
                </Link>
                <span className="text-xs text-text-dim ml-2 hidden sm:inline tracking-widest uppercase">
                  Free to join · No credit card
                </span>
              </div>
            </div>

            {/* Right — hero image (hidden on mobile) */}
            <div ref={heroImgRef} className="relative px-10 rounded hidden lg:block">
              <img
                src="/web/hero-img.jpg"
                alt="Tattoo design"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700 rounded"
              />
              <div className="absolute left-10 inset-0 bg-black/30 rounded" />
            </div>

          </div>
        </section>

        {/* ─── Stats ─── */}
        <section ref={statsRef} className="border-y border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
            <div className="grid gap-0 grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                { num: "10K+", label: "Active Artists", sub: "Across 80+ countries" },
                { num: "50K+", label: "Designs Created", sub: "In our design studio" },
                { num: "98%",  label: "Client Satisfaction", sub: "Verified reviews" },
              ].map((s, i) => (
                <div key={i} className="stat-num text-center py-10 px-6 group">
                  <div
                    className="text-5xl font-light text-gold lg:text-6xl group-hover:text-gold-light transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.04em" }}
                  >
                    {s.num}
                  </div>
                  <div className="mt-2 font-semibold text-sm tracking-[0.12em] uppercase text-text">{s.label}</div>
                  <div className="mt-1 text-xs text-text-muted tracking-wide">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Artist Features ─── */}
        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-36">
          <div className="mb-12 max-w-xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">For Artists</span>
            <h2
              className="mt-4 text-3xl font-light tracking-tight lg:text-5xl text-text"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Powerful tools built for your craft
            </h2>
            <p className="mt-4 text-base text-text-muted leading-relaxed">
              Everything you need to manage your portfolio, price your work intelligently, and grow your business.
            </p>
          </div>

          <div ref={artistCardsRef} className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: <Pencil className="h-5 w-5 text-gold" />, title: "Design Studio", desc: "Advanced editing tools to create, refine, and perfect your tattoo designs with precision and creativity.", num: "01" },
              { icon: <TrendingUp className="h-5 w-5 text-gold" />, title: "Smart Pricing", desc: "AI-powered pricing recommendations based on complexity, size, style, and market rates to maximize your earnings.", num: "02" },
              { icon: <Eye className="h-5 w-5 text-gold" />, title: "Portfolio Showcase", desc: "Create stunning galleries to display your work and attract clients with professional presentation tools.", num: "03" },
            ].map((f, i) => (
              <Card key={i} className="feature-card group relative p-8 overflow-hidden bg-surface border-border hover:border-border-gold transition-all duration-500 rounded-none">
                <span className="absolute top-4 right-6 text-7xl font-light text-text-dim select-none pointer-events-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{f.num}</span>
                <div className="flex h-10 w-10 items-center justify-center bg-surface-alt border border-border mb-6">{f.icon}</div>
                <h3 className="text-lg font-light mb-3 text-text tracking-wide" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{f.desc}</p>
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-700" />
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Client Features ─── */}
        <section className="border-t border-border bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-36">
            <div className="mb-12 max-w-xl ml-auto text-right">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">For Clients</span>
              <h2
                className="mt-4 text-3xl font-light tracking-tight lg:text-5xl text-text"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.02em" }}
              >
                Find your perfect tattoo
              </h2>
              <p className="mt-4 text-base text-text-muted leading-relaxed">
                Discover talented artists, visualize designs, and make confident decisions with AI assistance.
              </p>
            </div>

            <div ref={clientCardsRef} className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {[
                { icon: <Eye className="h-5 w-5 text-gold" />, title: "Artist Discovery", desc: "Browse thousands of portfolios, filter by style, and find the perfect artist for your vision.", num: "01" },
                { icon: <Box className="h-5 w-5 text-gold" />, title: "3D Visualization", desc: "See how designs look on a realistic 3D body model before committing to your tattoo.", num: "02" },
                { icon: <Brain className="h-5 w-5 text-gold" />, title: "Decision Support", desc: "Get AI-powered recommendations based on your preferences, skin tone, and placement considerations.", num: "03" },
              ].map((f, i) => (
                <Card key={i} className="feature-card group relative p-8 overflow-hidden bg-surface border-border hover:border-border-gold transition-all duration-500 rounded-none">
                  <span className="absolute top-4 right-6 text-7xl font-light text-text-dim select-none pointer-events-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{f.num}</span>
                  <div className="flex h-10 w-10 items-center justify-center bg-surface-alt border border-border mb-6">{f.icon}</div>
                  <h3 className="text-lg font-light mb-3 text-text tracking-wide" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.2rem" }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{f.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold group-hover:w-full transition-all duration-700" />
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-36">
          <div ref={ctaSectionRef}>
            <Card className="overflow-hidden bg-surface border border-border-gold rounded-none relative">
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-gold opacity-40" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold opacity-40" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-gold opacity-40" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gold opacity-40" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,transparent_65%)] pointer-events-none" />

              <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:gap-16 lg:p-16 items-center">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Get Started Today</span>
                  <h2
                    className="mt-4 text-3xl font-light tracking-tight lg:text-5xl text-balance text-text"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: "-0.02em" }}
                  >
                    Ready to transform your tattoo journey?
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-text-muted max-w-lg">
                    Join thousands of artists and clients who trust InkSight to bring their visions to life.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="lg" className="text-base px-8">Get Started Free</Button>
                    <Button size="lg" variant="outline" className="text-base px-8">Schedule Demo</Button>
                  </div>
                </div>
                <div className="hidden lg:block flex-shrink-0">
                  <img src="/web/img1.png" alt="Artist at work" className="object-cover w-72 h-72 shadow-2xl border border-border" />
                </div>
              </div>
            </Card>
          </div>
        </section>

      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-14">
          <div className="grid gap-10 grid-cols-2 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden">
                  <img src="/web/logo.jpg" alt="InkSight logo" className="h-full w-full object-cover" />
                </div>
                <span className="font-light text-gold tracking-[0.14em] uppercase" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                  InkSight
                </span>
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                The complete platform for tattoo artistry and discovery.
              </p>
            </div>
            {[
              { heading: "Product", links: ["Features", "Pricing", "FAQ"] },
              { heading: "Company", links: ["About", "Blog", "Careers"] },
              { heading: "Legal",   links: ["Privacy", "Terms", "Contact"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="mb-4 font-semibold text-[10px] tracking-[0.24em] uppercase text-text">{col.heading}</h4>
                <ul className="space-y-3 text-sm text-text-muted">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="hover:text-gold transition-colors duration-200 tracking-wide">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-dim tracking-widest uppercase">
            <span>© 2025 InkSight. All rights reserved.</span>
            <span>Crafted with care for artists & clients</span>
          </div>
        </div>
      </footer>

    </div>
  )
}