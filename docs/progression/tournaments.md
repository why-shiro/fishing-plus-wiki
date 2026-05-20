---
description: Turnuva modları, skor formülü ve duyuru ayarları.
---

# Turnuvalar

Sınıflar: `tournament.TournamentManager`,
`tournament.TournamentConfig`, `tournament.TournamentMode`,
`tournament.TournamentDao`, `tournament.TournamentCommand`.

Konfigürasyon: `tournaments.yml` + `settings.yml: tournament`.

## `tournaments.yml`

```yaml
enabled: true
interval_minutes: 60
duration_minutes: 20
broadcast_every_seconds: 30
minimum_players: 4
insufficient_retry_seconds: 60

modes:
  - LONGEST_LENGTH
  - SHORTEST_LENGTH
  - HEAVIEST_WEIGHT
  - LIGHTEST_WEIGHT
  - HIGHEST_SCORE
  - MOST_FISH
```

| Alan | Açıklama |
|------|----------|
| `enabled` | Otomatik turnuvaları açar/kapatır |
| `interval_minutes` | İki turnuva arası süre |
| `duration_minutes` | Bir turnuvanın uzunluğu |
| `broadcast_every_seconds` | Sıralama duyuru sıklığı |
| `minimum_players` | Başlamak için gereken online sayısı |
| `insufficient_retry_seconds` | Yetersiz oyuncu durumunda tekrar deneme |
| `modes` | Mod havuzu; her başlatmada **biri rastgele** seçilir |

### Modlar

| Mod | Sıralama kriteri |
|-----|------------------|
| `LONGEST_LENGTH` | En uzun balık |
| `SHORTEST_LENGTH` | En kısa balık |
| `HEAVIEST_WEIGHT` | En ağır balık |
| `LIGHTEST_WEIGHT` | En hafif balık |
| `HIGHEST_SCORE` | Skor formülü (aşağıya bakın) |
| `MOST_FISH` | En çok balık |

## `HIGHEST_SCORE` formülü

```yaml
score_weights:
  class_points:
    D: 0
    C_MINUS: 1
    C_PLUS: 2
    B_MINUS: 3
    B_PLUS: 4
    A_MINUS: 6
    A_PLUS: 8
    S: 12
    S_PLUS: 18
    S_PLUS_PLUS: 30
  rarity_points:
    COMMON: 1
    UNCOMMON: 3
    RARE: 6
    EPIC: 12
    LEGENDARY: 20
    MYTHIC: 35
  length_weight: 0.6
  weight_weight: 2.0
  class_weight: 1.0
  rarity_weight: 1.5
```

Final skor:

```
score = len_cm * length_weight
      + kg     * weight_weight
      + class_points[class]  * class_weight
      + rarity_points[rarity] * rarity_weight
```

## Duyuru ayarları (`settings.yml: tournament`)

```yaml
tournament:
  enabled: true
  announce_start: true
  announce_finish: true
  announce_interval_seconds: 60
  show_top_n: 5
  default_duration_minutes: 30
```

| Alan | Açıklama |
|------|----------|
| `announce_start` | Başlangıç duyurusu |
| `announce_finish` | Bitiş duyurusu |
| `announce_interval_seconds` | Periyodik duyuru sıklığı |
| `show_top_n` | Duyuruda gösterilen ilk sıra sayısı |
| `default_duration_minutes` | Manuel `start` için varsayılan süre |

## Komut

`/tournament [subcommand]`:

| Alt komut | İzin | Açıklama |
|-----------|------|----------|
| `status` | – | Aktif turnuvanın durumu |
| `top` | – | İlk sıralamayı gösterir |
| `start <mode>` | `fishingplus.tournament.admin` | Belirtilen modda turnuva başlatır |
| `stop` | `fishingplus.tournament.admin` | Aktif turnuvayı durdurur |
