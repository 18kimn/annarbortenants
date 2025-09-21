import classes from './summit.module.css'
import Image from 'next/image'
export default function Page() {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>The Inaugural Michigan Tenants Union Summit</h1>
        <div className={classes.logos}>
          <Image
            width="400"
            height="400"
            alt="Ann Arbor Tenants Union logo"
            src="/circle_logo.png"
          />
          <Image
            width="400"
            height="400"
            alt="Rent is Too Damn High Logo"
            src="/ritdh.png"
          />
          <Image
            width="400"
            height="400"
            alt="Detroit Tenants Union Logo"
            src="/dtu.jpg"
          />
        </div>
        <p>
          Organizers from <a href="/">the Ann Arbor Tenants Union,</a>{' '}
          <a href="https://www.instagram.com/detroittenantsunion/">
            the Detroit Tenants Union,
          </a>{' '}
          and
          <a href="https://mirentistoodamnhigh.com">
            Rent is too Damn High
          </a>{' '}
          are convening the first{' '}
          <strong>Michigan Tenants Union Summit</strong>!
        </p>
        <p>
          The MI Tenants Union Summit will be held on Saturday,
          October 4th, 2025 from 9am-5pm in Detroit, MI. Specific
          details on logistics will be distributed to organizers that
          RSVP-- confirm your spot at{' '}
          <a href="https://bit.ly/TenantSummitRSVP">
            bit.ly/TenantSummitRSVP
          </a>
          ! Event registration will be capped to 55 attendees.
        </p>
        <h2>What is the Michigan Tenants Union Summit?</h2>
        <p>
          It is a gathering of all active tenant unions across
          Michigan.
        </p>
        <h2>What is the goal of the Summit?</h2>
        <p>
          The Summit aims to strengthen the ties between unions across
          the state, facilitate knowledge-sharing, and begin laying
          the groundwork for unified action state-wide. We will be
          sharing organizing skills (including how to structure a
          lasting union, how to door-knock, having one-on-ones,
          writing ordinances, building effective teams, etc),
          power-mapping our state's housing market, identifying a
          statewide strategy to combat landlord power and keep bad
          actors in check, and discuss the state ban on rent control
          and other state housing legislation with SEIU.
        </p>
        <p>
          We are looking to bring experienced and new organizers
          together, as well as tenant union allies. While attendance
          is limited, unions can bring anywhere from 2-11 people to
          participate and travel expenses can be covered. Breakfast
          and lunch will be provided, and if you sign up before
          September 20th you will also receive a free t-shirt during
          the event. Following the Summit's conclusion there will also
          be a social event hosted at Northern Lights Lounge until
          7pm.
        </p>
        <h2>What will be discussed during the Summit?</h2>
        <p>
          The Summit is organized around strategizing led by the
          organizers that attend the conference, with training and
          presentations to facilitate and ground that strategizing.
          Our tentative agenda is as follows:
          <ul>
            <li>8:30am: Catered breakfast</li>
            <li>9:30am: Opening remarks from event organizers</li>
            <li>10:00am: Shareouts from across different groups</li>
            <li>
              11:00am: Skill-building - Doorknocking/"AHA"
              conversations for leader identification
            </li>
            <li>12:00pm: Catered Lunch</li>
            <li>1:00pm: Role playing exercise</li>
            <li>
              1:30pm: Building strong teams and running effective
              meetings
            </li>
            <li>2:30pm: Presentations from allied organizations</li>
            <li>
              3:30pm: Statewide envisioning and a united front of
              organized tenants
            </li>
            <li>5:00pm: social event</li>
          </ul>
        </p>
        <h2>Where can I direct questions regarding the Summit?</h2>
        <p>
          Please direct questions to{' '}
          <a href="mailto:annarbortenantsunion@gmail.com">
            annarbortenantsunion@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
