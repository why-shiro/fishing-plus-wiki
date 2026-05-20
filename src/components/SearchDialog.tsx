import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchDocs } from '../lib/content'
import { findItemBySlug } from '../lib/navigation'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query) return []
    return searchDocs(query)
      .map((doc) => {
        const item = findItemBySlug(doc.slug)
        return item
          ? {
              path: item.path,
              title: item.title,
              description: doc.description || excerpt(doc.body, query)
            }
          : null
      })
      .filter((x): x is { path: string; title: string; description: string } => x !== null)
  }, [query])

  useEffect(() => {
    if (open) {
      setActive(0)
      // focus on next tick so the input is mounted
      const id = requestAnimationFrame(() => inputRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
    setQuery('')
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        const r = results[active]
        if (r) {
          e.preventDefault()
          navigate(r.path)
          onClose()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, results, active, navigate, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <Search className="text-zinc-400" size={16} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder="Doküman içinde ara…"
            className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="Kapat"
          >
            <X size={14} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {query && results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Sonuç bulunamadı.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Yazmaya başla — başlık ve içerik aratılır.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {results.map((r, i) => (
                <li key={r.path}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      navigate(r.path)
                      onClose()
                    }}
                    className={[
                      'block w-full rounded-md px-3 py-2 text-left text-sm transition',
                      i === active
                        ? 'bg-brand-50 text-brand-900 dark:bg-brand-600/15 dark:text-brand-200'
                        : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                    ].join(' ')}
                  >
                    <div className="font-medium">{r.title}</div>
                    {r.description ? (
                      <div className="mt-0.5 line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400">
                        {r.description}
                      </div>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-zinc-200 px-3 py-2 text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span>↑ ↓ gezin, ↵ aç, Esc kapat</span>
          <span>FishingPlus Docs</span>
        </div>
      </div>
    </div>
  )
}

function excerpt(body: string, query: string): string {
  const idx = body.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return body.slice(0, 120).replace(/\s+/g, ' ').trim() + '…'
  const start = Math.max(0, idx - 40)
  const end = Math.min(body.length, idx + 80)
  return (start > 0 ? '…' : '') + body.slice(start, end).replace(/\s+/g, ' ').trim() + '…'
}
