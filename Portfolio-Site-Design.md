# Portfolio Site — Design Document
**Date:** 2026-05-19  
**Owner:** Saurav KC  
**Status:** Approved, ready for implementation

---

## Purpose

A single-page recruiter-facing portfolio site. The job of this page is one thing: convert a recruiter or hiring manager into booking a call or sending an email. It is NOT a general personal site — it reads like a focused professional pitch.

**Target audience:** Recruiters and hiring managers at London-based companies hiring for:
- Automation Engineer
- RevOps Engineer
- Solutions Engineer
- Technical Implementation
- Junior Software Engineer

**Primary conversion actions:**
1. Email: `sauravkc@flowfusionai.com`
2. LinkedIn: `https://www.linkedin.com/in/saurav-kc-045083200/`

---

## Personal Details (source of truth — never hardcode elsewhere)

```
Name:         Saurav KC
Email:        sauravkc@flowfusionai.com
LinkedIn:     https://www.linkedin.com/in/saurav-kc-045083200/
GitHub:       https://github.com/FlowFusionAI
Location:     Reading, UK (targeting London office-based roles but open to anywhere in England for relocating, no sponsorship needed)
Education:    BSc Computer Science, University of Portsmouth (Sept 2020 — May 2023)
Current role: Founder & Automation Engineer, Flow Fusion AI (Nov 2024 — Present)
```

### Flagship Project
```
Client:      Smile Cliniq (dental clinic, London)
Repo:        https://github.com/ManagersSC/onboarding-task-manager
Problem:     Fragmented Google Sheets hiring process, multiple tools, no visibility
Solution:    Full-stack ATS + Onboarding Task Manager + Admin Dashboard
Stack:       Next.js, Airtable, Make.com, Cal.com, Vercel, Gmail API, Slack
Key metrics: 350+ applicants processed, 15–20 hrs/week saved, hiring consolidated to 1 person
Delivery:    Solo — scoped, designed, built, shipped, handed over
```

---

## Tech Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Next.js 14 (App Router) | Matches candidate's own stack; Vercel deploy |
| Language | TypeScript | Type safety, signals quality to technical reviewers |
| Styling | Tailwind CSS | Rapid utility-first styling |
| Animation | Framer Motion | Scroll reveals, counters, hover states |
| Fonts | Playfair Display + Inter | Serif authority + clean sans readability |
| Hosting | Vercel | Zero-config, free tier, custom domain ready |

**Initialize with:**
```bash
npx create-next-app@latest portfolio-site --typescript --tailwind --app --src-dir --import-alias "@/*"
cd portfolio-site
npm install framer-motion
```

**Font setup** — add to `app/layout.tsx` via `next/font/google`:
```ts
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

---

## Visual Design

### Colour Palette
```
--color-paper:   #F7F4EF   /* warm off-white base */
--color-ink:     #1C1C2E   /* deep navy, all body text */
--color-accent:  #E8803A   /* warm amber — CTAs, highlights, hover states */
--color-muted:   #6B6B7B   /* secondary text, labels */
--color-border:  #E2DDD6   /* subtle dividers */
--color-card:    #FFFFFF   /* card backgrounds */
```

### Typography
```
Headings:  Playfair Display, Bold (700/800)
           H1: clamp(2.5rem, 5vw, 4.5rem), tight tracking (-0.02em)
           H2: clamp(1.8rem, 3vw, 2.8rem)
           H3: 1.25rem, semi-bold

Body:      Inter, Regular (400) / Medium (500)
           Base: 1rem / 1.6 line-height
           Small labels: 0.8rem, uppercase, letter-spacing 0.08em

Accent text (metric numbers): Playfair Display, Bold, large
```

### Aesthetic Rules
- Off-white `#F7F4EF` page background — never pure white or pure black
- Amber accent only on interactive elements (CTAs, hover states, underlines)
- Generous whitespace — sections breathe, nothing cramped
- Cards use `#FFFFFF` with a subtle `box-shadow: 0 2px 12px rgba(0,0,0,0.06)` and `border: 1px solid #E2DDD6`
- No gradients on backgrounds — flat, editorial
- Playful: slight rotation on decorative elements (badges, tags), bouncy spring transitions

---

## Page Structure

```
/ (single page, anchor scroll)
├── <Nav>           sticky, minimal: name left, CTA right
├── <Hero>          name, tagline, dual CTA
├── <Narrative>     "The problem I solve" — positioning statement
├── <CaseStudy>     Smile Cliniq — problem → system → results
├── <Stack>         interactive tool grid
├── <Background>    CS degree + current role (tight, not a CV dump)
└── <CTAFooter>     "Ready to talk?" + email + LinkedIn + GitHub
```

---

## Section Specifications

### 1. `<Nav>`
- Sticky top, white/paper background, subtle bottom border
- Left: `Saurav KC` in Playfair Display, medium weight
- Right: `Get in touch →` amber button (mailto link)
- Mobile: hamburger collapses to full-screen overlay with both CTAs
- Hides on scroll down, reappears on scroll up (use `useScroll` + `useMotionValue`)

### 2. `<Hero>`

**Content:**
```
[Small label, uppercase amber]  AUTOMATION ENGINEER · LONDON

[H1, Playfair Bold]
I build automation systems
that actually get used.

[Body, Inter]
CS graduate. Solo client delivery. Flagship: a full-stack ATS that
processed 350+ applicants and saved a clinic 15–20 hours every week.

[Two buttons side by side]
[ Email me ]   [ View LinkedIn → ]
```

**Visual:**
- Full viewport height (min-h-screen)
- Left-aligned text on desktop, centered on mobile
- Subtle animated background: a soft SVG dot-grid or noise texture in `#E2DDD6` (low opacity)
- Entrance animation: text fades up in sequence (stagger 0.15s per line) on load

### 3. `<Narrative>`

**Content:**
```
[H2]  Most automation consultants connect tools.
      I build the system underneath.

[Body, 2 short paragraphs]
Para 1: "Businesses usually come to me with a mess: spreadsheets held
together by manual work, tools that don't talk to each other, and a
team copying data between tabs all day. I scope the real problem,
design the system, and ship it."

Para 2: "I work end-to-end — product thinking, technical build, client
handover. No handoffs. No "that's someone else's job.""
```

**Visual:**
- Centered, max-width 680px
- `<strong>` on "build the system underneath" — amber underline
- Scroll-triggered fade-up (Framer Motion `whileInView`)

### 4. `<CaseStudy>` — Smile Cliniq

This is the centrepiece of the page. It tells the full story of the flagship project.

**Layout (desktop): two columns — left: story, right: system visual**

**Left column content:**
```
[Small label]  CASE STUDY · 2024–2025

[H2]  From 3 spreadsheets to one system.

[Problem paragraph]
"A London dental clinic was managing 350+ job applicants across Google
Sheets, email threads, and WhatsApp messages. Scheduling interviews
meant manual back-and-forth. New hire onboarding ran on printouts.
The practice manager was spending half her week just keeping up."

[Divider]

[H3 with amber dot]  What I built

[Three feature cards / rows:]
  1. Applicant Tracking System
     Next.js frontend + Airtable database. Automated intake form →
     applicant record → status pipeline. Replaced the spreadsheet.

  2. Interview Scheduling
     Cal.com integration via Make.com. Candidates self-book.
     Confirmation + reminder emails sent automatically.

  3. Onboarding Task Manager
     Role-based task assignment triggered on hire. Compliance training,
     video modules, quiz completion — tracked in a self-serve dashboard.

[Divider]

[Metrics row — animated counters on scroll]
  350+          15–20 hrs         1 person
  applicants    saved per week    runs hiring
  processed
```

**Right column content:**
A CSS/SVG system diagram showing the flow:
```
[Intake Form] → [Airtable ATS] → [Cal.com Scheduling]
                      ↓
               [Make.com Automations]
                      ↓
          [Gmail/Slack Notifications]
                      ↓
          [Onboarding Task Manager]
                      ↓
              [Admin Dashboard]
```
Nodes are rounded boxes with tool logos (use simple SVG icons or emoji fallbacks). Connecting lines animate in on scroll (stroke-dashoffset trick).

**Bottom of section:**
```
[Button, outlined]  View the repository on GitHub →
                    (links to https://github.com/ManagersSC/onboarding-task-manager)

[Small label]  Solo delivery — scoped, built, shipped, handed over.
```

**Metric counter animation:**
Use Framer Motion's `useInView` + a counting effect. When the metrics row enters viewport, counters animate from 0 to their value over 1.5s with an easing curve.

### 5. `<Stack>`

**Content:**
```
[H2]  What I build with

[Label]  These aren't just tools I've heard of.
         They're what I shipped the Smile Cliniq project with.
```

**Grid:** 3 columns desktop, 2 mobile, each card:
```
┌──────────────────────┐
│  [Icon/Logo]         │
│  Tool Name           │
│  Short use case      │  ← revealed on hover
└──────────────────────┘
```

**Tools to include (8 cards):**
| Tool | Label | Hover text |
|------|-------|-----------|
| Next.js | Next.js | Full-stack React framework — built the ATS and admin dashboards |
| Airtable | Airtable | Relational database layer — applicant records, task tracking |
| Make.com | Make.com | Automation orchestration — scheduling, notifications, onboarding triggers |
| n8n | n8n | Self-hosted workflow automation for complex pipelines |
| Vercel | Vercel | Deployment and hosting — zero-config CI/CD |
| Cal.com | Cal.com | Scheduling infrastructure — interview booking flows |
| TypeScript | TypeScript | Type-safe JavaScript across all projects |
| AI tooling | AI / LLMs | Claude, OpenAI — integrating AI into automation pipelines |

**Hover interaction:** card lifts (scale 1.03, shadow deepens), amber border appears, use-case text fades in below tool name. Spring animation via Framer Motion `whileHover`.

### 6. `<Background>`

Short, confident, not a CV dump.

```
[H2]  Background

[Two short paragraphs, Inter, body size]
"BSc Computer Science, University of Portsmouth (2020–2023). Final
year project: a price comparison web scraper using Flask, Selenium,
and BeautifulSoup — which is where the habit of building
end-to-end systems started."

"Since November 2024 I've been running Flow Fusion AI, delivering
bespoke automation systems for business clients. Smile Cliniq is
the flagship engagement — scoped, built, and shipped solo."

[Three tag pills, amber background]
  CS Degree    Solo delivery    No sponsorship needed
```

### 7. `<CTAFooter>`

```
[H2, large, centered]
Ready to hire someone who ships?

[Body]
I'm looking for full-time, office-based roles in London.
Automation Engineer, RevOps, Solutions Engineer, Technical
Implementation, or Junior SWE.

[Two large buttons]
[ Email me → ]           [ LinkedIn → ]
sauravkc@flowfusionai.com

[Small row below, muted]
github.com/FlowFusionAI   ·   Reading, UK   ·   No sponsorship needed
```

**Visual:**
- Slightly darker background: `#EDE9E2` (warmer than the page base)
- Large Playfair Display heading, generous padding
- Buttons: primary (amber fill, white text) + secondary (outlined, ink)

---

## Animation Specifications

| Element | Animation | Trigger | Config |
|---------|-----------|---------|--------|
| Hero text lines | Fade up, stagger 0.15s | Page load | `initial: {opacity:0, y:30}` → `animate: {opacity:1, y:0}` |
| Section headings | Fade up | `whileInView`, `once: true` | duration 0.5s, y: 20 |
| Case study columns | Fade in from sides | `whileInView` | left: `x:-40`, right: `x:40` |
| System diagram nodes | Stroke draw + fade | `whileInView` | stagger 0.1s per node |
| Metric counters | Count from 0 | `useInView` fires counter | 1.5s ease-out |
| Stack cards | Scale + border | `whileHover` | spring: `stiffness:300, damping:20` |
| Nav hide/show | Y translate | `useScroll` | -60px on down, 0 on up |

---

## File Structure

```
portfolio-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # font setup, metadata, global styles
│   │   ├── page.tsx            # imports and sequences all sections
│   │   └── globals.css         # CSS variables, base reset
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── Narrative.tsx
│       ├── CaseStudy.tsx       # includes SystemDiagram sub-component
│       ├── MetricCounter.tsx   # animated counter, reusable
│       ├── Stack.tsx
│       ├── Background.tsx
│       └── CTAFooter.tsx
├── public/
│   └── (no images needed — all CSS/SVG)
├── tailwind.config.ts          # extend with custom colours and fonts
├── package.json
└── tsconfig.json
```

---

## Tailwind Config Extensions

```ts
// tailwind.config.ts
extend: {
  colors: {
    paper:  '#F7F4EF',
    ink:    '#1C1C2E',
    accent: '#E8803A',
    muted:  '#6B6B7B',
    border: '#E2DDD6',
    card:   '#FFFFFF',
    footer: '#EDE9E2',
  },
  fontFamily: {
    serif: ['var(--font-playfair)', 'Georgia', 'serif'],
    sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
  },
}
```

---

## Metadata (SEO / social)

```ts
// app/layout.tsx
export const metadata = {
  title: 'Saurav KC — Automation Engineer',
  description:
    'CS graduate and automation engineer based in London. Built a full-stack ATS that processed 350+ applicants and saved 15–20 hours/week. Open to Automation, RevOps, Solutions Engineering, and Junior SWE roles.',
  openGraph: {
    title: 'Saurav KC — Automation Engineer',
    description: 'Full-stack ATS. 350+ applicants. 15–20 hrs/week saved. Based in London.',
    url: 'https://sauravkc.dev',   // update with real domain when live
  },
}
```

---

## Implementation Notes for the Building Claude Instance

1. **Do not add pages, API routes, or features beyond this spec.** This is a single `page.tsx` + components.
2. **No images are required.** The system diagram is built in CSS/SVG. Tool logos can be simple text badges styled with Tailwind — no external icon libraries needed unless you want to add `lucide-react` for small UI icons.
3. **Mobile-first.** All layouts start as single-column and expand with `md:` and `lg:` breakpoints.
4. **Framer Motion variants.** Define animation variants at the component level, not inline. Keeps JSX clean.
5. **The metric counter (`MetricCounter.tsx`)** should accept `{ end: number, suffix: string, label: string }` props and use `useInView` + `useEffect` with a requestAnimationFrame loop for the count. Run once only.
6. **The system diagram** can be pure CSS flexbox/grid boxes with connecting lines drawn as SVG `<line>` or CSS pseudo-elements. Tool name inside each box, arrow between them. Animate each connection line with `strokeDashoffset` on scroll.
7. **Email link format:** `href="mailto:sauravkc@flowfusionai.com"` — no tracking, no form.
8. **LinkedIn link:** `href="https://www.linkedin.com/in/saurav-kc-045083200/"` — open in new tab.
9. **GitHub repo link:** `href="https://github.com/ManagersSC/onboarding-task-manager"` — open in new tab. Display text: `github.com/ManagersSC/onboarding-task-manager`.
10. **GitHub profile link:** `href="https://github.com/FlowFusionAI"` — display text: `github.com/FlowFusionAI`.
11. **Verify** that fonts load correctly before deploying — `next/font/google` handles this automatically but double-check the CSS variable names match between `layout.tsx` and `tailwind.config.ts`.

---

## Definition of Done

- [ ] `npm run dev` serves the page at localhost:3000 with no errors
- [ ] All 7 sections render correctly on desktop (1280px) and mobile (375px)
- [ ] Metric counters animate when scrolled into view
- [ ] Stack card hover states work
- [ ] Both CTAs (email + LinkedIn) link correctly
- [ ] GitHub repo link opens correctly
- [ ] `npm run build` completes with no TypeScript errors
- [ ] Lighthouse performance score ≥ 90 on desktop
