import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { usePathname } from "@storybook/nextjs-vite/navigation.mock"
import { userEvent, within } from "storybook/test"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

const meta: Meta = {
  title: "Layout/Site chrome",
  parameters: {
    layout: "fullscreen",
  },
  // The App Router context (`appDirectory: true`) crashes in this Storybook /
  // Next 16 setup, so mock usePathname directly to mark "Home" as current.
  beforeEach: () => {
    usePathname.mockReturnValue("/")
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Header: Story = {
  render: () => <SiteHeader />,
}

export const HeaderMobile: Story = {
  render: () => <SiteHeader />,
  globals: { viewport: { value: "mobile" } },
}

/** Figma "Nav Bar aperto" (87:6733). */
export const MobileMenuOpen: Story = {
  render: () => <SiteHeader />,
  globals: { viewport: { value: "mobile" } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(
      await canvas.findByRole("button", { name: "Apri il menu" })
    )
  },
}

export const Footer: Story = {
  render: () => <SiteFooter />,
}
