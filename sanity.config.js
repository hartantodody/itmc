import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { projectId, dataset, apiVersion } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'IMTC CMS',
  projectId,
  dataset,
  apiVersion,

  plugins: [structureTool({ structure }), visionTool()],

  schema
})
