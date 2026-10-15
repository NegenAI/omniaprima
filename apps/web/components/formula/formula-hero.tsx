import type { ReactNode } from "react"
import Image from "next/image"

import type { Formula } from "@/lib/vehicles"
import { cn } from "@workspace/ui/lib/utils"

type FormulaHeroContent = {
  tone: "dark" | "light"
  title: ReactNode
  description: string
  image: { src: string; alt: string }
}

// Copy from Figma (pages "Lungo Termine" 9:5, "Breve Termine" 85:1223,
// "Vendita" 87:3489 → frames 87:10202, 87:9614, 87:9613). The photos already
// contain the bottom gradient and the "Omnia Prima" brand mark.
export const formulaHeroes: Record<Formula, FormulaHeroContent> = {
  "lungo-termine": {
    tone: "dark",
    title: (
      <>
        {/* Mobile breaks reproduce the Figma wrap: Inter renders "sempre
            nuova," narrower on the web, which would orphan "un". */}
        Un&apos;
        <mark>
          auto sempre <br className="md:hidden" />
          nuova
        </mark>
        , un <br className="md:hidden" />
        solo canone.
      </>
    ),
    description:
      "Il noleggio a lungo termine è la soluzione più semplice per guidare senza pensieri: un canone mensile fisso pluriennale che include manutenzione, assicurazione, bollo e assistenza stradale h24. Zero anticipo obbligatorio, zero sorprese.",
    image: {
      src: "/images/formula/hero-lungo-termine.webp",
      alt: "Una consulente Omnia Prima consegna le chiavi a un cliente – Omnia Prima Noleggio",
    },
  },
  "breve-termine": {
    tone: "dark",
    title: (
      <>
        Un&apos;<mark>auto quando serve</mark>, per il tempo che serve.
      </>
    ),
    description:
      "Il noleggio a breve termine è la soluzione ideale per chi ha bisogno di un'auto per pochi giorni o settimane: nessun impegno a lungo periodo, assicurazione e assistenza incluse, ritiro immediato. Prenota oggi, guida domani.",
    image: {
      src: "/images/formula/hero-breve-termine.webp",
      alt: "Un cliente sale a bordo di un'auto a noleggio – Omnia Prima Noleggio",
    },
  },
  vendita: {
    tone: "light",
    title: (
      <>
        La tua <mark>nuova auto</mark>, scelta con cura.
      </>
    ),
    description:
      "La vendita di veicoli nuovi o usati è la soluzione ideale per chi cerca un'auto in proprietà: prezzi trasparenti, finanziamenti su misura, consegna rapida. Nessuna sorpresa, solo garanzie.",
    image: {
      src: "/images/formula/hero-vendita.webp",
      alt: "Due clienti sorridenti alla guida della loro nuova auto – Omnia Prima Vendita",
    },
  },
}

/**
 * Hero at the top of the formula pages (noleggio lungo/breve termine, vendita).
 *
 * Mobile: 48px vertical padding; copy and a 348×435-ratio photo card span the
 * page container, so the edges line up with every other section (review
 * feedback 2026-10-15; Figma's 344px column made them 3px narrower).
 * Desktop: copy left, photo right; the light (vendita) hero sits on navy-100 so
 * it doesn't blend into the ghiaccio section below.
 */
export function FormulaHero({
  formula,
  className,
}: {
  formula: Formula
  className?: string
}) {
  const { tone, title, description, image } = formulaHeroes[formula]
  const dark = tone === "dark"

  return (
    <section
      className={cn(
        // Vendita's copy block is 70px shorter but sits centred in the same
        // fixed-height content box, hence the extra 4.5px on top/bottom.
        dark ? "bg-navy py-ds-7" : "bg-ghiaccio py-[52.5px] md:bg-navy-100",
        "md:py-ds-8",
        className
      )}
    >
      <div className="container">
        <div className="flex flex-col gap-ds-5 md:grid md:grid-cols-2 md:items-center md:gap-ds-7">
          <div
            className={cn(
              "flex flex-col gap-ds-4 md:max-w-[560px]",
              dark ? "text-ghiaccio" : "text-foreground"
            )}
          >
            <h1
              className={cn(
                "[&_mark]:bg-transparent",
                dark ? "[&_mark]:text-ambra" : "[&_mark]:text-azzurro"
              )}
            >
              {title}
            </h1>
            <p className="text-body">{description}</p>
          </div>

          <div className="md:w-full md:max-w-[480px] md:justify-self-end">
            <div className="relative aspect-[348/435] overflow-hidden rounded-image border border-navy-200">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 768px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
