import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import { getDoc } from '../lib/content'
import { findItemByPath } from '../lib/navigation'
import { Pager } from './Pager'
import { OnThisPage } from './OnThisPage'
import { NotFound } from './NotFound'

interface MarkdownPageProps {
  slug: string
}

export function MarkdownPage({ slug }: MarkdownPageProps) {
  const location = useLocation()
  const doc = getDoc(slug)
  const navItem = findItemByPath(location.pathname)

  // Scroll behavior: top by default, or to hash if present.
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug, location.hash])

  // Document title.
  useEffect(() => {
    if (!doc) {
      document.title = 'Bulunamadı — FishingPlus Docs'
      return
    }
    document.title = `${doc.title} — FishingPlus Docs`
  }, [doc])

  const body = useMemo(() => doc?.body ?? '', [doc])

  if (!doc) return <NotFound />

  return (
    <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_14rem]">
      <article className="min-w-0">
        <header className="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Doküman
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            {doc.title}
          </h1>
          {doc.description ? (
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">{doc.description}</p>
          ) : null}
        </header>

        <div className="prose prose-zinc max-w-none dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: 'wrap',
                  properties: { className: 'heading-anchor' }
                }
              ],
              [rehypeHighlight, { detect: true, ignoreMissing: true }]
            ]}
            // Strip the leading H1 (we render our own title above).
            components={{
              h1: () => null
            }}
          >
            {body}
          </ReactMarkdown>
        </div>

        <Pager currentPath={navItem?.path ?? location.pathname} />
      </article>

      <OnThisPage marker={slug} />
    </div>
  )
}
