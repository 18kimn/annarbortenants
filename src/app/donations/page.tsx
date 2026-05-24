"use client";
import Script from "next/script";

export default function Page() {
  return (
    <>
      <h1>Donations and Solidarity Dues</h1>

      <h2>How can I donate?</h2>
      <p>Visit our PayPal page using the button below:</p>

      <div
        id="donate-button-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-5)",
          background: "var(--surface-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          margin: "var(--space-5) 0 var(--space-8)",
        }}
      >
        <div id="donate-button"></div>
        <Script
          src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
          strategy="afterInteractive"
          onLoad={() => {
            // @ts-ignore
            if (window.PayPal) {
              // @ts-ignore
              window.PayPal.Donation.Button({
                env: "production",
                hosted_button_id: "Z8YKWKQCMNL4N",
                image: {
                  src: "https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif",
                  alt: "Donate with PayPal button",
                  title:
                    "PayPal - The safer, easier way to pay online!",
                },
              }).render("#donate-button");
            }
          }}
        />
      </div>

      <h2>Why donations?</h2>
      <p>
        A union is simply a group of individuals that share a common interest
        and will stand up for each other through a common organization to
        defend that interest. For tenants&apos; unions, that can take many
        forms, like helping put together events, helping other tenants in
        crisis. Donations are one way that we show each other that we, as
        tenants and neighbors, are committed to protecting each other and
        building infrastructure to support that cause.
      </p>

      <h2>Where has AATU&apos;s money to date come from?</h2>
      <p>
        To date, we&apos;ve received some support from the Central Student
        Government (CSG) at the University of Michigan. This allowed us to
        hire a part-time staff organizer in the fall of 2024. Individual AATU
        organizers have picked up the bill when it&apos;s clear that an
        expense needs to be paid. We hope that this donation process
        formalizes how we spend and encourages the expansion of the tenants
        union as an initiative made possible with contributions (through
        money, time, or anything else) from each of us.
      </p>

      <h2>What will my donations be used for?</h2>
      <p>
        At the time of writing in April 2026, our primary expenses comprise
        at most a few hundred dollars per month:
      </p>
      <ul>
        <li>
          We pay for some infrastructure like Action Network, website
          hosting, a Canva subscription, and a Bit.ly subscription.
        </li>
        <li>
          We put together events like our General Meetings, Know Your Rights
          trainings, and building-specific campaigns, which often require
          money to buy food and drinks or to reserve meeting spaces.
        </li>
      </ul>
      <p>
        Eventually, we&apos;d like to have enough support so that a staff
        organizer can be hired to empower various initiatives and accelerate
        the growth of our campaign. Big financial decisions like these will
        always be made with advance notice given to membership, and all
        members will be able to participate in decision-making, for instance
        through voting.
      </p>
    </>
  );
}
