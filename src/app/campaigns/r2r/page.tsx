import { OutboundLink } from "@/components/OutboundLink";

export default function R2R() {
  return (
    <>
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
        Please do not hesitate to contact us if you have any questions or would
        like to join our organization.
      </p>
      <p>
        Contact us at{" "}
        <OutboundLink href="mailto:annarbortenantsunion@gmail.com">
          AnnArborTenantsUnion@gmail.com
        </OutboundLink>
      </p>
    </>
  );
}
