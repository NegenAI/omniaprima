import type { Metadata } from "next"

import { ContattiIntro } from "@/components/contatti/contatti-intro"
import { ContactSection } from "@/components/contact/contact-section"
import { getSiteSettings } from "@/lib/content"

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta Omnia Prima: telefono, e-mail e sedi di San Nicolò a Tordino e Castelnuovo Vomano. Richiedi un preventivo gratuito, ti ricontattiamo entro 24 ore.",
}

export default async function ContattiPage() {
  const { contact } = await getSiteSettings()

  return (
    <main className="bg-secondary">
      <ContattiIntro contact={contact} />
      <ContactSection contact={contact} id="preventivo" info="heading" />
    </main>
  )
}
