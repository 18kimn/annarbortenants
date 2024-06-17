import { OutboundLink } from "./OutboundLink";
import styles from "./Temp.module.css";
const endDate = new Date("2024-06-23");

export default function Temp() {
  if (new Date() > endDate) {
    return null;
  }
  return (
    <div className={styles.container}>
      <p>
        <strong>IMPORTANT NEWS: </strong>
        Our next general meeting will take place on{" "}
        <strong>Sunday, June 23 2-4pm</strong> at the{" "}
        <strong>ICC Education Center</strong>. We're hosting a training on how
        each of us can organize and build tenant associations with our
        neighbors.
      </p>
      <p>
        All tenants are welcome! RSVP now at{" "}
        <OutboundLink href="https://bit.ly/AATURSVP">
          https://bit.ly/AATURSVP.
        </OutboundLink>
      </p>
    </div>
  );
}
