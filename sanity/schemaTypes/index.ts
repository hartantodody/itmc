import type { SchemaTypeDefinition } from 'sanity'
import { trainingPackageType } from './trainingPackage'
import { galleryAlbumType } from './galleryAlbum'
import { siteSettings } from './siteSettings'
import { heroStat } from './heroStat'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, heroStat, galleryAlbumType, trainingPackageType]
}
