// Tiny YAML frontmatter splitter — supports `key: value` lines, single line only.
// Adequate for the docs we ship; not a full YAML parser.

export interface ParsedDoc {
  meta: Record<string, string>
  body: string
}

export function parseFrontmatter(raw: string): ParsedDoc {
  if (!raw.startsWith('---')) return { meta: {}, body: raw }
  const closer = raw.indexOf('\n---', 3)
  if (closer === -1) return { meta: {}, body: raw }

  const headBlock = raw.slice(3, closer).trim()
  // Strip the closing fence and any leading newline after it.
  let body = raw.slice(closer + 4)
  if (body.startsWith('\n')) body = body.slice(1)

  const meta: Record<string, string> = {}
  for (const line of headBlock.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    // Unwrap surrounding quotes.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    meta[key] = value
  }

  return { meta, body }
}

export function extractFirstHeading(body: string): string | null {
  const m = body.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : null
}
