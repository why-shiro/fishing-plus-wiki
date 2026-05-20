---
description: Tazelik yaşam döngüsü ve satış fiyatına etkisi.
---

# Tazelik (Spoilage)

Sınıflar: `spoilage.SpoilageService`, `spoilage.SpoilageConfig`,
`spoilage.SpoilageStage`.

Konfigürasyon: `settings.yml: spoilage`.

## Aşamalar

```
FRESH → STALE → ROTTING → SPOILED → GONE
```

`GONE`’a ulaşan stack’ler envanterden otomatik olarak silinir.

## Satış fiyatı çarpanı

`settings.yml: fishmarket.spoilage_multiplier`:

| Aşama | Çarpan |
|-------|:------:|
| `FRESH` | 1.00 |
| `STALE` | 0.70 |
| `ROTTING` | 0.40 |
| `SPOILED` | 0.10 |
| `GONE` | 0.00 |

## Ayarlar

```yaml
spoilage:
  enabled: true
  minutes_until:
    stale:    30
    rotting:  60
    spoiled:  90
    gone:    120
  refresh_interval_ticks: 200
  bucket_decay_multiplier: 0.25
  ice_per_slot_minutes:   30
```

| Alan | Açıklama |
|------|----------|
| `enabled` | Sistemi açar/kapatır |
| `minutes_until.<aşama>` | Yakalandıktan kaç dakika sonra ilgili aşamaya geçer |
| `refresh_interval_ticks` | Online oyuncu envanterinin tarama sıklığı |
| `bucket_decay_multiplier` | Kova içindeki balıkların yaşlanma çarpanı (örn. 0.25 = 4x yavaş) |
| `ice_per_slot_minutes` | `ICE`, `BLUE_ICE`, `PACKED_ICE` her biri için kova’ya eklenen taze süre |

## Mekanik

- Her yakalanan balığın stack’ine `fish_caught_at` zaman damgası
  basılır.
- `SpoilageService` her `refresh_interval_ticks` tick’te online
  oyuncu envanterlerini tarar ve aşamayı günceller.
- Offline oyuncular için yaşlanma **durur**. Oyuncu geri bağlandığında
  geçen offline süresi `fish_caught_at`’e eklenir; görünen yaş aynı
  kalır.
- Kovadaki balıklar `bucket_decay_multiplier` ile çarpılmış hızda
  yaşlanır.
- Kovaya konan her `ICE` / `BLUE_ICE` / `PACKED_ICE` slot’u
  `ice_per_slot_minutes` kadar taze süre ekler.
