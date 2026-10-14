import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Link from "next/link"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNav,
  PaginationNext,
  PaginationPrevious,
  getPaginationHref,
} from "@workspace/ui/components/pagination"

const meta = {
  title: "Components/Pagination",
  component: PaginationNav,
  args: {
    page: 1,
    pageCount: 3,
    getHref: (page: number) => getPaginationHref("/proposte", page),
    linkElement: <Link href="" />,
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 1 } },
    getHref: { control: false },
    linkElement: { control: false },
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof PaginationNav>

export default meta
type Story = StoryObj<typeof meta>

/** Figma node 87:2409 — "< 1 2 3 >" with page 1 active. */
export const Default: Story = {}

export const MiddlePage: Story = { args: { page: 2 } }

export const LastPage: Story = { args: { page: 3 } }

/** Many pages collapse into first / siblings / last with ellipses (not in Figma). */
export const ManyPages: Story = { args: { page: 6, pageCount: 12 } }

/** Composable primitives, same markup as Figma. */
export const Primitives: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}
