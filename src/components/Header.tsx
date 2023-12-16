"use client";
import styles from "./Header.module.css";

import Link from "next/link";
import { OutboundLink } from "./OutboundLink";
import Menu from "./Menu";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

const socials = [
  {
    href: "https://twitter.com/AATUOfficial",
    Icon: TwitterIcon,
    alt: "Icon linking to AATU Twitter",
  },
  {
    href: "https://www.facebook.com/a2tenantsunion",
    Icon: FacebookIcon,
    alt: "Icon linking to AATU Facebook",
  },
  {
    href: "mailto:annarbortenantsunion@gmail.com",
    Icon: EmailIcon,
    alt: "Icon linking to AATU Email",
  },
  // {},
];

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <Menu />
      </div>
      <Link href="/" style={{ textDecoration: "none", color: "black" }}>
        <h2 className={styles.site_title}>The Ann Arbor Tenants Union</h2>
      </Link>
      <div className={styles.socials}>
        {socials.map(({ href, Icon }, i) => (
          <OutboundLink key={i} href={href}>
            <Icon className={styles.icon} />
          </OutboundLink>
        ))}
      </div>
    </div>
  );
}
