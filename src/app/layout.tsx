import './globals.css'
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
      <body>{children}</body>
    </html>
  )
}
