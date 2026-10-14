import { Hero } from "@/components/home/hero"
import { Offers } from "@/components/home/offers"
import { WhyUs } from "@/components/home/why-us"
import { ContactSection } from "@/components/contact/contact-section"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Offers />
      <WhyUs />
      <ContactSection />
    </main>
  )
}
