"use client"

import { motion } from "framer-motion"
import MetricCounter from "@/components/MetricCounter"

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

export default function CaseStudy() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

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
