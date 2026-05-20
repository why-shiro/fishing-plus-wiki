---
description: Başarım koşulları, ödülleri ve GUI.
---

# Başarımlar

Sınıflar: `achievement.AchievementRegistry`,
`achievement.AchievementService`, `achievement.AchievementDao`,
`achievement.AchievementGui`, `achievement.AchievementListener`,
`achievement.Achievement`, `achievement.AchievementCondition`,
`achievement.AchievementReward`, `achievement.AchievementCommand`.

Konfigürasyon: `achievements.yml`.
DB tablosu: `fp_achievement` (boot’ta `AchievementDao.init()`).

## Şema

```yaml
achievements:
  first_catch:
    display: "&aFirst Catch"
    description:
      - "&7Catch your first fish."
    icon: COD
    icon_custom_model_data: 0
    hidden: false
    condition:
      type: total_catches
      target: 1
    reward:
      xp: 5
      money: 10.0
      commands:
        - "say {player} got first catch"
```

| Alan | Açıklama |
|------|----------|
| `display` | Görünür ad (`&` renk kodları) |
| `description` | Lore satırları listesi |
| `icon` | GUI ikonu için Bukkit Material |
| `icon_custom_model_data` | Resource pack için CMD |
| `hidden` | `true` ise ilk ilerlemeye kadar `???` görünür |
| `condition.type` | Koşul tipi (aşağıya bakın) |
| `condition.target` | Tamamlanmak için gereken sayı |
| `reward.xp` | Profil XP ödülü |
| `reward.money` | Vault para ödülü |
| `reward.commands` | Konsol komutları listesi, `{player}` placeholder |

## Koşul tipleri

| `type` | Ek alanlar | Açıklama |
|--------|-----------|----------|
| `total_catches` | – | Toplam yakalanan balık sayısı |
| `catch_count` | `rarity` | Belirli bir nadirlikten kaç balık |
| `catch_species` | `species_id` | Belirli bir tür id’sinden kaç balık |
| `catch_weight` | `min_kg` | Verilen ağırlıkta veya üzerinde kaç balık |
| `catch_length` | `min_cm` | Verilen uzunlukta veya üzerinde kaç balık |

## Çağırma noktası

`listeners.CatchReplaceListener.applyCatchRoll` her başarılı yakalamadan
sonra şunu çağırır:

```
achievementService.onCatch(player, roll.type, roll.lengthCm, roll.weightKg);
```

İlerleme bellekte tutulur; her yakalamada async olarak DB’ye yazılır.

## GUI

`AchievementGui` 6 satırlı, sayfalıdır. Tamamlanma yüzdesini gösteren
progress bar içerir. `hidden: true` olan başarımlar ilk ilerleme
gelene kadar `???` olarak listelenir.

## Komut

`/achievements [subcommand]` (alias: `/fp ach`, `/fp basarim`):

| Alt komut | Açıklama |
|-----------|----------|
| (varsayılan) | GUI açar |
| `list` | Tanımlı başarımları listeler |
| `grant <oyuncu> <id>` | Bir başarımı tamamlanmış sayar |
| `reset <oyuncu> [id]` | İlerlemeyi sıfırlar |
| `reload` | `achievements.yml`’i yeniden yükler |

İzin: `fishingplus.achievements` (varsayılan `true`).
