import { formulaLabels, type Formula } from "@/lib/vehicles"
import { cn } from "@workspace/ui/lib/utils"

/** Formula chip colours: amber for rentals, azzurro for sales (Figma 87:9633 / 87:8872). */
const formulaBadgeClass: Record<Formula, string> = {
  "lungo-termine": "bg-ambra text-navy",
  "breve-termine": "bg-ambra text-navy",
  vendita: "bg-azzurro text-ghiaccio",
}

/** Short chip labels ("LUNGO TERMINE", "VENDITA"). */
const formulaBadgeLabel: Record<Formula, string> = {
  "lungo-termine": "Lungo termine",
  "breve-termine": "Breve termine",
  vendita: "Vendita",
}

/**
 * Scheda auto heading (Figma "Frame 429"): H1 in the H2 style, subtitle in
 * the H4 style and the formula chip, 12px apart.
 */
export function SchedaTitle({
  name,
  subtitle,
  formula,
  className,
}: {
  name: string
  subtitle: string
  formula: Formula
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <h1 className="text-h2 text-navy">{name}</h1>
      <p className="text-h4 text-navy">{subtitle}</p>
      <p
        className={cn(
          "rounded-[20px] px-2.5 py-[5px] text-sm leading-4 uppercase",
          formulaBadgeClass[formula]
        )}
      >
        <span className="sr-only">{formulaLabels[formula]}</span>
        <span aria-hidden="true">{formulaBadgeLabel[formula]}</span>
      </p>
    </div>
  )
}
