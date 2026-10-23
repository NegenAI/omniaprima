import Image from "next/image"

import { CroppedImage } from "@/components/cropped-image"
import { focalPosition, type SiteImage } from "@/lib/media"
import { cn } from "@workspace/ui/lib/utils"

export type TeamMember = {
  name: string
  role: string
  photo: SiteImage
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
      <div className="relative aspect-[160/209] overflow-hidden rounded-t-image">
        <CroppedImage
          src={member.photo.src}
          // The name is the card heading: the photo is decorative for screen readers.
          alt=""
          style={focalPosition(member.photo)}
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 30vw, 50vw"
        />
      </div>
      <div className="relative -mt-[31px] flex h-16 flex-col gap-1 rounded-b-image bg-white px-[11px] pt-3">
        <h3 className="truncate text-base leading-5.5 font-normal text-foreground">
          {member.name}
        </h3>
        <p className="truncate text-caption text-azzurro">{member.role}</p>
      </div>
    </article>
  )
}
