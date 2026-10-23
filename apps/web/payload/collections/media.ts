import path from "path"
import { fileURLToPath } from "url"
import type { CollectionConfig } from "payload"

import { isAdminOrManager, isLoggedIn } from "@/payload/access"
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "@/payload/revalidate"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Immagine", plural: "Immagini" },
  admin: { group: "Contenuti" },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isAdminOrManager,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: "alt",
      label: "Testo alternativo",
      type: "text",
      required: true,
      admin: {
        description:
          "Descrizione dell'immagine per chi usa un lettore di schermo, es. “Fiat 500 verde acqua, vista frontale”.",
      },
    },
  ],
  upload: {
    // Local uploads when no Vercel Blob token is set (development).
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/*"],
    // The site crops images around this point (object-position).
    focalPoint: true,
  },
}
