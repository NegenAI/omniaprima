import { cn } from "@workspace/ui/lib/utils"

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  align?: "left" | "center"
  tone?: "light" | "dark"
  eyebrowClassName?: string
  /** Heading level; h1 keeps the H2 type style (e.g. the Contatti page title). */
  as?: "h1" | "h2"
  className?: string
}

/** Eyebrow ("Bodyb 02") + H2 pair that opens every homepage section. */
export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  tone = "light",
  eyebrowClassName,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-ds-2",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-eyebrow uppercase",
          tone === "light" ? "text-muted-foreground" : "text-navy-100",
          eyebrowClassName
        )}
      >
        {eyebrow}
      </p>
      <Heading
        className={cn(
          Heading === "h1" && "text-h2",
          tone === "light" ? "text-foreground" : "text-ghiaccio"
        )}
      >
        {title}
      </Heading>
    </div>
  )
}
