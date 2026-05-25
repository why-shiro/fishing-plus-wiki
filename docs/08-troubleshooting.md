# Sorun Giderme

Bu sayfa en sik karsilasilan sorunlari ve kontrol adimlarini toplar.

## Mesajlar Iki Dilde Geliyor

Belirti:

- Ayni tournament mesajinin hem Ingilizce hem Turkce gelmesi.
- Achievement veya system mesajlarinda iki farkli dil gormek.

Muhtemel sebep:

- Eski message yolu ve yeni localized message yolu ayni anda calisiyordur.
- Bir kisim kod `messages.yml` veya hardcoded string kullaniyordur.

Cozum:

- Mesaj pathlerini `messages/messages_xx.yml` altinda birlestirin.
- Eski MessageManager veya hardcoded string kullanan classlari temizleyin.
- Broadcast ve console log mesajlarini ayri degerlendirin.

## Item Adi Degisiyor Ama Lore Degismiyor

Belirti:

- Dil degistirince balik adi Almanca oluyor ama lore Ingilizce/Turkce kaliyor.

Muhtemel sebep:

- Item renderer sadece display name'i yeniliyordur.
- Lore cached tutuluyordur.
- Fish item datasinda key eksik oldugu icin fallback lore uretiliyordur.

Cozum:

- Dil degisiminde plugin itemlerinin tamamini yeniden render edin.
- Balik, bait, bucket, booster ve rod part icin ayrica lore render pathlerini kontrol edin.
- `translations` bloklarinda description/lore pathleri var mi kontrol edin.

## Tazelik Iki Dilde Gorunuyor

Belirti:

- Lore'da hem `Frische` hem `Tazelik` gibi iki satir gorunur.

Muhtemel sebep:

- Eski lore satiri temizlenmeden yeni lore ekleniyordur.
- Fallback satiri ve secili dil satiri ayni anda yaziliyordur.

Cozum:

- Lore komple yeniden uretilmeli, eski satirlar uzerine ekleme yapilmamalidir.
- Freshness label tek translation pathinden gelmelidir.

## Fish.yml Saat Hata Veriyor

Belirti:

`For input string: "05:00"`

Muhtemel sebep:

- Parser `05:00` formatini degil `5-11` gibi saat araligini bekliyordur.

Cozum:

```yaml
hours: ["5-11"]
```

veya gece araligi icin:

```yaml
hours: ["18-6"]
```

kullanin.

## ItemsAdder Texture Admin Menude Var Ama Yakalanan Balik Normal Geliyor

Muhtemel sebep:

- Admin menu ve yakalanan item farkli model resolver kullaniyordur.
- ItemsAdder reload sonrasi FishingPlus cache guncellenmemistir.
- `model.value` namespace:item yanlistir.

Cozum:

- Fish ve bait icin tek ortak IA item builder/resolver kullanin.
- ItemsAdder reload sonrasi FishingPlus reload veya restart yapin.
- `fishing_expansion:trout` gibi keylerin IA content ile birebir eslestigini kontrol edin.

## Creative Envanterde Plugin Itemleri Siliniyor

Muhtemel sebep:

- Creative inventory click eventlerinde tum tiklama iptal ediliyordur veya plugin itemi cursor/slot senkronu bozuluyordur.

Cozum:

- Sadece tehlikeli aksiyonlari iptal edin.
- Normal move/pickup islemlerini bozmayin.
- Crafting/anvil/fuel gibi kullanimi engelleyin ama oyuncu envanterinde tasimaya izin verin.

## Catch Hologram ProtocolLib FieldAccessException

Belirti:

`Field index 0 is out of bounds for length 0`

Muhtemel sebep:

- Paket yapisi sunucu/ProtocolLib surumunde degismistir.
- Teleport packet field yazimi eski format kullaniyordur.

Cozum:

- ProtocolLib surumunu server surumune uygun guncelleyin.
- Entity teleport packet yaziminda yeni accessor yapisini kullanin.
- Hata loop icindeyse task kendini iptal edecek sekilde guvenli hale getirilmeli.

## ItemsAdder STAB Hatası

Belirti:

`NoSuchFieldError: PlayerDigType STAB`

Bu hata genellikle FishingPlus kaynakli degildir. ItemsAdder'in ProtocolLib/Paper surumuyle uyumsuz paket enumu beklemesiyle ilgilidir.

Cozum:

- ItemsAdder'i guncelleyin.
- ProtocolLib'i sunucu surumune uygun surume cekin.
- Paper surumuyle ItemsAdder uyumlulugunu kontrol edin.

## Market Fiyatlari Degismiyor

Kontrol edin:

- Dinamik fiyat sistemi `settings.yml` icinde aktif mi?
- Oyun ici gun degisimi tetikleniyor mu?
- Market history kayitlari database'e yaziliyor mu?
- Max degisim yuzdesi cok dusuk mu?
- Test ederken ayni gun icinde mi bakiyorsunuz?

## Kesfedilmemis Balik Satiliyor

Kontrol edin:

- Player discovery database kaydi dogru okunuyor mu?
- Bulk sell kodu tek satisla ayni discovery kontrolunu kullaniyor mu?
- Fish iteminde key/id bilgisi saglam mi?

## Facility Hologram Klonlaniyor

Muhtemel sebep:

- Oyuncu cikis/giris yaptiginda eski client-side hologram destroy edilmeden yenisi spawnlaniyordur.
- Global entity ID map temizlenmiyordur.

Cozum:

- Player quit ve language change eventlerinde hologram destroy paketi gonderin.
- Tek facility icin oyuncu bazli tek hologram kaydi tutun.

## Dil Degisince Yerdeki Item Adi Degismiyor

Yerdeki item entity herkes icin ayni server-side item meta tasiyorsa oyuncu bazli dil desteklemek zordur. Cozum:

- Yerdeki item adini global fallback dilde tutmak.
- Veya ProtocolLib ile oyuncuya ozel metadata packet gondermek.

Oyuncular arasi item alisverisinde item envantere girdiginde oyuncunun diline gore yeniden render edilmelidir.

## Sea Event GUI Ne Ise Yaradigini Anlatmiyor

Cozum:

- `gui/sea_events.yml` icinde her event icin aciklama satirlari ekleyin.
- Pozitif ve negatif etkileri ayri satirlarla gosterin.
- Kalan sureyi ve faz durumunu gosterin.

## Tournament Yeterli Oyuncu Yok Mesaji Spamliyor

Kontrol edin:

- Retry araligi mantikli mi?
- Broadcast hem localized hem legacy yoldan mi gidiyor?
- Console log ve oyuncu broadcast ayni sey zannediliyor mu?

## Migration Duplicate Column Hatası

Belirti:

`duplicate column name`

Muhtemel sebep:

- Migration daha once kismen uygulanmistir ama version tablosu guncellenmemistir.
- Manuel database degisikligi yapilmistir.

Cozum:

- Database yedegi alin.
- Migration version tablosunu kontrol edin.
- Tekrar eden kolon icin idempotent migration kullanin.

## Performans Kontrol Listesi

- Totem yoksa totem service pahali tarama yapmiyor mu?
- Hologram servisleri offline oyunculari taramiyor mu?
- Spoilage scan cok sik mi calisiyor?
- Sea Event particle/mob actionlari abartili mi?
- Placeholderlar scoreboardda cok yogun mu kullaniliyor?
- Database islemleri ana thread'i blokluyor mu?

Canli sunucuda profiler ile `TotemHologramPacketService`, `LocalizedItemEntityService`, `SpoilageService` gibi periyodik servisleri kontrol edin.
