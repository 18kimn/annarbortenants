'use client'

import {useState} from 'react'
import dayjs, {type Dayjs} from 'dayjs'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'
import {AnimatePresence, motion} from 'framer-motion'
import useMeasure from 'react-use-measure'
import styles from './LeaseCalculator.module.css'

export type LeaseMilestone = {
  _key?: string
  days: number
  text: string
}

function Milestone({
  milestone,
  leaseStartDate,
}: {
  milestone: LeaseMilestone
  leaseStartDate: Dayjs | null
}) {
  const [ref, {height}] = useMeasure()
  return (
    <div className={styles.milestone}>
      <AnimatePresence initial={false}>
        <motion.div
          initial={{height: 'auto'}}
          animate={{height: height || 'auto'}}
          style={{position: 'relative', overflow: 'hidden'}}
        >
          <div
            className={styles.milestoneContainer}
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
            <div className={styles.milestoneContent}>
              {leaseStartDate !== null ? (
                <>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${milestone.days} ${leaseStartDate.toString()}`}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0}}
                      transition={{duration: 0.3}}
                    >
                      <h3 className={styles.dateTitle}>
                        {leaseStartDate
                          .add(milestone.days, 'days')
                          .format('MMMM D, YYYY')}
                      </h3>
                    </motion.div>
                  </AnimatePresence>
                  <h4 className={styles.dateSubtitle}>
                    {milestone.days} days after the start of your
                    lease
                  </h4>
                </>
              ) : (
                <h3 className={styles.dateTitle}>
                  {milestone.days} days after the start of your lease
                </h3>
              )}
              {milestone.text}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function LeaseCalculator({
  heading,
  intro,
  fieldLabel,
  amendmentDate,
  effectiveOffsetDays = 0,
  milestones,
}: {
  heading?: string
  intro?: string
  fieldLabel?: string
  amendmentDate?: string
  effectiveOffsetDays?: number
  milestones: LeaseMilestone[]
}) {
  const [leaseStartDate, setLeaseStartDate] = useState<Dayjs | null>(
    null,
  )
  const [ref, {height}] = useMeasure()

  const effectiveDate = amendmentDate
    ? dayjs(amendmentDate).add(effectiveOffsetDays, 'day')
    : null

  return (
    <section>
      {heading && <h2>{heading}</h2>}
      {intro && <p>{intro}</p>}
      <div className={styles.menu}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={fieldLabel}
            value={leaseStartDate}
            onChange={setLeaseStartDate}
            slotProps={{
              field: {
                clearable: true,
                onClear: () => setLeaseStartDate(null),
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            initial={{height: 'auto'}}
            animate={{height: height || 'auto'}}
            style={{position: 'relative', overflow: 'hidden'}}
          >
            <div
              ref={ref}
              style={{
                width: '100%',
                position: height ? 'absolute' : 'relative',
                opacity: height ? 1 : 0,
                transition: 'opacity 0s',
                transitionDelay: '300ms',
              }}
            >
              {effectiveDate && (
                <p>
                  <em>
                    For lease renewals negotiated on or after{' '}
                    {effectiveDate.format('MMMM D, YYYY')}.
                  </em>
                </p>
              )}
              {milestones.map((milestone, index) => (
                <Milestone
                  key={milestone._key ?? index}
                  milestone={milestone}
                  leaseStartDate={leaseStartDate}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
