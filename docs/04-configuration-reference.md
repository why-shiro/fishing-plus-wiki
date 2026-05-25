# YML Referansi

Bu sayfa FishingPlus ile gelen ana YML dosyalarinin ne yaptigini anlatir. Dosya yollarini `plugins/FishingPlus` altina gore dusunun. Kaynak jar icinde default kopyalari `src/main/resources` yapisinda bulunur.

## Genel Kural

- Mekanik ayarlar tek yerde tutulur.
- Dil/metin ayarlari `translations`, `messages/messages_xx.yml` veya `gui/*.yml` icindedir.
- Enum degerleri genellikle buyuk harfle yazilir.
- Saat araliklari config formatina uygun yazilmalidir. Desteklenen format `5-11`, `18-6`, `0-24` gibi sayisal saat araligidir; `05:00` gibi iki nokta formatini eski parser kabul etmeyebilir.
- ItemsAdder itemleri icin `model.type: IA` ve `model.value: namespace:item` kullanilir.
- CustomModelData icin `model.type: CMD`, `material` ve `custom_model_data` kullanilir.

## `settings.yml`

Ana sistem ayarlaridir.

Onemli bolumler:

- `language`: varsayilan dil ve desteklenen dil akisi.
- `debug`: log ve debug davranislari.
- `database`: SQLite veya PostgreSQL ayarlari.
- `worlds`: eklentinin aktif oldugu dunya listesi.
- `fishmarket`: market carpimlari, dinamik fiyat, spoilage etkisi.
- `chat.catch`: yakalama mesajlari, private/broadcast ayarlari.
- `hologram`: catch hologram renkleri, offset ve update araligi.
- `tournament`: turnuva sureleri, broadcast ve boss bar davranislari.
- `aquarium` veya bucket benzeri bolumler: yerlestirilmis balik/kap sistemleri.
- `processing`: facility davranislari.
- `spoilage`: balik tazelik sistemi.
- `environment`: dunya, zaman ve event etkileri.

Dikkat:

- Market multipliers iki dil dosyasinda tutulmamalidir. Bunlar mekanik ayardir ve `settings.yml` gibi ortak configte olmalidir.
- Dil dosyalari sadece metin icindir.

## `fish.yml`

Balik tanimlari.

Tipik satir:

```yaml
fish:
  - id: 1
    key: trout
    name: "Trout"
    translations:
      tr:
        name: "Alabalik"
        description: "Tatli su baligi."
      en:
        name: "Trout"
        description: "Freshwater fish."
      de:
        name: "Forelle"
        description: "Suesswasserfisch."
    category: FRESHWATER
    rarity: COMMON
    model:
      type: IA
      value: "fishing_expansion:trout"
    length:
      min: 25
      max: 55
    weight:
      min: 0.3
      max: 2.2
    biomes: [RIVER]
    months: [4, 5, 6, 7, 8]
    hours: ["5-11"]
```

Alanlar:

- `id`: benzersiz sayisal ID.
- `key`: teknik anahtar. Eski kayitlar ve ceviriler icin stabil kalmalidir.
- `name`: fallback gorunen ad.
- `translations`: dil bazli isim/aciklama.
- `category`: `FRESHWATER`, `SALTWATER`, `OTHER`.
- `rarity`: nadirlik.
- `model`: IA veya CMD model bilgisi.
- `length`: cm araligi.
- `weight`: kg araligi.
- `biomes`: Minecraft biyom enumlari.
- `months`: 1-12 arasi aylar.
- `hours`: saat araliklari.
- `bait` veya benzeri opsiyoneller: belirli yem ihtiyaci veya bonus bilgisi.

Saat araligi geceyi asabilir. Ornek `18-6`, 18:00 ile 06:00 arasini temsil eder.

## `baits.yml`

Yem tanimlari.

Tipik alanlar:

- `id` veya `key`.
- `display`.
- `translations`.
- `rarity`.
- `uses`.
- `consume_mode`.
- `item.material`.
- `custom_model_data`.
- `item.model.type`.
- `item.model.value`.
- `description`.
- `boosts`.

Ornek:

```yaml
baits:
  bobber_bait:
    display: "Bobber Bait"
    translations:
      tr:
        display: "Samandira Yemi"
        description: "Isirmayi biraz hizlandiran basit yem."
      en:
        display: "Bobber Bait"
        description: "A simple bait that makes bites slightly faster."
      de:
        display: "Posenkoeder"
        description: "Ein einfacher Koeder, der Bisse leicht beschleunigt."
    rarity: COMMON
    uses: 5
    consume_mode: ON_THROW
    item:
      material: PAPER
      model:
        type: IA
        value: "fishing_expansion:bobber_bait"
    boosts:
      catch_speed_multiplier: 1.09
      rarity_multipliers:
        COMMON: 1.05
```

`ON_THROW` olta atildiginda tuketir. `ON_CATCH` sadece balik yakalaninca tuketir.

## `fishing_line.yml`

Misina/line parcalari.

Icerik genellikle sunlari kapsar:

- Parca ID/key.
- Gorunen ad.
- Cok dilli ceviriler.
- Rarity.
- Model.
- Stat etkileri.
- Kullanilabilirlik veya seviye gereksinimi.

Oyuncu lore'unda teknik parca ID'si gosterilmemelidir. `BASE`, `HOOK`, `LINE` gibi enumlar oyuncuya formatlanmis adla gosterilir.

## `hook.yml`

Kanca parcalari.

Kanca, balik RNG veya mini oyun basarisi uzerinde etkili olabilir. Sunucu tasarimina gore:

- Catch speed.
- Rarity multiplier.
- Specific fish multiplier.
- Double catch chance.
- Durability veya seviye gereksinimi.

## `rod_base.yml`

Olta govdesi/base tanimlari.

Olta base parcalari genellikle daha temel statlar verir. Hook ve line ile birlesince toplam olta etkisi hesaplanir.

## `ingredients.yml`

Processing veya crafting-like sistemlerde kullanilan ozel malzemeler.

Dikkat:

- Bu malzemeler vanilla crafting/anvil/fuel sistemlerinde kullanilmamali.
- ItemsAdder modeli verilebilir.
- Cok dilli ad/lore desteklenmelidir.

## `processing.yml`

Facility ve isleme sistemi.

Tanimlanabilecek alanlar:

- Facility turleri.
- Input itemleri.
- Output itemleri.
- Isleme suresi.
- Kapasite.
- Progress ayarlari.
- Otomasyon davranisi.
- Owner-only veya permission kontrolleri.
- GUI slotlari ve item gosterimleri.

Processing GUI'da oyuncunun diline uygun item render edilmelidir.

## `profile.yml`

Oyuncu profil ve level path ayarlari.

Icerikler:

- Seviye gereksinimleri.
- Level odulleri.
- Profile GUI istatistik alanlari.
- Best catch, total catch gibi metrikler.
- Olta onizleme bilgileri.

## `achievements.yml`

Basarim tanimlari.

Alanlar:

- Basarim ID/key.
- Gorunen ad ve ceviriler.
- Aciklama.
- Hedef tipi.
- Hedef miktar.
- Oduller.
- GUI ikonu.

Achievement mesajlari tek dil sisteminden gelmelidir. Ayni anda iki dilde basarim mesaji gorunuyorsa eski message yolu kontrol edilmelidir.

## `boosters.yml`

Booster itemleri ve etkileri.

Alanlar:

- Booster ID.
- Sure.
- Display ve lore.
- Rarity.
- Model.
- Stat etkileri.
- Stack/kullanim kurallari.

Aktif boosterlar database'e yazilmalidir. Sunucu kapanirsa kalan sure veriden okunabilir.

## `totems.yml`

Totem tanimlari.

Alanlar:

- Totem ID.
- Display ve ceviriler.
- Model veya blok yapisi.
- Range.
- Sure veya kalicilik.
- Stat etkileri.
- Hologram ayarlari.

Client-side hologram kullaniliyorsa dil degisiminde eski hologram temizlenip yenisi gonderilmelidir.

## `hotspots.yml`

Hotspot ayarlari.

Icerikler:

- Hotspot olusma kosullari.
- Range.
- Sure.
- Bonuslar.
- Hologram/particle ayarlari.
- Admin olusturma ayarlari.

## `bounty_tasks.yml`

Bounty gorev havuzu.

Alanlar:

- Gorev ID.
- Hedef balik veya kategori.
- Miktar.
- Sure.
- Odul.
- Bounty GUI metinleri.

## `guild_tasks.yml`

Guild gorev havuzu.

Alanlar:

- Gorev ID.
- Display ve ceviriler.
- Hedef turu.
- Hedef miktar.
- Odul havuzu.
- `start_date` ve `end_date` gibi tarih araliklari.
- Random gunluk secim icin uygunluk.

Ozel tarihli gorev varsa o tarih araliginda aktif olur. Yoksa random gorev secilebilir.

## `sea_events.yml`

Sea Event tanimlari.

Basit eventler sadece stat etkisi verebilir. Gelismis eventler faz ve action sistemi kullanir.

Ana alanlar:

- Event ID/key.
- Display ve ceviriler.
- Duration.
- Weight veya schedule.
- Effects.
- GUI aciklamasi.
- Phases.
- Actions.

Detayli DSL icin `docs/06-sea-events-scripting.md` sayfasina bakin.

## `tournaments.yml`

Turnuva ayarlari.

Alanlar:

- Turnuva tipleri.
- Sure.
- Minimum oyuncu.
- Oduller.
- Broadcast araligi.
- Boss bar ayarlari.
- Top 3 formatlari.

Broadcast mesajlari `messages/messages_xx.yml` icinden gelmelidir.

## `messages/messages_en.yml`, `messages/messages_tr.yml`, `messages/messages_de.yml`

Genel mesaj dosyalari.

Kullanildigi yerler:

- Sohbet mesajlari.
- Admin komut cevaplari.
- Hata mesajlari.
- Market satis mesajlari.
- Tournament broadcast.
- Guild bilgi mesajlari.
- Sea Event uyarilari.
- Bucket, hologram, item refresh gibi sistem mesajlari.

Eksik ceviri varsa fallback devreye girer. Ancak iyi bir cok dil deneyimi icin en az `en`, `tr`, `de` dosyalarindaki pathler eslesmelidir.

## `gui/*.yml`

GUI metinleri ve slot itemleri modullere ayrilmistir.

Dosyalar:

- `gui/achievements.yml`: basarim menuleri.
- `gui/admin.yml`: admin paneli ve balik duzenleme ekranlari.
- `gui/baits.yml`: yem menuleri.
- `gui/bounty.yml`: bounty menuleri.
- `gui/buckets.yml`: bucket menuleri.
- `gui/guilds.yml`: guild ana, uye, permission, gorev ve rank menuleri.
- `gui/journal.yml`: ansiklopedi ve filtreleme ekranlari.
- `gui/market.yml`: Fish Market, bulk sell, onay ekranlari.
- `gui/processing.yml`: facility ve otomasyon ekranlari.
- `gui/profile.yml`: oyuncu profili ve level path.
- `gui/rods.yml`: olta parcalari ekranlari.
- `gui/sea_events.yml`: sea event bilgi ekranlari.

GUI dosyalari sunucu sahibinin menulerdeki yazi, ikon, lore ve slot duzenini daha rahat yonetmesi icin ayrilmistir. Ic ice her alt menu icin ayri dosya yerine modul bazli dosya kullanilir.

## `plugin.yml`

Bukkit/Paper plugin tanim dosyasidir. Komutlar, aliaslar, dependencyler ve permissionlar burada tanimlidir. Normalde sunucu sahibi bunu duzenlemez.
