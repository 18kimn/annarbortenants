export default function TermsPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        maxWidth: '72ch',
      }}
    >
      <h1>Terms of Service</h1>
      <h2>Message rates and frequency</h2>
      <p>
        By providing your cell phone number, you agree to receive
        texts to your number from Ann Arbor Tenants Union. Texts will
        include messages about inform tenant union membership of
        general meetings and other important events. Msg frequency
        varies. Reply STOP to opt-out. Reply HELP for help or more
        information. Msg and data rates may apply. Privacy Policy can
        be found here: https://annarbortenants.org/about/privacy.
      </p>
      <p>
        By providing your mobile number and opting in to receive SMS
        communications, you give express consent to receive text
        messages from the Ann Arbor Tenants Union. You do not need to
        opt in to SMS messages to attend meetings or participate in
        any other service. Message frequency varies, and will
        typically range from approximately two messages per month.
        Additional messages may be sent based on urgent matters.
      </p>
      <h2>Data rates</h2>
      <p>
        Message and data rates may apply. Check with your mobile
        service provider for details on your plan’s rates. The Ann
        Arbor Tenants Union is not responsible for any charges related
        to SMS messages.
      </p>
      <p>
        For help, reply HELP or email us at{' '}
        <a href="mailto:annarbortenantsunion@gmail.com">
          <u>annarbortenantsunion@gmail.com</u>
        </a>
        . You can unsubscribe at any time by replying STOP to messages
        you receive from us.
      </p>
    </div>
  )
}
