# FishingPlus Docs Site

`docs/` klasöründeki Markdown’ı GitBook tarzı bir SPA olarak yayınlayan
Vite + React + TypeScript + Tailwind projesi.

## Komutlar

```bash
cd site
npm install         # bağımlılıklar
npm run dev         # http://localhost:5173 — canlı yeniden yükleme
npm run typecheck   # TS doğrulama
npm run build       # dist/ klasörüne statik build
npm run preview     # build’i lokal sunucuda denemek için
```

> Node 20+ önerilir.

## İçerik kaynağı

Markdown dosyaları **`../docs/`** altında tutulur. Site bunları
`import.meta.glob('../../docs/**/*.md', ...)` ile build sırasında
inline’a alır; çalışma zamanında fetch yapılmaz, tamamen statik
çıkar.

Yeni sayfa eklemek için:

1. `docs/<bölüm>/<dosya>.md` oluştur (opsiyonel olarak YAML frontmatter
   `description:` alanı koy).
2. `site/src/lib/navigation.ts` içindeki ilgili `NavSection`’a
   `{ title, path, slug }` ekle. `slug` yeni dosyanın `docs/`’a göreli
   yoludur (örn. `world/new-system`).
3. Dev sunucusu otomatik yeniler.

## Mimari

- `src/lib/content.ts` — markdown loader + arama indeksi.
- `src/lib/navigation.ts` — kenar çubuğu + prev/next için tek doğruluk
  kaynağı.
- `src/components/Layout.tsx` — kabuk: TopBar, Sidebar (desktop /
  mobile drawer), arama dialogu.
- `src/components/MarkdownPage.tsx` — react-markdown + remark-gfm +
  rehype-slug + rehype-autolink-headings + rehype-highlight.
- `src/components/OnThisPage.tsx` — sağ kenardaki “bu sayfada” menüsü
  (IntersectionObserver ile aktif başlığı işaretler).
- `src/components/SearchDialog.tsx` — `Ctrl+K` ile açılan arama
  (basit `includes` skorlaması).
- Tema: `light` / `dark`. `localStorage: fp-theme` anahtarı kullanılır,
  ilk render öncesi `index.html`’deki inline script flash’ı önler.

## Dağıtım

Build çıktısı tamamen statik (`dist/`). SPA olduğu için sunucunun
404’leri `index.html`’e fallback etmesi gerekir.

### Vercel

`site/` klasörünü Vercel’de bir proje olarak içeri al. Framework:
**Vite**. Vercel SPA fallback’i otomatik halleder.

### Netlify

`site/` → "Deploy site". Build komutu `npm run build`, publish
klasörü `dist`. `public/_redirects` dosyası zaten SPA fallback için
yapılandırılmış (`/*  /index.html  200`).

### Cloudflare Pages

Framework: **Vite**. Build komutu `npm run build`, output `dist`.
SPA mode için `dist/_redirects` veya `_headers` dosyası
kopyalanır — `public/_redirects` bu işi görür.

### GitHub Pages

GitHub Pages SPA fallback’ı doğrudan desteklemez. İki seçenek:

1. **HashRouter’a geç** — `src/main.tsx` içinde `BrowserRouter`’ı
   `HashRouter` ile değiştir. URL’ler `/#/…` biçimine geçer ama
   ekstra yapılandırma gerekmez.
2. **404.html hack’i** — `dist/index.html`’i `dist/404.html` olarak
   da kopyala. Bilinmeyen yollar SPA’nın yüklenmesini tetikler.

Repo kökünde değil de `<repo>/site/` yayını için `vite.config.ts`’e
`base: '/<repo-adı>/'` ekle.

### Statik nginx / Apache

`dist/` klasörünü servis et, 404’leri `index.html`’e yönlendir.
Örnek nginx satırı:

```
try_files $uri $uri/ /index.html;
```

## Lisans

İçerik FishingPlus projesine aittir; bu site iskeleti aynı repo
altındadır.
