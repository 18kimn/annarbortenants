'use client'

import dynamic from 'next/dynamic'

// Loaded client-side only, and kept in a separate module on purpose.
// `sanity.config` pulls in `sanity`, which pulls in
// `isomorphic-dompurify`, which constructs a JSDOM at import time and
// throws when webpack bundles it for server rendering. Importing the
// config here instead of behind this boundary reintroduces the crash,
// and `serverExternalPackages` does not help: it does not apply to the
// SSR pass of client components.
export default dynamic(() => import('./StudioClient'), {ssr: false})
