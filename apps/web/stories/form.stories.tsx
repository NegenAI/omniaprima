import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

const meta = {
  title: "Components/Form fields",
  parameters: {
    docs: {
      description: {
        component:
          "Figma “Text Inputs”: 56px field, 20px radius, ghiaccio fill, navy-200 border; invalid = 2px red border.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Fields: Story = {
  render: () => (
    <div className="flex max-w-[310px] flex-col gap-ds-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="sb-default">E-mail</Label>
        <Input id="sb-default" placeholder="Scrivi..." />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sb-invalid">Nome</Label>
        <Input id="sb-invalid" placeholder="Scrivi..." aria-invalid />
        <p className="text-xs leading-[18px] text-destructive">Errore</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="sb-message">Messaggio</Label>
        <Textarea id="sb-message" placeholder="Scrivi..." />
      </div>
      <label className="flex items-start gap-[7px]">
        <Checkbox />
        <span className="text-sm leading-4 text-testo-secondario">
          Dichiaro di aver preso visione dell’informativa privacy.
        </span>
      </label>
    </div>
  ),
}
