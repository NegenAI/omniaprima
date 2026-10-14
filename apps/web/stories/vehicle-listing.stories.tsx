import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { usePathname, useRouter } from "@storybook/nextjs-vite/navigation.mock"
import { fn } from "storybook/test"

import { FormulaToggle } from "@/components/formula/formula-toggle"
import { VehicleListing } from "@/components/formula/vehicle-listing"
import { byFormula } from "@/lib/vehicles"

const meta = {
  title: "Formula/VehicleListing",
  component: VehicleListing,
  parameters: { layout: "fullscreen" },
  // The App Router context (`appDirectory: true`) crashes in this Storybook /
  // Next 16 setup (see site-chrome.stories.tsx), so mock the hooks the
  // FormulaToggle uses: clicks are logged as `useRouter().push` actions.
  beforeEach: () => {
    useRouter.mockReturnValue({
      push: fn().mockName("useRouter().push"),
      replace: fn().mockName("useRouter().replace"),
      back: fn().mockName("useRouter().back"),
      forward: fn().mockName("useRouter().forward"),
      refresh: fn().mockName("useRouter().refresh"),
      prefetch: fn().mockName("useRouter().prefetch"),
      bfcacheId: "storybook",
    })
    usePathname.mockReturnValue("/proposte")
  },
  args: {
    formula: "lungo-termine",
    basePath: "/noleggio-lungo-termine",
    page: 1,
  },
  argTypes: {
    formula: {
      control: "inline-radio",
      options: ["lungo-termine", "breve-termine", "vendita"],
    },
    page: { control: { type: "number", min: 1 } },
    vehicles: { control: false },
    copy: { control: false },
  },
} satisfies Meta<typeof VehicleListing>

export default meta
type Story = StoryObj<typeof meta>

/** Lungo Termine page (9:5 → 54:1458 + cards + pagination). */
export const LungoTermine: Story = {}

/** Breve Termine page (85:1223 → 125:4827). */
export const BreveTermine: Story = {
  args: { formula: "breve-termine", basePath: "/noleggio-breve-termine" },
}

/** Vendita page (87:3489 → 87:3530). */
export const Vendita: Story = {
  args: { formula: "vendita", basePath: "/vendita" },
}

/** Proposte page (85:831): formula toggle on top, no heading. */
export const Proposte: Story = {
  args: { basePath: "/proposte", copy: false, showFormulaToggle: true },
}

/** Pagination with more than six vehicles (second page). */
export const SecondPage: Story = {
  args: {
    formula: "breve-termine",
    basePath: "/noleggio-breve-termine",
    page: 2,
    vehicles: [
      ...byFormula("breve-termine"),
      ...byFormula("breve-termine").map((v) => ({ ...v, slug: `${v.slug}-b` })),
    ],
  },
}

/** The toggle alone (Frame 388). */
export const Toggle: StoryObj<typeof FormulaToggle> = {
  render: () => (
    <div className="bg-secondary p-5">
      <div className="w-[350px] md:w-auto">
        <FormulaToggle value="lungo-termine" />
      </div>
    </div>
  ),
}
