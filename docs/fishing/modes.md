---
description: VANILLA, CLICK_SPAM ve CURSOR_SWEEP yakalama modları.
---

# Yakalama Modları

Sınıflar:

- `fishing.FishingMode`
- `fishing.FishingModeConfig`
- `fishing.ClickSpamMinigame`
- `fishing.CursorSweepMinigame`

Konfigürasyon: `settings.yml: fishing.mode`.

## VANILLA

Vanilla yakalama davranışı uygulanır; yalnızca FishingPlus RNG katmanı
balığı belirler. Mini oyun açılmaz.

## CLICK_SPAM

Balık vurduğunda action bar üzerinde bir mini oyun açılır. Sol
tıklamalar bir “X” işaretini sağdaki yeşil bölgeye doğru iter.
Sağ tıklama oyun süresince engellenir (olta erken çekilemez).

```yaml
fishing:
  mode: CLICK_SPAM
  click_spam:
    duration_ticks: 200
    track_length: 16
    green_zone_width: 3
    green_zone_start: 11
    click_force: 1.2
    fight_strength: 0.55
    drift_per_tick: 0.18
    start_pos: 1.5
```

| Alan | Açıklama |
|------|----------|
| `duration_ticks` | Temel süre (20 tick = 1 sn) |
| `track_length` | Çubuk uzunluğu (hücre) |
| `green_zone_width` | Yeşil bölge genişliği |
| `green_zone_start` | Yeşil bölge başlangıcı (0 tabanlı) |
| `click_force` | Pozisyon 0’dayken her sol tık kaç hücre kazandırır |
| `fight_strength` | Sağ duvara yaklaştıkça tıkların ne kadar zayıfladığı (0–1) |
| `drift_per_tick` | Boşta her tick’te sola sürüklenme |
| `start_pos` | Başlangıç pozisyonu |

### Nadirlik zorluğu

```yaml
rarity_difficulty:
  COMMON:    { duration: 0.85, green: 1.20, drift: 0.85, click: 1.10, fight: 0.85 }
  UNCOMMON:  { duration: 0.95, green: 1.00, drift: 1.00, click: 1.00, fight: 1.00 }
  RARE:      { duration: 1.00, green: 0.85, drift: 1.15, click: 0.95, fight: 1.10 }
  EPIC:      { duration: 1.05, green: 0.70, drift: 1.30, click: 0.90, fight: 1.25 }
  LEGENDARY: { duration: 1.10, green: 0.60, drift: 1.50, click: 0.85, fight: 1.40 }
  MYTHIC:    { duration: 1.20, green: 0.50, drift: 1.70, click: 0.80, fight: 1.60 }
```

Her nadirlik için 5 çarpan: `duration`, `green`, `drift`, `click`,
`fight`. Temel değerlerle çarpılarak uygulanır.

## CURSOR_SWEEP

Önce yakalama rolu çekilir, ardından zamanlama çubuğu açılır. Çubuk
boyunca hareket eden bir işaretçi belirli bölgelerden geçer:

- **Yeşil**: roll edilen rank korunur.
- **Sarı**: rank `yellow_rank_drop` kadar düşürülür.
- **Kırmızı / zaman aşımı**: balık verilmez.

```yaml
fishing:
  cursor_sweep:
    track_length: 13
    yellow_zone_width: 1
    green_center_min: 0.30
    green_center_max: 0.70
    base_speed: 0.28
    direction: PING_PONG
    duration_ticks: 200
    yellow_rank_drop: 3
    green_width_by_rarity:
      COMMON: 4
      UNCOMMON: 3
      RARE: 3
      EPIC: 2
      LEGENDARY: 2
      MYTHIC: 1
    rarity_speed_mult:
      COMMON: 0.85
      UNCOMMON: 1.00
      RARE: 1.10
      EPIC: 1.20
      LEGENDARY: 1.35
      MYTHIC: 1.50
    rank_speed_mult:
      D: 0.75
      C_MINUS: 0.85
      C_PLUS: 0.95
      B_MINUS: 1.00
      B_PLUS: 1.10
      A_MINUS: 1.20
      A_PLUS: 1.30
      S: 1.45
      S_PLUS: 1.65
      S_PLUS_PLUS: 1.90
```

| Alan | Açıklama |
|------|----------|
| `track_length` | Çubuk hücre sayısı |
| `yellow_zone_width` | Sarı bölge genişliği |
| `green_center_min/max` | Yeşil merkezin rastgele aralığı (0–1) |
| `base_speed` | Temel işaretçi hızı |
| `direction` | `PING_PONG` — soldan sağa, sonra tersine |
| `duration_ticks` | Süre limiti |
| `yellow_rank_drop` | Sarı bölgede rank kaç basamak düşer |
| `green_width_by_rarity` | Nadirliğe göre yeşil bölge genişliği |
| `rarity_speed_mult` | Nadirliğe göre hız çarpanı |
| `rank_speed_mult` | Sınıfa göre hız çarpanı |

Sonuç olarak yüksek nadirlik + yüksek sınıf birleştiğinde hız artar
ve yeşil bölge daralır.
