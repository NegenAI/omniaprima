import type { Metadata } from "next"

import { Story } from "@/components/chi-siamo/story"
import { Team } from "@/components/chi-siamo/team"
import { ContactSection } from "@/components/contact/contact-section"

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Fondata nel 2009, Omnia Prima mette il cliente al centro: noleggio e vendita di veicoli per privati, professionisti e flotte aziendali. Conosci la nostra storia e il team.",
}

export default function ChiSiamoPage() {
  return (
    <main>
      <Story />
      <Team />
      <ContactSection />
    </main>
  )
}
