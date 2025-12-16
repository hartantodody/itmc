export interface Environment {
  siteUrl: string
  siteName: string
  mode: 'development' | 'production'

  // TODO : SETUP SANITY KALAU UDAH SIAP INTEGRASI
  sanity?: {
    projectId?: string
    dataset?: string
    apiVersion?: string
    useCdn?: boolean
  }
}

const mode: Environment['mode'] =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME || 'Indonesia MICE Training Center'

const env: Environment = {
  siteUrl,
  siteName,
  mode
}

export default env
