import styles from './Layout.module.css'
import {cx} from '@/utils/cx'

export type ContainerWidth = 'narrow' | 'prose' | 'wide' | 'expanded'

type SectionProps = {
  children: React.ReactNode
  variant?: 'default' | 'muted' | 'elevated' | 'accent'
  size?: 'tight' | 'default' | 'spacious'
  className?: string
  id?: string
}

export function Section({
  children,
  variant = 'default',
  size = 'default',
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cx(
        styles.section,
        size === 'tight' && styles.sectionTight,
        size === 'spacious' && styles.sectionSpacious,
        variant === 'muted' && styles.sectionMuted,
        variant === 'elevated' && styles.sectionElevated,
        variant === 'accent' && styles.sectionAccent,
        className,
      )}
    >
      {children}
    </section>
  )
}

type ContainerProps = {
  children: React.ReactNode
  width?: ContainerWidth
  className?: string
}

export function Container({
  children,
  width = 'prose',
  className,
}: ContainerProps) {
  return (
    <div
      className={cx(
        styles.container,
        width === 'narrow' && styles.containerNarrow,
        width === 'prose' && styles.containerProse,
        width === 'wide' && styles.containerWide,
        width === 'expanded' && styles.containerExpanded,
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Prose({
  children,
  width = 'prose',
  className,
}: ContainerProps) {
  return (
    <Container width={width} className={cx(styles.prose, className)}>
      {children}
    </Container>
  )
}
