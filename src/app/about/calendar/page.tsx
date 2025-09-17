import {OutboundLink} from '@/components/OutboundLink'
import classes from './page.module.css'
export default function Page() {
  const iframeUrl =
    'https://calendar.google.com/calendar/embed?src=0a522e6158ce3b00aa0ac154a8e38adad98e3680521880c2aa5349a579c1348d%40group.calendar.google.com&title=AATU%20Meetings%20and%20Events&Ictz=America%2FNew_York&mode=WEEK'
  return (
    <>
      <div style={{maxWidth: '72ch'}}>
        <p>
          The best way to get to know your fellow tenants and take
          action together is by joining an upcoming meeting, listed in
          the calendar below.
        </p>

        <p>
          There's several kinds of meetings taking place within the
          union:
          <ul>
            <li>
              <strong>Citywide organizing committee: </strong> A
              weekly gathering space for organizers across the city to
              touch base on strategy and support organizing campaigns
              at local associations.
            </li>
            <li>
              <strong>Building-based organizing committee: </strong>{' '}
              These efforts, convened at a single building or
              apartment complex, are the lifeblood of our union and
              the way we build local power.
            </li>
            <li>
              <strong> Other committee meetings: </strong> Our
              communications committee meets regularly, and we're
              working to set up new committees.
            </li>
            <li>
              <strong> Citywide campaigns: </strong> For organizing
              towards legislative victories, building solidarity with
              other organizations, and other citywide initiatives.
            </li>
          </ul>
        </p>

        <p>
          View the calendar in a new tab by navigating to{' '}
          <OutboundLink href="https://bit.ly/AATUCalendar">
            bit.ly/AATUCalendar
          </OutboundLink>
          . You can add this to your own Google Calendar to be
          reminded of meetings and see updates to this schedule by
          clicking "Add to Google Calendar" at the bottom left of the
          calendar.
        </p>
      </div>
      <iframe
        className={classes.frameContainer}
        src={iframeUrl}
        style={{border: 0, margin: '3rem'}}
      ></iframe>
    </>
  )
}
