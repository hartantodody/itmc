import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

export const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/satoshi/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/satoshi/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../public/fonts/satoshi/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic'
    }
  ],
  variable: '--font-sans',
  display: 'swap'
})

export const cabinetGrotesk = localFont({
  src: [
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2',
      weight: '800',
      style: 'normal'
    }
  ],
  variable: '--font-heading',
  display: 'swap'
})

/* ✅ MONO (Google Font) */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})
