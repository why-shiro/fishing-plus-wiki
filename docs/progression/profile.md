---
description: Oyuncu profili, XP eğrisi, milestone bonusları ve seviye ödülleri.
---

# Profil ve Seviye

Sınıflar: `profile.ProfileService`, `profile.PlayerProfile`,
`profile.ProfileRepository`, `profile.LevelRewardsService`,
`profile.LevelRewardsDao`, `profile.gui.FishProfileGUI`,
`profile.ProfileCommand`.

Konfigürasyon: `profile.yml`.

## XP eğrisi

```yaml
level:
  max_level: 100
  base_xp: 100
  grow_per_level: 1.12
```

| Alan | Açıklama |
|------|----------|
| `max_level` | Üst sınır |
| `base_xp` | İlk seviye atlamak için gereken XP |
| `grow_per_level` | Sonraki her seviye için XP gereksinim çarpanı |

## Action bar

```yaml
ui:
  actionbar:
    enabled: true
    format: "&a+{gain} XP &7(&e{now}&7/&e{need}&7)"
```

Placeholder’lar: `{gain}`, `{now}`, `{need}`.

## XP kaynakları

```yaml
xp_awards:
  by_rarity:
    COMMON: 5
    UNCOMMON: 9
    RARE: 18
    EPIC: 40
    LEGENDARY: 80
    MYTHIC: 150
  by_class:
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
```

Bir yakalamadaki toplam XP:
`by_rarity[rarity] + by_class[class]`.

## Seviye boostları

```yaml
level_boosts:
  per_level:
    catch_speed_multiplier: 0.002
    double_catch_chance: 0.0005
  milestones:
    "10":
      rarity_mult: { UNCOMMON: 1.03 }
    "20":
      rarity_mult: { RARE: 1.05 }
    "30":
      double_catch_chance: 0.01
    "50":
      catch_speed_multiplier: 0.10
    "75":
      rarity_mult: { EPIC: 1.08 }
    "100":
      rarity_mult: { LEGENDARY: 1.12, MYTHIC: 1.15 }
```

- `per_level` — her seviyede toplamsal olarak uygulanır.
- `milestones.<level>` — belirli seviyeye ulaşıldığında kalıcı bonus
  eklenir (`rarity_mult`, `double_catch_chance`,
  `catch_speed_multiplier`).

## Seviye ödülleri

```yaml
level_rewards:
  auto_grant_on_levelup: true
  levels:
    "2":
      - money: 150
      - command: "givebait {player} shrimp 1"
    "4":
      - item:
          material: PAPER
          amount: 1
          name: "&bXP Booster (10 min)"
          lore:
            - "&7Fishing XP &a+50%"
    "10":
      - title: "&aRookie Angler"
      - command: 'lp user {player} meta setsuffix " &a[Rookie]"'
    "16":
      - rod_part:
          kind: LINE
          id: swift_line
    "20":
      - command: "givebait {player} random_rare 2"
      - money: 2000
```

| Alan | Açıklama |
|------|----------|
| `auto_grant_on_levelup` | `true`: anında ver; `false`: oyuncu `/fishclaim` ile çekene kadar bekler |
| `money` | Vault üzerinden ödeme |
| `command` | Konsol komutu, `{player}` placeholder’ı |
| `item` | `material`, `amount`, `name`, `lore` |
| `title` | Görsel başlık mesajı |
| `rod_part` | `kind: LINE\|HOOK\|BASE`, `id` |

## Komut

- `/fishprofile [oyuncu]` (alias: `/fishingplus profile`) —
  `FishProfileGUI` üzerinden açılır.
- İzin: `fishingplus.profile.view`.
