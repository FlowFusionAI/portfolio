# Portfolio Site — Implementation Design
**Date:** 2026-05-19
**Status:** Approved

## Source of Truth
All content, copy, colours, typography, section structure, and animation specs come from `Portfolio-Site-Design.md` at the repo root. This doc records the *stack adaptations* needed because the repo is on newer versions than the spec assumed.

---

## Stack Adaptations (spec vs reality)

| Concern | Spec assumed | Actual repo | Adaptation |
|---------|-------------|-------------|------------|
| Next.js | 14 | 16.2.6 | App Router still applies; same font/metadata API |
| Tailwind | v3 (`tailwind.config.ts`) | v4 | Custom tokens go in `globals.css` under `@theme`, not a config file |
| Framer Motion | unspecified | v12 | `useInView` hook API unchanged; `motion` component API unchanged |
| React | 18 | 19 | No API changes affect this project |

### Tailwind v4 token strategy
The design doc's `tailwind.config.ts` block is replaced entirely by `@theme` in `globals.css`:
```css
@theme {
  --color-paper:  #F7F4EF;
  --color-ink:    #1C1C2E;
  --color-accent: #E8803A;
  --color-muted:  #6B6B7B;
  --color-border: #E2DDD6;
  --color-card:   #FFFFFF;
  --color-footer: #EDE9E2;
  --font-serif:   var(--font-playfair), Georgia, serif;
  --font-sans:    var(--font-inter), system-ui, sans-serif;
}
```
Utility classes (`bg-paper`, `text-accent`, `font-serif`, etc.) work identically from JSX.

### Font CSS variables
`layout.tsx` declares fonts with `variable` option so `--font-playfair` and `--font-inter` are emitted as CSS variables on `<html>`, which `@theme` then consumes.

### Client Components
Any component using Framer Motion or React hooks must be a Client Component (`"use client"`). Server Components: `layout.tsx`, `page.tsx` (shell only). Client Components: all 7 section components + `MetricCounter`.

---

## File Structure (exact — from spec)
```
src/
  app/
    layout.tsx        — fonts, metadata, globals.css import
    page.tsx          — imports and sequences all sections
    globals.css       — @import tailwindcss, @theme tokens, base reset
  components/
    Nav.tsx
    Hero.tsx
    Narrative.tsx
    CaseStudy.tsx     — includes SystemDiagram sub-component
    MetricCounter.tsx — reusable animated counter
    Stack.tsx
    Background.tsx
    CTAFooter.tsx
```

---

## System Diagram Decision
Option B (Framer Motion Client Component) chosen: the spec requires `strokeDashoffset` scroll-driven animation on connector lines, which mandates a Client Component regardless. Each node and SVG connector is a Motion element, `useInView` triggers the draw animation.

---

## Animation Implementation Notes
- All Framer Motion variants defined at component level (not inline) per spec note 4
- `MetricCounter` accepts `{ end: number, suffix: string, label: string }`, uses `useInView` + `requestAnimationFrame` loop, runs once
- Nav hide/show: `useScroll` + `useMotionValue` tracking scroll direction, translates Y -60px on down / 0 on up

---

## Definition of Done (from spec)
- `npm run dev` serves at localhost:3000 with no errors
- All 7 sections render on desktop (1280px) and mobile (375px)
- Metric counters animate on scroll-into-view
- Stack card hover states work
- Both CTAs link correctly
- GitHub repo link opens correctly
- `npm run build` completes with no TypeScript errors
