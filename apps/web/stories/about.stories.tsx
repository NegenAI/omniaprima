import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { GoogleRating } from "@/components/google-rating"
import { TeamMemberCard } from "@/components/team-member-card"

const meta = {
  title: "Components/About",
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TeamMember: Story = {
  render: () => (
    <div className="w-fit bg-primary p-ds-5">
      <TeamMemberCard
        className="w-40"
        member={{
          name: "Rosalba Cappelli",
          role: "Front Office",
          photo: "/images/chi-siamo/team/rosalba-cappelli.webp",
        }}
      />
    </div>
  ),
}

export const Rating: Story = {
  render: () => <GoogleRating />,
}
