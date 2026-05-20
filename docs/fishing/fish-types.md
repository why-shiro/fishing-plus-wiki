---
description: fish.yml balık türü tanımları ve şeması.
---

# Balık Türleri

Sınıflar: `domain.FishType`, `service.FishRNGService`.
Konfigürasyon: `fish.yml`.

## Şema

### Zorunlu alanlar

| Alan | Tür | Açıklama |
|------|-----|----------|
| `id` | int | Tür için tekil id (turnuva ve tarif eşlemelerinde kullanılır) |
| `name` | string | Görünür isim |
| `category` | enum | `FRESHWATER`, `SALTWATER`, `BRACKISH`, `OTHER` |
| `rarity` | enum | `COMMON`, `UNCOMMON`, `RARE`, `EPIC`, `LEGENDARY`, `MYTHIC` |
| `model` | obj | `{ type: CMD, value: <int> }` veya benzeri model referansı |
| `length` | obj | `{ min, max }` (cm) |
| `weight` | obj | `{ min, max }` (kg) |

### Opsiyonel alanlar

| Alan | Açıklama |
|------|----------|
| `biomes` | Uygun Bukkit biyom listesi. Boş bırakılırsa “any”. |
| `months` | 1–12 arası ay listesi. Boş bırakılırsa daima sezonda. |
| `hours` | Saat aralıkları, ör. `["6-12", "18-24"]`. |
| `cmd` | Yakalandığında konsoldan çalıştırılacak komutlar |
| `consume` | Balık yendiğinde uygulanacak iksir etkileri |

### Komut placeholder’ları (`cmd` listesinde)

- `{player}`, `%player%`
- `{fish}`
- `{rarity}`
- `{len}`
- `{kg}`

### `consume` girdileri

```yaml
consume:
  - { effect: REGENERATION, duration: 100, amplifier: 1 }
  - { effect: SPEED,        duration: 200, amplifier: 0 }
```

`effect` Bukkit `PotionEffectType`, `duration` tick cinsindendir.

## Örnek

```yaml
fish:
  - id: 1
    name: "Pike"
    category: FRESHWATER
    rarity: RARE
    model: { type: CMD, value: 40001 }
    length: { min: 60, max: 120 }
    weight: { min: 2.0, max: 8.0 }
    biomes: [RIVER, SWAMP]
    months: [3,4,5]
    hours: [6-12]
```

## Sınıf (size class) bandı

Boyut, `min`/`max` aralığına göre 10 sınıfa bölünür:

`D, C_MINUS, C_PLUS, B_MINUS, B_PLUS, A_MINUS, A_PLUS, S, S_PLUS, S_PLUS_PLUS`.

Sınıf hem profil XP ödüllerinde, hem turnuva `HIGHEST_SCORE` skor
hesaplamasında, hem de market `class_multiplier` çarpanında kullanılır.

## Lore üretimi

`listeners.CatchReplaceListener.applyNameAndLore()` aşağıdaki
`messages.yml` anahtarlarını kullanır:

- `fish_drop.card.sep` — ayraç satırı.
- `fish_drop.card.type` — tür cümlesi.
- `fish_drop.card.length`, `weight`, `class_line`.
- `fish_drop.card.biome`, `time`, `bait`.
- `fish_drop.card.collection`.
- `fish_drop.card.rarity` — altlık.

## Display anahtarları

`messages_tr.yml` içinde nadirlik ve kategori isimleri:

- `display.rarities.COMMON / UNCOMMON / RARE / EPIC / LEGENDARY / MYTHIC`
- `display.categories.FRESHWATER / SALTWATER / BRACKISH / OTHER`
- `display.biomes.*` (50+ biyom çevirisi)

> Yeni enum → string eşleştirmesi eklerken önce `display.*` altına
> bakılmalı, varsa oradan kullanılmalıdır.
