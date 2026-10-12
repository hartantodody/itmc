import type { StructureResolver } from 'sanity/structure'
import { SINGLETON_TYPES, SITE_SETTINGS_ID } from './singletons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('IMTC CMS')
    .items([
      // Opens the one settings document directly — no list to pick from,
      // so there is no way to end up editing the wrong one.
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId(SITE_SETTINGS_ID)
            .title('Site Settings')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.has(item.getId() ?? '')
      )
    ])
