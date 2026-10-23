import type { CollectionConfig } from "payload"

import { isAdminOrManager, isLoggedIn } from "@/payload/access"
import {
  revalidateAfterChange,
  revalidateAfterDelete,
} from "@/payload/revalidate"

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Persona del team", plural: "Team" },
  typescript: { interface: "TeamMemberDoc" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role"],
    group: "Contenuti",
  },
  // Drag-and-drop order in the admin list: the Chi siamo grid follows it.
  orderable: true,
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
    { name: "name", label: "Nome", type: "text", required: true },
    {
      name: "role",
      label: "Ruolo",
      type: "text",
      required: true,
      admin: { description: "Es. “Front Office”." },
    },
    {
      name: "photo",
      label: "Foto",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
}
