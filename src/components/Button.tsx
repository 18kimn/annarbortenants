import styles from './Button.module.css'

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
  return [
    styles.button,
    styles[variant],
    size === 'large' && styles.large,
    size === 'small' && styles.small,
    extra,
  ]
    .filter(Boolean)
    .join(' ')
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
    const externalProps = external
      ? {target: '_blank', rel: 'nofollow noopener'}
      : {}
    return (
      <a href={href} className={cls} {...externalProps} {...rest}>
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
