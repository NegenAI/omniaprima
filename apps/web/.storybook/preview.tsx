import type { Preview } from "@storybook/nextjs-vite"
import { Inter } from "next/font/google"

import "@workspace/ui/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className={`${inter.variable} font-sans text-foreground antialiased`}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile: {
          name: "Mobile (375)",
          styles: { width: "375px", height: "812px" },
        },
        desktop: {
          name: "Desktop (1440)",
          styles: { width: "1440px", height: "900px" },
        },
      },
    },
    a11y: { test: "todo" },
  },
}

export default preview
