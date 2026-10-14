"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { Logo } from "@/components/logo"
import { navLinks } from "@/lib/site"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

const iconButton =
  "flex size-10 items-center justify-center rounded-lg p-2 hover:bg-navy-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href)
}

function HomeLink() {
  return (
    <Link href="/" aria-label="Omnia Prima, homepage" className="pl-0.5">
      <Logo className="w-[237px]" />
    </Link>
  )
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  // The mobile menu does not exist from xl up: close it if the viewport grows.
  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 80rem)")
    const onChange = () => desktop.matches && setOpen(false)
    desktop.addEventListener("change", onChange)
    return () => desktop.removeEventListener("change", onChange)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-secondary pt-[env(safe-area-inset-top)] shadow-header">
      <div className="container flex h-[78px] items-center justify-between md:h-20">
        <HomeLink />

        <nav aria-label="Principale" className="hidden xl:block">
          <ul className="flex items-center gap-ds-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={
                    isActive(pathname, link.href) ? "page" : undefined
                  }
                  className="text-body whitespace-nowrap text-foreground underline-offset-4 hover:underline aria-[current=page]:font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Apri il menu"
            className={`${iconButton} -mr-[7px] xl:hidden`}
          >
            <Image src="/icons/menu.svg" alt="" width={24} height={24} />
          </SheetTrigger>
          {/* Figma "Nav Bar aperto" (87:6733): full-width panel that covers the header. */}
          <SheetContent
            side="top"
            showCloseButton={false}
            // Figma shows only the panel: keep the backdrop (outside click closes) but invisible.
            overlayClassName="bg-transparent supports-backdrop-filter:backdrop-blur-none"
            className="gap-0 border-0 bg-secondary pt-[env(safe-area-inset-top)] text-base text-foreground shadow-[0_4px_2px_rgb(86_101_116/0.1)] xl:hidden"
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="relative z-10 bg-secondary shadow-header">
              <div className="container flex h-[78px] items-center justify-between md:h-20">
                <HomeLink />
                <SheetClose
                  aria-label="Chiudi il menu"
                  className={`${iconButton} -mr-[6px]`}
                >
                  <Image src="/icons/close.svg" alt="" width={24} height={24} />
                </SheetClose>
              </div>
            </div>
            <nav
              aria-label="Principale"
              className="max-h-[calc(100dvh-78px)] overflow-y-auto"
            >
              <ul className="container flex flex-col gap-5 pt-7 pb-5">
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    className="relative -left-px border-navy-200 not-first:border-t not-first:pt-[21px]"
                  >
                    <SheetClose
                      render={<Link href={link.href} />}
                      nativeButton={false}
                      aria-current={
                        isActive(pathname, link.href) ? "page" : undefined
                      }
                      className="-my-2.5 block h-[45.32px] py-2.5 text-h4 text-black focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      {link.label}
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
