import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'
import './Button.css'

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

export function Button(props: ButtonProps) {
  const { variant = 'gold', size = 'md', icon, className, children } = props
  const classes = cn('btn', `btn--${variant}`, `btn--${size}`, className)

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
