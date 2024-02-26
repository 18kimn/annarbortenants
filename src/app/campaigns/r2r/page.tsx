"use client";
import { OutboundLink } from "@/components/OutboundLink";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import EloDate from "./EloDate";
import styles from "./page.module.css";

export default function R2R() {
  const [leaseEndDate, setLeaseEndDate] = useState<Dayjs | null>(null);

  const eloDates = [
    {
      time: 240,
      text: (
        <p>
          If your landlord attempts to renew before this date, they must provide
          a second notice.
        </p>
      ),
    },
    {
      time: 180,
      text: (
        <p>
          Your landlord must provide you with a renewal offer by this date.
        </p>
      ),
    },
    {
      time: 150,
      text: (
        <>
          <p>
            You have until this date to accept your landlord&apos;s renewal offer.
          </p>
          <p>
            Your landlord may begin showing your unit, and leasing your unit, to
            other prospective tenants only after this date.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <section>
        <p>
          Despite the existence of two Ann Arbor city ordinances aimed at
          regulating early leasing (
          <OutboundLink href="https://www.a2gov.org/departments/city-clerk/Documents/ELO%20Flyer%206-16-2023.pdf">
            Early Leasing Ordinance
          </OutboundLink>{" "}
          and{" "}
          <OutboundLink href="https://www.a2gov.org/departments/city-clerk/Documents/RTR%20Flyer%206-15-2023.pdf">
            Right to Renew
          </OutboundLink>
          ), landlords across the city are again pressuring tenants to renew
          leases extremely early. The AATU believes that many of these cases are
          clear violations of city law and we are encouraging tenants to file
          complaints with the city to halt this harmful practice.
        </p>
        <p
          style={{
            background: "#ffff00",
            fontWeight: "bold",
            width: "fit-content",
          }}
        >
          Please fill out{" "}
          <OutboundLink href="https://www.a2gov.org/departments/build-rent-inspect/housing/SiteAssets/Pages/Filing-Complaints/ELO%20and%20RTR%20Complaint%20Form%20fillable.pdf">
            this City complaint form
          </OutboundLink>{" "}
          and email the completed form to JFarrell@a2gov.org.
        </p>
        <p>
          We encourage you to also report your situation to the AATU for our own
          records through our{" "}
          <OutboundLink href="http://bit.ly/joinAATU">
            tenant organizer form.
          </OutboundLink>{" "}
          Please do not hesitate to contact us if you have any questions or
          would like to join our organization.
        </p>
        <p>
          Contact us at{" "}
          <OutboundLink href="mailto:annarbortenantsunion@gmail.com">
            AnnArborTenantsUnion@gmail.com
          </OutboundLink>
        </p>
      </section>
      <section>
        <h2>Know your leasing rights: A timeline</h2>
        <p>
          Is your landlord respecting your rights? To find out, input your lease
          end date in the picker below.
        </p>
        <div className={styles.datePicker}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Your lease's end date"
              value={leaseEndDate}
              slotProps={{
                field: {
                  clearable: true,
                  onClear: () => {
                    setLeaseEndDate(null);
                  },
                },
              }}
              onChange={(newValue) => {
                setLeaseEndDate(newValue);
              }}
            />
          </LocalizationProvider>
        </div>
        <div>
          {eloDates.map((eloDate, i) => (
            <EloDate eloDate={eloDate} leaseEndDate={leaseEndDate} key={i} />
          ))}
        </div>
      </section>
    </>
  );
}
