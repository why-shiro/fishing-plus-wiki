import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  depth: number
}

interface OnThisPageProps {
  /** Re-scan headings when this marker changes (e.g. slug). */
  marker: string
}

export function OnThisPage({ marker }: OnThisPageProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string | null>(null)

  // Scan the rendered DOM for headings with ids (rehype-slug populated them).
  // We re-scan whenever the page changes.
  useEffect(() => {
    // Defer to next tick so react-markdown's tree is mounted.
    const id = requestAnimationFrame(() => {
      const nodes = document.querySelectorAll<HTMLElement>(
        'article h2[id], article h3[id], article h4[id]'
      )
      const list: Heading[] = []
      nodes.forEach((node) => {
        const depth = Number(node.tagName.substring(1))
        list.push({
          id: node.id,
          text: (node.textContent ?? '').replace(/#$/, '').trim(),
          depth
        })
      })
      setHeadings(list)
      setActive(list[0]?.id ?? null)
    })
    return () => cancelAnimationFrame(id)
  }, [marker])

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] }
    )
    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return <aside className="hidden xl:block" />

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Bu sayfada
        </h4>
        <ul className="space-y-1.5 border-l border-zinc-200 dark:border-zinc-800">
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: `${(h.depth - 2) * 0.75 + 0.75}rem` }}>
              <a
                href={`#${h.id}`}
                className={[
                  '-ml-px block border-l py-0.5 text-sm transition',
                  active === h.id
                    ? 'border-brand-500 font-medium text-brand-700 dark:border-brand-400 dark:text-brand-300'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                ].join(' ')}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
