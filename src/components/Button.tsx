import Link from 'next/link'
import styles from './Button.module.css'
import {cx} from '@/utils/cx'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onAccent'
type Size = 'small' | 'default' | 'large'

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonAsLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    external?: boolean
  }

type ButtonAsButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {href?: undefined}

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps

function classFor(variant: Variant, size: Size, extra?: string) {
  return cx(
    styles.button,
    styles[variant],
    size === 'large' && styles.large,
    size === 'small' && styles.small,
    extra,
  )
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'default',
    className,
    children,
  } = props
  const cls = classFor(variant, size, className)
  if ('href' in props && props.href !== undefined) {
    const {
      href,
      external,
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      ...rest
    } = props
    if (external) {
      return (
        <a
          href={href}
          className={cls}
          target="_blank"
          rel="nofollow noopener"
          {...rest}
        >
          {children}
        </a>
      )
    }
    if (href.startsWith('/')) {
      return (
        <Link href={href} className={cls} {...rest}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }
  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    ...rest
  } = props
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
