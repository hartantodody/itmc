import Header from '@/components/layout/header'
import './globals.css'
import { satoshi, cabinetGrotesk, jetbrainsMono } from '@/lib/fonts'
import { defaultSeo } from '@/lib/seo'
import type { Metadata } from 'next'
import Footer from '@/components/layout/footer'

export const metadata: Metadata = defaultSeo

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='id'>
      <body
        className={`${satoshi.variable} ${cabinetGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
