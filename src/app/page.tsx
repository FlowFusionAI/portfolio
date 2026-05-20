import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import Narrative from "@/components/Narrative"
import CaseStudy from "@/components/CaseStudy"
import Testimonial from "@/components/Testimonial"
import Stack from "@/components/Stack"
import Background from "@/components/Background"
import CTAFooter from "@/components/CTAFooter"

export default function Home() {
  return (
    <main className="bg-paper min-h-screen font-sans">
      <Nav />
      <Hero />
      <Narrative />
      <CaseStudy />
      <Testimonial />
      <Stack />
      <Background />
      <CTAFooter />
    </main>
  )
}
