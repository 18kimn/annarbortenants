"use client";
import { OutboundLink } from "@/components/OutboundLink";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import EloDate from "./EloDate";
import styles from "./page.module.css";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "next/image";

const eloAmendDate = dayjs("2024-03-04");

export default function R2R() {
  const [leaseStartDate, setLeaseStartDate] = useState<Dayjs | null>(null);
  const [ref, { height }] = useMeasure();

  const eloDates = [
    {
      time: 180,
      text: "Renewals can only be offered starting this date or later.",
    },
    {
      time: 210,
      text: "Landlords can only show your unit to other prospective tenants on this date or later.",
    },
  ];

  return (
    <>
      <section>
        <h1 className={styles.title}>
          The Early Leasing Ordinance and the Right to Renew
        </h1>
        <h2 className={styles.subtitle}>
          What we won, and what you should know
        </h2>
        <em>March 24, 2023</em>
        <p>
          In a major victory for Ann Arbor tenants, the Early Leasing Ordinance
          and the Right to Renew were combined on March 4th into one stronger
          ordinance (
          <OutboundLink href="https://a2gov.legistar.com/View.ashx?M=F&ID=12668890&GUID=A4D18E0E-A281-4CFC-97C8-A9FE8EF2478B">
            8:530
          </OutboundLink>
          ). The new Ordinance uses clarified language, puts forth a simplified
          timeline, and most importantly, includes stronger protections for
          tenants. The Ann Arbor Tenants Union played an instrumental role in
          strengthening these important rules.
        </p>
        <p>
          The new Ordinance enshrines several rights that all tenants should
          know:
        </p>
        <ul>
          <li>
            Landlords must offer renewal to tenants or pay relocation assistance
            (2 months rent) unless there is{" "}
            <OutboundLink href="https://a2gov.legistar.com/View.ashx?M=F&ID=12668890&GUID=A4D18E0E-A281-4CFC-97C8-A9FE8EF2478B">
              good cause
            </OutboundLink>{" "}
            to not renew.
          </li>
          <li>
            Until 180 days into your lease, landlords cannot make renewal
            offers.
          </li>
          <li>
            Until 210 days into your lease, landlords cannot require a response
            to renewals or show occupied units.
          </li>
          <li>
            Landlords always need to give tenants at least 30 days to respond to
            the offer.
          </li>
        </ul>
        <div className={styles.imageContainer}>
          <Image
            className={styles.eloImage}
            alt="Revised ELO Timeline"
            src="/revised-elo-timeline.png"
            width={640}
            height={285}
          />
        </div>
        <h2 className={styles.subtitle}>The road to tenant protections</h2>
        <p>
          <strong>How it used to work:</strong> Before the first amendment to
          the Early Leasing Ordinance (ELO) in 2021, landlords were allowed to
          demand renewal only 70 days after the start of a lease. Landlords also
          were not required to offer renewal and frequently didn’t. The
          situation left tenants with little stability and almost no bargaining
          leverage.
        </p>
        <p>
          <strong>2021:</strong> Tenants organized to amend the ELO, to give
          tenants 210 days into the lease before landlords could give a renewal
          ultimatum.
        </p>
        <p>
          <strong>2022:</strong> Tenants again organized within{" "}
          <OutboundLink href="https://www.geo3550.org/">GEO’s</OutboundLink>{" "}
          Housing Caucus to win the Right to Renew Ordinance (R2R) which
          requires that landlords offer renewal or pay relocation assistance (2
          months of rent). At this point, landlords began pressuring tenants to
          sign by threatening to raise rent if leases were not signed by an
          early deadline.
        </p>
        <p>
          <strong>2024:</strong> The revived AATU began organizing to make the
          leasing process more just for all tenants and to close loopholes. The
          AATU began organizing tenants in support of an amendment to the ELO
          and the R2R Ordinances. This amendment was accepted by City Council on
          March 4th and was made active on March 14th, 2024.
        </p>

        <p>
          Contact us at{" "}
          <OutboundLink href="mailto:annarbortenantsunion@gmail.com">
            AnnArborTenantsUnion@gmail.com
          </OutboundLink> for more information or to report a violation of the Early Leasing / Right to Renew Ordinance.
        </p>
      </section>
      <section>
        <h2 className={styles.subtitle}>Find your dates</h2>
        <p>
          Use our date calculator to see when your landlord can offer renewal
          and require a response:
        </p>
        <div className={styles.menu}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Your lease's start date"
              value={leaseStartDate}
              onChange={(v) =>{
                setLeaseStartDate(v)
              }}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    setLeaseStartDate(null);
                  },
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              initial={{ height: "auto" }}
              animate={{ height: height || "auto" }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              <div
                ref={ref}
                style={{
                  width: "100%",
                  position: height ? "absolute" : "relative",
                  opacity: height ? 1 : 0,
                  transition: "opacity 0s",
                  transitionDelay: "300ms",
                }}
              >
                <p>
                  <em>
                    For lease renewals negotiated on or after{" "}
                    {eloAmendDate.add(10, "day").format("MMMM D, YYYY")}.
                  </em>
                </p>
                {eloDates.map((eloDate, i) => (
                  <EloDate
                    eloDate={eloDate}
                    leaseStartDate={leaseStartDate}
                    key={i}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
