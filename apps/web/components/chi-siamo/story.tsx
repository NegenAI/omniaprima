import Image from "next/image"
import Link from "next/link"

import { Section } from "@/components/layout/section"
import { GoogleRating } from "@/components/google-rating"
import { SectionHeading } from "@/components/section-heading"
import type { SiteSettings } from "@/lib/site"
import { Button } from "@workspace/ui/components/button"

// Mobile offsets are measured from the Figma frame (its first 5px sit under the
// header and its background runs 25px past the content box).
export function Story({
  googleReviews,
}: {
  /** Rating badge on the photo; hidden until it is set in the admin. */
  googleReviews?: SiteSettings["googleReviews"]
}) {
  return (
    <Section
      className="pt-[43px] pb-[73px]"
      containerClassName="grid gap-ds-5 lg:grid-cols-2 lg:items-center lg:gap-x-ds-7"
    >
      <div className="flex flex-col gap-ds-5">
        <SectionHeading
          as="h1"
          eyebrow="La storia"
          title="Un progetto nato dalla passione per la mobilità"
          className="max-w-[346px] md:max-w-none"
        />
        <div className="flex flex-col gap-5.5 text-body text-muted-foreground">
          <p>
            Fondata nel 2009, la nostra azienda è cresciuta puntando su un
            principio semplice: mettere il cliente al centro. Da un piccolo
            parco veicoli iniziale abbiamo costruito una flotta di oltre 500
            mezzi.
          </p>
          <p>
            Oggi lavoriamo con privati, professionisti e flotte aziendali,
            offrendo un servizio completo che va dal noleggio giornaliero fino
            all&apos;acquisto di un&apos;auto nuova o usata garantita.
          </p>
        </div>
      </div>

      {/* Photo (331.9×226) with the rating badge overhanging its bottom-right corner */}
      <div className="relative pr-[18px] pb-[22px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div className="relative aspect-[332/226] overflow-hidden rounded-image">
          {/* Designer's high-res export, already cropped to this frame */}
          <Image
            src="/images/chi-siamo/storia-team.webp"
            alt="Il team di Omnia Prima in sede"
            fill
            sizes="(min-width: 1024px) 650px, 100vw"
            className="object-cover"
          />
        </div>
        {googleReviews && (
          <GoogleRating
            {...googleReviews}
            className="absolute right-0 bottom-0"
          />
        )}
      </div>

      <Button
        size="lg"
        className="mt-2 w-full lg:mt-0 lg:w-fit lg:self-start"
        render={<Link href="/#proposte" />}
        nativeButton={false}
      >
        Scopri le proposte →
      </Button>
    </Section>
  )
}
