import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProposteIntro } from "@/components/proposte/proposte-intro"

const meta = {
  title: "Pages/Proposte",
  component: ProposteIntro,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Opening of the Proposte page (Figma 85:831 → 87:10214). The rest of the page reuses `VehicleListing` (see Formula/VehicleListing → Proposte) and `ContactSection`.",
      },
    },
  },
} satisfies Meta<typeof ProposteIntro>

export default meta
type Story = StoryObj<typeof meta>

/** "Trova la formula giusta per te" + intro. */
export const Intro: Story = {}
