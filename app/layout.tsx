import { JsonLdBase } from '@/components/seo/jsonld'
import './globals.css'
import { satoshi, cabinetGrotesk, jetbrainsMono } from '@/lib/fonts'
import { defaultSeo } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = defaultSeo

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='id' className='overflow-x-clip' suppressHydrationWarning>
      <head>
        <JsonLdBase />
      </head>
      <body
        className={`overflow-x-hidden ${satoshi.variable} ${cabinetGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
