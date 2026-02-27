export default function PrivacyPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        maxWidth: '72ch',
      }}
    >
      <h1>Privacy policy</h1>
      <h2>Data collection and usage</h2>
      <p>
        We collect personal information that you voluntarily provide
        to us when you register as a member of the Ann Arbor Tenants
        Union. The personal information we collect may include the
        following:
      </p>
      <ul>
        <li>
          <p>Your name</p>
        </li>
        <li>
          <p>Your email</p>
        </li>
        <li>
          <p>Your phone number</p>
        </li>
        <li>
          <p>Your street address</p>
        </li>
        <li>
          <p>The name of your landlord</p>
        </li>
      </ul>
      <p>
        You can opt out of receiving SMS messages at any time by
        replying STOP to any text you receive from us. After you send
        STOP, you will receive one final message confirming your
        opt-out status. No further messages will be sent unless you
        re-enroll.
      </p>
      <h2>Data sharing and access</h2>
      <p>
        Your phone number and email will be available to AATU
        organizers that are coordinating General Meetings and other
        member-facing events, or those that respond to intakes to
        assist with issues.
      </p>
      <p>
        No other information will be shared about you to any other
        party unless required by law.
      </p>
      <h2>Opt-out and consumer rights</h2>
      <p>You have the:</p>
      <ul>
        <li>
          <p>
            Right to access your personal data as provided to the Ann
            Arbor Tenants Union
          </p>
        </li>
        <li>
          <p>Right to correct inaccuracies in your personal data</p>
        </li>
        <li>
          <p>Right to request deletion of your personal data</p>
        </li>
      </ul>
      <p>
        Please reach out to{' '}
        <a href="mailto:annarbortenantsunion@gmail.com">
          <u>annarbortenantsunion@gmail.com</u>
        </a>{' '}
        for more information or to exercise any of these rights.
      </p>
    </div>
  )
}
