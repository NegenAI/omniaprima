import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

/*
 * Pagination — Figma "Frame 459" (node 87:2409, used under the card lists of
 * "Proposte" 85:831 and "Lungo Termine" 9:5).
 * 36px circles, 8px gap, Inter 16/22 navy labels; inactive pages and arrows are
 * ghiaccio with a 1px navy-200 ring, the current page is a solid ambra circle.
 *
 * Link-based and hook-free so it renders in Server Components: every item is a
 * plain <a> unless a `render` element (e.g. next/link) is supplied.
 */

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="Paginazione"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className
      )}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

const paginationCircle =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-base leading-5.5 font-normal text-navy transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50"

type PaginationLinkProps = React.ComponentProps<"a"> & {
  isActive?: boolean
  disabled?: boolean
  /** Element to render instead of <a>, e.g. `<Link href="?page=2" />` from next/link. */
  render?: React.ReactElement<Record<string, unknown>>
}

function PaginationLink({
  className,
  isActive,
  disabled,
  render,
  href,
  children,
  ...props
}: PaginationLinkProps) {
  const classes = cn(
    paginationCircle,
    isActive
      ? "border-transparent bg-ambra"
      : "border-navy-200 bg-ghiaccio hover:bg-navy-100",
    disabled && "pointer-events-none",
    className
  )
  const shared = {
    "data-slot": "pagination-link",
    "data-active": isActive || undefined,
    "aria-current": isActive ? ("page" as const) : undefined,
    className: classes,
  }

  // A disabled control (previous on page 1, next on the last page) is not a link.
  if (disabled) {
    return (
      <span aria-disabled="true" {...shared} {...props}>
        {children}
      </span>
    )
  }

  if (render) {
    return React.cloneElement(render, {
      ...shared,
      ...props,
      ...(href !== undefined ? { href } : {}),
      className: cn(classes, render.props.className as string | undefined),
      children,
    })
  }

  return (
    <a href={href} {...shared} {...props}>
      {children}
    </a>
  )
}

function PaginationPrevious({
  "aria-label": ariaLabel = "Pagina precedente",
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label={ariaLabel}
      rel={props.disabled ? undefined : "prev"}
      {...props}
    >
      <span aria-hidden>{"<"}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  "aria-label": ariaLabel = "Pagina successiva",
  ...props
}: PaginationLinkProps) {
  return (
    <PaginationLink
      aria-label={ariaLabel}
      rel={props.disabled ? undefined : "next"}
      {...props}
    >
      <span aria-hidden>{">"}</span>
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center text-base leading-5.5 text-navy",
        className
      )}
      {...props}
    >
      <span aria-hidden>…</span>
      <span className="sr-only">Altre pagine</span>
    </span>
  )
}

/**
 * Pages to show: all of them when they fit, otherwise first, last and
 * `siblings` around the current page with "ellipsis" gaps.
 * `siblings` defaults to 0 so a row (with arrows) stays at 7 circles or fewer
 * (~300px) and fits the 350px mobile column, matching PaginationNav.
 */
function getPaginationRange(
  page: number,
  pageCount: number,
  siblings = 0
): Array<number | "ellipsis"> {
  const total = Math.max(1, pageCount)
  const current = Math.min(Math.max(1, page), total)
  // first + last + current + siblings on both sides + 2 gaps
  if (total <= 5 + siblings * 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const start = Math.max(2, current - siblings)
  const end = Math.min(total - 1, current + siblings)
  const range: Array<number | "ellipsis"> = [1]
  if (start > 2) range.push("ellipsis")
  for (let p = start; p <= end; p++) range.push(p)
  if (end < total - 1) range.push("ellipsis")
  range.push(total)
  return range
}

type SearchParamsInput =
  URLSearchParams | Record<string, string | string[] | undefined>

/**
 * Builds `pathname?…&page=N`, preserving the other search params.
 * Page 1 drops the param so the canonical URL stays clean.
 */
function getPaginationHref(
  pathname: string,
  page: number,
  searchParams?: SearchParamsInput,
  param = "page"
): string {
  const params = new URLSearchParams()
  if (searchParams instanceof URLSearchParams) {
    searchParams.forEach((value, key) => params.append(key, value))
  } else if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined) continue
      for (const v of Array.isArray(value) ? value : [value]) {
        params.append(key, v)
      }
    }
  }
  params.delete(param)
  if (page > 1) params.set(param, String(page))
  const query = params.toString()
  return query ? `${pathname}?${query}` : pathname
}

type PaginationNavProps = Omit<React.ComponentProps<"nav">, "children"> & {
  /** Current page, 1-based. */
  page: number
  pageCount: number
  /** Href for a page, e.g. `(p) => getPaginationHref("/proposte", p, searchParams)`. */
  getHref: (page: number) => string
  /** Link element to clone for every item, e.g. `<Link href="" />` from next/link. */
  linkElement?: React.ReactElement<Record<string, unknown>>
  /** Pages shown around the current one. 0 keeps the row ≤ 7 circles (fits 350px on mobile). */
  siblings?: number
}

/** Ready-made pagination ("< 1 2 3 >") driven by `?page=N` links. */
function PaginationNav({
  page,
  pageCount,
  getHref,
  linkElement,
  siblings = 0,
  ...props
}: PaginationNavProps) {
  const total = Math.max(1, pageCount)
  const current = Math.min(Math.max(1, page), total)
  const range = getPaginationRange(current, total, siblings)

  return (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={current > 1 ? getHref(current - 1) : undefined}
            disabled={current <= 1}
            render={linkElement}
          />
        </PaginationItem>
        {range.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href={getHref(item)}
                isActive={item === current}
                aria-label={`Pagina ${item}`}
                render={linkElement}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            href={current < total ? getHref(current + 1) : undefined}
            disabled={current >= total}
            render={linkElement}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNav,
  PaginationNext,
  PaginationPrevious,
  getPaginationHref,
  getPaginationRange,
}
export type { PaginationLinkProps, PaginationNavProps }
