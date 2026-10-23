import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/section-heading"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"

/** Team grid of the Chi siamo page; members and order come from the admin. */
export function Team({ members }: { members: TeamMember[] }) {
  return (
    // Mobile: Figma's card grid overflows its content frame by 8px, so the visible bottom space is 40px.
    <Section
      id="team"
      tone="navy"
      className="pt-12 pb-10"
      containerClassName="flex flex-col gap-ds-5"
    >
      <SectionHeading
        tone="dark"
        eyebrow="Il team"
        eyebrowClassName="text-navy-200"
        title={
          <>
            Chi c’è dietro <br className="md:hidden" />
            Omnia Prima
          </>
        }
      />
      <p className="text-body text-navy-100 md:max-w-[640px]">
        Un gruppo di professionisti con esperienza nel mondo automotive, pronti
        ad ascoltare e trovare la soluzione giusta.
      </p>
      {/* Desktop: two rows of three (review feedback 2026-10-15). Cards are
            capped at 288px (their size in a 960px grid) so they stay close to
            the Figma card proportions; the grid spans the container and the
            leftover width goes into the gaps between columns. */}
      <ul className="grid grid-cols-2 gap-x-[30px] gap-y-[25px] md:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,288px))] lg:justify-between lg:gap-x-ds-6 lg:gap-y-ds-6">
        {members.map((member) => (
          <li key={member.name}>
            <TeamMemberCard member={member} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
