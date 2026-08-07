import styles from '../Content.module.css'
import type {Association} from '@/sanity/types'

export default function AssociationList({
  associations,
  status,
  layout,
}: {
  associations: Association[]
  status?: Association['status']
  layout?: 'detailed' | 'list'
}) {
  const matching = associations.filter(
    (association) => association.status === status,
  )
  if (!matching.length) return null

  if (layout === 'list') {
    return (
      <ul>
        {matching.map((association) => (
          <li key={association._id}>{association.name}</li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {matching.map((association) => (
        <div key={association._id}>
          <h3 className={styles.associationName}>
            {association.name}
          </h3>
          {association.contactName && (
            <p>
              Contact: {association.contactName}
              {association.contactEmail && (
                <>
                  {' — '}
                  <a href={`mailto:${association.contactEmail}`}>
                    {association.contactEmail}
                  </a>
                </>
              )}
            </p>
          )}
        </div>
      ))}
    </>
  )
}
