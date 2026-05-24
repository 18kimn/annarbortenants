import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import type {Metadata} from 'next'
import {PT_Sans, Oswald} from 'next/font/google'

const ptSans = PT_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body-pt-sans',
  display: 'swap',
})

const oswald = Oswald({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ann Arbor Tenants Union',
  description:
    'The Ann Arbor Tenants Union is a collective of tenants working together to improve rentership for all in the Ann Arbor area.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${ptSans.variable} ${oswald.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
