# Portfolio Site Build Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page recruiter-facing portfolio for Saurav KC with 7 sections, Framer Motion scroll animations, and an animated CSS system diagram.

**Architecture:** Next.js 16 App Router. `layout.tsx` and `page.tsx` are Server Components. Every section component is a Client Component (`"use client"`) because all use Framer Motion. `MetricCounter` and `SystemDiagram` are sub-components, MetricCounter in its own file, SystemDiagram inlined in `CaseStudy.tsx`.

**Tech Stack:** Next.js 16.2.6, TypeScript 5, Tailwind v4 (CSS-first — no `tailwind.config.ts`), Framer Motion v12, React 19, `next/font/google`

**Key Tailwind v4 rule:** Custom design tokens go in `globals.css` under `@theme { }`, not in a config file. `--color-paper: #F7F4EF` → utility class `bg-paper`, `text-paper`. `--font-serif: ...` → utility class `font-serif`.

---

### Task 1: globals.css — Tailwind v4 design tokens + base reset

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace the entire file**

```css
@import "tailwindcss";

@theme {
  --color-paper:  #F7F4EF;
  --color-ink:    #1C1C2E;
  --color-accent: #E8803A;
  --color-muted:  #6B6B7B;
  --color-border: #E2DDD6;
  --color-card:   #FFFFFF;
  --color-footer: #EDE9E2;
  --font-serif: var(--font-playfair), Georgia, serif;
  --font-sans:  var(--font-inter), system-ui, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #F7F4EF;
  color: #1C1C2E;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**Step 2: Verify dev server starts cleanly**

```bash
npm run dev
```
Expected: server starts at localhost:3000, no compilation errors in terminal.

**Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: configure Tailwind v4 design tokens via @theme"
```

---

### Task 2: layout.tsx — fonts and SEO metadata

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Replace the entire file**

```tsx
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Saurav KC — Automation Engineer",
  description:
    "CS graduate and automation engineer based in London. Built a full-stack ATS that processed 350+ applicants and saved 15–20 hours/week. Open to Automation, RevOps, Solutions Engineering, and Junior SWE roles.",
  openGraph: {
    title: "Saurav KC — Automation Engineer",
    description: "Full-stack ATS. 350+ applicants. 15–20 hrs/week saved. Based in London.",
    url: "https://sauravkc.dev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

**Step 2: Verify fonts are injected**

Open localhost:3000. In browser DevTools → Elements, the `<html>` tag should have two class attributes containing `__variable_` tokens (Next.js font variable names). The `--font-playfair` and `--font-inter` CSS variables will be set on `:root`.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: configure Playfair Display + Inter via next/font and add SEO metadata"
```

---

### Task 3: Component stubs + page.tsx shell

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/Nav.tsx`, `Hero.tsx`, `Narrative.tsx`, `CaseStudy.tsx`, `MetricCounter.tsx`, `Stack.tsx`, `Background.tsx`, `CTAFooter.tsx`

**Step 1: Create all component stubs**

Each stub is the same minimal pattern. Create all 8 files:

`src/components/Nav.tsx`:
```tsx
"use client"
export default function Nav() { return null }
```

Repeat this pattern for: `Hero.tsx`, `Narrative.tsx`, `CaseStudy.tsx`, `MetricCounter.tsx`, `Stack.tsx`, `Background.tsx`, `CTAFooter.tsx` — same content, just change the function name.

**Step 2: Replace page.tsx**

```tsx
import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Narrative from "@/components/Narrative"
import CaseStudy from "@/components/CaseStudy"
import Stack from "@/components/Stack"
import Background from "@/components/Background"
import CTAFooter from "@/components/CTAFooter"

export default function Home() {
  return (
    <main className="bg-paper min-h-screen font-sans">
      <Nav />
      <Hero />
      <Narrative />
      <CaseStudy />
      <Stack />
      <Background />
      <CTAFooter />
    </main>
  )
}
```

**Step 3: Verify**

localhost:3000 renders a blank warm off-white page (`#F7F4EF`) with no console errors.

**Step 4: Commit**

```bash
git add src/app/page.tsx src/components/
git commit -m "feat: add page shell and blank component stubs"
```

---

### Task 4: Nav.tsx — sticky nav with scroll-hide

**Files:**
- Modify: `src/components/Nav.tsx`

**Step 1: Replace stub with full implementation**

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const prevY = useRef(0)

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setHidden(y > prevY.current && y > 60)
      prevY.current = y
    })
  }, [scrollY])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-border"
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-lg font-medium text-ink">Saurav KC</span>
          <a
            href="mailto:sauravkc@flowfusionai.com"
            className="hidden md:inline-block bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium font-sans hover:opacity-90 transition-opacity"
          >
            Get in touch →
          </a>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-ink rounded" />
            <span className="block w-6 h-0.5 bg-ink rounded" />
            <span className="block w-6 h-0.5 bg-ink rounded" />
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div
          className="fixed inset-0 bg-paper flex flex-col items-center justify-center gap-6 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 text-3xl text-muted leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
          <a
            href="mailto:sauravkc@flowfusionai.com"
            className="bg-accent text-white px-8 py-3 rounded-full text-lg font-medium font-sans"
            onClick={() => setMenuOpen(false)}
          >
            Email me →
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-kc-045083200/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink text-ink px-8 py-3 rounded-full text-lg font-medium font-sans"
            onClick={() => setMenuOpen(false)}
          >
            View LinkedIn →
          </a>
        </motion.div>
      )}
    </>
  )
}
```

**Step 2: Verify**

localhost:3000:
- Nav bar visible at top with "Saurav KC" left, amber "Get in touch →" right (desktop ≥768px)
- Scroll down a full viewport — nav slides off top
- Scroll back up — nav reappears
- At mobile width (≤767px): hamburger icon visible; tapping it opens full-screen overlay with both CTAs

**Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: Nav with scroll-hide and mobile overlay"
```

---

### Task 5: Hero.tsx — full-viewport hero with stagger entrance

**Files:**
- Modify: `src/components/Hero.tsx`

**Step 1: Replace stub**

```tsx
"use client"

import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-paper pt-16">
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="text-accent text-sm font-sans uppercase tracking-[0.08em] font-medium mb-6"
        >
          AUTOMATION ENGINEER · LONDON
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif font-bold text-ink leading-tight tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          I build automation systems
          <br className="hidden sm:block" />
          {" "}that actually get used.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-lg leading-[1.6] max-w-xl mb-10 font-sans"
        >
          CS graduate. Solo client delivery. Flagship: a full-stack ATS that
          processed 350+ applicants and saved a clinic 15–20 hours every week.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="mailto:sauravkc@flowfusionai.com"
            className="bg-accent text-white px-7 py-3 rounded-full font-medium text-base hover:opacity-90 transition-opacity font-sans"
          >
            Email me
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-kc-045083200/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink text-ink px-7 py-3 rounded-full font-medium text-base hover:bg-ink hover:text-paper transition-colors font-sans"
          >
            View LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**

localhost:3000:
- On page load, "AUTOMATION ENGINEER · LONDON" fades up first, then the H1, then body text, then buttons (0.15s stagger between each)
- H1 uses Playfair Display (serif) — check in DevTools computed styles
- Label text is amber (`#E8803A`)
- Section fills the full viewport height
- On mobile, text is readable and buttons stack cleanly

**Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: Hero section with staggered fade-up entrance animation"
```

---

### Task 6: Narrative.tsx — positioning statement

**Files:**
- Modify: `src/components/Narrative.tsx`

**Step 1: Replace stub**

```tsx
"use client"

import { motion } from "framer-motion"

export default function Narrative() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif font-bold text-ink mb-8 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
        >
          Most automation consultants connect tools.
          <br />
          I{" "}
          <strong className="underline decoration-accent decoration-2">
            build the system underneath.
          </strong>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4 text-muted leading-[1.6] font-sans text-base"
        >
          <p>
            Businesses usually come to me with a mess: spreadsheets held together
            by manual work, tools that don&apos;t talk to each other, and a team
            copying data between tabs all day. I scope the real problem, design
            the system, and ship it.
          </p>
          <p>
            I work end-to-end — product thinking, technical build, client
            handover. No handoffs. No &quot;that&apos;s someone else&apos;s job.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**

Scroll past hero — narrative section fades up on enter. The phrase "build the system underneath" has an amber (`#E8803A`) underline. Max-width 680px, centered.

**Step 3: Commit**

```bash
git add src/components/Narrative.tsx
git commit -m "feat: Narrative section with whileInView fade-up"
```

---

### Task 7: MetricCounter.tsx — animated scroll counter

**Files:**
- Modify: `src/components/MetricCounter.tsx`

**Step 1: Replace stub**

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface Props {
  end: number
  suffix: string
  label: string
}

export default function MetricCounter({ end, suffix, label }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, end])

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-serif font-bold text-accent"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {count}{suffix}
      </div>
      <div className="text-muted text-xs uppercase tracking-[0.08em] mt-2 font-sans leading-snug">
        {label}
      </div>
    </div>
  )
}
```

**Step 2: Note**

MetricCounter has no standalone rendering. It will be verified as part of CaseStudy in Task 8.

**Step 3: Commit**

```bash
git add src/components/MetricCounter.tsx
git commit -m "feat: MetricCounter with rAF ease-out, fires once on scroll-in"
```

---

### Task 8: CaseStudy.tsx — flagship project with diagram and metrics

**Files:**
- Modify: `src/components/CaseStudy.tsx`

**Step 1: Replace stub with full implementation**

```tsx
"use client"

import { motion } from "framer-motion"
import MetricCounter from "@/components/MetricCounter"

// ── System Diagram sub-components ──────────────────────────────────────────

function DiagramNode({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.35 }}
      className="bg-paper border border-border rounded-lg px-3 py-2 text-xs font-medium text-ink font-sans text-center whitespace-nowrap"
    >
      {label}
    </motion.div>
  )
}

function HConnector({ index }: { index: number }) {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.25 }}
        style={{ transformOrigin: "left center" }}
        className="w-5 h-px bg-border mx-1"
      />
      <span className="text-muted text-[10px] leading-none">→</span>
    </div>
  )
}

function VConnector({ index }: { index: number }) {
  return (
    <div className="flex flex-col items-center my-0.5">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.25 }}
        style={{ transformOrigin: "top center" }}
        className="w-px h-5 bg-border"
      />
      <span className="text-muted text-[10px] leading-none">↓</span>
    </div>
  )
}

function SystemDiagram() {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex items-center">
        <DiagramNode label="Intake Form" index={0} />
        <HConnector index={1} />
        <DiagramNode label="Airtable ATS" index={2} />
        <HConnector index={3} />
        <DiagramNode label="Cal.com" index={4} />
      </div>
      <VConnector index={5} />
      <DiagramNode label="Make.com Automations" index={6} />
      <VConnector index={7} />
      <DiagramNode label="Gmail / Slack Notifications" index={8} />
      <VConnector index={9} />
      <DiagramNode label="Onboarding Task Manager" index={10} />
      <VConnector index={11} />
      <DiagramNode label="Admin Dashboard" index={12} />
    </div>
  )
}

// ── Feature list ────────────────────────────────────────────────────────────

const features = [
  {
    title: "Applicant Tracking System",
    body: "Next.js frontend + Airtable database. Automated intake form → applicant record → status pipeline. Replaced the spreadsheet.",
  },
  {
    title: "Interview Scheduling",
    body: "Cal.com integration via Make.com. Candidates self-book. Confirmation + reminder emails sent automatically.",
  },
  {
    title: "Onboarding Task Manager",
    body: "Role-based task assignment triggered on hire. Compliance training, video modules, quiz completion — tracked in a self-serve dashboard.",
  },
]

// ── Main Component ──────────────────────────────────────────────────────────

export default function CaseStudy() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent text-xs uppercase tracking-[0.08em] font-medium mb-4 font-sans">
              CASE STUDY · 2024–2025
            </p>
            <h2
              className="font-serif font-bold text-ink mb-6 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
            >
              From 3 spreadsheets to one system.
            </h2>
            <p className="text-muted leading-[1.6] font-sans text-base mb-8">
              A London dental clinic was managing 350+ job applicants across Google
              Sheets, email threads, and WhatsApp messages. Scheduling interviews
              meant manual back-and-forth. New hire onboarding ran on printouts.
              The practice manager was spending half her week just keeping up.
            </p>

            <div className="border-t border-border" />

            <h3 className="font-sans font-semibold text-ink text-lg mt-6 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block shrink-0" />
              What I built
            </h3>

            <div className="space-y-5 mb-8">
              {features.map((f) => (
                <div key={f.title}>
                  <p className="font-sans font-medium text-ink text-sm mb-1">{f.title}</p>
                  <p className="text-muted text-sm leading-[1.6] font-sans">{f.body}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border mb-8" />

            <div className="grid grid-cols-3 gap-4">
              <MetricCounter end={350} suffix="+" label="applicants processed" />
              <MetricCounter end={20} suffix=" hrs" label="saved per week" />
              <MetricCounter end={1} suffix=" person" label="runs hiring" />
            </div>

            <div className="mt-10 space-y-3">
              <a
                href="https://github.com/ManagersSC/onboarding-task-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-ink text-ink px-6 py-3 rounded-full font-medium text-sm hover:bg-ink hover:text-paper transition-colors font-sans"
              >
                View the repository on GitHub →
              </a>
              <p className="text-muted text-xs uppercase tracking-[0.08em] font-sans">
                Solo delivery — scoped, built, shipped, handed over.
              </p>
            </div>
          </motion.div>

          {/* Right: system diagram — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex flex-col"
          >
            <div
              className="bg-card rounded-2xl p-8 border border-border sticky top-24"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <p className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4 text-center">
                System Architecture
              </p>
              <SystemDiagram />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**

localhost:3000 — scroll to case study:
- Desktop (≥768px): two-column layout — story left, diagram card right (sticky)
- Mobile: single column, diagram card hidden
- Scroll past the metrics row — the three counters animate from 0 to 350+, 20 hrs, 1 person over 1.5s
- System diagram nodes animate in staggered with the connecting lines drawing in
- Left column fades in from the left, right column from the right

**Step 3: Commit**

```bash
git add src/components/CaseStudy.tsx
git commit -m "feat: CaseStudy with SystemDiagram, animated connectors, and MetricCounters"
```

---

### Task 9: Stack.tsx — interactive tool grid

**Files:**
- Modify: `src/components/Stack.tsx`

**Step 1: Replace stub**

```tsx
"use client"

import { motion } from "framer-motion"

const tools = [
  { name: "Next.js",      use: "Full-stack React framework — built the ATS and admin dashboards" },
  { name: "Airtable",     use: "Relational database layer — applicant records, task tracking" },
  { name: "Make.com",     use: "Automation orchestration — scheduling, notifications, onboarding triggers" },
  { name: "n8n",          use: "Self-hosted workflow automation for complex pipelines" },
  { name: "Vercel",       use: "Deployment and hosting — zero-config CI/CD" },
  { name: "Cal.com",      use: "Scheduling infrastructure — interview booking flows" },
  { name: "TypeScript",   use: "Type-safe JavaScript across all projects" },
  { name: "AI / LLMs",    use: "Claude, OpenAI — integrating AI into automation pipelines" },
]

export default function Stack() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif font-bold text-ink mb-3"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
        >
          What I build with
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted mb-12 font-sans"
        >
          These aren&apos;t just tools I&apos;ve heard of. They&apos;re what I shipped the Smile Cliniq project with.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{
                scale: 1.03,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="bg-card border border-border rounded-xl p-5 cursor-default group hover:border-accent transition-colors font-sans"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <p className="font-semibold text-ink text-sm mb-2">{tool.name}</p>
              <p className="text-muted text-xs leading-[1.5] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {tool.use}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**

Scroll to stack section:
- 8 cards in 3-column grid (desktop), 2-column (mobile)
- Hovering a card: scale lifts slightly (spring bounce), amber border appears, use-case text fades in below tool name
- Cards fade in staggered on scroll-into-view

**Step 3: Commit**

```bash
git add src/components/Stack.tsx
git commit -m "feat: Stack grid with spring hover, amber border, and use-case reveal"
```

---

### Task 10: Background.tsx — education and current role

**Files:**
- Modify: `src/components/Background.tsx`

**Step 1: Replace stub**

```tsx
"use client"

import { motion } from "framer-motion"

const tags = ["CS Degree", "Solo delivery", "No sponsorship needed"]

export default function Background() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif font-bold text-ink mb-8"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
        >
          Background
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 text-muted leading-[1.6] font-sans max-w-2xl mb-8"
        >
          <p>
            BSc Computer Science, University of Portsmouth (2020–2023). Final year
            project: a price comparison web scraper using Flask, Selenium, and
            BeautifulSoup — which is where the habit of building end-to-end systems started.
          </p>
          <p>
            Since November 2024 I&apos;ve been running Flow Fusion AI, delivering bespoke
            automation systems for business clients. Smile Cliniq is the flagship
            engagement — scoped, built, and shipped solo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent text-white text-sm font-medium px-4 py-1.5 rounded-full font-sans"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

**Step 2: Verify**

Scroll to background section — two paragraphs fade up, then three amber pill tags.

**Step 3: Commit**

```bash
git add src/components/Background.tsx
git commit -m "feat: Background section with education, role, and tag pills"
```

---

### Task 11: CTAFooter.tsx — closing call to action

**Files:**
- Modify: `src/components/CTAFooter.tsx`

**Step 1: Replace stub**

```tsx
"use client"

import { motion } from "framer-motion"

export default function CTAFooter() {
  return (
    <footer className="bg-footer py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif font-bold text-ink mb-6 leading-tight"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
        >
          Ready to hire someone who ships?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted max-w-lg mx-auto mb-10 leading-[1.6] font-sans"
        >
          I&apos;m looking for full-time, office-based roles in London. Automation
          Engineer, RevOps, Solutions Engineer, Technical Implementation, or Junior SWE.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-4"
        >
          <a
            href="mailto:sauravkc@flowfusionai.com"
            className="bg-accent text-white px-8 py-3 rounded-full font-medium text-base hover:opacity-90 transition-opacity font-sans"
          >
            Email me →
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-kc-045083200/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink text-ink px-8 py-3 rounded-full font-medium text-base hover:bg-ink hover:text-paper transition-colors font-sans"
          >
            LinkedIn →
          </a>
        </motion.div>

        <p className="text-accent text-sm font-sans mb-8">sauravkc@flowfusionai.com</p>

        <div className="text-muted text-sm font-sans flex flex-wrap justify-center gap-x-3 gap-y-1 items-center">
          <a
            href="https://github.com/FlowFusionAI"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            github.com/FlowFusionAI
          </a>
          <span aria-hidden>·</span>
          <span>Reading, UK</span>
          <span aria-hidden>·</span>
          <span>No sponsorship needed</span>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Verify**

Scroll to footer:
- Background is `#EDE9E2` (warmer than page base — visually distinct)
- Large Playfair Display heading
- Two buttons side by side (or stacked on mobile)
- Email address in accent colour below buttons
- Muted footer row with GitHub, location, sponsorship note

**Step 3: Commit**

```bash
git add src/components/CTAFooter.tsx
git commit -m "feat: CTAFooter with dual CTAs and muted info row"
```

---

### Task 12: Final verification — full page + production build

**Step 1: Full visual walkthrough at localhost:3000**

Check each section in order against the spec:
- [ ] Nav: sticky, scroll-hides on down, Playfair name, amber CTA
- [ ] Hero: fills viewport, stagger animation on load, two buttons link correctly
- [ ] Narrative: amber underline on "build the system underneath"
- [ ] CaseStudy: two-column desktop, system diagram renders right column, counters animate
- [ ] Stack: 3-col grid, hover spring + amber border + text reveal
- [ ] Background: two paragraphs, three amber pills
- [ ] CTAFooter: `#EDE9E2` background, large heading, dual CTAs

Also check mobile (resize to 375px width):
- [ ] Nav shows hamburger, overlay opens/closes
- [ ] Hero text readable, buttons stack
- [ ] CaseStudy single column (diagram hidden)
- [ ] Stack 2-column grid

**Step 2: Production build**

```bash
npm run build
```
Expected: build completes with **0 TypeScript errors** and **0 ESLint errors**. If there are errors, fix them before continuing.

**Step 3: Commit if build was clean**

```bash
git add -A
git commit -m "feat: complete portfolio site — all 7 sections, animations, and production build passing"
```
