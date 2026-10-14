import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "@workspace/ui/globals.css"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: { default: "Omnia Prima", template: "%s · Omnia Prima" },
  description: "Noleggio e vendita auto a Teramo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      suppressHydrationWarning
      className={cn(
        "scroll-pt-[78px] antialiased md:scroll-pt-20",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        {/* The Figma design system is light-only */}
        <ThemeProvider defaultTheme="light" enableSystem={false}>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
