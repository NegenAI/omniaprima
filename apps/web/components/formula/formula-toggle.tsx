"use client"

import { usePathname, useRouter } from "next/navigation"

import { formulaLabels, formulas, type Formula } from "@/lib/vehicles"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { cn } from "@workspace/ui/lib/utils"

export type FormulaToggleProps = {
  value: Formula
  /**
   * Builds the URL for a formula. Defaults to `?formula=<value>` on the
   * current path (page 1, `#veicoli` so the list stays in view).
   */
  getHref?: (formula: Formula) => string
  className?: string
}

/**
 * Formula switch of the "Proposte" listing (Figma 85:831 → Frame 388,
 * I87:8084;87:7259): white 20px card, three 50px pills stacked with 8px gaps,
 * 20px vertical / 8px horizontal padding. Same pattern as the homepage
 * "Le nostre proposte" toggle; here the choice is kept in the URL so the
 * server-rendered list and the pagination follow it.
 */
export function FormulaToggle({
  value,
  getHref,
  className,
}: FormulaToggleProps) {
  const router = useRouter()
  const pathname = usePathname()

  const hrefFor =
    getHref ?? ((formula: Formula) => `${pathname}?formula=${formula}#veicoli`)

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
          // Keep one formula selected at all times
          const formula = next[0] as Formula | undefined
          if (formula && formula !== value) {
            router.push(hrefFor(formula), { scroll: false })
          }
        }}
        size="pill"
        spacing={2}
        className="w-full flex-col md:w-auto md:flex-row"
      >
        {formulas.map((formula) => (
          <ToggleGroupItem
            key={formula}
            value={formula}
            variant={formula === "vendita" ? "sales" : "rental"}
            className="w-full md:w-auto md:px-ds-5"
          >
            {formulaLabels[formula]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
