import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowRight } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

const variants = [
  "default",
  "secondary",
  "outline",
  "rental",
  "sales",
  "success",
  "black",
  "ghost",
  "link",
  "destructive",
] as const

const sizes = ["lg", "default", "sm", "pill-sm"] as const

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "CTA", variant: "default", size: "default" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: {
      control: "select",
      options: [...sizes, "xs", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Figma “Bottoni”. Pill on mobile, rounded rectangle from `md`. " +
          "Sizes: `lg` = Desktop L / Mobile, `default` = Desktop M / Mobile S, `sm` = Desktop S. " +
          "`rental` = Giallo/Noleggio, `sales` = Azzurro/Vendita, `outline` = Bianco.",
      },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Rental: Story = { args: { variant: "rental" } }

export const Sales: Story = { args: { variant: "sales" } }

export const WithIcon: Story = {
  args: {
    size: "lg",
    children: (
      <>
        Prenota ora <ArrowRight data-icon="inline-end" />
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-ds-5">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-ds-2">
          <code className="font-mono text-xs text-muted-foreground">
            size=&quot;{size}&quot;
          </code>
          <div className="flex flex-wrap items-center gap-ds-3">
            {variants.map((variant) => (
              <Button {...args} key={variant} variant={variant} size={size}>
                {variant}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Mobile: Story = {
  ...AllVariants,
  globals: { viewport: { value: "mobile" } },
}
