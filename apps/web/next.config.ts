import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    // Static files in /public, plus Payload uploads: served by Payload in
    // development, from the Vercel Blob CDN in production.
    localPatterns: [
      { pathname: "/api/media/file/**" },
      { pathname: "/**", search: "" },
    ],
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
