import { parseFrontmatter, extractFirstHeading, type ParsedDoc } from './frontmatter'

// Eager glob — Vite inlines every markdown file in ../../docs at build time.
// Files are imported as raw strings.
const rawModules = import.meta.glob('../../docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

export interface DocEntry extends ParsedDoc {
  slug: string
  title: string
  description: string
}

function slugFromKey(key: string): string {
  // key looks like '../../docs/getting-started/architecture.md'
  return key.replace(/^.*\/docs\//, '').replace(/\.md$/, '')
}

const cache = new Map<string, DocEntry>()

for (const [key, raw] of Object.entries(rawModules)) {
  const slug = slugFromKey(key)
  const parsed = parseFrontmatter(raw)
  const heading = extractFirstHeading(parsed.body) ?? slug
  cache.set(slug, {
    slug,
    title: heading,
    description: parsed.meta.description ?? '',
    meta: parsed.meta,
    body: parsed.body
  })
}

export function getDoc(slug: string): DocEntry | null {
  return cache.get(slug) ?? null
}

export function allSlugs(): string[] {
  return Array.from(cache.keys())
}

export function searchDocs(query: string): DocEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const results: { doc: DocEntry; score: number }[] = []
  for (const doc of cache.values()) {
    const hay = (doc.title + '\n' + doc.description + '\n' + doc.body).toLowerCase()
    if (!hay.includes(q)) continue
    // Prefer title hits, then description hits, then body hit count.
    let score = 0
    if (doc.title.toLowerCase().includes(q)) score += 50
    if (doc.description.toLowerCase().includes(q)) score += 20
    score += (hay.match(new RegExp(escapeRegExp(q), 'g')) ?? []).length
    results.push({ doc, score })
  }
  results.sort((a, b) => b.score - a.score)
  return results.slice(0, 20).map((r) => r.doc)
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
