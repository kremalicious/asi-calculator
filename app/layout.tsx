import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/loading-ui.css'
import Script from 'next/script'
import { title, description, font, liveUrl, isProduction } from '@/constants'
import { headers } from 'next/headers'

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
  const headersList = headers()
  const locale = headersList.get('x-locale')

  return (
    <html lang="en" data-locale={locale}>
      <head>
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
