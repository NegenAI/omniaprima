import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  ContactFormCard,
  ContactInfo,
  ContactSection,
} from "@/components/contact/contact-section"
import { ContactWhatsappBlock } from "@/components/contact/contact-form"
import { siteSettingsFixture } from "@/payload/seed/data"

const { contact } = siteSettingsFixture

const meta = {
  title: "Sections/Contact",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Figma contact section. `default` = homepage / Chi siamo (61:3384); `vehicle` = scheda auto (87:9861) with the “Oppure contattaci su Whatsapp” block. `ContactInfo`, `ContactFormCard` and `ContactWhatsappBlock` are exported to compose the Contatti page.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <ContactSection contact={contact} />,
}

export const Vehicle: Story = {
  render: () => <ContactSection contact={contact} variant="vehicle" />,
}

export const Pieces: Story = {
  render: () => (
    <div className="container flex flex-col gap-ds-5 bg-secondary py-12">
      <ContactInfo contact={contact} />
      <ContactFormCard whatsapp="none" whatsappHref={contact.whatsapp} />
      <div className="rounded-card bg-white p-5">
        <ContactWhatsappBlock href={contact.whatsapp} />
      </div>
    </div>
  ),
}
