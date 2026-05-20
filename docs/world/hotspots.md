---
description: Dinamik olarak dünyada beliren yem noktaları.
---

# Hotspot Sistemi

Sınıflar: `hotspot.HotspotManager`, `hotspot.HotspotConfig`,
`hotspot.HotspotType`, `hotspot.HotspotCommand`.

Konfigürasyon: `hotspots.yml`.

## Global ayarlar

```yaml
enabled: true

check_every_ticks: 1200
spawn_chance: 0.35
player_water_radius: 20
shore_inset_blocks_min: 6
shore_inset_blocks_max: 16
per_player_exclusive: true
exclusion_radius: 50
render_every_ticks: 10
```

| Alan | Açıklama |
|------|----------|
| `enabled` | Sistemi açar/kapatır |
| `check_every_ticks` | Tarama aralığı (20 tick = 1 sn) |
| `spawn_chance` | Kişi başı tarama başına spawn olasılığı (0–1) |
| `player_water_radius` | Oyuncu çevresinde su araması yarıçapı |
| `shore_inset_blocks_min/max` | Hotspot kıyıdan uzaklık aralığı |
| `per_player_exclusive` | `true`: kişi başına azami **bir** aktif hotspot |
| `exclusion_radius` | İki aktif hotspot arasındaki minimum mesafe |
| `render_every_ticks` | Parçacık render aralığı |

## Hotspot tipi şeması

```yaml
types:
  swift_hotspot:
    display: "Swift Hotspot"
    duration_seconds: 120
    radius: 4
    shape: CIRCLE
    particle: CRIT
    particle_count: 60
    boosts:
      catch_speed_multiplier: 2.0
    commands:
      - chance: 0.05
        as: CONSOLE
        cmd: "broadcast &b{player} &7caught a fish in a swift hotspot!"
```

| Alan | Açıklama |
|------|----------|
| `display` | Görünür ad |
| `duration_seconds` | Hotspot’un ömrü |
| `radius` | Etki yarıçapı |
| `shape` | `CIRCLE`, `CIRCLE_FILLED`, `SQUARE`, `SQUARE_FILLED` |
| `particle` | Bukkit `Particle` enum’ı |
| `particle_count` | Render başına spawn edilen parçacık sayısı |
| `boosts.catch_speed_multiplier` | Bite hızı çarpanı |
| `boosts.rarity_multipliers.<rarity>` | Nadirlik çarpanı |
| `boosts.double_catch_chance` | Çift yakalama eklenmesi |
| `commands[]` | Şansa bağlı komutlar |

### `commands[]` girdileri

| Alan | Açıklama |
|------|----------|
| `chance` | Yakalama başına tetiklenme olasılığı (0–1) |
| `as` | Şu an yalnızca `CONSOLE` desteklenir |
| `cmd` | Komut metni (`{player}` placeholder’ı) |

## Stats katkısı

Oyuncu hotspot içindeyken `HotspotManager.statsFor(player)` etkin
hotspot’un `boosts` değerlerini `FishRNGService.Stats` olarak döner.
Bu değerler genel stats zincirinde `hotspot` katmanı olarak
birleştirilir.

## Komut

`/hotspot` — izin: `fishingplus.admin.hotspot` (varsayılan `op`).
Hotspot listesi yönetimi içindir.
