---
description: Hava durumu ve ay evresine bağlı yakalama bonusları.
---

# Hava ve Ay Evresi

Sınıf: `environment.EnvironmentBoosts`.
Konfigürasyon: `settings.yml: environment`.

## Genel davranış

Cast anında bulunulan dünyanın hava durumu ve ay evresine bakılır;
karşılık gelen çarpanlar oyuncunun istatistik zincirine eklenir.

`environment.enabled: false` ikisini birden devre dışı bırakır.

## Hava

```yaml
environment:
  enabled: true
  weather:
    CLEAR:
      catch_speed: 1.00
      double_catch_bonus: 0.00
      rarity_mult: { COMMON: 1.00, UNCOMMON: 1.00, RARE: 1.00, EPIC: 1.00, LEGENDARY: 1.00, MYTHIC: 1.00 }
    RAIN:
      catch_speed: 1.20
      double_catch_bonus: 0.05
      rarity_mult: { COMMON: 0.90, UNCOMMON: 1.05, RARE: 1.10, EPIC: 1.15, LEGENDARY: 1.20, MYTHIC: 1.20 }
    THUNDER:
      catch_speed: 1.40
      double_catch_bonus: 0.10
      rarity_mult: { COMMON: 0.80, UNCOMMON: 1.10, RARE: 1.20, EPIC: 1.30, LEGENDARY: 1.35, MYTHIC: 1.40 }
```

| Alan | Açıklama |
|------|----------|
| `catch_speed` | Bite hızı çarpanı |
| `double_catch_bonus` | Çift yakalama olasılığına eklenir |
| `rarity_mult` | Nadirlik ağırlık çarpanları |

Hava tipleri: `CLEAR`, `RAIN`, `THUNDER`.

## Ay evresi

Ay evresi `World.getFullTime() / 24000 % 8` ile hesaplanır. Vanilya
8 evre döngüsünü kullanır.

```yaml
environment:
  moon:
    FULL:             { catch_speed: 1.00, double_catch_bonus: 0.05,
                        rarity_mult: { LEGENDARY: 1.30, MYTHIC: 1.50 } }
    WANING_GIBBOUS:   { rarity_mult: { LEGENDARY: 1.15, MYTHIC: 1.20 } }
    LAST_QUARTER:     {}
    WANING_CRESCENT:  {}
    NEW:              { rarity_mult: { COMMON: 1.20 } }
    WAXING_CRESCENT:  {}
    FIRST_QUARTER:    {}
    WAXING_GIBBOUS:   { rarity_mult: { LEGENDARY: 1.15, MYTHIC: 1.20 } }
```

Boş bırakılan evreler nötr kabul edilir (çarpan 1.00 / ofset 0.00).
