---
description: Dil dosyaları, fallback davranışı ve display anahtarları.
---

# Lokalizasyon

Sınıflar: `messages.LanguageManager`, `messages.LanguageGui`,
`messages.MessageManager`, `messages.PlayerPrefs`.

## Konfigürasyon

`settings.yml`:

```yaml
language: en
```

| Alan | Açıklama |
|------|----------|
| `language` | Varsayılan dil kodu |

## Dosya yapısı

- Dil dosyaları: `messages/messages_<kod>.yml`.
- Eklenti açılışta `messages_en.yml` ve `messages_tr.yml` dosyalarını
  diske kopyalar (`LanguageManager`).
- Eksik dil kodu → `en`’e fallback.

## Display anahtarları

| Anahtar | Kapsam |
|---------|--------|
| `display.rarities.<RARITY>` | `COMMON / UNCOMMON / RARE / EPIC / LEGENDARY / MYTHIC` |
| `display.categories.<CATEGORY>` | `FRESHWATER / SALTWATER / BRACKISH / OTHER` |
| `display.biomes.<BIOME>` | 50+ Bukkit biyom çevirisi |

> Yeni bir enum görüntüsü gerektiğinde önce `display.*` altına
> bakılmalı, varsa o anahtar kullanılmalıdır.

## Lore şablonları

Yakalanan balık için lore üretimi `fish_drop.card.*` altında
gruplanmıştır:

- `sep` — ayraç satırı
- `type` — tür cümlesi
- `length`, `weight`, `class_line`
- `biome`, `time`, `bait`
- `collection`
- `rarity` — altlık

`CatchReplaceListener.applyNameAndLore()` bu anahtarları okur.

## Komut

`/fishingplus language [kod]`:

| Çağrı | Davranış |
|------|----------|
| `/fishingplus language` | `LanguageGui` açar |
| `/fishingplus language <kod>` | Dili `kod` olarak ayarlar (normalize edilir, fallback `en`) |

İzin: `fishingplus.player` (varsayılan `true`).

## Yeniden yükleme

`/fishingplus reload`:

- `LanguageManager.ensureActiveFile()` — bundled dil dosyalarını
  yeniden yazar.
- `MessageManager` örneği yeniden oluşturulur ve cache temizlenir.
