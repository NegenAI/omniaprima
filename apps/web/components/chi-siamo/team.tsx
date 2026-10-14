import { SectionHeading } from "@/components/section-heading"
import { TeamMemberCard, type TeamMember } from "@/components/team-member-card"

const team: TeamMember[] = [
  {
    name: "Simone Pomponii",
    role: "Titolare",
    photo: "/images/chi-siamo/team/simone-pomponii.png",
    crop: {
      top: "-0.15%",
      left: "-5.27%",
      width: "117.44%",
      height: "112.38%",
    },
  },
  {
    name: "Rosalba Cappelli",
    role: "Front Office",
    photo: "/images/chi-siamo/team/rosalba-cappelli.png",
  },
  {
    name: "Pasquale Nolli",
    role: "Senior Sales",
    photo: "/images/chi-siamo/team/pasquale-nolli.png",
  },
  {
    name: "Marco Varani",
    role: "Service Advisor",
    photo: "/images/chi-siamo/team/marco-varani.png",
  },
  {
    name: "Valeria Di Antonio",
    role: "Back Office",
    photo: "/images/chi-siamo/team/valeria-di-antonio.png",
  },
  {
    name: "Daniel Di Ottavio",
    role: "After Sales Assistant",
    photo: "/images/chi-siamo/team/daniel-di-ottavio.png",
  },
]

export function Team() {
  return (
    // Mobile: Figma's card grid overflows its content frame by 8px, so the visible bottom space is 40px.
    <section id="team" className="bg-primary pt-12 pb-10 md:py-ds-8">
      <div className="container flex flex-col gap-ds-5">
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
          Un gruppo di professionisti con esperienza nel mondo automotive,
          pronti ad ascoltare e trovare la soluzione giusta.
        </p>
        <ul className="grid grid-cols-2 gap-x-[30px] gap-y-[25px] md:grid-cols-3 lg:grid-cols-6">
          {team.map((member) => (
            <li key={member.name}>
              <TeamMemberCard member={member} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
