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
          I don&apos;t hand off halfway through.
          <br />
          I{" "}
          <strong className="underline decoration-accent decoration-2">
            own the whole build.
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
            Most teams have the tools already — they&apos;re missing someone who
            can connect them without leaving gaps. I come in at the architecture
            stage: data schema, API routes, auth layer, frontend, integrations,
            and deployment. One person, first commit to handover.
          </p>
          <p>
            CS degree gave me the foundation. Solo client delivery gave me the
            scar tissue. I&apos;m looking to bring that into a team — not pitch
            another client.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
