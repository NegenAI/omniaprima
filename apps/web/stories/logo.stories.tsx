import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Logo } from "@/components/logo"

const meta: Meta<typeof Logo> = {
  title: "Brand/Logo",
  component: Logo,
  args: { layout: "horizontal", tone: "dark" },
  argTypes: {
    layout: { control: "inline-radio", options: ["horizontal", "stacked"] },
    tone: { control: "inline-radio", options: ["dark", "light"] },
  },
  decorators: [
    (Story, { args }) => (
      <div
        className={
          args.tone === "light"
            ? "inline-flex rounded-lg bg-primary p-ds-5"
            : "inline-flex rounded-lg bg-background p-ds-5"
        }
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const HorizontalDark: Story = {}

export const HorizontalLight: Story = { args: { tone: "light" } }

export const StackedDark: Story = { args: { layout: "stacked" } }

export const StackedLight: Story = {
  args: { layout: "stacked", tone: "light" },
}
