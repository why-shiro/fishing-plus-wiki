---
description: Olta gövdesi, kancası ve misinası — rod_base / hook / fishing_line yml dosyaları.
---

# Olta Parçaları

Sınıflar: `rod.RodPartsManager`, `rod.RodPart`, `rod.PartType`,
`rod.PartBoosts`, `rod.PartInfo`, `rod.RodPartsUI`,
`rod.RodMenuListener`, `rod.RodPartsCommand`.

`PartType` enum: `BASE`, `HOOK`, `LINE`.

## Ortak şema

`rod_base.yml`, `hook.yml`, `fishing_line.yml` aynı yapıyı kullanır:

```yaml
version: 1
items:
  - id: <unique-id>
    display: "<görünür ad>"
    default: true              # tipte yalnızca biri true
    head:
      texture: "<URL>"
    lore:
      - "<açıklama>"
    boosts:
      catch_speed_multiplier: 1.00
      freshwater_multiplier:  1.00
      saltwater_multiplier:   1.00
      rarity_multipliers:
        COMMON: 1.00
        UNCOMMON: 1.00
        RARE: 1.00
        MYTHIC: 1.00
      biome_multipliers:
        OCEAN: 1.10
      species_multipliers:
        SALMON: 1.12
      per_fish_multipliers:
        TUNA: 1.10
      double_catch_chance: 0.06   # yalnızca hook ve line
```

### Tip bazlı izinler

| Alan | base | hook | line |
|------|:---:|:---:|:---:|
| `catch_speed_multiplier` | ✔ | ✔ | ✔ |
| `freshwater_multiplier` / `saltwater_multiplier` | ✔ | – | ✔ |
| `rarity_multipliers` | ✔ | ✔ | ✔ |
| `biome_multipliers` | ✔ | – | – |
| `species_multipliers` / `per_fish_multipliers` | – | ✔ | – |
| `double_catch_chance` | – | ✔ | ✔ |

## Varsayılan parçalar

Her tipte tam olarak **bir** girdi `default: true` olmalıdır. Bu parça
oyuncunun oltasında bir slot boşsa otomatik olarak uygulanır, ayrıca
oyuncuya item olarak verilmez (sökmek item geri vermez).

## GUI ve komut

- `/olta` (alias: `/rodparts`) — `rod.RodPartsUI` üzerinden parça
  takma/sökme arayüzü.
- İzin: `fishingplus.rodparts` (varsayılan `op`).

## Seviye ödülü olarak parça verme

`profile.yml: level_rewards.levels.<level>` altında parça verilebilir:

```yaml
"16":
  - rod_part:
      kind: LINE        # LINE | HOOK | BASE
      id: swift_line
```

`id`, ilgili parça dosyasında tanımlı olmalıdır.
