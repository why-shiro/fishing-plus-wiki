---
description: Balık market sistemi, dinamik fiyatlama ve çarpan zinciri.
---

# Market

Sınıflar: `market.MarketPriceService`, `market.MarketDao`,
`market.MarketHubGui`, `market.BulkSellGui`,
`market.ProcessedMarketGui`, `market.SeasonalPricing`,
`market.MarketUtil`, `market.MarketCommand`, `market.MarketMsg`.

## Final satış fiyatı

```
fiyat = market_fiyatı
      × rarity_multiplier
      × size_bonus
      × class_multiplier
      × seasonal_multiplier
      × spoilage_multiplier
```

Her çarpanın kaynağı:

| Çarpan | Kaynak |
|--------|--------|
| `market_fiyatı` | `MarketPriceService` (dinamik) |
| `rarity_multiplier` | İç tablo |
| `size_bonus` | Balığın `length`/`weight` aralığı içindeki konumu |
| `class_multiplier` | `settings.yml: fishmarket.class_multiplier` |
| `seasonal_multiplier` | `SeasonalPricing` — türün `months` listesi |
| `spoilage_multiplier` | `settings.yml: fishmarket.spoilage_multiplier` |

## Dinamik fiyatlama

```yaml
fishmarket:
  dynamic:
    max_daily_change_percent: 20.0
```

| Alan | Açıklama |
|------|----------|
| `max_daily_change_percent` | Tek bir tür için günlük fiyat değişim üst sınırı |

Fiyat geçmişi `MarketDao` üzerinden tutulur. Eski kayıtlar
`settings.yml: market.history_retain_days` (varsayılan 30) gün
sonrasında günlük temizlikte silinir.

## Sınıf çarpanları

```yaml
fishmarket:
  class_multiplier:
    D: 0.50
    C_MINUS: 0.70
    C_PLUS: 0.85
    B_MINUS: 1.00
    B_PLUS: 1.15
    A_MINUS: 1.30
    A_PLUS: 1.50
    S: 1.80
    S_PLUS: 2.20
    S_PLUS_PLUS: 3.00
```

## Tazelik çarpanları

```yaml
fishmarket:
  spoilage_multiplier:
    FRESH: 1.00
    STALE: 0.70
    ROTTING: 0.40
    SPOILED: 0.10
    GONE: 0.00
```

## Sezon çarpanı

`SeasonalPricing.multiplierFor(ft)`:

- Türün `fish.yml: months` listesi boşsa daima sezonda → 1.00.
- Gerçek dünya ayı listede ise → 1.00.
- Aksi halde → `OUT_OF_SEASON_MULTIPLIER = 1.25`.

`SeasonalPricing.isInSeason(ft)` aynı kurala göre boolean döner.

## GUI’ler

| GUI | Açıklama |
|-----|----------|
| `MarketHubGui` | Hub: ham satış, işlenmiş ürün, toplu satış, bounty alt menüleri |
| `BulkSellGui` | Envanterdeki balıkları toplu sat |
| `ProcessedMarketGui` | Tesis çıktısı işlenmiş ürünlerin marketi |

## Komut

- `/fishmarket` — `MarketHubGui.open(player)`.
- İzin: `fishingplus.market` (varsayılan `true`).
