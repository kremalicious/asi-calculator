import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import '@/styles/globals.css'
import '@/styles/loading-ui.css'
import Script from 'next/script'
import { title, description } from '@/constants'

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk'
})

export const metadata: Metadata = { title, description }

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://a.kretschmann.io/script.js"
          data-website-id="6565eff1-a1c8-4b3e-a6c4-08ecb00b06ab"
        />
      </head>
      <body className={hankenGrotesk.variable}>{children}</body>
    </html>
  )
}
