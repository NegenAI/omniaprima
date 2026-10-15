import { cn } from "@workspace/ui/lib/utils"

import styles from "./offer-flag.module.css"

/** Animated red dot (Figma "Component 1", 40×40). */
export function PulseDot({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      overflow="visible"
      className={cn("block shrink-0 text-offer", className)}
    >
      <circle
        cx="20"
        cy="20"
        r="12"
        fill="currentColor"
        className={cn(styles.halo, styles.haloInner)}
      />
      <circle
        cx="20"
        cy="20"
        r="12"
        fill="currentColor"
        className={styles.halo}
      />
      <circle cx="20" cy="20" r="4" fill="currentColor" />
    </svg>
  )
}

/** "OFFERTA" pill shown on top of a vehicle photo (Figma 87:4069). */
export function OfferFlag({
  className,
  label = "Offerta",
}: {
  className?: string
  label?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-9 items-center rounded-card border border-navy-200 bg-ghiaccio pr-[13px] pl-px",
        className
      )}
    >
      <PulseDot />
      <span className="text-caption font-medium tracking-[0.05em] text-navy uppercase">
        {label}
      </span>
    </span>
  )
}
