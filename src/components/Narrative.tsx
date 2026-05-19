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
