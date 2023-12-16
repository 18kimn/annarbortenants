import { OutboundLink } from "@/components/OutboundLink";
import styles from "./Resources.module.css";
import Grid from "@mui/material/Grid";

type Resource = {
  display: string;
  href: string;
  description: string;
};
const resources: Resource[] = [
  {
    display: "The Ann Arbor Renters Commission",
    href: "https://www.a2gov.org/departments/city-clerk/Boards-and-Commissions/renters/Pages/default.aspx",
    description: `The Ann Arbor Renters Commission was established in 2021 to 
    advise the Ann Arbor City Council on renters' issues.
    Several members of the AATU Reboot Task Force hold seats
    on the Renters Commission.`,
  },
  {
    display: "The Washtenaw Housing Alliance",
    href: "https://www.whalliance.org",
    description: `The Washtenaw Housing Alliance is a coalition of over 30
      nonprofit and government entities dedicated to
      ending homelessness in the Washtenaw County area.`,
  },
  {
    display: "The Huron Valley Worker Organizing and Research Center (HV-WORC)",
    href: "https://www.hvworc.org",
    description: `HV-WORC was established in 2021 by delegates of
    the Huron Valley Area Labor Federation and allied community
    partners, to provide research and education in 
    support of worker efforts for collective action.`,
  },
  {
    display: "GEO Housing Caucus",
    href: "https://www.geo3550.org",
    description: `The Graduate Employees' Organization
    at the University of Michigan
    has partnered with the AATU in previous years through their Housing Caucus to advocate for 
    Just Cause eviction laws in Ann Arbor.`,
  },
  {
    display: "Michigan Rent Is Too Damn High",
    href: "https://mirentistoodamnhigh.com",
    description: `The Rent Is Too Damn High coalition in Michigan is
    composed of 17 community organizations in Michigan 
    fighting for rent control, social housing, and renters' rights 
    at the state level.`,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Grid container justifyContent="center" className={styles.container}>
        <Grid item className={styles.content}>
          <h1>Resources for Ann Arbor tenants</h1>
          {resources.map((resource) => (
            <section key={resource.href}>
              <h2>
                <OutboundLink href={resource.href}>
                  {resource.display}
                </OutboundLink>
              </h2>
              <p>{resource.description}</p>
            </section>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
