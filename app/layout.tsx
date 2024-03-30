import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import './globals.css'

const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-firaCode' })

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
      <body className={firaCode.className}>{children}</body>
    </html>
  )
}
