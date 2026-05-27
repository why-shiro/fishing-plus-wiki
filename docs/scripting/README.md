# FishingPlus Wiki Kaynakları

Bu klasör, [why-shiro/fishing-plus-wiki](https://github.com/why-shiro/fishing-plus-wiki) reposunda
yayınlanan dokümantasyonun kaynak sürümünü tutar. Markdown dosyalarını burada düzenle, sonra wiki
reposuna kopyala veya bir release script'inden senkronize et.

> RELEASE.md'de geçen wiki repo workflow'u sadece jar artifact'ları taşıyor; dokümantasyon
> manuel kopyalanır (veya ayrı bir script eklenebilir).

## İçerik

| Dosya | Wiki sayfa karşılığı | Açıklama |
|---|---|---|
| `FPScript.md` | FPScript | Tam dil/runtime/API referansı. Syntax, scope, control flow, event/state/hook yapısı, bridge API'ler, global fonksiyonlar, sabitler, SeaEvent entegrasyonu, sınırlar ve tam örnek. |

## Stil

- **Dil:** Türkçe (kod örnekleri ve API ismi haricinde).
- **Heading'ler:** GitHub markdown başlıkları (`#`, `##`, `###`). Wiki tarafı çoğu motorda aynı şekilde
  render eder.
- **TOC:** Uzun dokümanlarda manuel olarak `[#bölüm-adı]` anchor'lı.
- **Kod blokları:** Dil tag'i `fps` FPScript için (highlighter olmasa da dokümanda doğru filtrelenir),
  diğer kod parçaları için `yaml`, `java`, `bash` vb.

## Güncelleme akışı

1. Bu klasördeki `.md` dosyasını düzenle.
2. Değişikliği FishingPlus repo'suna commit et.
3. fishing-plus-wiki repo'suna manuel kopyala — wiki repo'su clone'lanmışsa:
   ```bash
   cp docs/wiki/FPScript.md ../fishing-plus-wiki/FPScript.md
   cd ../fishing-plus-wiki
   git add FPScript.md
   git commit -m "Update FPScript reference"
   git push
   ```

> İleride bu kopyalamayı `scripts/release.ps1`'e ekleyebilirsin (RELEASE.md jar push akışına paralel
> bir docs push adımı).
