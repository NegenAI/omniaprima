import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

export type TeamMember = {
  name: string
  role: string
  photo: string
  /** Optional Figma crop of the photo inside the frame (percentages). */
  crop?: { top: string; left: string; width: string; height: string }
}

/** Figma team card: 160×209 photo with a 64px white name panel overlapping its last 31px. */
export function TeamMemberCard({
  member,
  className,
}: {
  member: TeamMember
  className?: string
}) {
  return (
    <article className={cn("flex flex-col", className)}>
      <div className="relative aspect-[160/209] overflow-hidden rounded-t-[10px]">
        <div
          className="absolute"
          style={
            member.crop ?? { top: 0, left: 0, width: "100%", height: "100%" }
          }
        >
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 200px, (min-width: 768px) 30vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative -mt-[31px] flex h-16 flex-col gap-1 rounded-b-[10px] bg-white px-[11px] pt-3">
        <h3 className="truncate text-base leading-5.5 font-normal text-foreground">
          {member.name}
        </h3>
        <p className="truncate text-sm leading-4 text-azzurro">{member.role}</p>
      </div>
    </article>
  )
}
