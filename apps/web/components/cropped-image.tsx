import Image, { type ImageProps } from "next/image"

import { cn } from "@workspace/ui/lib/utils"

/**
 * Figma image-fill crop: size and offset of the image box relative to its
 * frame, in % of the frame (as Figma exports it, e.g. 157.89% × 137.85% at
 * -32.7% / -25.44%).
 */
export type ImageCrop = {
  width: number
  height: number
  left: number
  top: number
}

type CroppedImageProps = Omit<ImageProps, "fill" | "width" | "height"> & {
  /** Omit for a plain centred cover. */
  crop?: ImageCrop
}

/**
 * `next/image` filling its frame with an optional Figma crop. The parent must
 * be the frame: `relative` + `overflow-hidden` + a size or aspect ratio.
 */
export function CroppedImage({ crop, className, ...props }: CroppedImageProps) {
  return (
    <div
      className="absolute"
      style={
        crop
          ? {
              width: `${crop.width}%`,
              height: `${crop.height}%`,
              left: `${crop.left}%`,
              top: `${crop.top}%`,
            }
          : { inset: 0 }
      }
    >
      <Image fill className={cn("object-cover", className)} {...props} />
    </div>
  )
}
