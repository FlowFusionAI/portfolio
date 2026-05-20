"use client"

import { motion } from "framer-motion"

export default function Testimonial() {
  return (
    <section className="py-24 bg-footer">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="block font-serif font-bold text-accent leading-none mb-6 select-none"
            style={{ fontSize: "clamp(4rem, 10vw, 6rem)" }}
            aria-hidden
          >
            &ldquo;
          </span>

          <blockquote
            className="font-serif text-ink leading-[1.6] mb-8"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.4rem)" }}
          >
            He gave more value than promised. The platform saved us countless
            hours of sieving through emails, with all applications neatly in one
            place with clearly laid out stages. I couldn&apos;t have asked for
            more.
          </blockquote>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-8 h-px bg-accent mb-3" />
            <p className="font-sans font-semibold text-ink text-sm tracking-wide">
              Benji
            </p>
            <p className="font-sans text-muted text-xs uppercase tracking-[0.1em]">
              Operations Manager · Smile Cliniq
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
