---
description: Süreli, tüketilebilir istatistik takviyesi sistemi.
---

# Boosterlar

Sınıflar: `boost.BoosterRegistry`, `boost.BoosterManager`,
`boost.BoosterItemFactory`, `boost.BoosterListener`,
`boost.StatEffect`, `boost.BoosterCommand`.

Konfigürasyon: `boosters.yml`.

## Davranış

- Item shift + sağ tıkla aktive edilir.
- Süreli bir istatistik takviyesi başlatır.
- Sunucu yeniden başlatıldığında **kalıcı değildir** (in-memory).

## Şema

```yaml
boosters:
  <booster-id>:
    material: PRISMARINE_CRYSTALS
    custom_model_data: 70001
    display: "&bLucky Lure"
    lore:
      - "&7Geçici rare şans artışı"
    duration_seconds: 300
    stackable_effect: true
    sound: ENTITY_EXPERIENCE_ORB_PICKUP
    particle: HAPPY_VILLAGER
    messages:
      activate: "&b> &fLucky Lure aktif! &8({duration}s)"
      expire:   "&7Lucky Lure süresi doldu."
    effects:
      rarity_multipliers:
        RARE: 1.5
        EPIC: 1.5
      catch_speed: 0.2
      double_catch_chance: 0.10
      xp_mult: 2.0
```

| Alan | Açıklama |
|------|----------|
| `material` | İkon item’ının Bukkit Material’ı |
| `custom_model_data` | Resource pack için CMD |
| `display`, `lore` | Görünür ad ve açıklama |
| `duration_seconds` | Aktif kalma süresi |
| `stackable_effect` | `true`: aynı boost yeniden kullanılırsa süre yenilenir / uzar. `false`: ayrı bir aktif boost olarak yığılır |
| `sound`, `particle` | Aktivasyon ve ambient |
| `messages.activate`, `messages.expire` | Yer tutucular: `{display}`, `{duration}` |

## `effects` (StatEffect)

`StatEffect` hem booster hem totem için ortak YAML → `FishRNGService.Stats`
dönüştürücüsüdür.

| Alan | Tür | Açıklama |
|------|-----|----------|
| `rarity_multipliers` | map | Nadirlik → çarpan |
| `species_multipliers` | map | `fish_id` → çarpan |
| `freshwater_mult` / `saltwater_mult` | double | Su kategorisi çarpanı |
| `double_catch_chance` | double | Çift yakalama eklenmesi |
| `catch_speed` | double | Bite hızı toplamsal ofset |
| `special_chance` | double | Özel roll çarpanı |
| `sp_rare_mult` / `sp_mythic_mult` | double | Özel rare/mythic proc çarpanı |
| `xp_mult` | double | XP çarpanı |

## Komut

`/booster <subcommand>` ya da `/fp booster <subcommand>`:

| Alt komut | Açıklama |
|-----------|----------|
| `active` | Oyuncunun aktif booster’larını listeler |
| `list` | Konfigürasyondaki tüm tanımlı booster’ları gösterir |
| `give <id> [oyuncu] [miktar]` | Booster item verir |
| `reload` | `boosters.yml`’i yeniden okur |

İzin: `fishingplus.booster` (varsayılan `true`).
