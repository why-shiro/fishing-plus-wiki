import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { MarkdownPage } from './components/MarkdownPage'
import { NotFound } from './components/NotFound'
import { flatNav } from './lib/navigation'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {flatNav.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<MarkdownPage slug={item.slug} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
