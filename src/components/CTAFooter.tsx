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
