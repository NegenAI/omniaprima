import Image from "next/image"

import { ContactForm } from "@/components/contact/contact-form"
import { SectionHeading } from "@/components/section-heading"
import { contact } from "@/lib/site"

const details = [
  {
    label: "Telefono",
    icon: "/icons/call.svg",
    content: (
      <a href={contact.phone.href} className="hover:underline">
        {contact.phone.label}
      </a>
    ),
  },
  {
    label: "Email",
    icon: "/icons/mail.svg",
    content: (
      <a href={contact.email.href} className="hover:underline">
        {contact.email.label}
      </a>
    ),
  },
  {
    label: "Sedi",
    icon: "/icons/location.svg",
    content: contact.locations.map((location) => (
      <span key={location.town} className="block">
        {location.town}, {location.street}
      </span>
    )),
  },
]

/** "Contatti" section (info + form), shared by every page that ends with a quote request. */
export function ContactSection() {
  return (
    <section id="contatti" className="bg-secondary py-12 md:py-ds-8">
      <div className="container grid gap-ds-5 lg:grid-cols-2 lg:items-start lg:gap-ds-7">
        <div className="flex flex-col gap-ds-5">
          <div className="flex flex-col gap-ds-4">
            <SectionHeading
              eyebrow="Contatti"
              title={
                <>
                  Richiedi un <br className="md:hidden" />
                  preventivo gratuito
                </>
              }
            />
            <p className="text-body text-muted-foreground">
              Raccontaci di cosa hai bisogno: ti ricontattiamo entro 24 ore con
              la soluzione più adatta.
            </p>
          </div>
          <dl className="flex flex-col gap-ds-4">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-center gap-6">
                <Image src={detail.icon} alt="" width={24} height={24} />
                <div>
                  <dt className="mb-[3px] text-sm leading-4 text-muted-foreground uppercase">
                    {detail.label}
                  </dt>
                  <dd className="text-base leading-5.5 text-foreground">
                    {detail.content}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-card bg-white px-5 pt-12 pb-[30px] md:p-ds-6">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
