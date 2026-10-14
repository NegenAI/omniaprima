import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Image from "next/image"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"

/* Copy from Figma: "Perché conviene?" (2 Accordion 61:1772) and "Servizi inclusi" (Accordion 42:587). */
const convieneRows = [
  {
    title: "Nessuna spesa iniziale",
    icon: "/icons/accordion/nessuna-spesa-iniziale.svg",
    body: "Ad acquistare l'auto, pensare all'assicurazione, occuparsi della manutenzione ci pensiamo noi. Paghi solo il canone mensile. L'importo resta fisso per tutta la durata del contratto, nessuna spesa imprevista.",
  },
  {
    title: "Flessibilità",
    icon: "/icons/accordion/flessibilita.svg",
    body: "Nessun limite alle tue possibilità di scelta: potrai decidere quanta strada fare e quali servizi includere. E se cambiano le tue esigenze di mobilità potrai aggiungerne di nuovi in qualunque momento.",
  },
  {
    title: "Supporto",
    icon: "/icons/accordion/supporto.svg",
    body: "Ci assicuriamo che il veicolo sia sempre in perfette condizioni e saremo sempre presenti grazie alla nostra rete di assistenza.",
  },
  {
    title: "Gestione usato",
    icon: "/icons/accordion/gestione-usato.svg",
    body: "Se hai deciso di noleggiare un veicolo nuovo, al tuo usato ci pensiamo noi.",
  },
  {
    title: "Fine contratto",
    icon: "/icons/accordion/fine-contratto.svg",
    body: "Al termine del contratto decidi se restituire il veicolo o continuare a guidarlo con un canone vantaggioso. Altrimenti puoi sempre noleggiare un nuovo veicolo.",
  },
]

const serviziRows = [
  {
    title: "Manutenzione",
    icon: "/icons/accordion/manutenzione.svg",
    body: "Tagliandi, revisioni e interventi ordinari sono già inclusi nel canone mensile. Non dovrai preoccuparti di scadenze o costi imprevisti: ci pensiamo noi a mantenere la tua auto sempre efficiente.",
  },
  {
    title: "Incendio e furto",
    icon: "/icons/accordion/incendio-furto.svg",
    body: "La tua vettura è coperta contro danni da incendio ed eventi accidentali, oltre che contro il rischio di furto. Guida con la massima tranquillità, in ogni situazione.",
  },
  {
    title: "RCA",
    icon: "/icons/accordion/rca.svg",
    body: "La Responsabilità Civile Auto è compresa nel canone: nessun costo aggiuntivo da gestire, nessuna scadenza da ricordare. La copertura assicurativa obbligatoria è già inclusa nel tuo pacchetto.",
  },
  {
    title: "Soccorso Stradale",
    icon: "/icons/accordion/soccorso-stradale.svg",
    body: "Assistenza attiva 24 ore su 24, ovunque tu sia. In caso di guasto o imprevisto, non sei mai solo sulla strada.",
  },
]

type Row = { title: string; body: string; icon: string }

function Rows({ rows }: { rows: Row[] }) {
  return rows.map((row) => (
    <AccordionItem key={row.title} value={row.title}>
      <AccordionTrigger
        icon={<Image src={row.icon} alt="" width={36} height={36} />}
      >
        {row.title}
      </AccordionTrigger>
      <AccordionContent>{row.body}</AccordionContent>
    </AccordionItem>
  ))
}

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

/** "Perché conviene?": white card, flush rows with #D9D9D9 dividers. */
export const Default: Story = {
  render: () => (
    <div className="bg-ghiaccio px-5 py-12">
      <Accordion className="mx-auto max-w-[350px]">
        <Rows rows={convieneRows} />
      </Accordion>
    </div>
  ),
}

export const DefaultOpen: Story = {
  render: () => (
    <div className="bg-ghiaccio px-5 py-12">
      <Accordion
        className="mx-auto max-w-[350px]"
        defaultValue={["Flessibilità"]}
      >
        <Rows rows={convieneRows} />
      </Accordion>
    </div>
  ),
}

/** "Servizi inclusi" on navy: rows separated by 1px gaps showing the surface. */
export const Separated: Story = {
  render: () => (
    <div className="bg-navy px-5 py-12">
      <Accordion variant="separated" className="mx-auto max-w-[352px]">
        <Rows rows={serviziRows} />
      </Accordion>
    </div>
  ),
}

export const SeparatedOpen: Story = {
  render: () => (
    <div className="bg-navy px-5 py-12">
      <Accordion
        variant="separated"
        className="mx-auto max-w-[352px]"
        defaultValue={["Incendio e furto"]}
      >
        <Rows rows={serviziRows} />
      </Accordion>
    </div>
  ),
}

/** Without icon slot. */
export const WithoutIcon: Story = {
  render: () => (
    <div className="bg-ghiaccio px-5 py-12">
      <Accordion className="mx-auto max-w-[350px]" multiple>
        {convieneRows.map((row) => (
          <AccordionItem key={row.title} value={row.title}>
            <AccordionTrigger>{row.title}</AccordionTrigger>
            <AccordionContent>{row.body}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
}
