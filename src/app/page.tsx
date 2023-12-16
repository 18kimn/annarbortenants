import { OutboundLink } from "../components/OutboundLink";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          <Image
            className={styles.aatuImage}
            alt="AATU logo"
            src="/logo.png"
            height={500}
            width={500}
          />
        </div>
        <div className={styles.description}>
          <p>
            We are a group of tenants in Ann Arbor interested in fighting for{" "}
            <b>stable, just, and affordable housing for all of us.</b>
          </p>
          <p>
            We’re excited to announce our efforts to rebuild the Ann Arbor
            Tenants Union, which had a storied history of fighting for better
            housing in Ann Arbor but which unfortunately ended its operations in
            2004.
          </p>
        </div>
      </div>
      <div className={styles.joinContainer}>
        <h2 className={styles.join}>Join your union!</h2>
        <p>You can join as a regular member or as a building organizer.</p>
        <p>
          Fill out the form below or visit{" "}
          <OutboundLink href="https://bit.ly/joinAATU.">
            bit.ly/joinAATU
          </OutboundLink>
          .
        </p>
        <iframe
          className={styles.iframe}
          src="https://docs.google.com/forms/d/e/1FAIpQLSdXKxbS-OhBN23qZ7HOCtFbhAPaYgpqrif3amkResc2tdx-XQ/viewform?embedded=true"
          width="640"
          height="3000"
        >
          Loading…
        </iframe>
      </div>
    </main>
  );
}
