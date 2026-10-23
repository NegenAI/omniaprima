import Image from "next/image"

// Omnia Prima brand in the admin (payload.config.ts → admin.components.graphics).
// The admin is light-only, so the navy versions of the logo are used.

/** Login and create-first-user pages. */
export function Logo() {
  return (
    <Image
      src="/brand/logo-horizontal-dark.svg"
      alt="Omnia Prima"
      width={522}
      height={69}
      priority
      style={{ width: 280, height: "auto" }}
    />
  )
}

/** Navigation and breadcrumb mark. */
export function Icon() {
  return (
    <Image
      src="/brand/logo-stacked-dark-mark.svg"
      alt="Omnia Prima"
      width={58}
      height={58}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  )
}
