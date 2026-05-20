import { Link } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

interface TopBarProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

export function TopBar({ onMenuClick, onSearchClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4 lg:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 lg:hidden"
          aria-label="Menüyü aç"
        >
          <Menu size={18} />
        </button>

        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M6.5 12c3-4.5 8.5-6 13-4-1 5.5-6.5 8.5-11 7a3 3 0 0 1-2-3Z" />
              <circle cx="14" cy="10" r=".8" fill="currentColor" />
            </svg>
          </span>
          <span>FishingPlus</span>
          <span className="hidden text-xs font-normal text-zinc-500 dark:text-zinc-400 sm:inline">
            / docs
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchClick}
            className="hidden h-9 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200 sm:inline-flex"
            aria-label="Ara"
          >
            <Search size={14} />
            <span>Ara…</span>
            <kbd className="ml-4 rounded border border-zinc-200 bg-zinc-50 px-1.5 text-[10px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              Ctrl K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onSearchClick}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:hidden"
            aria-label="Ara"
          >
            <Search size={16} />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
