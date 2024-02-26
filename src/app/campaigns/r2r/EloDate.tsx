import useMeasure from "react-use-measure";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";
import type { Dayjs } from "dayjs";

export default function EloDate(props: {
  eloDate: { text: React.ReactNode; time: number };
  leaseEndDate: Dayjs | null;
}) {
  const { eloDate, leaseEndDate } = props;
  const [ref, { height }] = useMeasure();
  return (
    <div className={styles.eloDate}>
      <motion.div
        animate={{ height: height || "auto" }}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className={styles.eloContainer}
          ref={ref}
          style={{ position: height ? "absolute" : "relative" }}
        >
          <div className={styles.timelineContainer}>
            <div className={styles.timeline} />
            <div className={styles.circle} />
          </div>
          <div className={styles.eloContent}>
            {leaseEndDate !== null ? (
              <>
                  <AnimatePresence mode="wait">
                <motion.div
                    key={`${eloDate.time} ${leaseEndDate.toString()}`}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: .3}}
                >
                <h3 className={styles.dateTitle}>
                  {leaseEndDate
                    ?.subtract(eloDate.time, "days")
                    .format("MMMM D, YYYY")}
                </h3>
                </motion.div></AnimatePresence>
                <h4 className={styles.dateSubtitle}>
                  {eloDate.time} days before the end of your lease
                </h4>
              </>
            ) : (
              <h3 className={styles.dateTitle}>
                {eloDate.time} days before the end of your lease
              </h3>
            )}
            {eloDate.text}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
