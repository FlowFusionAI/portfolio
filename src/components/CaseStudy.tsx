"use client"

import { motion } from "framer-motion"
import MetricCounter from "@/components/MetricCounter"

// ── Diagram primitives ──────────────────────────────────────────────────────

function DiagramNode({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-card border border-border rounded-md px-2.5 py-1.5 text-[10px] font-medium text-ink font-sans text-center whitespace-nowrap"
    >
      {label}
    </motion.div>
  )
}

function SecurityBadge({ label, index }: { label: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-accent/10 border border-accent/30 text-accent rounded-full px-2 py-0.5 text-[9px] font-medium font-sans whitespace-nowrap"
    >
      {label}
    </motion.span>
  )
}

function LayerConnector() {
  return (
    <div className="flex flex-col items-center my-0.5">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25 }}
        style={{ transformOrigin: "top center" }}
        className="w-px h-4 bg-border"
      />
      <span className="text-muted text-[9px] leading-none">↓</span>
    </div>
  )
}

function DiagramSection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <p className="text-[8px] uppercase tracking-[0.12em] text-muted font-sans mb-1 text-center">
        {label}
      </p>
      <div className="w-full rounded-lg border border-border/60 bg-paper px-3 py-2 flex flex-wrap gap-1.5 justify-center items-center">
        {children}
      </div>
    </div>
  )
}

// ── System Diagram ──────────────────────────────────────────────────────────

function SystemDiagram() {
  return (
    <div className="flex flex-col items-center gap-1.5 py-1">

      <DiagramSection label="Inputs">
        <DiagramNode label="Intake Form" index={0} />
        <DiagramNode label="Cal.com" index={1} />
        <DiagramNode label="Webhook API" index={2} />
      </DiagramSection>

      <LayerConnector />

      <DiagramSection label="Automation Engine — Make.com · 7 Scenarios">
        <DiagramNode label="New Application" index={3} />
        <DiagramNode label="Hire Trigger" index={4} />
        <DiagramNode label="Task Assignment" index={5} />
        <DiagramNode label="Gmail + Slack" index={6} />
        <DiagramNode label="Password Reset" index={7} />
        <DiagramNode label="Admin Invite" index={8} />
        <DiagramNode label="Custom Email" index={9} />
      </DiagramSection>

      <LayerConnector />

      <DiagramSection label="App Platform · Next.js 15 · App Router · TypeScript">
        <DiagramNode label="ATS Pipeline" index={10} />
        <DiagramNode label="Task Engine" index={11} />
        <DiagramNode label="Quiz System" index={12} />
        <DiagramNode label="Resource Hub" index={13} />
        <DiagramNode label="Audit Logs" index={14} />
      </DiagramSection>

      <LayerConnector />

      <DiagramSection label="Data + Auth">
        <DiagramNode label="Airtable · 7 tables" index={15} />
        <DiagramNode label="iron-session · RBAC" index={16} />
        <DiagramNode label="Google Calendar" index={17} />
      </DiagramSection>

      <LayerConnector />

      <DiagramSection label="Security">
        <SecurityBadge label="CSRF guard" index={18} />
        <SecurityBadge label="Zod + bcrypt" index={19} />
        <SecurityBadge label="DOMPurify · XSS" index={20} />
        <SecurityBadge label="SSRF guard" index={21} />
      </DiagramSection>

      <LayerConnector />

      <DiagramNode label="Vercel · Edge Deploy" index={22} />

    </div>
  )
}

// ── Feature list ────────────────────────────────────────────────────────────

const features = [
  {
    title: "ATS Pipeline + Admin Dashboard",
    body: "Next.js 15 App Router · TypeScript · Airtable (7-table schema). Applicant status pipeline, bulk operations, webhook ingestion, paginated user tables.",
  },
  {
    title: "Auth, Sessions & RBAC",
    body: "iron-session (encrypted cookies, 8 hr TTL) · bcryptjs. Three roles (admin/manager/new hire) enforced at middleware and route level. Single-use JWT nonces for password reset and admin invite flows.",
  },
  {
    title: "Automation Engine",
    body: "7 Make.com scenarios: new application intake, hire trigger → task assignment, Cal.com scheduling, Gmail + Slack notifications (per-user channel preferences), password reset, custom email.",
  },
  {
    title: "Quiz & Onboarding System",
    body: "Role-based quiz assignment with a partial credit scoring formula. Submission tracking, completion verification, and a self-serve new-hire dashboard with progress tracking.",
  },
  {
    title: "Security Layer",
    body: "CSRF via Sec-Fetch-Site, Zod input validation, Airtable formula injection escaping, DOMPurify XSS prevention, SSRF-guarded file proxy, CSV injection prevention, HTTP security headers (HSTS, CSP, X-Frame-Options).",
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
              A London dental clinic was managing 350+ job applicants across
              Google Sheets, email threads, and WhatsApp. Scheduling meant
              manual back-and-forth. New hire onboarding ran on printouts. I
              scoped the architecture, built the full platform solo, and handed
              over a production system with documentation and a security audit.
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
              <MetricCounter end={7} suffix="" label="automated scenarios" />
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
                Solo delivery — scoped, built, security-audited, shipped.
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
              className="bg-card rounded-2xl p-6 border border-border sticky top-24"
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
