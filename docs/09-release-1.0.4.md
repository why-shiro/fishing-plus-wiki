# v1.0.4 Notlari

Bu sayfa v1.0.4 yayin surecinde toparlanan ana degisiklikleri ozetler.

## Indirme

- [GitHub Release: v1.0.4](https://github.com/why-shiro/fishing-plus-wiki/releases/tag/v1.0.4)

## One Cikan Degisiklikler

- Oyuncu bazli dil sistemi guclendirildi.
- GUI metinleri modul bazli `gui/` klasorune tasindi.
- Fish Market isimlendirmesi ve kesif kurallari duzenlendi.
- Kesfedilmemis baliklar market ve bulk sell satisindan cikarildi.
- Dinamik market fiyat sistemi eklendi/duzenlendi.
- Balik lore'unda fiyat degisim yuzdesi gosterimi eklendi.
- Journal menuleri daha anlasilir hale getirildi.
- Admin fish editor menusu gorsel ve islevsel olarak toparlandi.
- Fish admin kaydetme akisi YML'ye yazip baliklari yeniden yukleyecek sekilde duzenlendi.
- Creative inventory tiklama sorunlari giderildi.
- Plugin itemlerinin crafting, anvil, fuel gibi vanilla akislarda bozulmasi engellendi.
- Dil degisiminde item name/lore yenileme akisi iyilestirildi.
- Bucket, booster, bait, fish ve rod part gibi itemlerin lokalizasyonu toparlandi.
- Hotspot, totem ve facility hologramlarinda dil ve klonlanma sorunlari ele alindi.
- ItemsAdder fish/bait model destegi ortak resolver mantigina yaklastirildi.
- Bait `ON_THROW` consume modu eklendi; `ON_CAST` legacy alias olarak ele alindi.
- Tournament boss bar ve broadcast mantigi gelistirildi.
- Sea Events sistemi daha acik GUI ve scriptli faz/action mantigina dogru genisletildi.
- Black Moon Storm gibi kompleks eventler icin weather, lightning warning, sound, particle, mob spawn ve MythicMobs destekleri planlandi/eklendi.
- Guild menulerinde geri donus ve permission manager akislari duzenlendi.
- Guild task sistemi tarih aralikli ve random gunluk gorev mantigina gore gelistirildi.
- Aktif booster surelerinin database ile korunmasi kontrol edildi.
- RNG, market multiplier, booster, totem ve rod part etkileri genel kontrolden gecirildi.

## Uyumluluk Notlari

- ItemsAdder kullaniliyorsa namespace:item keyleri config ile birebir eslesmelidir.
- `fish.yml` saat formatinda `05:00` yerine `5-11` gibi parser uyumlu aralik kullanin.
- ProtocolLib ve ItemsAdder surumlerinin Paper surumunuzle uyumlu oldugundan emin olun.
- Guncellemeden once `plugins/FishingPlus` klasorunu ve database'i yedekleyin.

## Test Edilmesi Onerilenler

- `/journal` filtreleri.
- `/fishmarket` tek satis ve bulk sell.
- Kesfedilmemis balik satis engeli.
- Dil degistirince envanterdeki balik/yem/kova/booster lore'u.
- Creative modda plugin itemlerini tasima.
- ItemsAdder model ile balik yakalama.
- Facility input/output ve hologram.
- Guild permission manager.
- Tournament boss bar ve top 3 broadcast.
- Sea Event GUI ve event fazlari.
