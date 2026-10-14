import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ServicesIncluded } from "@/components/formula/services-included"

const meta = {
  title: "Formula/Servizi inclusi",
  component: ServicesIncluded,
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "inline-radio", options: ["formula", "vehicle"] },
  },
} satisfies Meta<typeof ServicesIncluded>

export default meta
type Story = StoryObj<typeof meta>

/** Lungo Termine page (Figma 9:5 → 54:1618). */
export const Formula: Story = { args: { variant: "formula" } }

/** Scheda auto (Figma 87:9624 → 87:9845): 10px heading → accordion gap. */
export const Vehicle: Story = { args: { variant: "vehicle" } }

/** Open state (Figma "Accordion" open variants, 42:587). */
export const Open: Story = {
  args: { variant: "formula", defaultValue: ["Incendio e furto"] },
}
