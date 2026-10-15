"use client"

import { usePathname, useRouter } from "next/navigation"

import {
  formulaLabels,
  formulas,
  formulaTone,
  type Formula,
} from "@/lib/vehicles"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Formula switch (Figma "Le nostre proposte" 113:2654 and Proposte 85:831 →
 * Frame 388): white 20px card, three 50px pills stacked with 8px gaps on
 * mobile, 20px vertical / 8px horizontal padding; one row from md.
 * Controlled: exactly one formula is always selected.
 */
export function FormulaToggle({
  value,
  onValueChange,
  className,
}: {
  value: Formula
  onValueChange: (formula: Formula) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex justify-center rounded-card bg-white px-2 py-5 shadow-card md:mx-auto md:w-fit md:rounded-full md:p-2",
        className
      )}
    >
      <ToggleGroup
        aria-label="Formula"
        value={[value]}
        onValueChange={(next) => {
          const formula = next[0] as Formula | undefined
          if (formula && formula !== value) onValueChange(formula)
        }}
        size="pill"
        spacing={2}
        className="w-full flex-col md:w-auto md:flex-row"
      >
        {formulas.map((formula) => (
          <ToggleGroupItem
            key={formula}
            value={formula}
            variant={formulaTone(formula)}
            className="w-full md:w-auto md:px-ds-5"
          >
            {formulaLabels[formula]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

/**
 * FormulaToggle that keeps the choice in the URL (`?formula=…#veicoli`), so
 * the server-rendered list and its pagination follow it (Proposte page).
 */
export function FormulaToggleLink({
  value,
  className,
}: {
  value: Formula
  className?: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <FormulaToggle
      value={value}
      onValueChange={(formula) =>
        router.push(`${pathname}?formula=${formula}#veicoli`, { scroll: false })
      }
      className={className}
    />
  )
}
