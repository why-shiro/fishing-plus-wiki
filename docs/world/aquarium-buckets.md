---
description: Akvaryum kova kapasiteleri, yerleştirme ve görsel render.
---

# Akvaryum Kovalar

Sınıflar: `bucket.BucketManager`, `bucket.BucketStorage`,
`bucket.BucketListener`, `bucket.BucketData`, `bucket.BucketType`,
`bucket.AquariumFishDisplay`, `bucket.BucketHologramService`,
`bucket.GiveBucketCommand`.

## Kova tipleri

`BucketType` enum:

| Tip | Slot sayısı | Render yarıçapı |
|-----|:-----------:|:--------------:|
| `WOOD` | 27 | 3 |
| `IRON` | 36 | 5 |
| `GOLD` | 54 | 7 |

## Ayarlar

`settings.yml: aquarium`:

```yaml
aquarium:
  max_tanks_per_player: 3
  default_slots: 3
  max_slots: 9
  respawn_displays_on_restart: true
```

| Alan | Açıklama |
|------|----------|
| `max_tanks_per_player` | Oyuncu başına azami yerleştirilebilir kova |
| `default_slots` | Varsayılan açık slot sayısı |
| `max_slots` | Slot üst sınırı |
| `respawn_displays_on_restart` | Açılışta görselleri yeniden oluştur |

`settings.yml: aquarium_display`:

```yaml
aquarium_display:
  enabled: true
  max_distance_squared: 1024
  refresh_ticks: 20
```

| Alan | Açıklama |
|------|----------|
| `enabled` | Görüntüleyiciyi açar/kapatır |
| `max_distance_squared` | Render edilme mesafesi (blok²) |
| `refresh_ticks` | Render güncelleme aralığı |

## Görsel

`AquariumFishDisplay` Bukkit-native `ITEM_DISPLAY` entity’si kullanır
(ProtocolLib gerekmez). Kova üstünde içindeki balıkları gösterir.

`BucketHologramService` kova üstünde slot doluluğu ve içerik özet
metnini render eder.

## Komutlar

- `/givebucket <oyuncu> <wood|iron|gold>` — izin: `fishingplus.givebucket`.

## Tazelikle etkileşim

Bkz. [Tazelik](spoilage.md):

- Kova içindeki balıklar `bucket_decay_multiplier` ile yavaş yaşlanır.
- Kovaya `ICE`/`BLUE_ICE`/`PACKED_ICE` ekleyerek `ice_per_slot_minutes`
  kadar ek taze süre kazanılır.
