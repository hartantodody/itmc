import type { SchemaTypeDefinition } from 'sanity'
import { trainingPackageType } from './trainingPackage'
import { galleryAlbumType } from './galleryAlbum'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [galleryAlbumType, trainingPackageType]
}
