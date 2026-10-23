import { slugField, type CollectionConfig, type Condition } from "payload"

import { formulaLabels, formulas } from "@/lib/vehicles"
import {
  isAdminOrManager,
  isLoggedIn,
  publishedOrLoggedIn,
} from "@/payload/access"
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "@/payload/revalidate"

/** Short-term vehicles have no scheda page (Figma note on 87:4006). */
const hasScheda: Condition = (data) => data?.formula !== "breve-termine"

export const Vehicles: CollectionConfig = {
  slug: "vehicles",
  labels: { singular: "Veicolo", plural: "Veicoli" },
  typescript: { interface: "VehicleDoc" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "description", "formula", "featured", "_status"],
    group: "Contenuti",
  },
  // Drag-and-drop order in the admin list: the site lists vehicles in it.
  orderable: true,
  versions: { drafts: true },
  access: {
    read: publishedOrLoggedIn,
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
      type: "row",
      fields: [
        { name: "name", label: "Nome", type: "text", required: true },
        {
          name: "description",
          label: "Descrizione",
          type: "text",
          required: true,
          admin: { description: "Es. “1000 - 69 CV | Neopatentati”." },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "formula",
          label: "Formula",
          type: "select",
          required: true,
          options: formulas.map((formula) => ({
            value: formula,
            label: formulaLabels[formula],
          })),
        },
        {
          name: "category",
          label: "Tipo di veicolo",
          type: "select",
          options: [
            { value: "auto", label: "Auto" },
            { value: "autocarro", label: "Autocarro" },
            { value: "furgone", label: "Furgone" },
            { value: "piattaforma", label: "Piattaforma aerea" },
          ],
        },
      ],
    },
    {
      name: "image",
      label: "Foto principale",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      label: "Galleria della scheda",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: {
        condition: hasScheda,
        description:
          "Foto della pagina del veicolo, la principale per prima. Senza foto la scheda usa il layout “No foto”.",
      },
    },
    {
      name: "specs",
      label: "Caratteristiche in evidenza",
      type: "array",
      maxRows: 3,
      labels: { singular: "Caratteristica", plural: "Caratteristiche" },
      admin: {
        description:
          "Le etichette della card, es. “6000 KM”, “48 mesi”, “Benzina”.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "icon",
              label: "Icona",
              type: "select",
              required: true,
              defaultValue: "generic",
              options: [
                { value: "km", label: "Chilometri" },
                { value: "generic", label: "Generica" },
              ],
            },
            { name: "label", label: "Testo", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "price",
      label: "Prezzo",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "amount",
              label: "Importo (€)",
              type: "number",
              required: true,
              min: 0,
            },
            {
              name: "unit",
              label: "Unità",
              type: "select",
              required: true,
              defaultValue: "mese",
              options: [
                { value: "mese", label: "€/mese" },
                { value: "giorno", label: "€/giorno" },
                { value: "totale", label: "€ (prezzo di vendita)" },
              ],
            },
          ],
        },
        {
          name: "notes",
          label: "Note sotto il prezzo",
          type: "text",
          hasMany: true,
          admin: { description: "Es. “Iva esclusa”, “Anticipo 0”." },
        },
      ],
    },
    {
      name: "details",
      label: "Scheda del veicolo",
      type: "group",
      admin: {
        condition: hasScheda,
        description:
          "Dati della pagina del veicolo. Senza anticipo la pagina non viene pubblicata.",
      },
      fields: [
        { name: "advance", label: "Anticipo", type: "text" },
        {
          type: "row",
          fields: [
            {
              name: "duration",
              label: "Durata",
              type: "group",
              fields: [
                { name: "value", label: "Valore", type: "text" },
                { name: "unit", label: "Unità", type: "text" },
              ],
            },
            {
              name: "mileage",
              label: "Percorrenza",
              type: "group",
              fields: [
                { name: "value", label: "Valore", type: "text" },
                { name: "unit", label: "Unità", type: "text" },
              ],
            },
          ],
        },
        {
          name: "features",
          label: "Caratteristiche auto",
          type: "array",
          labels: { singular: "Gruppo", plural: "Gruppi" },
          fields: [
            { name: "title", label: "Titolo", type: "text", required: true },
            { name: "items", label: "Voci", type: "text", hasMany: true },
          ],
        },
      ],
    },
    {
      name: "offer",
      label: "Mostra “OFFERTA”",
      type: "checkbox",
      admin: { position: "sidebar" },
    },
    {
      name: "featured",
      label: "In homepage",
      type: "checkbox",
      admin: {
        position: "sidebar",
        description: "Mostrato in “Le nostre proposte” sulla homepage.",
      },
    },
    slugField({ useAsSlug: "name" }),
  ],
}
