import type { ComponentProps, ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

const tones = {
  ice: "bg-secondary",
  navy: "bg-primary",
  "navy-100": "bg-navy-100",
  none: "",
} as const

/** Two columns from lg (e.g. contact info + form), stacked below. */
export const splitLayout =
  "grid gap-ds-5 lg:grid-cols-2 lg:items-start lg:gap-ds-7"

type SectionProps = Omit<ComponentProps<"section">, "children"> & {
  /** Background: ghiaccio (default), navy, navy-100 or none. */
  tone?: keyof typeof tones
  /** "split" lays the children out in two columns from lg. */
  layout?: "stack" | "split"
  /** Extra classes for the inner container (gaps, grid tweaks). */
  containerClassName?: string
  children: ReactNode
}

/**
 * Page section: background tone, the default section rhythm (48px mobile,
 * 96px from md) and the page container. Pass `className` to override the
 * padding with Figma-measured offsets.
 */
export function Section({
  tone = "ice",
  layout = "stack",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(tones[tone], "py-12 md:py-ds-8", className)}
      {...props}
    >
      <div
        className={cn(
          "container",
          layout === "split" && splitLayout,
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}
