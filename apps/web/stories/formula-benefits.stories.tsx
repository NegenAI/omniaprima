import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FormulaBenefits } from "@/components/formula/formula-benefits"

const meta = {
  title: "Formula/Benefits",
  component: FormulaBenefits,
  parameters: { layout: "fullscreen" },
  argTypes: {
    formula: {
      control: "inline-radio",
      options: ["lungo-termine", "breve-termine", "vendita"],
    },
  },
} satisfies Meta<typeof FormulaBenefits>

export default meta
type Story = StoryObj<typeof meta>

export const LungoTermine: Story = { args: { formula: "lungo-termine" } }

/** Open state, as in the "2 Accordion" open variant. */
export const LungoTermineOpen: Story = {
  args: { formula: "lungo-termine", defaultOpen: ["Flessibilità"] },
}

export const BreveTermine: Story = { args: { formula: "breve-termine" } }

export const Vendita: Story = { args: { formula: "vendita" } }
