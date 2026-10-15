import type { CnFunction } from "cn"
import { createCn } from "cn/config"

/**
 * `cn` that knows the Omnia Prima theme tokens, so e.g. `text-h4` merges as a
 * font size (not a colour) and `rounded-card` / `px-ds-5` replace other radii / paddings.
 */
export const cn: CnFunction = createCn({
  extend: {
    theme: {
      spacing: ["ds-1", "ds-2", "ds-3", "ds-4", "ds-5", "ds-6", "ds-7", "ds-8"],
    },
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "h4",
            "body",
            "body-2",
            "eyebrow",
            "caption",
          ],
        },
      ],
      rounded: [{ rounded: ["card", "image"] }],
      shadow: [{ shadow: ["card", "panel", "header", "footer"] }],
    },
  },
})
