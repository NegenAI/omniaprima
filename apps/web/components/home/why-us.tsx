import Image from "next/image"
import Link from "next/link"

import { SectionHeading } from "@/components/section-heading"
import { Button } from "@workspace/ui/components/button"

// The photos already include the navy fade behind the copy.
const reasons = [
  {
    title: "Veicoli garantiti",
    text: "Flotta recente, controllata e sempre in perfette condizioni.",
    image: "/images/home/why-veicoli-garantiti.webp",
    alt: "Consulente Omnia Prima alla scrivania",
  },
  {
    title: "Formule flessibili",
    text: "Breve, lungo termine o acquisto: scegli quello che preferisci.",
    image: "/images/home/why-formule-flessibili.webp",
    alt: "Consulente Omnia Prima in sede",
  },
  {
    title: "Assistenza 24/7",
    text: "Un team dedicato pronto ad aiutarti in ogni momento.",
    image: "/images/home/why-assistenza.webp",
    alt: "Tecnico Omnia Prima al lavoro su un'auto",
  },
]

export function WhyUs() {
  return (
    <section id="perche-sceglierci" className="bg-primary py-[52px] md:py-ds-8">
      <div className="container flex flex-col gap-ds-7">
        <SectionHeading
          tone="dark"
          eyebrow="Perché sceglierci"
          title={
            <>
              L’esperienza fa <br className="md:hidden" />
              la differenza
            </>
          }
        />

        <div className="flex flex-col items-center gap-6 rounded-card border border-grigio bg-navy-700 px-[14px] pt-[18px] pb-[21px] md:p-ds-5">
          <ul className="grid w-full gap-6 md:grid-cols-3">
            {reasons.map((reason) => (
              <li
                key={reason.title}
                className="relative isolate flex aspect-[320/430] flex-col justify-end overflow-hidden rounded-[19px] px-[25px] pb-[27px]"
              >
                <Image
                  src={reason.image}
                  alt={reason.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="-z-10 object-cover"
                />
                <div className="flex flex-col gap-2 text-ghiaccio">
                  <h3>{reason.title}</h3>
                  <p className="text-body">{reason.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="lg"
            render={<Link href="/chi-siamo" />}
            nativeButton={false}
          >
            Conosci il team →
          </Button>
        </div>
      </div>
    </section>
  )
}
