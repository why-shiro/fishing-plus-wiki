# ItemsAdder ve Entegrasyonlar

FishingPlus vanilla CustomModelData ile calisabilir, ama ItemsAdder ile cok daha temiz model ve texture entegrasyonu yapabilir.

## ItemsAdder

ItemsAdder entegrasyonu icin plugin softdepend olarak ItemsAdder'i tanir. ItemsAdder kuruluysa fish, bait ve desteklenen diger ozel itemlerde `IA` model tipi kullanilabilir.

### Fish Ornegi

```yaml
fish:
  - id: 1
    key: trout
    name: "Trout"
    translations:
      tr:
        name: "Alabalik"
      en:
        name: "Trout"
      de:
        name: "Forelle"
    category: FRESHWATER
    rarity: COMMON
    model:
      type: IA
      value: "fishing_expansion:trout"
    length: { min: 25, max: 55 }
    weight: { min: 0.3, max: 2.2 }
    biomes: [RIVER]
    months: [4,5,6,7,8]
    hours: ["5-11"]
```

`value` alanindaki `fishing_expansion:trout`, ItemsAdder content dosyalarinizdaki namespace ve item key ile birebir eslesmelidir.

### Bait Ornegi

```yaml
baits:
  bobber_bait:
    display: "Bobber Bait"
    translations:
      tr:
        display: "Samandira Yemi"
      en:
        display: "Bobber Bait"
      de:
        display: "Posenkoeder"
    rarity: COMMON
    uses: 5
    consume_mode: ON_THROW
    item:
      material: PAPER
      model:
        type: IA
        value: "fishing_expansion:bobber_bait"
```

Bait ve fish tarafinda ayni IA resolver mantigi kullanilmalidir. Iki ayri sistem olursa admin menude texture gorunurken yakalanan item vanilla gorunebilir.

### IA Degisikligi Sonrasi

ItemsAdder dosyalarini degistirdikten sonra:

1. ItemsAdder content dosyalarini kaydedin.
2. ItemsAdder reload/resourcepack islemini yapin.
3. FishingPlus configini reload edin veya sunucuyu restart edin.
4. Oyuncularin resource pack'i tekrar aldigindan emin olun.

Eger sunucu acikken IA itemleri degisti ve yakalanan baliklar normal item gibi geliyorsa, resolver cache veya ItemsAdder reload sirasi kontrol edilmelidir.

## CustomModelData

ItemsAdder kullanmayan sunucular CMD kullanabilir.

Ornek:

```yaml
model:
  type: CMD
  material: COD
  custom_model_data: 1001
```

CMD icin resource pack model override dosyalariniz dogru olmalidir.

## PlaceholderAPI

PlaceholderAPI ile scoreboard, TAB, chat, hologram ve GUI pluginlerinde FishingPlus verisi gosterilebilir.

Ornekler:

- `%fishingplus_month_name%`
- `%fishingplus_bait_active_display%`
- `%fishingplus_tournament_time_left%`
- `%fishingplus_guild_name%`
- `%fishingplus_seaevent_active_name%`

Tam liste icin PlaceholderAPI sayfasina bakin.

## Vault

Vault ekonomi islemleri icin kullanilir. Market satislari, bounty odulleri, tournament odulleri ve achievement para odulleri Vault uzerinden calisabilir.

Vault kurulu ama ekonomi plugini yoksa para islemleri basarisiz olabilir.

## ProtocolLib

ProtocolLib oyuncuya ozel hologram, paket ve item gosterimleri icin kullanilir. Oyuncu bazli dil destegi ve client-side hologramlar icin onemlidir.

Dikkat:

- ProtocolLib surumu server surumuyle uyumlu olmalidir.
- Baska pluginlerin ProtocolLib ile uyumsuz paket okuma hatalari FishingPlus kaynakli olmayabilir.
- Ornegin ItemsAdder tarafinda `PlayerDigType STAB` gibi hata gorulurse bu genellikle ItemsAdder/ProtocolLib/Paper surum uyumsuzlugudur.

## MythicMobs

Sea Events veya ozel sistemler MythicMobs mob spawn destekleyebilir.

Ornek action:

```yaml
- type: mythicmobs_spawn
  mob: "DrownedCaptain"
  count: 2
  radius: 8
  target: "player[hasPermission=\"fishingplus.event.blackmoon\"]"
```

MythicMobs kurulu degilse bu action atlanmali veya admin loguna uyari vermelidir.

## WorldGuard ve GriefPrevention

Koruma pluginleri bucket, totem, facility veya hotspot yerlestirme islemlerini kontrol etmek icin kullanilabilir.

Kural:

- Oyuncu korumali bolgede izinsiz yerlestirme yapamamali.
- `fishingplus.protection.bypass` olan adminler bypass edebilir.

## Resource Pack Tavsiyeleri

- IA namespace ve FishingPlus config keylerini stabil tutun.
- Bir fish key degistirilirse eski database kayitlari etkilenebilir.
- Model pathlerini degistirirken test sunucusunda deneyin.
- Oyuncularin pack cache'ini temizlemesi gerekebilir.
