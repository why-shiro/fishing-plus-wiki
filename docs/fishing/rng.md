---
description: FishRNGService nadirlik dağılımı ve özel yakalama mantığı.
---

# RNG ve Yakalama Mantığı

Sınıf: `service.FishRNGService`.
Konfigürasyon: `settings.yml: fishing.rng` ve `fishing.replace`.

## Nadirlik dağılımı

```yaml
fishing:
  rng:
    rarity:
      common: 0.60
      uncommon: 0.25
      rare: 0.12
      mythic: 0.03
```

- Temel dağılım yalnızca `common`, `uncommon`, `rare`, `mythic`
  ağırlıklarını içerir.
- `EPIC` ve `LEGENDARY` ana toplama dahil **değildir**; bunlar
  `special` havuzundan üretilir.

## Özel proc havuzu

```yaml
fishing:
  rng:
    special:
      chance: 0.20
      rare: 0.70
      mythic: 0.30
      distribute_to_all: true
```

| Alan | Açıklama |
|------|----------|
| `chance` | Özel rolun tetiklenme olasılığı |
| `rare`, `mythic` | Havuz içi dağılım |
| `distribute_to_all` | `true` ise `EPIC` ve `LEGENDARY` de bu havuza alınır |

## Normalizasyon ve fallback

```yaml
fishing:
  rng:
    normalize_to_available: true
    fallback_to_nearest: true
```

- `normalize_to_available` — bulunulan konumda mevcut olmayan
  nadirlikler 0 ağırlığa çekilir, kalanlar yeniden normalize edilir.
- `fallback_to_nearest` — uygun balık bulunamazsa en yakın nadirliğe
  düşülür.

## Vanilya çıktısı ve makara

```yaml
fishing:
  replace:
    enabled: true
    vanilla_pass_through_chance: 0.20
    reel:
      ticks_no_gravity: 10
      base_speed: 0.35
      distance_gain: 0.06
      max_speed: 0.90
      y_bias: 0.12
```

| Alan | Açıklama |
|------|----------|
| `enabled` | Vanilya yakalama çıktısının değiştirilip değiştirilmeyeceği |
| `vanilla_pass_through_chance` | Vanilya ödülünün geçirilme oranı (0–1) |
| `reel.ticks_no_gravity` | Makara animasyonu için yer çekimsiz tick sayısı |
| `reel.base_speed` | Taban hız |
| `reel.distance_gain` | Mesafe başına hız kazancı |
| `reel.max_speed` | Üst sınır |
| `reel.y_bias` | Dikey eğim |

## Stats nesnesi

`FishRNGService.Stats`:

```
rarityMult        Map<Rarity, double>
speciesMult       Map<String, double>
perFishMult       Map<String, double>
biomeMult         Map<Biome, double>
freshwaterMult    double
saltwaterMult     double
doubleCatchChance double
catchSpeedMultiplier double
specialChanceMult double
spRareMult        double
spMythicMult      double
```

`Stats.IDENTITY` sabit nötr nesnedir; herhangi bir kaynak boost
sağlamadığında bunun yerine geçirilir.

## Debug

- `/fishrng here` — bulunulan konum için RNG olasılık dökümünü gösterir.
- `/fishdebug [on|off|status]` — global debug modunu açar/kapatır
  (`DebugLogger`).
