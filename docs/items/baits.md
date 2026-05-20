---
description: Yem tanımları, etkileri ve tüketim kuralları.
---

# Yemler

Sınıflar: `bait.BaitManager`, `bait.util.*`,
`bait.gui.BaitsGui`, `bait.BaitToStatsMapper`,
`bait.GiveBaitCommand`, `listeners.BaitProtectListener`.

Konfigürasyon: `baits.yml`.

## Şema

```yaml
baits:
  <bait-id>:
    display: "Earthworm"
    rarity: COMMON
    uses: 1
    consume_mode: on_cast
    item:
      material: STRING
      custom_model_data: 1001
      head:
        texture: "<BASE64>"   # yalnızca PLAYER_HEAD için
    description:
      - "&7Lore satırı"
    boosts:
      freshwater_multiplier: 1.25
      catch_speed_multiplier: 0.90
      double_catch_chance: 0.03
      biome_multipliers:
        OCEAN: 1.35
      species_multipliers:
        CARP: 1.30
      rarity_multipliers:
        COMMON: 1.10
```

| Alan | Açıklama |
|------|----------|
| `display` | Sohbet/itam adı (`&` renk kodları desteklenir) |
| `rarity` | `COMMON … MYTHIC` |
| `uses` | Kaç kez kullanılabilir |
| `consume_mode` | `on_cast` (cast sırasında) veya `on_catch` (yakalandığında) |
| `item.material` | Bukkit `Material` |
| `item.custom_model_data` | Resource pack için CMD |
| `item.head.texture` | Yalnızca `PLAYER_HEAD` için Base64 doku |
| `description` | Lore satırları listesi |
| `boosts.freshwater_multiplier` | Tatlı su balığı için çarpan |
| `boosts.catch_speed_multiplier` | Bite süresi çarpanı (`0.90` = %10 daha hızlı) |
| `boosts.double_catch_chance` | Çift yakalama eklenmesi (0–1) |
| `boosts.biome_multipliers` | Bukkit biyom adı → çarpan |
| `boosts.species_multipliers` | `fish.yml` id’si veya enum adı → çarpan |
| `boosts.rarity_multipliers` | Nadirlik → çarpan |

## Tüketim kuralları

- `BaitManager.autoSelectAndMaybeConsumeSingleUseBait` cast sırasında
  yemi otomatik seçer, **tüketmez**.
- `BaitManager.maybeConsumeToken` tüketimi merkezi olarak yapar.
- `consume_mode: on_catch` durumunda token yalnızca başarılı yakalama
  sonrası harcanır.

## Koruma

`listeners.BaitProtectListener` aşağıdaki davranışları engeller:

- Yem item’ının kafa olarak takılması (örn. `PLAYER_HEAD` yem).
- Yemin yere drop edilmesi (yapılandırmaya göre).
- Yem item’ının item çerçevelerine konulması.

## Komut

- `/givebait <baitId> [oyuncu] [miktar]` — izin: `fishingplus.givebait`.
- Tab tamamlama mevcuttur (`GiveBaitTabCompleter`).

## GUI

`/baits` (alias `/fishingplus baits`) — `BaitsGui` aktif ve sahip
olunan yemleri listeler, oyuncu aktif yemi seçer.
