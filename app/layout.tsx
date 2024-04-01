import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/loading-ui.css'

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk'
})

export const metadata: Metadata = {
  title: 'ASI Calculator',
  description: 'See how much ASI you get for your OCEAN, AGIX, or FET.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={hankenGrotesk.variable}>{children}</body>
    </html>
  )
}
