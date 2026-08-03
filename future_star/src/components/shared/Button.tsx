import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

type Variant = 'gold' | 'navy' | 'outline'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  className?: string
  children: ReactNode
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  to?: undefined
  href?: undefined
}

interface ButtonAsLink extends BaseProps {
  to: string
  href?: undefined
}

interface ButtonAsAnchor extends BaseProps {
  href: string
  to?: undefined
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-heading font-semibold uppercase tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  gold: 'bg-gold text-navy hover:bg-gold-dark shadow-sm hover:shadow-md hover:-translate-y-0.5',
  navy: 'bg-navy text-white hover:bg-navy-light shadow-sm hover:shadow-md hover:-translate-y-0.5',
  outline: 'border-2 border-white text-white hover:bg-white hover:text-navy',
}

const sizes: Record<Size, string> = {
  md: 'text-sm px-5 py-2.5',
  lg: 'text-sm px-7 py-3.5',
}

export function Button(props: ButtonProps) {
  const { variant = 'gold', size = 'md', icon, className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
        {icon}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href, target, rel } = props as ButtonAsAnchor
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
        {icon}
      </a>
    )
  }

  const buttonProps = props as ButtonAsButton
  const { type = 'button', ...rest } = buttonProps
  return (
    <button type={type} className={classes} {...rest}>
      {children}
      {icon}
    </button>
  )
}
