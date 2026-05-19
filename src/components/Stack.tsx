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
