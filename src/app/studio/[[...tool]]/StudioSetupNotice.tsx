export default function StudioSetupNotice() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '42rem',
        margin: '4rem auto',
        padding: '0 1.5rem',
        lineHeight: 1.6,
      }}
    >
      <h1>Sanity Studio is not connected yet</h1>
      <p>
        The schemas and queries are all in place, but this deployment
        has no Sanity project attached. Create a project at
        sanity.io/manage, then set the environment variables below and
        redeploy.
      </p>
      <pre
        style={{
          background: '#f4f4f5',
          padding: '1rem',
          borderRadius: '0.5rem',
          overflowX: 'auto',
        }}
      >
        {[
          'NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id',
          'NEXT_PUBLIC_SANITY_DATASET=production',
        ].join('\n')}
      </pre>
      <p>
        Content lives in the dataset itself. Until a project is
        attached, every page will render empty.
      </p>
    </div>
  )
}
