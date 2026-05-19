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
  title: "Saurav KC | Full Stack Engineer",
  description:
    "CS graduate and full-stack engineer based in London. Built a production-grade onboarding platform on Next.js 15 + TypeScript that processed 350+ applicants and saved 15-20 hours/week. Open to Software Engineer, Automation, RevOps, and Solutions Engineering roles.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Saurav KC | Full Stack Engineer",
    description: "Full-stack ATS. 350+ applicants. 15-20 hrs/week saved. Based in London.",
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
