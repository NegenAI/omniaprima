"use client"

import Image from "next/image"
import Link from "next/link"
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

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 bg-secondary pt-[env(safe-area-inset-top)] shadow-header">
      <div className="container flex h-[78px] items-center justify-between md:h-20">
        <Link href="/" aria-label="Omnia Prima, homepage" className="pl-0.5">
          <Logo className="w-[237px]" />
        </Link>

        <nav aria-label="Principale" className="hidden lg:block">
          <ul className="flex items-center gap-ds-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-body text-foreground underline-offset-4 hover:underline"
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
            className="flex items-center justify-center rounded-lg p-2 hover:bg-navy-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:hidden"
          >
            <Image src="/icons/menu.svg" alt="" width={24} height={24} />
          </SheetTrigger>
          <SheetContent side="right" className="bg-secondary p-ds-5 pt-ds-8">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Principale">
              <ul className="flex flex-col gap-ds-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <SheetClose
                      render={<Link href={link.href} />}
                      nativeButton={false}
                      className="text-h4 text-foreground"
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
