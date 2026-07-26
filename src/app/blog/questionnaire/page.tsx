import Questionnaire from './Questionnaire'
import {Section, Container} from '@/components/Layout'
import styles from './page.module.css'
import {OutboundLink} from '@/components/OutboundLink'

export const metadata = {
  title: '2026 city council candidate questionnaire',
}

export default function QuestionnairePage() {
  return (
    <Section size="spacious">
      <Container width="expanded">
        <header>
          <div style={{color: 'var(--ink-muted)'}}>July 26, 2026</div>
          <h1>2026 City Council Tenants&rsquo; Questionnaire</h1>
        </header>
        <Questionnaire>
          <div className={styles.intro}>
            <p>
              In July 2026, organizers from the Ann Arbor Tenants
              Union and the Huron Valley Democratic Socialists of
              America distributed a candidate questionnaire ahead of
              this year&rsquo;s Democratic primary race in Ann Arbor,
              inspired by other surveys like those run by{' '}
              <OutboundLink href="https://annarborccl.org/index.php/2026/06/25/climate-policy-questionnaire/">
                Citizens&rsquo; Climate Lobby
              </OutboundLink>
              ,{' '}
              <OutboundLink href="https://www.walkbikewashtenaw.org/single-post/2026-ann-arbor-city-council-candidate-questionnaire">
                Walk Bike Washtenaw
              </OutboundLink>
              , and{' '}
              <OutboundLink href="https://www.moreneighborsa2.org/2026-election-questionnaire">
                Neighbors for More Neighbors
              </OutboundLink>
              .
            </p>

            <p>The questions were as follows:</p>
            <ol>
              <li>
                What do you view as the primary obstacle to solving
                Ann Arbor&rsquo;s affordability crisis?
              </li>
              <li>
                During your term as councilmember [4 years], what
                would you as councilmember propose to increase housing
                affordability in Ann Arbor?
              </li>
              <li>
                What steps do you propose to help tenants advocate for
                themselves to improve their living conditions?
              </li>
              <li>
                How should the city incentivize increasing the supply
                of more low-cost housing?
              </li>
              <li>
                Spaces that have been marketed as
                &ldquo;affordable&rdquo; have also sat vacant for long
                periods of time such as Legacy Apartments owned by
                Landmark. What would you do differently with Legacy
                and how can you prevent that from happening again?
              </li>
            </ol>

            <p>
              Disclaimer: The Ann Arbor Tenants Union is not a neutral
              party. Our beliefs can be summarized in that we are
              pro-tenants-rights, pro-regulation of landlords, and
              believe above all else that renters hold the power to
              our own victory in our fight for dignified housing (we
              need not wait on the benevolence of politicians). We
              support strong and swift action from elected officials
              in that pursuit. We have also endorsed candidates this
              year already; see{' '}
              <OutboundLink href="/blog/yousef-dave-endorsement">
                here
              </OutboundLink>
              .
            </p>

            <p>
              We gave candidates until July 24, 2026 to respond to the
              questionnaire. We are grateful for everyone&rsquo;s
              speedy (yet still very thoughtful) responses.
            </p>
            <p>
              Publishing a candidate&rsquo;s answers is not an
              endorsement.
            </p>
          </div>
        </Questionnaire>
      </Container>
    </Section>
  )
}
