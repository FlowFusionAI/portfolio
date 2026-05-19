import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "800"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Saurav KC | Automation Engineer",
  description:
    "CS graduate and automation engineer based in London. Built a full-stack ATS that processed 350+ applicants and saved 15-20 hours/week. Open to Automation, RevOps, Solutions Engineering, and Junior SWE roles.",
  openGraph: {
    title: "Saurav KC | Automation Engineer",
    description: "Full-stack ATS. 350+ applicants. 15–20 hrs/week saved. Based in London.",
    url: "https://sauravkc.dev",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
