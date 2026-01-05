type SanityImage = any

type AlbumForHero = {
  _id: string
  images: SanityImage[]
}

export function pickHeroSlideshowImages(albums: AlbumForHero[], target = 6) {
  const cleaned = (albums ?? [])
    .map((a) => ({
      ...a,
      images: (a.images ?? []).filter((img) => Boolean(img?.asset))
    }))
    .filter((a) => a.images.length > 0)

  if (cleaned.length === 0) return []

  const roundRobin = (perAlbumFirstPass: number) => {
    const out: SanityImage[] = []
    const idx = cleaned.map(() => 0)

    // First pass: ambil X per album
    for (let k = 0; k < perAlbumFirstPass; k++) {
      for (let i = 0; i < cleaned.length && out.length < target; i++) {
        const a = cleaned[i]
        const j = idx[i]
        if (j < a.images.length) {
          out.push(a.images[j])
          idx[i] = j + 1
        }
      }
    }

    // Fill remaining: lanjut round-robin sampai target atau habis
    let progressed = true
    while (out.length < target && progressed) {
      progressed = false
      for (let i = 0; i < cleaned.length && out.length < target; i++) {
        const a = cleaned[i]
        const j = idx[i]
        if (j < a.images.length) {
          out.push(a.images[j])
          idx[i] = j + 1
          progressed = true
        }
      }
    }

    return out
  }

  const n = cleaned.length

  // aturan “biar ga lucu”
  if (n >= target) return roundRobin(1) // banyak album → 1 per album
  if (n >= 4) return roundRobin(1) // 4–5 album → 1 dulu, sisanya fill
  if (n >= 2) return roundRobin(2) // 2–3 album → 2 per album
  return cleaned[0].images.slice(0, Math.min(target, 6)) // 1 album → 4–6
}
