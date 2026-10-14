import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { FormulaHero } from "@/components/formula/formula-hero"

const meta = {
  title: "Formula/Hero",
  component: FormulaHero,
  parameters: { layout: "fullscreen" },
  argTypes: {
    formula: {
      control: "inline-radio",
      options: ["lungo-termine", "breve-termine", "vendita"],
    },
  },
} satisfies Meta<typeof FormulaHero>

export default meta
type Story = StoryObj<typeof meta>

export const LungoTermine: Story = { args: { formula: "lungo-termine" } }

export const BreveTermine: Story = { args: { formula: "breve-termine" } }

export const Vendita: Story = { args: { formula: "vendita" } }
