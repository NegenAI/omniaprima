import Link from "next/link"

import { FormulaToggleLink } from "@/components/formula/formula-toggle"
import { SectionHeading } from "@/components/section-heading"
import { VehicleCard } from "@/components/vehicle-card"
import { byFormula, formulas, type Formula, type Vehicle } from "@/lib/vehicles"
import {
  PaginationNav,
  getPaginationHref,
} from "@workspace/ui/components/pagination"
import { cn } from "@workspace/ui/lib/utils"

/** Cards per page (Figma listing pages show six cards above "< 1 2 3 >"). */
export const LISTING_PAGE_SIZE = 6

/** Anchor of the listing, used by the pagination and the formula toggle. */
export const LISTING_ID = "veicoli"

export type VehicleListingCopy = {
  eyebrow: string
  title: React.ReactNode
  description: string
}

// Copy from Figma: Lungo Termine 9:5 (54:1458), Breve Termine 85:1223
// (125:4828), Vendita 87:3489 (87:3531).
export const listingCopy: Record<Formula, VehicleListingCopy> = {
  "lungo-termine": {
    eyebrow: "Le proposte a lungo termine",
    title: "Noleggio a lungo termine",
    description:
      "Scegli tra la nostra selezione di veicoli. Canoni chiari, tutto incluso.",
  },
  "breve-termine": {
    eyebrow: "Le proposte a breve termine",
    title: "Noleggio a breve termine",
    // Figma has no final full stop here.
    description:
      "Scegli tra la nostra selezione di veicoli. Tariffe chiare, giorno per giorno",
  },
  vendita: {
    eyebrow: "Le proposte in vendita",
    title: "Veicoli in vendita",
    description:
      "Scegli tra la nostra selezione di veicoli. Prezzo chiaro, nessun costo nascosto.",
  },
}

/**
 * Vertical rhythm measured on the 390px frames (mobile); desktop is derived.
 * - lungo termine (9:5): count → cards 8, cards → pagination 56,
 *   pagination → end of section 48
 * - breve termine (85:1223): same, but cards → pagination 58 (cards end at
 *   3614.5 in Frame 471, the pagination row starts at 3624.5 + 48)
 * - vendita (87:3489): count → cards 64 (16 + the 48px top padding of
 *   Frame 468), cards → pagination 24, then 48
 * - proposte (85:831, toggle on top): toggle → cards 24, cards → pagination
 *   39, pagination → contact section 35
 * `nav` (cards → pagination) only applies when there is more than one page;
 * otherwise the section ends `end` below the cards.
 */
const rhythm = {
  rental: {
    cards: "mt-2 md:mt-ds-5",
    nav: "pt-14 md:pt-ds-7",
    end: "pb-12 md:pb-ds-8",
  },
  breve: {
    cards: "mt-2 md:mt-ds-5",
    nav: "pt-[58px] md:pt-ds-7",
    end: "pb-12 md:pb-ds-8",
  },
  vendita: {
    cards: "mt-16 md:mt-ds-7",
    nav: "pt-6 md:pt-ds-7",
    end: "pb-12 md:pb-ds-8",
  },
  toggle: {
    cards: "mt-6 md:mt-ds-5",
    nav: "pt-[39px] md:pt-ds-7",
    end: "pb-[35px] md:pb-ds-8",
  },
} as const

type SearchParams = Record<string, string | string[] | undefined>

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

/**
 * Reads `?page` (and `?formula` for the Proposte toggle) from the page's
 * awaited `searchParams`. Invalid values fall back to page 1 / `fallback`.
 */
export function parseListingParams(
  searchParams: SearchParams,
  fallback: Formula = "lungo-termine"
): { page: number; formula: Formula } {
  const page = Number.parseInt(first(searchParams.page) ?? "", 10)
  const formula = first(searchParams.formula)
  return {
    page: Number.isFinite(page) && page > 0 ? page : 1,
    formula: formulas.includes(formula as Formula)
      ? (formula as Formula)
      : fallback,
  }
}

export type VehicleListingProps = {
  formula: Formula
  /** Path of the page hosting the list, used for the pagination links. */
  basePath: string
  /** 1-based page from `?page`; clamped to the available pages. */
  page?: number
  /**
   * Heading, description and count. Defaults to the formula copy from Figma;
   * `false` hides the block (Proposte page, where the toggle opens the list).
   */
  copy?: Partial<VehicleListingCopy> | false
  /** Shows the formula toggle on top (Proposte page, 85:831). */
  showFormulaToggle?: boolean
  /** Vehicles to list; defaults to every vehicle of `formula`. */
  vehicles?: Vehicle[]
  className?: string
}

/**
 * Listing section of the formula pages: eyebrow + H2, description,
 * "N Veicoli disponibili", the card grid (1 / 2 / 3 columns) and `?page`
 * pagination, six cards per page.
 */
export function VehicleListing({
  formula,
  basePath,
  page = 1,
  copy,
  showFormulaToggle = false,
  vehicles = byFormula(formula),
  className,
}: VehicleListingProps) {
  const pageCount = Math.max(1, Math.ceil(vehicles.length / LISTING_PAGE_SIZE))
  const current = Math.min(Math.max(1, Math.trunc(page)), pageCount)
  const visible = vehicles.slice(
    (current - 1) * LISTING_PAGE_SIZE,
    current * LISTING_PAGE_SIZE
  )
  const text = copy === false ? null : { ...listingCopy[formula], ...copy }
  const spacing =
    rhythm[
      showFormulaToggle
        ? "toggle"
        : formula === "vendita"
          ? "vendita"
          : formula === "breve-termine"
            ? "breve"
            : "rental"
    ]
  // The Proposte toggle keeps the formula in the URL: carry it to the pages.
  const query = showFormulaToggle ? { formula } : undefined
  const count = vehicles.length

  return (
    <section
      id={LISTING_ID}
      aria-labelledby={`${LISTING_ID}-title`}
      className={cn("scroll-mt-24 bg-secondary", className)}
    >
      <div className="container">
        {/* Proposte has no visible list heading in Figma: keep the outline (H1 → H2 → card H3) for assistive tech. */}
        {!text && (
          <h2 id={`${LISTING_ID}-title`} className="sr-only">
            Le nostre proposte
          </h2>
        )}
        {showFormulaToggle && <FormulaToggleLink value={formula} />}

        {text && (
          <div className="flex flex-col gap-4">
            <SectionHeading
              eyebrow={text.eyebrow ?? ""}
              title={<span id={`${LISTING_ID}-title`}>{text.title}</span>}
              className="md:max-w-[640px]"
            />
            <p className="text-body text-muted-foreground md:max-w-[640px]">
              {text.description}
            </p>
            <p className="text-body font-bold text-muted-foreground">
              {count}{" "}
              {count === 1 ? "Veicolo disponibile" : "Veicoli disponibili"}
            </p>
          </div>
        )}

        {visible.length > 0 ? (
          <ul
            className={cn(
              "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
              (showFormulaToggle || text) && spacing.cards
            )}
          >
            {visible.map((vehicle, index) => (
              <li key={vehicle.slug} className="flex">
                <VehicleCard
                  vehicle={vehicle}
                  // Above the fold only on Proposte (no heading block above the list).
                  priority={!text && current === 1 && index === 0}
                  className="w-full"
                />
              </li>
            ))}
          </ul>
        ) : (
          // TODO: empty-state copy is not in Figma.
          <p className={cn("text-body text-muted-foreground", spacing.cards)}>
            Nessun veicolo disponibile al momento.
          </p>
        )}

        <div className={cn(pageCount > 1 && spacing.nav, spacing.end)}>
          {pageCount > 1 && (
            <PaginationNav
              page={current}
              pageCount={pageCount}
              getHref={(p) =>
                `${getPaginationHref(basePath, p, query)}#${LISTING_ID}`
              }
              linkElement={<Link href="" />}
            />
          )}
        </div>
      </div>
    </section>
  )
}
