import { getImageProps } from "next/image"

// Designer exports with the ghiaccio fade already baked in:
// - mobile: 390×560 @3x (Figma hero 87:10192)
// - desktop: 16:9 landscape, fading to ghiaccio at the bottom
// Mobile: the next section overlaps the image's last 16px (both are ghiaccio),
// so the hero occupies 544px and the copy sits flush at the bottom.
const alt = "Un consulente Omnia Prima accanto a un'auto"

export function Hero() {
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    alt,
    src: "/images/home/hero-desktop.webp",
    width: 3840,
    height: 2160,
    sizes: "100vw",
    priority: true,
  })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    alt,
    src: "/images/home/hero-mobile.webp",
    width: 1170,
    height: 1680,
    sizes: "100vw",
    priority: true,
  })

  return (
    <section className="relative isolate flex h-[544px] flex-col justify-end overflow-hidden md:h-auto md:min-h-[560px] md:pt-[40vw] md:pb-ds-7 lg:aspect-[16/9] lg:max-h-[860px] lg:pt-0">
      <picture className="absolute inset-x-0 top-0 -z-10 h-[560px] md:inset-y-0 md:h-auto">
        <source media="(min-width: 768px)" srcSet={desktop} />
        <source srcSet={mobile} />
        <img
          {...rest}
          alt={alt}
          className="size-full object-cover md:object-bottom"
        />
      </picture>
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
