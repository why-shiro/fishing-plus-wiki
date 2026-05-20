---
description: İşleme malzemesi kataloğu — ingredients.yml.
---

# Malzemeler

Sınıflar: `processing.IngredientRegistry`,
`processing.ProcessingIngredient`,
`processing.IngredientItemFactory`.

Konfigürasyon: `ingredients.yml`.

## Etiketleme

`IngredientItemFactory.create(...)` her malzemenin
`PersistentDataContainer` anahtarına `processing_ingredient_id`
yerleştirir. Tesis girdileri yalnızca bu etiketli item’ları kabul
eder; aynı görselli vanilya item’ları reddedilir.

## Şema

```yaml
ingredients:
  <id>:
    material: SUGAR
    custom_model_data: 60001
    display: "&fSalt"
    lore:
      - "&7Smoking ve canning için"
      - "&7temel malzeme."
```

| Alan | Açıklama |
|------|----------|
| `material` | Bukkit `Material` |
| `custom_model_data` | Resource pack CMD (opsiyonel) |
| `display` | Görünür ad (`&` renk kodları) |
| `lore` | Lore satırları |

## Varsayılan içerik

`ingredients.yml` ile birlikte gelen örnek id’ler:

| ID | Material | Kullanım |
|----|----------|----------|
| `salt` | `SUGAR` | Smoking + canning |
| `smoking_wood` | `OAK_LOG` | Smokehouse |
| `canning_barrel` | `BARREL` | Cannery |
| `rice` | `WHEAT` | Sushi |
| `seaweed` | `KELP` | Sushi |

## Tariflerde kullanım

`processing.yml` tariflerinde malzeme referansı:

```yaml
ingredients:
  - { ingredient_id: salt,         amount: 1 }
  - { ingredient_id: smoking_wood, amount: 1 }
```

Slot sırası önemli değildir; `IngredientAssignment` permütasyonla
uyarlar.

## Komut

- `/fishingplus ingredient give <ID> [oyuncu] [miktar]`.
- İzin: `fishingplus.admin`.
- Geçerli `ID`’ler tab tamamlamadan alınır
  (`IngredientRegistry.ids()`).
