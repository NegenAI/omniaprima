import type { GlobalConfig } from "payload"

import { isAdminOrManager } from "@/payload/access"
import { revalidateGlobal } from "@/payload/revalidate"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Impostazioni sito",
  typescript: { interface: "SiteSettingsDoc" },
  admin: { group: "Amministrazione" },
  access: {
    read: () => true,
    update: isAdminOrManager,
  },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contatti",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "phone",
                  label: "Telefono (come mostrato)",
                  type: "text",
                  required: true,
                  admin: { description: "Es. “0861 415616”." },
                },
                {
                  name: "whatsapp",
                  label: "Numero WhatsApp",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "Con prefisso internazionale, solo cifre, es. “390861415616”.",
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "email",
                  label: "Email (sezione contatti)",
                  type: "email",
                  required: true,
                },
                {
                  name: "footerEmail",
                  label: "Email (footer)",
                  type: "email",
                  required: true,
                },
              ],
            },
            {
              name: "hours",
              label: "Orari",
              type: "text",
              required: true,
            },
            {
              name: "locations",
              label: "Sedi",
              type: "array",
              labels: { singular: "Sede", plural: "Sedi" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "town",
                      label: "Località",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "street",
                      label: "Indirizzo",
                      type: "text",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Social e recensioni",
          fields: [
            { name: "facebook", label: "Pagina Facebook", type: "text" },
            { name: "instagram", label: "Profilo Instagram", type: "text" },
            {
              type: "row",
              fields: [
                {
                  name: "googleRating",
                  label: "Valutazione Google",
                  type: "text",
                  admin: { description: "Es. “4.9/5”." },
                },
                {
                  name: "googleReviewsUrl",
                  label: "Link alle recensioni Google",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
