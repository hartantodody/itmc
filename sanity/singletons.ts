/**
 * Documents that must exist exactly once.
 *
 * `siteSettings` was "singleton-ish" for a long time: nothing stopped a
 * second document being created, and the website just read whichever one
 * GROQ returned first. Harmless while it only held the hero stats — but it
 * now also holds the homepage hero photos, and an editor who accidentally
 * created a second settings document could spend an afternoon editing
 * photos that never appear on the site.
 *
 * Pinned to the ID of the document that already existed (created
 * 2026-01-06) rather than to a tidy literal like "siteSettings". Moving it
 * would mean a data migration on production; pinning means nothing in the
 * dataset changes at all. The Studio, the config and the website query all
 * read this one constant, so they can never disagree about which document
 * is "the" settings.
 */
export const SITE_SETTINGS_ID = '24c0a07d-cab0-4bc2-a066-b565ba4aea11'

/** Schema types restricted to a single, fixed document. */
export const SINGLETON_TYPES = new Set(['siteSettings'])
