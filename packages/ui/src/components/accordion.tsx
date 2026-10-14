import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

/*
 * Accordion: Figma "Sito web_Omnia Prima".
 *
 * Two styles, both a white card (radius 20) of 68px rows
 * (16px padding, 36px icon slot, 12px gaps, 16/24 medium title, 24px chevron):
 *  - "default"   → component set "2 Accordion" (61:1772), used in
 *                  "Perché conviene?" (Lungo Termine 9:5): rows sit flush and
 *                  every title has a 1px #D9D9D9 bottom divider.
 *  - "separated" → component set "Accordion" (42:587), used in "Servizi
 *                  inclusi" on navy (9:5, 87:9624): rows are separated by a 1px
 *                  gap (Figma renders it as #D9D9D9 at 50% over the navy);
 *                  the last closed row has no divider.
 * Open state: chevron rotates (angle-down → angle-up), divider under the
 * title, then the body (16px padding, 14/20 regular).
 */

/* Figma colour styles not in the token set: "Dark Gray" text, "Lined Gray" divider. */
const DARK_GRAY = "text-[#181818]"

const accordionVariants = cva(
  "group/accordion flex w-full flex-col overflow-hidden rounded-card",
  {
    variants: {
      variant: {
        default: "bg-white",
        // 1px gap: Figma's half-pixel #D9D9D9 divider blended over the surface behind (≈ #737D88 on navy).
        separated: "gap-px bg-[#d9d9d9]/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Accordion({
  className,
  variant = "default",
  ...props
}: AccordionPrimitive.Root.Props & VariantProps<typeof accordionVariants>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={cn(accordionVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("group/accordion-item bg-white", className)}
      {...props}
    />
  )
}

/* Figma "Icon:angle-down" (Unicons), 24×24, rotated 180° for "Icon:angle-up". */
function AngleDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M17 9.17C16.8126 8.98375 16.5592 8.87921 16.295 8.87921C16.0308 8.87921 15.7774 8.98375 15.59 9.17L12 12.71L8.46 9.17C8.27264 8.98375 8.01919 8.87921 7.755 8.87921C7.49081 8.87921 7.23736 8.98375 7.05 9.17C6.95627 9.26296 6.88188 9.37356 6.83111 9.49542C6.78034 9.61728 6.7542 9.74799 6.7542 9.88C6.7542 10.012 6.78034 10.1427 6.83111 10.2646C6.88188 10.3864 6.95627 10.497 7.05 10.59L11.29 14.83C11.383 14.9237 11.4936 14.9981 11.6154 15.0489C11.7373 15.0997 11.868 15.1258 12 15.1258C12.132 15.1258 12.2627 15.0997 12.3846 15.0489C12.5064 14.9981 12.617 14.9237 12.71 14.83L17 10.59C17.0937 10.497 17.1681 10.3864 17.2189 10.2646C17.2697 10.1427 17.2958 10.012 17.2958 9.88C17.2958 9.74799 17.2697 9.61728 17.2189 9.49542C17.1681 9.37356 17.0937 9.26296 17 9.17Z"
        fill="currentColor"
      />
    </svg>
  )
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}: AccordionPrimitive.Trigger.Props & {
  /** Optional 36×36 leading icon (e.g. a next/image of the Figma row icon). */
  icon?: React.ReactNode
}) {
  return (
    <AccordionPrimitive.Header className="m-0 flex text-base">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex min-h-17 flex-1 cursor-pointer items-center gap-3 p-4 text-left text-base leading-6 font-medium outline-none",
          DARK_GRAY,
          // "Lined Gray" divider under the title. Figma centres a 1px #D9D9D9 stroke on the
          // row edge and the next layer covers half of it: it renders as 1px at 50%, inside the 68px row.
          "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[#d9d9d9]/50",
          // "separated": the last closed row has no divider (Figma showDivider=false).
          "group-data-[variant=separated]/accordion:group-last/accordion-item:not-data-panel-open:after:hidden",
          // "separated" open state: the title/body divider (42:596) has no layer covering it, so the
          // full 1px #D9D9D9 stroke shows (closed rows keep the 50% blend described above).
          "group-data-[variant=separated]/accordion:data-panel-open:after:bg-[#d9d9d9]",
          "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          className
        )}
        {...props}
      >
        {icon ? (
          <span
            data-slot="accordion-trigger-icon"
            className="flex size-9 shrink-0 items-center justify-center [&>img]:size-9 [&>svg]:size-9"
          >
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1">{children}</span>
        <AngleDownIcon
          data-slot="accordion-trigger-chevron"
          className="pointer-events-none size-6 shrink-0 transition-transform duration-200 group-data-panel-open/accordion-trigger:rotate-180 motion-reduce:transition-none"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "p-4 text-sm leading-5 font-normal [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4",
          DARK_GRAY,
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
}
