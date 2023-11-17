import styles from "./Header.module.css";
import Image from "next/image";
import { OutboundLink } from "./OutboundLink";

const socials = [
  {
    href: "https://twitter.com/AATUOfficial",
    icon: "/icons/Twitter.svg",
    alt: "Icon linking to AATU Twitter",
  },
  {
    href: "https://www.facebook.com/a2tenantsunion",
    icon: "/icons/Facebook.svg",
    alt: "Icon linking to AATU Facebook",
  },
  {
    href: "mailto:annarbortenantsunion@gmail.com",
    icon: "/icons/Email.svg",
    alt: "Icon linking to AATU Email",
  },
  // {},
];

export default function Header() {
  return (
    <div className={styles.container}>
      <div className="placeholder"></div>
      <h2 className={styles.site_title}>The Ann Arbor Tenants Union</h2>
      <div className={styles.socials}>
        {socials.map(({ href, icon, alt }, i) => (
          <OutboundLink key={i} href={href}>
            <Image
              className={styles.icon}
              priority
              src={icon}
              alt={alt}
              width={32}
              height={32}
            />
          </OutboundLink>
        ))}
      </div>
    </div>
  );
}
