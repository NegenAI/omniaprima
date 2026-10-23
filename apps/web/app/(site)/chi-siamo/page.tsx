import type { Metadata } from "next"

import { Story } from "@/components/chi-siamo/story"
import { Team } from "@/components/chi-siamo/team"
import { ContactSection } from "@/components/contact/contact-section"
import { getSiteSettings, getTeamMembers } from "@/lib/content"

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Fondata nel 2009, Omnia Prima mette il cliente al centro: noleggio e vendita di veicoli per privati, professionisti e flotte aziendali. Conosci la nostra storia e il team.",
}

export default async function ChiSiamoPage() {
  const [members, { contact, googleReviews }] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
  ])

  return (
    <main>
      <Story googleReviews={googleReviews} />
      <Team members={members} />
      <ContactSection contact={contact} />
    </main>
  )
}
