import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-normal whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover aria-expanded:bg-secondary-hover",
        outline:
          "border-border bg-background text-foreground hover:bg-secondary aria-expanded:bg-secondary dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        rental:
          "bg-rental text-rental-foreground hover:bg-rental-hover aria-expanded:bg-rental-hover",
        sales:
          "bg-sales text-sales-foreground hover:bg-sales-hover aria-expanded:bg-sales-hover",
        success:
          "bg-success text-success-foreground hover:bg-success/90 aria-expanded:bg-success/90",
        black:
          "border-primary bg-black text-primary-foreground hover:bg-primary aria-expanded:bg-primary",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      // CTA sizes: pill on mobile, rounded rectangle from md (Figma "Bottone Mobile" / "Bottone Desktop L·M·S").
      // Paddings are 1px under the Figma values to absorb the base 1px border.
      size: {
        default:
          "gap-2 rounded-full px-[15px] py-[9px] text-base leading-5.5 md:rounded-lg md:px-[23px] md:py-[11px] md:text-sm md:leading-[normal] md:font-semibold",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "gap-1.5 rounded-full px-[15px] py-[7px] text-xs leading-[normal] md:rounded-md md:font-semibold [&_svg:not([class*='size-'])]:size-3.5",
        lg: "gap-2 rounded-full p-[15px] text-base leading-5.5 md:rounded-lg md:px-[31px] md:leading-[normal] md:font-semibold [&_svg:not([class*='size-'])]:size-5",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        // Compact pill used inside cards at every breakpoint (Figma "Bottone Mobile S", bold label)
        "pill-sm":
          "gap-1.5 rounded-full px-[15px] py-[9px] text-caption font-bold tracking-[0.05em] [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
