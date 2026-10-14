import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Foundations",
  parameters: {
    docs: {
      description: {
        component:
          "Tokens from the Figma “Design System” page. Mobile values are the default; desktop values apply from `md` (768px). Switch the viewport to compare.",
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const brand = [
  ["Navy", "bg-navy", "#0D2137"],
  ["Navy 500", "bg-navy-500", "#2A5580"],
  ["Navy 200", "bg-navy-200", "#C8D8E8"],
  ["Navy 100", "bg-navy-100", "#E8EEF5"],
  ["Bianco Ghiaccio", "bg-ghiaccio", "#F2F6FF"],
  ["Ambra", "bg-ambra", "#FCB529"],
  ["Ambra 600", "bg-ambra-600", "#E79E0F"],
  ["Azzurro", "bg-azzurro", "#2D97D3"],
  ["Azzurro 700", "bg-azzurro-700", "#0C77B4"],
]

const semantic = [
  ["background", "bg-background"],
  ["foreground", "bg-foreground"],
  ["primary", "bg-primary"],
  ["primary-hover", "bg-primary-hover"],
  ["secondary", "bg-secondary"],
  ["secondary-hover", "bg-secondary-hover"],
  ["muted-foreground", "bg-muted-foreground"],
  ["border", "bg-border"],
  ["ring", "bg-ring"],
  ["rental", "bg-rental"],
  ["rental-hover", "bg-rental-hover"],
  ["sales", "bg-sales"],
  ["sales-hover", "bg-sales-hover"],
  ["destructive", "bg-destructive"],
]

function Swatch({ name, bg, hex }: { name: string; bg: string; hex?: string }) {
  return (
    <div className="flex flex-col gap-ds-2">
      <div className={`h-16 rounded-lg ring-1 ring-border ${bg}`} />
      <div>
        <p className="text-body-2 font-semibold">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{hex ?? bg}</p>
      </div>
    </div>
  )
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-ds-6">
      <section className="flex flex-col gap-ds-4">
        <h3>Brand palette</h3>
        <div className="grid grid-cols-2 gap-ds-4 sm:grid-cols-3 lg:grid-cols-5">
          {brand.map(([name, bg, hex]) => (
            <Swatch key={name} name={name!} bg={bg!} hex={hex} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-ds-4">
        <h3>Semantic tokens</h3>
        <div className="grid grid-cols-2 gap-ds-4 sm:grid-cols-3 lg:grid-cols-5">
          {semantic.map(([name, bg]) => (
            <Swatch key={name} name={name!} bg={bg!} />
          ))}
        </div>
      </section>
    </div>
  ),
}

const type = [
  ["text-h1", "H1 - OMNIA PRIMA", "46/48 Bold", "58 Bold"],
  ["text-h2", "H2 - OMNIA PRIMA", "36/44 ExtraBold", "38 ExtraBold"],
  ["text-h3", "H3 - OMNIA PRIMA", "24/24 Bold", "24 Bold"],
  ["text-h4", "H4 - OMNIA PRIMA", "20/22 Regular", "18 Medium"],
  ["text-body", "Body - OMNIA PRIMA", "16/22 Regular", "16 Regular"],
  ["text-body-2", "Body 02 - OMNIA PRIMA", "14/16 Regular", "14 Light"],
]

export const Typography: Story = {
  render: () => (
    <div className="flex flex-col gap-ds-5">
      {type.map(([cls, label, mobile, desktop]) => (
        <div key={cls} className="flex flex-col gap-ds-1">
          <code className="font-mono text-xs text-muted-foreground">
            {cls} · mobile {mobile} · desktop {desktop}
          </code>
          <p className={cls}>{label}</p>
        </div>
      ))}
    </div>
  ),
}

const spacing = [
  ["ds-1", "w-ds-1", "4", "4"],
  ["ds-2", "w-ds-2", "8", "8"],
  ["ds-3", "w-ds-3", "12", "16"],
  ["ds-4", "w-ds-4", "16", "24"],
  ["ds-5", "w-ds-5", "24", "32"],
  ["ds-6", "w-ds-6", "32", "48"],
  ["ds-7", "w-ds-7", "48", "64"],
  ["ds-8", "w-ds-8", "64", "96"],
]

export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col gap-ds-2">
      {spacing.map(([token, w, mobile, desktop]) => (
        <div key={token} className="flex items-center gap-ds-4">
          <code className="w-44 shrink-0 font-mono text-xs text-muted-foreground">
            {token} · {mobile}px / {desktop}px
          </code>
          <div className={`h-4 rounded-sm bg-sales ${w}`} />
        </div>
      ))}
    </div>
  ),
}
