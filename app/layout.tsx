import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/loading-ui.css'
import { description, font, isProduction, liveUrl, title } from '@/constants'
import Script from 'next/script'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: liveUrl },
  metadataBase: new URL(liveUrl)
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest/manifest.webmanifest" />

        {isProduction ? (
          <Script
            async
            src="https://a.kretschmann.io/script.js"
            data-website-id="6565eff1-a1c8-4b3e-a6c4-08ecb00b06ab"
          />
        ) : null}
      </head>
      <body className={font.variable}>{children}</body>
    </html>
  )
}
