import { OutboundLink } from "@/components/OutboundLink";
import styles from "./page.module.css";
import Image from "next/image";
export default function JunkFeesPage() {
  return (
    <div>
      <h1>Trash the Junk Fees!</h1>
      <h2>A campaign and victory for tenants</h2>
      <p>
        <em>Last updated on January 8th, 2025</em>
      </p>
      <Image
        className={styles.councilImage}
        alt="AATU organizers stand with Co-sponsors Radina and Harrison"
        src="/council_pic.jpg"
        width={490}
        height={327}
      />
      <p>
        <strong>What you need to know:</strong> Tenants secured a major victory
        through the passage of an ordinance to limit application fees to $50.
        More work remains in both legislation and tenant organizing to stop
        predatory fees by landlords and protect tenants from hidden costs of
        renting.
      </p>
      <hr />
      <p>
        Ann Arbor landlords have taken advantage of low supply and high demand
        for apartments in Ann Arbor to rake in cash throughout the application
        process and during tenancy. These fees add to already-exorbitant costs
        of rent for an apartment and hide an apartment&apos;s total cost. A core
        part of the AATU&apos;s platform throughout 2024 and 2025 has been the
        complete elimination of all such fees.
      </p>
      <p>
        Waitlist fees, application fees, and other fees paid before move-in or
        signing a lease have a disproportionate impact on low-income renters and
        renters of color because they have to on average submit more
        applications than white and wealthy renters to find a rental unit. These
        fees raise the barrier of entry to housing and are turning Ann Arbor
        into a city accessible only to wealthy, white renters.
      </p>
      <p>
        The Ann Arbor Tenants Union has documented waitlist fees costing nearly{" "}
        <OutboundLink href="https://www.michigandaily.com/news/ann-arbor/ann-arbor-landlords-continue-to-charge-waitlist-fees-to-prospective-tenants/">
          $7,000 for a single rental unit.
        </OutboundLink>{" "}
        Landlords allege that these are not waitlist fees but instead
        &quot;options contracts&quot; that credit tenants&apos; accounts after a
        lease is signed, but the reality is that landlords keep these fees and
        profit after showing a tenant an apartment not fit for living. Tenants
        are either forced to forfeit exorbitant amounts or are pressured into
        living in substandard housing.
      </p>
      <p>
        These waitlist fees are particularly egregious because they come with no
        guarantee of signing a lease. However, waitlist fees are only one part
        of the larger rental junk fee problem: tenants face trash fees, pet
        fees, move-in fees, move-out fees, cleaning fees, administrative fees,
        sewage fees, landscaping fees, and more, nearly all of which are
        assessed without providing any benefit to tenants. Tenants need a broad
        legislative approach to protect them from profiteering landlords.
      </p>
      <p>
        AATU organizers{" "}
        <OutboundLink href="https://www.wemu.org/wemu-news/2024-04-30/ann-arbor-tenants-union-takes-stand-against-waitlist-fees-and-other-high-costs-in-rental-housing">
          held a rally
        </OutboundLink>{" "}
        in April 2024 to call for an end to these practices, demanding
        legislation from the local to state level. We also began circulating a{" "}
        <OutboundLink href="http://bit.ly/A2JunkFees">petition</OutboundLink>{" "}
        and tabling in public venues for this effort, obtaining over 230
        signatures.
      </p>
      <p>
        In the fall of 2023, City Councilmembers Travis Radina and Cynthia
        Harrison introduced{" "}
        <OutboundLink href="https://a2gov.legistar.com/View.ashx?M=F&ID=13634421&GUID=B787D2E7-44F4-4486-AE59-AB8501DF5CCF">
          legislation
        </OutboundLink>{" "}
        to cap pre-tenancy fees at $50. This ordinance was passed into law on
        January 6th, 2025, with unanimous support from Council members. Several
        members from the AATU made comments urging for its adoption. See these
        comments{" "}
        <OutboundLink href="https://ctnvideo.a2gov.org/CablecastPublicSite/show/10214?site=1">
          here
        </OutboundLink>
        , beginning at around 58:48.
      </p>
      <p>
        This is an important victory for tenants and a blow to landlords&apos;
        predatory leasing practices. However, the bill does not address fees
        assessed during tenancy, and the state&apos;s lack of rent control means
        that landlords could easily simply raise rent to extract more from
        tenants. We consider this a win in transparency for renters, but
        ultimately tenant unions to negotiate fair rents and statewide
        legislation for rent stabilization are needed to ensure all tenants are
        protected.
      </p>
      <p>
        Let&apos;s keep fighting for tenant power to build a just, affordable,
        and dignified living experience in Ann Arbor!
      </p>
      <p>
        See{" "}
        <OutboundLink href="/release_1-7-24.pdf">
          our press release
        </OutboundLink>{" "}
        for additional details.
      </p>
    </div>
  );
}
