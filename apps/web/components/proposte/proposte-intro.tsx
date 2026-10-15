import { cn } from "@workspace/ui/lib/utils"
import { Section } from "@/components/layout/section"

/**
 * Opening of the Proposte page (Figma 85:831 → Frame 512, 87:10214): H1
 * "Trova la formula giusta per te" + intro, on the ice background.
 * Mobile offsets: the title sits 35px under the header (Figma 95 + 48 - 108)
 * and the formula toggle starts 48px below the intro (Frame 506 at 417).
 */
export function ProposteIntro({ className }: { className?: string }) {
  return (
    <Section className={cn("pt-[35px] pb-12 md:pb-12", className)}>
      <div className="flex flex-col gap-ds-4 md:max-w-[720px]">
        <h1 className="text-foreground">Trova la formula giusta per te</h1>
        <p className="text-body text-muted-foreground">
          Noleggio a breve o lungo termine e vendita di veicoli selezionati.
          Zero pensieri, servizio su misura e prezzi trasparenti.
        </p>
      </div>
    </Section>
  )
}
