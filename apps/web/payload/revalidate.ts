import { revalidatePath } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload"

// The site is small and every page shows shared content (contacts in the
// footer, vehicles on several listings), so any change refreshes all pages.
// The seed runs outside Next.js and sets `context.disableRevalidate`.
function revalidateSite(context: Record<string, unknown>) {
  if (context.disableRevalidate) return
  revalidatePath("/", "layout")
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({
  doc,
  req,
}) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  revalidateSite(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context)
  return doc
}
