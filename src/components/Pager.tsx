import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { flatNav } from '../lib/navigation'

export function Pager({ currentPath }: { currentPath: string }) {
  const idx = flatNav.findIndex((i) => i.path === currentPath)
  if (idx === -1) return null
  const prev = idx > 0 ? flatNav[idx - 1] : null
  const next = idx < flatNav.length - 1 ? flatNav[idx + 1] : null
  if (!prev && !next) return null

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:grid-cols-2">
      {prev ? (
        <Link
          to={prev.path}
          className="group flex flex-col items-start rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700 dark:hover:bg-brand-950/30"
        >
          <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <ArrowLeft size={12} /> Önceki
          </span>
          <span className="mt-1 text-sm font-medium text-zinc-900 group-hover:text-brand-700 dark:text-zinc-100 dark:group-hover:text-brand-300">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.path}
          className="group flex flex-col items-end rounded-lg border border-zinc-200 bg-white p-4 text-right transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-700 dark:hover:bg-brand-950/30 sm:col-start-2"
        >
          <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            Sonraki <ArrowRight size={12} />
          </span>
          <span className="mt-1 text-sm font-medium text-zinc-900 group-hover:text-brand-700 dark:text-zinc-100 dark:group-hover:text-brand-300">
            {next.title}
          </span>
        </Link>
      ) : null}
    </div>
  )
}
