import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-start py-16">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
        Sayfa bulunamadı
      </h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">
        Aradığın doküman bu sürümde yer almıyor olabilir. Sol kenardaki menüyü kullanarak
        gezinebilir veya ana sayfaya dönebilirsin.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-brand-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
      >
        Ana sayfaya dön
      </Link>
    </div>
  )
}
