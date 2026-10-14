import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ContattiIntro } from "@/components/contatti/contatti-intro"
import { LocationsMap } from "@/components/contatti/locations-map"
import { QuoteRequest } from "@/components/contatti/quote-request"

const meta = {
  title: "Pages/Contatti",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Contatti page sections (Figma 87:6145): `ContattiIntro` (Contattaci + Dove Trovarci + static map linked to Google Maps) and `QuoteRequest` (Richiedi un preventivo gratuito + form card).",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Page: Story = {
  render: () => (
    <main className="bg-secondary">
      <ContattiIntro />
      <QuoteRequest />
    </main>
  ),
}

export const Intro: Story = {
  render: () => <ContattiIntro />,
}

export const Quote: Story = {
  render: () => <QuoteRequest />,
}

export const StaticMap: Story = {
  render: () => (
    <div className="w-[350px] p-5">
      <LocationsMap />
    </div>
  ),
}
