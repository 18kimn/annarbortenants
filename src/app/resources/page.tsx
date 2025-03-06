import {OutboundLink} from '@/components/OutboundLink'
import styles from './Resources.module.css'
import Grid from '@mui/material/Grid'
import {makeID} from '@/utils/url'

type Resource = {
  display: string
  href: string
  description: string
  category:
    | 'Tenant rights'
    | 'Service centers and legal advice'
    | 'Allied organizing groups'
}

const resources: Resource[] = [
  {
    display: "The Ann Arbor Renter's Commission",
    href: 'https://www.a2gov.org/departments/city-clerk/Boards-and-Commissions/renters/Pages/default.aspx',
    description: `The Ann Arbor Renter's Commission was established in 2021 to 
    advise the Ann Arbor City Council on renters' issues.
    Several members of the AATU Reboot Task Force hold seats
    on the Renters Commission.`,
    category: 'Tenant rights',
  },
  {
    display: 'Legal Services of South Central Michigan (LSSCM)',
    href: 'https://lsscm.org',
    description:
      'LSSCM provides free legal advice and representation to low-income folks in South Central Michigan.',
    category: 'Service centers and legal advice',
  },
  {
    display: 'Fair Housing Center',
    href: 'https://fhcmichigan.org',
    description:
      'Free and low-cost services for discrimination cases in Michigan.',
    category: 'Service centers and legal advice',
  },
  {
    display: 'Student Legal Serivces',
    href: 'https://studentlegalservices.umich.edu/',
    description:
      "If you're a student, the best (and free) legal services for you could come from UMich SLS.",
    category: 'Service centers and legal advice',
  },
  {
    display: 'The Washtenaw Housing Alliance',
    href: 'https://www.whalliance.org',
    description: `The Washtenaw Housing Alliance is a coalition of over 30
      nonprofit and government entities dedicated to
      ending homelessness in the Washtenaw County area.`,
    category: 'Allied organizing groups',
  },
  {
    display:
      'The Huron Valley Worker Organizing and Research Center (HV-WORC)',
    href: 'https://www.hvworc.org',
    description: `HV-WORC was established in 2021 by delegates of
    the Huron Valley Area Labor Federation and allied community
    partners, to provide research and education in 
    support of worker efforts for collective action.`,
    category: 'Allied organizing groups',
  },
  {
    display: 'GEO Housing Caucus',
    href: 'https://www.geo3550.org',
    description: `The Graduate Employees' Organization
    at the University of Michigan
    has partnered with the AATU in previous years through their Housing Caucus to advocate for 
    Just Cause eviction laws in Ann Arbor.`,

    category: 'Allied organizing groups',
  },
  {
    display: 'Michigan Rent Is Too Damn High',
    href: 'https://mirentistoodamnhigh.com',
    description: `The Rent Is Too Damn High coalition in Michigan is
    composed of 17 community organizations in Michigan 
    fighting for rent control, social housing, and renters' rights 
    at the state level.`,

    category: 'Allied organizing groups',
  },
  {
    display: 'Homelessness Resource Map',
    href: 'https://goo.gl/maps/QMhWCTWoNQsjZmpX6',
    description:
      'Resources for folks who are unhoused and need day-to-day assistance; curated by Yvonne Winer.',

    category: 'Tenant rights',
  },
  {
    display: '15th District Case Search',
    href: 'https://micourt.courts.michigan.gov/case-search/court/D15',
    description: '',
    category: 'Service centers and legal advice',
  },
  {
    display: 'Landlord tenant handbook',
    href: 'https://www.legislature.mi.gov/publications/tenantlandlord.pdf',
    description: '',
    category: 'Tenant rights',
  },
  {
    display: 'Veterans Affairs Office',
    description:
      'The VA office also helps with emergency assistance for veterans.',
    href: 'https://www.washtenaw.org/Directory.aspx?DID=52',
    category: 'Service centers and legal advice',
  },
  {
    display: 'State Emergency Relief',
    description:
      'For low-income tenants to apply for financial assistance.',
    href: 'https://www.michigan.gov/mdhhs/assistance-programs/emergency-relief',
    category: 'Service centers and legal advice',
  },
]

export default function ResourcesPage() {
  const grouped = resources.reduce(
    (prev, curr) => {
      if (typeof prev[curr.category] === 'undefined') {
        return {
          ...prev,
          [curr.category]: [curr],
        }
      }
      return {
        ...prev,
        [curr.category]: [...prev[curr.category], curr],
      }
    },
    {} as {[key in Resource['category']]: Resource[]},
  )

  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={styles.container}
      >
        <Grid item className={styles.content}>
          <h1>Resources for Ann Arbor tenants</h1>
          <section>
            <ol>
              {Object.keys(grouped).map((key) => (
                <li key={key}>
                  <a href={'#' + makeID(key)}>{key}</a>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <p>
              We are more than happy to chat for any reason, but the
              expertise of members of the AATU comes from our
              organizing with our neighbors to form local tenant
              associations and win citywide legislative change. For
              other questions, and especially to get in contact with a
              lawyer, see the resources below.
            </p>
          </section>
          {Object.entries(grouped).map(([key, resources]) => {
            return (
              <section className={styles.resourceSection} key={key}>
                <h2 id={makeID(key)}>{key}</h2>
                {resources.map((resource) => (
                  <div key={resource.href}>
                    <h3 className={styles.resourceTitle}>
                      <OutboundLink href={resource.href}>
                        {resource.display}
                      </OutboundLink>
                    </h3>
                    <p>{resource.description}</p>
                  </div>
                ))}
              </section>
            )
          })}
        </Grid>
      </Grid>
    </>
  )
}
