import Temp from "@/components/Temp";
import { OutboundLink } from "../components/OutboundLink";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Temp />
      </div>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.aatuImage}
            alt="AATU logo"
            src="/circle_logo.png"
            height={400}
            width={400}
          />
        </div>
        <div className={styles.description}>
          <p>
            We are a group of tenants in Ann Arbor interested in fighting for{" "}
            <b>stable, just, and affordable housing for all of us.</b>
          </p>
          <p>
            The housing crisis in Ann Arbor is out of control and it's up to us
            to organize and stop it. We won't wait for politicians, service
            providers, or landlord parasites to save us &mdash; we're organizing
            to protect ourselves and create better housing for everyone in Ann
            Arbor.
          </p>
        </div>
      </div>
      <div className={styles.joinContainer}>
        <h2 className={styles.join}>Join your union!</h2>
        <p>
          Alone we are weak, but together we are strong. Join your neighbors in
          your union <strong>today</strong> to ally yourself with other tenants
          and to build power together.
        </p>

        <p>
          Fill out the form below or visit{" "}
          <OutboundLink href="https://bit.ly/JoinAATU.">
            bit.ly/JoinAATU
          </OutboundLink>
          .
        </p>
        <div className={styles.iframeContainer}>
          <iframe
            className={styles.iframe}
            src="https://bit.ly/JoinAATU"
            width="640"
            height="2200"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </main>
  );
}
