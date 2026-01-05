import { urlFor } from '@/sanity/lib/image'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Images

export function safeImageUrl(image: any, w = 1400, h = 1050) {
  try {
    if (!image?.asset) return null
    return urlFor(image).width(w).height(h).fit('crop').auto('format').url()
  } catch {
    return null
  }
}
