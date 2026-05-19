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
