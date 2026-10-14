import Image from "next/image"

import type { Formula, VehicleDetails } from "@/lib/vehicles"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Splits the card price ("359 €/mese", "14.900 €") into the amount, shown
 * extra-bold with a bold "€", and the period ("/mese"), shown aside.
 */
function splitPrice(price: string) {
  const match = /^\s*([\d.,]+)\s*€\s*(\/.+)?$/.exec(price)
  if (!match) return { amount: price, currency: "", period: undefined }
  return { amount: match[1], currency: "€", period: match[2]?.trim() }
}

const label = "text-sm leading-4 text-muted-foreground uppercase"
const box = "rounded-[10px] bg-ghiaccio"

/**
 * Scheda auto price card (Figma "Frame 447", 87:9636 / 87:8875): white card
 * (px 10, py 15) with the canone/prezzo box, the "ANTICIPO" pill and the
 * "DURATA" / "PERCORRENZA" boxes, 16px apart.
 */
export function PriceCard({
  formula,
  price,
  priceNote,
  details,
  className,
}: {
  formula: Formula
  /** Card price, e.g. "359 €/mese". */
  price: string
  /** Grey line under the price, e.g. "Iva esclusa". */
  priceNote?: string
  details: Pick<VehicleDetails, "advance" | "duration" | "mileage">
  className?: string
}) {
  const sale = formula === "vendita"
  const { amount, currency, period } = splitPrice(price)

  return (
    <section
      aria-label={sale ? "Prezzo" : "Canone"}
      className={cn(
        "flex flex-col gap-4 rounded-card bg-white px-2.5 py-[15px] shadow-[-2px_4px_5px_rgb(86_101_116/0.1)]",
        className
      )}
    >
      {/* Frame 445: 132px tall, content inset 15/16 */}
      <div
        className={cn(
          "flex h-[132px] flex-col gap-3 px-[15px] pt-4",
          // Vendita stacks 104px of content (gap 4) in the same 132px box.
          sale ? "pb-3" : "pb-4",
          box
        )}
      >
        <div className="flex items-center gap-2.5">
          <Image
            src={sale ? "/icons/scheda/prezzo.svg" : "/icons/scheda/canone.svg"}
            alt=""
            width={16}
            height={16}
          />
          <p className="text-body text-muted-foreground uppercase">
            {sale ? "Prezzo" : "Canone"}
          </p>
        </div>
        <div className={cn("flex flex-col", sale && "gap-1")}>
          <p className="flex items-end gap-[11px] text-navy">
            <span
              className={cn(
                "text-[36px] leading-[44px] font-extrabold",
                period && "min-w-[97px]"
              )}
            >
              {amount}
              {currency && <span className="font-bold">{currency}</span>}
            </span>
            {period && (
              <span className="mb-[3px] text-[20px] leading-[22px]">
                {period}
              </span>
            )}
          </p>
          {priceNote && (
            <p className="text-body text-muted-foreground">{priceNote}</p>
          )}
        </div>
      </div>

      {/* Frame 433: anticipo pill, label and value inset 22.5px */}
      <div className="flex h-9 items-center justify-between rounded-[20px] bg-ghiaccio px-[22.5px]">
        <div className="flex items-center gap-2.5">
          <Image
            src="/icons/scheda/anticipo.svg"
            alt=""
            width={16}
            height={16}
          />
          <p className={label}>Anticipo</p>
        </div>
        <p className="text-base leading-5.5 font-bold text-navy">
          {details.advance}
        </p>
      </div>

      {/* Frame 442: two 94px boxes, 12px apart */}
      <dl className="grid grid-cols-2 gap-3">
        {[
          {
            term: "Durata",
            icon: "/icons/scheda/durata.svg",
            lines: details.duration,
          },
          {
            term: "Percorrenza",
            icon: "/icons/scheda/percorrenza.svg",
            lines: details.mileage,
          },
        ].map((item) => (
          <div
            key={item.term}
            className={cn("flex h-[94px] flex-col justify-center px-3", box)}
          >
            <div className="flex flex-col gap-3">
              <dt className="flex items-center gap-1">
                <Image src={item.icon} alt="" width={16} height={16} />
                <span className={label}>{item.term}</span>
              </dt>
              <dd className="text-[20px] leading-[22px] text-navy">
                {item.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  )
}
