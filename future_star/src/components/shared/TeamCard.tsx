import type { ComponentType, SVGProps } from 'react'

interface SocialLink {
  label: string
  href: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

interface TeamCardProps {
  image: string
  name: string
  role: string
  bio: string
  socialLinks: SocialLink[]
}

export function TeamCard({ image, name, role, bio, socialLinks }: TeamCardProps) {
  return (
    <div className="team-card">
      <div className="team-card__image">
        <img src={image} alt={name} />
      </div>
      <div className="team-card__content">
        <h3 className="team-card__name">{name}</h3>
        <p className="team-card__role">{role}</p>
        <p className="team-card__bio">{bio}</p>
        <div className="team-card__social-icons">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <link.Icon width={24} height={24} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
