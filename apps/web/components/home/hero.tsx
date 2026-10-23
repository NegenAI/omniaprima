import { getImageProps } from "next/image"

// Office photos (no fade baked in, unlike the earlier designer exports):
// - mobile: 1167×1785 portrait
// - desktop: 2000×1125, 16:9 landscape
// The ghiaccio fade at the bottom is drawn in CSS instead, so the copy stays
// legible and the image blends into the next section.
// Mobile: the next section overlaps the image's last 16px (both are ghiaccio),
// so the hero occupies 544px and the copy sits flush at the bottom.
// Desktop: 16:9 up to 860px tall, then full width and cropped. `w-full` keeps
// aspect-ratio + max-height from shrinking the section's width; the crop is
// anchored at 30% from the top so the consultant's head stays in frame.
const alt = "Un consulente Omnia Prima al lavoro alla sua scrivania"

export function Hero() {
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    alt,
    src: "/images/home/hero-office-desktop.webp",
    width: 2000,
    height: 1125,
    sizes: "100vw",
    priority: true,
  })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    alt,
    src: "/images/home/hero-office-mobile.webp",
    width: 1167,
    height: 1785,
    sizes: "100vw",
    priority: true,
  })

  return (
    <section className="relative isolate flex h-[544px] flex-col justify-end overflow-hidden md:h-auto md:min-h-[560px] md:pt-[40vw] md:pb-ds-7 lg:aspect-[16/9] lg:max-h-[860px] lg:w-full lg:pt-0">
      <picture className="absolute inset-x-0 top-0 -z-10 h-[560px] md:inset-y-0 md:h-auto">
        <source media="(min-width: 768px)" srcSet={desktop} />
        <source srcSet={mobile} />
        <img
          {...rest}
          alt={alt}
          className="size-full object-cover md:object-bottom lg:object-[center_30%]"
        />
      </picture>
      {/* Bottom fade to ghiaccio, replacing the one the old exports had baked in */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-linear-to-t from-ghiaccio via-ghiaccio/85 via-35% to-ghiaccio/0 to-65% md:inset-y-0 md:h-auto md:via-ghiaccio/0 md:via-20% md:to-ghiaccio/0"
      />
      {/* Desktop only (not in Figma): keeps the copy legible over the car */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-linear-to-r from-ghiaccio/90 via-ghiaccio/45 via-35% to-ghiaccio/0 to-60% md:block"
      />
      <div className="container">
        <div className="flex max-w-[346px] flex-col gap-ds-4 px-1 md:max-w-[560px] md:px-0">
          <h1 className="text-foreground">
            La tua auto.
            <br />
            Ogni esigenza.
          </h1>
          <p className="text-body text-muted-foreground">
            Noleggio a breve o lungo termine e vendita di veicoli selezionati.
            Zero pensieri, servizio su misura e prezzi trasparenti.
          </p>
        </div>
      </div>
    </section>
  )
}
