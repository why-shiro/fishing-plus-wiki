---
description: İşleme tesisleri ve tarif şeması — processing.yml.
---

# Tesisler ve Tarifler

Sınıflar: `processing.FacilityRegistry`, `processing.FacilityDao`,
`processing.Facility`, `processing.FacilityType`,
`processing.FacilityItemFactory`, `processing.FacilityListener`,
`processing.RecipeRegistry`, `processing.Recipe`,
`processing.ProcessingJob`, `processing.JobScheduler`,
`processing.ProcessingGui`,
`processing.FacilityHologramService`,
`processing.SlotGuideService`,
`processing.ConsumeEffectListener`.

Konfigürasyonlar: `processing.yml`, `ingredients.yml`,
`settings.yml: processing`.

Kalıcı durum: `facilities.yml` (tesis tampon item’ları dahil).

## Tesis türleri

`FacilityType`: `SMOKEHOUSE`, `CANNERY`, `SUSHI_SHOP`.

## Erişim kontrolü

```yaml
processing:
  owner_only_open: false
```

`true` — yalnızca tesisi yerleştiren oyuncu (veya `fishingplus.admin`)
GUI’yi açabilir.

## Tarif şeması

```yaml
recipes:
  - id: smoked_common
    facility: SMOKEHOUSE
    display: "&6Smoked Fish"
    fish:
      rarity: [COMMON, UNCOMMON]
      amount: 1
    ingredients:
      - { ingredient_id: salt,         amount: 1 }
      - { ingredient_id: smoking_wood, amount: 1 }
    output:
      material: COOKED_COD
      custom_model_data: 50001
      display: "&6Smoked {fish_name}"
      lore:
        - "&7Smoked freshwater fish."
        - "&8» &7Sale value: &ax2.5"
      price_multiplier: 2.5
      stackable: true
      amount: 1
    processing_seconds: 30
    xp_reward: 5
    min_player_level: 1
```

### Üst alanlar

| Alan | Açıklama |
|------|----------|
| `id` | Tekil tarif id’si |
| `facility` | `SMOKEHOUSE` / `CANNERY` / `SUSHI_SHOP` |
| `display` | Görünür ad |
| `processing_seconds` | İş süresi |
| `xp_reward` | Tamamlandığında oyuncuya verilen profil XP (online ise) |
| `min_player_level` | Tarifi başlatmak için gereken profil seviyesi |
| `consume_effects` | Çıktı yendiğinde uygulanacak etkiler (aşağıya bakın) |

### `fish` filtresi

| Alan | Açıklama |
|------|----------|
| `any: true` | Her balığı kabul eder |
| `rarity` | Tek bir nadirlik veya liste |
| `fish_ids: [1, 5, 12]` | Belirli `fish.yml` id’leri |
| `fish_id: 7` | Tek id için kısa yol |
| `amount` | Batch başına tüketilen balık (varsayılan 1) |

> `fish_ids` / `fish_id`, `rarity` üzerinde **önceliklidir**.

### `ingredients`

İki form kabul edilir:

```yaml
ingredients:
  - { ingredient_id: salt, amount: 1 }      # ingredients.yml referansı
  - { material: COAL,      amount: 2 }      # ham Bukkit Material
```

Slot sırası önemli **değildir** — `IngredientAssignment` permütasyonla
eşleşir (hem GUI içinde hem otomasyonda).

### `output`

| Alan | Açıklama |
|------|----------|
| `material` | Çıktı Bukkit Material’ı |
| `custom_model_data` | Resource pack için CMD |
| `display` | Ad şablonu (`{fish_name}` desteklenir) |
| `lore` | Lore satırları (`{fish_name}` desteklenir) |
| `price_multiplier` | Baz balık fiyatına oranla market çarpanı |
| `stackable` | `false` ise çıktı stack’lenmez |
| `amount` | Batch başına üretilen sayı |

### `consume_effects`

```yaml
consume_effects:
  - type: SPEED
    duration: 200
    amplifier: 0
  - type: REGENERATION
    duration: 100
    amplifier: 1
  - cmd: "tellraw {player} [{\"text\":\"Excellent!\",\"color\":\"gold\"}]"
```

`type` formu: Bukkit `PotionEffectType`, `duration` (tick), `amplifier`
(0 tabanlı).
`cmd` formu: konsol komutu; `{player}` / `{player_name}` placeholder.

## İş yaşam döngüsü

- `JobScheduler` aktif işleri bir tick döngüsünde takip eder.
- Bir iş bittiğinde çıktı tesisin **pending** tamponuna yazılır;
  oyuncu envanterine **hiçbir zaman gitmez**.
- Tamponlar ve çıktı kapasitesi yeterliyse bir sonraki iş otomatik
  başlatılır (sürekli çalışma).
- `JobScheduler.mergePending` aynı tarif çıktılarını stackable ise
  bekleyen stack’e ekler.

## Çıktı dağıtımı

İki yol:

1. Oyuncu GUI’de “tamamlandı” durumundayken tampondan toplar.
2. Tesisin **altına** sandık konursa otomasyon her 2 saniyede tamponu
   sandığa boşaltır.

Sandık yoksa veya doluysa hologramda doluluk uyarısı belirir.

## Hologram

`FacilityHologramService`:

- Tampon satırı: `B:32 M1:16 M2:12` (balık + iki malzeme).
- Durum satırı: geri sayım / hazır / kapasite dolu / otomasyon durumu.
- Çıktı tamponu doluysa kırmızı `!! Üretim Kapasitesi Doldu !!`.

## Slot rehberi

Tesise shift + sağ tık → `SlotGuideService` parçacıkla içi boş küp
çizer (5 saniye otomatik kapanış, toggle).

## Komutlar

- `/fishingplus facility give <TYPE> [oyuncu]` — tesis item’ı verir.
- `/fishingplus ingredient give <ID> [oyuncu] [miktar]` — malzeme verir.
- İzin: `fishingplus.admin`.
