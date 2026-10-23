import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/logo"
import { footerLinks, type SiteContact, type SiteSocial } from "@/lib/site"

export function SiteFooter({
  contact,
  socials,
}: {
  /** Business details from the site settings. */
  contact: SiteContact
  socials: SiteSocial[]
}) {
  return (
    <footer className="bg-secondary pt-[30px] pb-[34px] text-foreground shadow-footer md:pt-ds-7 md:pb-ds-6">
      <div className="container grid gap-ds-5 md:grid-cols-[1fr_auto] md:gap-ds-7">
        <div className="flex flex-col gap-ds-5">
          <Link href="/" aria-label="Omnia Prima, homepage">
            <Logo className="w-[242px]" />
          </Link>
          <address className="flex flex-col gap-2 text-base leading-5.5 not-italic">
            <a href={contact.phone.href} className="hover:underline">
              Tel. + {contact.phone.label}
            </a>
            <a href={contact.footerEmail.href} className="hover:underline">
              {contact.footerEmail.label}
            </a>
            {contact.locations.map((location) => (
              <p key={location.town}>
                <strong className="font-bold">{location.town}</strong>,{" "}
                {location.street}
              </p>
            ))}
            <p className="whitespace-pre-wrap">
              <strong className="text-[15px] font-bold">Orari</strong>{" "}
              {contact.hours}
            </p>
            <ul className="flex items-center gap-5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="block"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      // 2x intrinsic attrs (integers) + exact CSS size: fractional
                      // attrs trigger a false next/image aspect-ratio warning.
                      width={social.width * 2}
                      height={48}
                      style={{ width: social.width, height: 24 }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <nav
          aria-label="Footer"
          className="flex w-[200px] flex-col gap-2 leading-5.5"
        >
          <Link href="/" className="text-[15px] font-bold">
            Homepage
          </Link>
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-body hover:underline"
            >
              {link.label}
            </Link>
          ))}
          {/* TODO: policy pages */}
          <span className="text-[15px] font-light italic">Cookie Policy</span>
          <span className="text-[15px] font-light italic">Privacy Policy</span>
        </nav>
      </div>
    </footer>
  )
}
