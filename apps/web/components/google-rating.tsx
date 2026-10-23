import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

/** Figma rating badge (202×56): score + Google Reviews logo, links to the reviews. */
export function GoogleRating({
  rating,
  href,
  className,
}: {
  /** Score as shown, e.g. "4.9/5" (site settings). */
  rating: string
  href: string
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Valutazione ${rating} su Google Reviews`}
      className={cn(
        "relative block h-14 w-[202px] rounded-image border border-navy-200 bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
    >
      <span className="absolute top-[5px] left-3 text-[36px] leading-11 font-extrabold text-foreground">
        {rating}
      </span>
      <Image
        src="/brand/google-reviews.png"
        alt=""
        width={73}
        height={41}
        className="absolute top-[5px] left-[117px]"
      />
    </a>
  )
}
