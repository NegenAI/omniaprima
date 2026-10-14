import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

type LogoProps = {
  /** "horizontal" for headers, "stacked" for hero/footer blocks. */
  layout?: "horizontal" | "stacked"
  /** "dark" = navy logo for light backgrounds, "light" = ice-white logo for dark backgrounds. */
  tone?: "dark" | "light"
  className?: string
}

const horizontal = {
  dark: { src: "/brand/logo-horizontal-dark.svg", width: 522, height: 69 },
  light: { src: "/brand/logo-horizontal-light.svg", width: 473, height: 62 },
}

// Stacked logos are exported from Figma as two layers (mark + wordmark);
// positions are the Figma insets of each layer inside the logo frame.
const stacked = {
  dark: {
    width: 349,
    height: 127,
    mark: {
      src: "/brand/logo-stacked-dark-mark.svg",
      className: "inset-[0_41.63%_53.94%_41.63%]",
    },
    wordmark: {
      src: "/brand/logo-stacked-dark-wordmark.svg",
      className: "inset-[72.31%_0_0_0]",
    },
  },
  light: {
    width: 296,
    height: 108,
    mark: {
      src: "/brand/logo-stacked-light-mark.svg",
      className: "inset-[0_41.63%_54.02%_41.63%]",
    },
    wordmark: {
      src: "/brand/logo-stacked-light-wordmark.svg",
      className: "inset-[72.36%_0_0_0]",
    },
  },
}

export function Logo({
  layout = "horizontal",
  tone = "dark",
  className,
}: LogoProps) {
  if (layout === "horizontal") {
    const logo = horizontal[tone]
    return (
      <Image
        src={logo.src}
        width={logo.width}
        height={logo.height}
        alt="Omnia Prima"
        className={cn("h-auto w-60", className)}
      />
    )
  }

  const logo = stacked[tone]
  return (
    <div
      role="img"
      aria-label="Omnia Prima"
      style={{ aspectRatio: `${logo.width} / ${logo.height}` }}
      className={cn("relative w-60", className)}
    >
      {[logo.mark, logo.wordmark].map((layer) => (
        <div key={layer.src} className={cn("absolute", layer.className)}>
          <Image src={layer.src} alt="" fill />
        </div>
      ))}
    </div>
  )
}
