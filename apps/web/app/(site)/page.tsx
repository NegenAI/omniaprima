import { Hero } from "@/components/home/hero"
import { Offers } from "@/components/home/offers"
import { WhyUs } from "@/components/home/why-us"
import { ContactSection } from "@/components/contact/contact-section"
import { getFeaturedVehicles, getSiteSettings } from "@/lib/content"

export default async function HomePage() {
  const [featured, { contact }] = await Promise.all([
    getFeaturedVehicles(),
    getSiteSettings(),
  ])

  return (
    <main>
      <Hero />
      <Offers vehicles={featured} />
      <WhyUs />
      <ContactSection contact={contact} />
    </main>
  )
}
