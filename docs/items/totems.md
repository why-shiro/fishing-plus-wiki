---
description: Çok bloklu yapı totemleri ve aura etkileri.
---

# Totemler

Sınıflar: `boost.TotemRegistry`, `boost.TotemManager`,
`boost.Totem`, `boost.TotemInstance`, `boost.TotemLayer`,
`boost.TotemListener`, `boost.TotemPotionEffect`,
`boost.TotemCommand`, `boost.StatEffect`.

Konfigürasyon: `totems.yml`.
Kalıcı durum: `placed_totems.yml` (boot sırasında dünyaya karşı
doğrulanır; eksik blok varsa atılır).

## Tespit

- Yatay ayak izi sabit **3×3**’tür; yükseklik sınırsızdır.
- Katmanlar **alttan üste** sıralanır.
- Bir oyuncu bir blok yerleştirdiğinde `TotemRegistry.withTopBlock(material)`
  çağrılır.
- Eğer yerleştirilen blok bir totem deseninin **en üst orta** bloğuysa
  **ve** 3×3×N ayak izi desene uyuyorsa totem aktive olur.
- Aksi halde scan tetiklenmez; yani **en üst orta bloğu en son**
  yerleştirmek gerekir.

## Şema

```yaml
totems:
  <totem-id>:
    display: "&bAngler's Pillar"
    radius: 12
    owner_only: false
    particle: HAPPY_VILLAGER
    lifetime_seconds: 1800       # 0 = kalıcı
    activation_cooldown_seconds: 900
    messages:
      activate: "&b&l> &fAngler's Pillar aktif (by {owner})"
      deactivate: "&7Angler's Pillar söndü."
    commands:
      activate:
        - "tell {player} aktif."
      expire:
        - "tell {owner} süre doldu."
    potion_effects:
      activate:
        - type: LUCK
          duration_seconds: 30
          amplifier: 0
      expire: []
    palette:
      G: GOLD_BLOCK
      D: DIAMOND_BLOCK
      P: PRISMARINE_BRICKS
      S: SEA_LANTERN
    layers:
      - ["___", "_G_", "___"]
      - ["___", "_D_", "___"]
      - ["___", "_P_", "___"]
      - ["___", "_S_", "___"]
    effects:
      rarity_multipliers:
        RARE: 1.3
      catch_speed: 0.25
      double_catch_chance: 0.08
      xp_mult: 1.25
```

| Alan | Açıklama |
|------|----------|
| `display` | Görünür ad |
| `radius` | Aura yarıçapı (blok) |
| `owner_only` | `true`: yalnızca yerleştiren oyuncu yararlanır |
| `particle` | Aktifken ambient parçacık |
| `lifetime_seconds` | 0: kalıcı; aksi halde otomatik süre dolumu |
| `activation_cooldown_seconds` | Oyuncu başına yeniden aktivasyon bekleme süresi |
| `messages.activate / deactivate` | Yer tutucular: `{display}`, `{owner}` |
| `commands.activate / expire` | Konsol komutları; `{player}`, `{owner}`, `{totem}`, `{display}`, `{world}`, `{x}`, `{y}`, `{z}` |
| `potion_effects.activate / expire` | Aktif/expire anında uygulanan etkiler |
| `palette` | Karakter → Bukkit Material |
| `layers` | Alttan üste 3×3 katman listesi (`_` boşluk) |
| `effects` | [StatEffect](boosters.md#effects-stateffect) ile aynı şema |

## Koordinat düzeni (her katman)

```
row 0 = north (-Z)
row 1 = center (anchor)
row 2 = south (+Z)
col 0 = west (-X)
col 1 = center
col 2 = east (+X)
```

## Sönme

- `lifetime_seconds > 0` ise süre dolduğunda söner.
- Desende `_` olmayan herhangi bir blok kırıldığında söner.
- Yeniden aktivasyon için `activation_cooldown_seconds` boyunca beklenir.

## Komut

`/totem <subcommand>` veya `/fp totem <subcommand>`:

| Alt komut | Açıklama |
|-----------|----------|
| `list` | Tanımlı totem tiplerini listeler |
| `active` | Oyuncunun yararlandığı aktif aura’ları gösterir |
| `near` | Oyuncuya yakın aktif totemleri listeler |
| `reload` | `totems.yml`’i yeniden yükler |

İzin: `fishingplus.totem` (varsayılan `true`).
