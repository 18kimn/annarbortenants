"use client";
import styles from "./layout.module.css";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{props.children}</div>;
    </div>
  );
}
