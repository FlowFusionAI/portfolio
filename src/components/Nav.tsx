"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll } from "framer-motion"
import Logo from "@/components/Logo"

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const prevY = useRef(0)

  useEffect(() => {
    return scrollY.on("change", (y) => {
      setHidden(y > prevY.current && y > 60)
      prevY.current = y
    })
  }, [scrollY])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-border"
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <a
            href="/saurav-kc-cv.pdf"
            download
            className="hidden md:inline-block bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium font-sans hover:opacity-90 transition-opacity"
          >
            Download CV
          </a>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-ink rounded" />
            <span className="block w-6 h-0.5 bg-ink rounded" />
            <span className="block w-6 h-0.5 bg-ink rounded" />
          </button>
        </div>
      </motion.nav>

      {menuOpen && (
        <motion.div
          className="fixed inset-0 bg-paper flex flex-col items-center justify-center gap-6 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 text-3xl text-muted leading-none"
            aria-label="Close menu"
          >
            ×
          </button>
          <a
            href="/saurav-kc-cv.pdf"
            download
            className="bg-accent text-white px-8 py-3 rounded-full text-lg font-medium font-sans"
            onClick={() => setMenuOpen(false)}
          >
            Download CV
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-kc-045083200/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink text-ink px-8 py-3 rounded-full text-lg font-medium font-sans"
            onClick={() => setMenuOpen(false)}
          >
            View LinkedIn →
          </a>
        </motion.div>
      )}
    </>
  )
}
