import type { ReactNode } from "react"
import Image from "next/image"

import type { Formula } from "@/components/formula/formula-hero"
import { SectionHeading } from "@/components/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { cn } from "@workspace/ui/lib/utils"

export type FormulaBenefit = {
  title: string
  icon: ReactNode
  /** Expanded copy. `null` = not in Figma yet (TODO): the row renders closed and non-toggling. */
  body: string | null
}

type FormulaBenefitsContent = {
  eyebrow: string
  title: ReactNode
  benefits: FormulaBenefit[]
}

/* 36×36 row icons. The page instances reuse the "2 Accordion" (61:1772) icon
 * slots; only the banknote differs: navy on Lungo Termine, black on Breve
 * Termine / Vendita (the component's own colour). */
function RowIcon({ src }: { src: string }) {
  return <Image src={src} alt="" width={36} height={36} />
}

/* Lungo Termine's navy banknote: Figma exports just the 26.5×19 group, placed
 * at (5.25, 8.25) inside the 36px slot. */
function NavyBanknoteIcon() {
  return (
    <span className="relative block size-9">
      <Image
        src="/icons/benefits/nessuna-spesa-iniziale-navy.svg"
        alt=""
        width={53}
        height={38}
        className="absolute top-[8.25px] left-[5.25px] h-[19px] w-[26.5px] max-w-none"
      />
    </span>
  )
}

const icons = {
  banknoteBlack: <RowIcon src="/icons/accordion/nessuna-spesa-iniziale.svg" />,
  banknoteNavy: <NavyBanknoteIcon />,
  arrows: <RowIcon src="/icons/accordion/flessibilita.svg" />,
  carShield: <RowIcon src="/icons/accordion/supporto.svg" />,
  carCycle: <RowIcon src="/icons/accordion/gestione-usato.svg" />,
  pencilDoc: <RowIcon src="/icons/accordion/fine-contratto.svg" />,
}

// Copy from Figma: "Perché conviene?" in Lungo Termine (9:5 → 61:3284),
// Breve Termine (85:1223 → 125:4816) and Vendita (87:3489 → 87:3519).
// Bodies come from the open variants of "2 Accordion" (61:1772), which only
// cover the Lungo Termine rows.
export const formulaBenefits: Record<Formula, FormulaBenefitsContent> = {
  "lungo-termine": {
    eyebrow: "Lungo termine",
    title: "Perché conviene?",
    benefits: [
      {
        title: "Nessuna spesa iniziale",
        icon: icons.banknoteNavy,
        body: "Ad acquistare l'auto, pensare all'assicurazione, occuparsi della manutenzione ci pensiamo noi. Paghi solo il canone mensile. L'importo resta fisso per tutta la durata del contratto, nessuna spesa imprevista.",
      },
      {
        title: "Flessibilità",
        icon: icons.arrows,
        body: "Nessun limite alle tue possibilità di scelta: potrai decidere quanta strada fare e quali servizi includere. E se cambiano le tue esigenze di mobilità potrai aggiungerne di nuovi in qualunque momento.",
      },
      {
        title: "Supporto",
        icon: icons.carShield,
        body: "Ci assicuriamo che il veicolo sia sempre in perfette condizioni e saremo sempre presenti grazie alla nostra rete di assistenza.",
      },
      {
        title: "Gestione usato",
        icon: icons.carCycle,
        body: "Se hai deciso di noleggiare un veicolo nuovo, al tuo usato ci pensiamo noi.",
      },
      {
        title: "Fine contratto",
        icon: icons.pencilDoc,
        body: "Al termine del contratto decidi se restituire il veicolo o continuare a guidarlo con un canone vantaggioso. Altrimenti puoi sempre noleggiare un nuovo veicolo.",
      },
    ],
  },
  // TODO(copy): Breve Termine bodies are not in Figma (no open states).
  "breve-termine": {
    eyebrow: "Breve termine",
    title: "Perché conviene?",
    benefits: [
      { title: "Consegna rapida", icon: icons.banknoteBlack, body: null },
      { title: "Prenotazione last minute", icon: icons.arrows, body: null },
      { title: "Restituzione flessibile", icon: icons.carShield, body: null },
      { title: "KM Inclusi", icon: icons.carCycle, body: null },
      {
        title: "Nessun vincolo contrattuale",
        icon: icons.pencilDoc,
        body: null,
      },
    ],
  },
  // TODO(copy): Vendita bodies are not in Figma (no open states).
  vendita: {
    eyebrow: "Vendita",
    title: (
      <>
        Perché conviene <br className="md:hidden" />
        con Omnia Prima?
      </>
    ),
    benefits: [
      { title: "Confronto tra prezzi", icon: icons.banknoteBlack, body: null },
      { title: "Basato sulle tue esigenze", icon: icons.arrows, body: null },
      { title: "Consulenza dedicata", icon: icons.carShield, body: null },
      { title: "Assistenza post-vendita", icon: icons.carCycle, body: null },
      { title: "Consegna a domicilio", icon: icons.pencilDoc, body: null },
    ],
  },
}

type FormulaBenefitsProps = {
  formula: Formula
  /** Start with these rows open (by title). */
  defaultOpen?: string[]
  className?: string
}

/**
 * "Perché conviene?" on the formula pages: eyebrow + H2, then the light
 * Accordion (white card, flush rows). Mobile matches the 390px frames: 48px
 * top padding, 8px eyebrow→title, 24px title→accordion, and the 64px gap
 * before the vehicle listing that shares the same ghiaccio band.
 * Desktop: heading left, accordion right.
 */
export function FormulaBenefits({
  formula,
  defaultOpen,
  className,
}: FormulaBenefitsProps) {
  const { eyebrow, title, benefits } = formulaBenefits[formula]

  return (
    <section
      aria-labelledby={`perche-conviene-${formula}`}
      className={cn("bg-secondary pt-ds-7 pb-16 md:py-ds-8", className)}
    >
      <div className="container grid gap-ds-5 lg:grid-cols-12 lg:items-start lg:gap-ds-7">
        <SectionHeading
          eyebrow={eyebrow}
          title={<span id={`perche-conviene-${formula}`}>{title}</span>}
          className="lg:col-span-5"
        />
        <Accordion
          defaultValue={defaultOpen}
          className="lg:col-span-7 lg:max-w-[640px] lg:justify-self-end"
        >
          {benefits.map((benefit) => (
            // TODO(copy): rows without a body are disabled so they can't
            // "open" onto nothing. Base UI uses native `disabled` (no aria-disabled
            // opacity-50 from the trigger), so the row keeps the Figma look.
            <AccordionItem
              key={benefit.title}
              value={benefit.title}
              disabled={!benefit.body}
            >
              <AccordionTrigger
                icon={benefit.icon}
                className="data-disabled:cursor-default"
              >
                {benefit.title}
              </AccordionTrigger>
              {benefit.body ? (
                <AccordionContent>{benefit.body}</AccordionContent>
              ) : null}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
