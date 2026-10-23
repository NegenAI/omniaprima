import type { CollectionConfig } from "payload"

import {
  canDeleteUser,
  canManageUser,
  isAdminField,
  isAdminOrManager,
  roles,
} from "@/payload/access"

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utente", plural: "Utenti" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    group: "Amministrazione",
  },
  auth: true,
  access: {
    read: canManageUser,
    create: isAdminOrManager,
    update: canManageUser,
    delete: canDeleteUser,
  },
  hooks: {
    beforeChange: [
      // The first user, created from /admin on an empty database, is an admin.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data
        const { totalDocs } = await req.payload.count({
          collection: "users",
          req,
        })
        return totalDocs === 0 ? { ...data, role: "admin" } : data
      },
    ],
  },
  fields: [
    { name: "name", label: "Nome", type: "text", required: true },
    {
      name: "role",
      label: "Ruolo",
      type: "select",
      required: true,
      // Only admins choose the role: managers can only create editors.
      defaultValue: "editor",
      saveToJWT: true,
      admin: {
        description:
          "Il primo utente creato è sempre Admin. Solo gli Admin cambiano i ruoli.",
      },
      access: { create: isAdminField, update: isAdminField },
      options: roles.map((role) => ({
        value: role,
        label: { admin: "Admin", manager: "Manager", editor: "Editor" }[role],
      })),
    },
  ],
}
