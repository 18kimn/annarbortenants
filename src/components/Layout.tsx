import styles from "./Layout.module.css";

type SectionProps = {
  children: React.ReactNode;
  variant?: "default" | "muted" | "elevated" | "accent";
  size?: "tight" | "default" | "spacious";
  className?: string;
  id?: string;
};

export function Section({
  children,
  variant = "default",
  size = "default",
  className,
  id,
}: SectionProps) {
  const classes = [
    styles.section,
    size === "tight" && styles.sectionTight,
    size === "spacious" && styles.sectionSpacious,
    variant === "muted" && styles.sectionMuted,
    variant === "elevated" && styles.sectionElevated,
    variant === "accent" && styles.sectionAccent,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <section className={classes} id={id}>
      {children}
    </section>
  );
}

type ContainerProps = {
  children: React.ReactNode;
  width?: "narrow" | "prose" | "wide";
  className?: string;
};

export function Container({
  children,
  width = "prose",
  className,
}: ContainerProps) {
  const classes = [
    styles.container,
    width === "narrow" && styles.containerNarrow,
    width === "prose" && styles.containerProse,
    width === "wide" && styles.containerWide,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}

type ProseProps = {
  children: React.ReactNode;
  width?: "narrow" | "prose" | "wide";
  className?: string;
};

export function Prose({ children, width = "prose", className }: ProseProps) {
  return (
    <Container width={width} className={`${styles.prose} ${className ?? ""}`}>
      {children}
    </Container>
  );
}

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.pageHeaderInner}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
}

type CardProps = {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
};

export function Card({ children, elevated, className }: CardProps) {
  const classes = [
    styles.card,
    elevated && styles.cardElevated,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
