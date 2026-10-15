import type { ReactNode } from "react"
import Image from "next/image"

import { Section } from "@/components/layout/section"
import type { Formula } from "@/lib/vehicles"
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
  /** Expanded copy shown when the row opens. */
  body: string
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
  // TODO(copy-approval): Figma has no open states for Breve Termine and
  // Vendita. These bodies are DRAFTS written from the page's own claims (hero
  // copy + row titles) so the rows open; replace with client-approved copy.
  "breve-termine": {
    eyebrow: "Breve termine",
    title: "Perché conviene?",
    benefits: [
      {
        title: "Consegna rapida",
        icon: icons.banknoteBlack,
        body: "Ritiri il veicolo in tempi brevi, già pronto per partire: preparazione, controlli e documenti sono a carico nostro.",
      },
      {
        title: "Prenotazione last minute",
        icon: icons.arrows,
        body: "Ti serve un'auto all'ultimo momento? Contattaci: verifichiamo subito la disponibilità e ti rispondiamo in tempi brevi.",
      },
      {
        title: "Restituzione flessibile",
        icon: icons.carShield,
        body: "Concordiamo insieme data e modalità di riconsegna, così il noleggio si adatta ai tuoi programmi.",
      },
      {
        title: "KM Inclusi",
        icon: icons.carCycle,
        body: "I chilometri inclusi sono indicati in ogni proposta: sai fin da subito quanta strada puoi fare, senza sorprese.",
      },
      {
        title: "Nessun vincolo contrattuale",
        icon: icons.pencilDoc,
        body: "Noleggi per il tempo che ti serve, da pochi giorni a qualche settimana, senza impegni a lungo periodo.",
      },
    ],
  },
  vendita: {
    eyebrow: "Vendita",
    title: (
      <>
        Perché conviene <br className="md:hidden" />
        con Omnia Prima?
      </>
    ),
    benefits: [
      {
        title: "Confronto tra prezzi",
        icon: icons.banknoteBlack,
        body: "Ti aiutiamo a confrontare le proposte disponibili con prezzi chiari e trasparenti, così scegli con tutte le informazioni.",
      },
      {
        title: "Basato sulle tue esigenze",
        icon: icons.arrows,
        body: "Partiamo da come usi l'auto ogni giorno per proporti i veicoli nuovi o usati più adatti a te.",
      },
      {
        title: "Consulenza dedicata",
        icon: icons.carShield,
        body: "Un consulente ti segue in ogni fase, dalla scelta del veicolo al finanziamento su misura.",
      },
      {
        title: "Assistenza post-vendita",
        icon: icons.carCycle,
        body: "Anche dopo l'acquisto restiamo il tuo punto di riferimento per qualsiasi necessità legata al veicolo.",
      },
      {
        title: "Consegna a domicilio",
        icon: icons.pencilDoc,
        body: "Possiamo consegnare la tua nuova auto direttamente all'indirizzo che preferisci.",
      },
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
    <Section
      aria-labelledby={`perche-conviene-${formula}`}
      className={cn("pt-ds-7 pb-16", className)}
      containerClassName="grid gap-ds-5 lg:grid-cols-12 lg:items-start lg:gap-ds-7"
    >
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
          <AccordionItem key={benefit.title} value={benefit.title}>
            <AccordionTrigger icon={benefit.icon}>
              {benefit.title}
            </AccordionTrigger>
            <AccordionContent>{benefit.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
