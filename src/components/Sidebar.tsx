import { NavLink } from 'react-router-dom'
import { navigation } from '../lib/navigation'

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <nav aria-label="Doküman gezintisi" className="px-4 py-6">
      <ul className="space-y-7">
        {navigation.map((section) => (
          <li key={section.title}>
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      [
                        'block rounded-md px-2 py-1.5 text-sm transition',
                        isActive
                          ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-600/10 dark:text-brand-300'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100'
                      ].join(' ')
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
