// Business details and navigation, as shown in the Figma homepage.

export const contact = {
  phone: { label: "0861 415616", href: "tel:+390861415616" },
  // The contact section and the footer show different addresses in Figma.
  email: {
    label: "omniaprimasrl@gmail.com",
    href: "mailto:omniaprimasrl@gmail.com",
  },
  footerEmail: {
    label: "info@omniaprima.it",
    href: "mailto:info@omniaprima.it",
  },
  // TODO: confirm the WhatsApp number (Figma only shows the landline).
  whatsapp: "https://wa.me/390861415616",
  locations: [
    { town: "San Nicolò a Tordino", street: "Via Nazionale" },
    { town: "Castelnuovo Vomano", street: "Via Nazionale 1" },
  ],
  hours: "8.30 - 12.30 |  15.00 - 19.00",
}

// TODO: real profile URLs (not in Figma).
export const socials = [
  { label: "Facebook", href: "#", icon: "/icons/facebook.svg", width: 24 },
  { label: "Instagram", href: "#", icon: "/icons/instagram.svg", width: 24 },
  {
    label: "WhatsApp",
    href: contact.whatsapp,
    icon: "/icons/whatsapp-social.svg",
    width: 23.89,
  },
]

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

// TODO: confirm the Google Business profile link and whether the rating should be live.
export const googleReviews = {
  rating: "4.9/5",
  href: "https://www.google.com/search?q=Omnia+Prima+srl+-+VENDITA+E+NOLEGGIO+Recensioni",
}
