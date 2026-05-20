---
description: Eklentide çalışırken yararlı olabilecek kod düzeyi notlar.
---

# Geliştirici Notları

## Stats merge zinciri

- `FishRNGService.Stats.IDENTITY` — nötr stats sabiti. Bir kaynak boost
  sağlamadığında bunun yerine geçirilir.
- `FishingPlus.mergeStatsInto(out, add)` — yardımcı, harita değerleri
  çarpımsal, skaler değerler toplamsal birleştirir.
- Zincir: `bait → level → hotspot → booster → totem`.

## Yakalama girişi

- `listeners.CatchReplaceListener.applyCatchRoll` — RNG’den balığı
  alır, profil, turnuva ve başarım kancalarını sırayla çağırır.
- `applyNameAndLore()` — `messages.yml: fish_drop.card.*` şablonu ile
  item adı ve lore’u üretir.

## Tesis tampon kalıcılığı

- `processing.Facility` üç ItemStack tutar: `fish`, `ingredientA`,
  `ingredientB`.
- `facilities.yml` bu üç tamponun durumunu kalıcılaştırır.
- GUI kapatıldığında slotlardaki item’lar oyuncuya **iade edilmez**;
  tesise bağlıdır.

## Hologram temizliği

- `FacilityHologramService.stop()` — `onDisable` sırasında TextDisplay
  entity’lerini siler. World save’e sızma engellenir.
- Hard-crash sonrası boot taraması ölü hologramları toplar.

## Totem doğrulama

- `placed_totems.yml` boot sırasında dünyaya karşı doğrulanır.
- Eksik blok varsa totem durumu drop edilir (kayıttan silinir).

## Bilinen davranış düzeltmeleri (2026)

| Sorun | Çözüm |
|-------|-------|
| Çift yem tüketimi | `BaitManager.autoSelectAndMaybeConsumeSingleUseBait` artık tüketmez; tüketimi yalnızca `maybeConsumeToken` yapar |
| Çift turnuva duyurusu | `TournamentCommand.stop` içindeki çift `sendMessage` kaldırıldı |
| PLAYER_HEAD yemlerinin kafaya takılması | `BaitProtectListener.onInteract` `isBait()` kontrolü eklendi |

## Reload kapsamı

`/fishingplus reload` yeniden yüklediği bileşenler:

- Dil dosyaları, mesaj cache’i.
- Balık türleri ve yeni `FishRNGService` örneği.
- Bait yöneticisi.
- Debug bayrağı.
- Fishing mode konfigürasyonu (`FishingModeConfig`).
- Spoilage konfigürasyonu ve servis zamanlayıcısı.
- Environment boostları.
- Ingredient ve recipe registry.
- NPC listener.
- Aquarium görüntüleyici (durdur → reload → başlat).

## Lisans

Açılışta `LicenseManager.startUniversalLicenseCheck(...)` çağrılır.
Organizasyon ve ürün id’leri kod içinde sabittir
(`ORGANIZATION_ID = 1L`, `PRODUCT_ID = 1L`,
`PRODUCT_NAME = "FishingPlus"`).
