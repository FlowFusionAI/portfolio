"use client"

import { motion } from "framer-motion"

const engineeringTools = [
  { name: "Next.js",    use: "Full-stack React framework — ATS frontend, admin dashboard, API routes (App Router)" },
  { name: "TypeScript", use: "Type-safe JavaScript across all production code; Zod schemas for input validation" },
  { name: "Python",     use: "Flask, Selenium, BeautifulSoup — final-year price comparison web scraper" },
  { name: "Vercel",     use: "Deployment + auto-deploy from main, edge-optimised CDN, preview environments" },
]

const automationTools = [
  { name: "Make.com",   use: "7 automation scenarios — intake webhook, hire trigger, Cal.com scheduling, Gmail/Slack routing" },
  { name: "Airtable",   use: "Multi-table database layer — 7 tables: applicants, tasks, staff, quizzes, reviews, notifications, audit log" },
  { name: "n8n",        use: "Self-hosted workflow automation for complex multi-step pipelines" },
  { name: "AI / LLMs",  use: "Claude, OpenAI — integrating AI into automation and workflow pipelines" },
]

function ToolCard({ tool, index }: { tool: { name: string; use: string }; index: number }) {
  return (
    <motion.div
      key={tool.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
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
  )
}

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
          className="text-muted mb-10 font-sans"
        >
          Tools I&apos;ve shipped production code with — not tutorials.
        </motion.p>

        <p className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-3">Engineering</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {engineeringTools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>

        <p className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-3">Automation & Ops</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {automationTools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  )
}
