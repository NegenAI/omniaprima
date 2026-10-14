import Image from "next/image"

// Mobile: Figma hero image is 560px tall; the next section overlaps its last
// 16px (both are ghiaccio), so the hero occupies 544px and the copy sits flush
// at the bottom.
export function Hero() {
  return (
    <section className="relative isolate flex h-[544px] flex-col justify-end overflow-hidden md:h-[640px] md:justify-center">
      <div className="absolute inset-x-0 top-0 -z-20 h-[560px] md:inset-y-0 md:right-0 md:left-auto md:h-auto md:w-3/5">
        <Image
          src="/images/home/hero.png"
          alt="Un consulente Omnia Prima accanto a un'auto"
          fill
          priority
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover md:object-[center_20%]"
        />
      </div>
      {/* Figma: ghiaccio fade, transparent → 50% → solid (vertical on mobile, from the left on desktop) */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-linear-to-b from-ghiaccio/0 from-[15.388%] via-ghiaccio/50 via-[39.427%] to-ghiaccio to-[77.408%] md:inset-y-0 md:h-auto md:bg-linear-to-l md:from-[10%] md:via-[30%] md:to-[55%]"
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
