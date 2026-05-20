"use client"

import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-paper pt-16">
      <div className="max-w-5xl mx-auto px-6 py-24 w-full">
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="text-accent text-sm font-sans uppercase tracking-[0.08em] font-medium mb-6"
        >
          AUTOMATION ENGINEER · SOLUTIONS ENGINEER · LONDON
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-serif font-bold text-ink leading-tight tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          I build full-stack systems
          <br className="hidden sm:block" />
          {" "}that replace broken workflows.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted text-lg leading-[1.6] max-w-xl mb-10 font-sans"
        >
          CS graduate (Portsmouth, 2023). I map the broken process, design the
          system, and ship it end-to-end. Flagship: an operations platform that
          consolidated a 350+ applicant hiring pipeline and saved a London clinic
          15–20 hrs/week.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="/saurav-kc-cv.pdf"
            download
            className="bg-accent text-white px-7 py-3 rounded-full font-medium text-base hover:opacity-90 transition-opacity font-sans"
          >
            Download CV
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-kc-045083200/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink text-ink px-7 py-3 rounded-full font-medium text-base hover:bg-ink hover:text-paper transition-colors font-sans"
          >
            View LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
