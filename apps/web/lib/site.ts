// Navigation is part of the code (it follows the routes); business details
// are edited in the admin (Payload global "site-settings") and mapped here.

export type SiteContact = {
  phone: { label: string; href: string }
  email: { label: string; href: string }
  footerEmail: { label: string; href: string }
  /** wa.me link of the WhatsApp number. */
  whatsapp: string
  locations: { town: string; street: string }[]
  hours: string
}

export type SiteSocial = {
  label: string
  href: string
  icon: string
  width: number
}

export type SiteSettings = {
  contact: SiteContact
  socials: SiteSocial[]
  /** Absent until the rating and its link are set in the admin. */
  googleReviews?: { rating: string; href: string }
}

/**
 * The "site-settings" global as Payload returns it (the fields the site
 * uses). Every field can be empty on a database that was never filled in.
 */
export type SiteSettingsSource = {
  phone?: string | null
  whatsapp?: string | null
  email?: string | null
  footerEmail?: string | null
  hours?: string | null
  locations?: { town: string; street: string }[] | null
  facebook?: string | null
  instagram?: string | null
  googleRating?: string | null
  googleReviewsUrl?: string | null
}

const digits = (value: string) => value.replace(/\D/g, "")

/** "0861 415616" → "tel:+390861415616"; numbers with a "+" keep their prefix. */
function telHref(phone: string) {
  return phone.trim().startsWith("+")
    ? `tel:+${digits(phone)}`
    : `tel:+39${digits(phone)}`
}

export function toSiteSettings(source: SiteSettingsSource): SiteSettings {
  const phone = source.phone ?? ""
  const email = source.email ?? ""
  const footerEmail = source.footerEmail ?? ""
  const whatsapp = `https://wa.me/${digits(source.whatsapp ?? "")}`
  return {
    contact: {
      phone: { label: phone, href: telHref(phone) },
      email: { label: email, href: `mailto:${email}` },
      footerEmail: { label: footerEmail, href: `mailto:${footerEmail}` },
      whatsapp,
      locations: source.locations ?? [],
      hours: source.hours ?? "",
    },
    // TODO(data): Facebook and Instagram profile URLs (not in Figma); the
    // icons link to "#" until they are set in the admin.
    socials: [
      {
        label: "Facebook",
        href: source.facebook || "#",
        icon: "/icons/facebook.svg",
        width: 24,
      },
      {
        label: "Instagram",
        href: source.instagram || "#",
        icon: "/icons/instagram.svg",
        width: 24,
      },
      {
        label: "WhatsApp",
        href: whatsapp,
        icon: "/icons/whatsapp-social.svg",
        width: 23.89,
      },
    ],
    googleReviews:
      source.googleRating && source.googleReviewsUrl
        ? { rating: source.googleRating, href: source.googleReviewsUrl }
        : undefined,
  }
}

export type SiteLink = { label: string; href: string }

// Header menu, as in the Figma "Nav Bar aperto" (87:6733).
export const navLinks: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Tutte le proposte", href: "/proposte" },
  { label: "Noleggio a lungo termine", href: "/noleggio-lungo-termine" },
  { label: "Noleggio a breve termine", href: "/noleggio-breve-termine" },
  { label: "Vendita", href: "/vendita" },
  { label: "Contatti", href: "/contatti" },
]

// Footer links keep the shorter footer labels from Figma.
export const footerLinks: SiteLink[] = [
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Tutte le proposte", href: "/proposte" },
  { label: "Lungo Termine", href: "/noleggio-lungo-termine" },
  { label: "Breve Termine", href: "/noleggio-breve-termine" },
  { label: "Vendita", href: "/vendita" },
  { label: "Contatti", href: "/contatti" },
]
