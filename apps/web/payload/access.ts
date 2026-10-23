import type { Access, FieldAccess, PayloadRequest, Where } from "payload"

/**
 * Admin roles:
 * - admin: Negen, everything including users of any role
 * - manager: Omnia Prima owner, all content and site settings, manages editors
 * - editor: Omnia Prima staff, creates, edits and publishes vehicles, team
 *   and media; cannot delete, edit site settings or manage users
 */
export const roles = ["admin", "manager", "editor"] as const

export type Role = (typeof roles)[number]

function roleOf(req: PayloadRequest): Role | undefined {
  return req.user?.role
}

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => roleOf(req) === "admin"

export const isAdminOrManager: Access = ({ req }) => {
  const role = roleOf(req)
  return role === "admin" || role === "manager"
}

export const isAdminField: FieldAccess = ({ req }) => roleOf(req) === "admin"

/** The public site sees published documents only; logged-in users see drafts. */
export const publishedOrLoggedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } }

/** Admins: every user. Managers: editors and themselves. Editors: themselves. */
export const canManageUser: Access = ({ req }) => {
  const role = roleOf(req)
  if (!req.user || !role) return false
  if (role === "admin") return true
  const self: Where = { id: { equals: req.user.id } }
  if (role === "manager") return { or: [{ role: { equals: "editor" } }, self] }
  return self
}

/** Admins delete any user, managers only editors. */
export const canDeleteUser: Access = ({ req }) => {
  const role = roleOf(req)
  if (role === "admin") return true
  if (role === "manager") return { role: { equals: "editor" } }
  return false
}
