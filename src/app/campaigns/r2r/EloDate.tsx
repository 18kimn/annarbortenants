import useMeasure from 'react-use-measure'
import styles from './page.module.css'
import {AnimatePresence, motion} from 'framer-motion'
import type {Dayjs} from 'dayjs'

export default function EloDate(props: {
  eloDate: {text: React.ReactNode; time: number}
  leaseStartDate: Dayjs | null
}) {
  const {eloDate, leaseStartDate} = props
  const [ref, {height}] = useMeasure()
  return (
    <div className={styles.eloDate}>
      <AnimatePresence initial={false}>
        <motion.div
          initial={{height: 'auto'}}
          animate={{height: height || 'auto'}}
          style={{position: 'relative', overflow: 'hidden'}}
        >
          <div
            className={styles.eloContainer}
            ref={ref}
            style={{
              position: height ? 'absolute' : 'relative',
              opacity: height ? 1 : 0,
              transition: 'opacity 0s',
              transitionDelay: '300ms',
            }}
          >
            <div className={styles.timelineContainer}>
              <div className={styles.timeline} />
              <div className={styles.circle} />
            </div>
            <div className={styles.eloContent}>
              {leaseStartDate !== null ? (
                <>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${eloDate.time} ${leaseStartDate.toString()}`}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.3}}
                    >
                      <h3 className={styles.dateTitle}>
                        {leaseStartDate
                          ?.add(eloDate.time, 'days')
                          .format('MMMM D, YYYY')}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                  <h4 className={styles.dateSubtitle}>
                    {eloDate.time} days after the start of your lease
                  </h4>
                </>
              ) : (
                <h3 className={styles.dateTitle}>
                  {eloDate.time} days after the start of your lease
                </h3>
              )}
              {eloDate.text}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
