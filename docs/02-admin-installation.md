# Kurulum ve Yonetim

Bu sayfa sunucu sahipleri ve adminler icindir.

## Gereksinimler

Zorunlu:

- Paper veya Paper tabanli sunucu.
- Java 21.
- ProtocolLib.
- Vault.
- Vault destekli ekonomi plugini.

Istege bagli:

- PlaceholderAPI: scoreboard, tab, menu ve diger pluginlerde placeholder kullanmak icin.
- ItemsAdder: ozel balik, yem, parca ve item texture/model entegrasyonu icin.
- MythicMobs: Sea Event veya baska sistemlerde ozel mob spawnlamak icin.
- WorldGuard: bolge koruma kontrolleri icin.
- GriefPrevention: claim koruma kontrolleri icin.

## Kurulum

1. Gerekli dependency jarlarini `plugins` klasorune koyun.
2. FishingPlus jar dosyasini `plugins` klasorune koyun.
3. Sunucuyu baslatin.
4. `plugins/FishingPlus` klasorunun olustugunu kontrol edin.
5. Sunucuyu kapatin.
6. YML dosyalarini duzenleyin.
7. Sunucuyu tekrar baslatin.

Ilk kurulumda dosyalar otomatik olusturulur. Guncelleme yaparken eski configleri silmeden once yedek alin.

## Database

FishingPlus SQLite veya PostgreSQL kullanabilir. Ayar `settings.yml` icinde `database` bolumundedir.

SQLite:

- Kucuk ve orta olcekli sunucular icin kolaydir.
- Ek kurulum gerektirmez.
- Dosya tabanlidir.

PostgreSQL:

- Buyuk sunucular icin daha uygundur.
- Uzaktan database kullanilabilir.
- Backup ve migration yonetimi daha kontrolludur.

Database su veriler icin kullanilabilir:

- Oyuncu profilleri.
- Kesfedilen baliklar.
- Market yakalama/gecmis sayaclari.
- Aktif booster sureleri.
- Guild verileri.
- Guild gorevleri ve katkilar.
- Turnuva gecmisleri.
- Facility/processing verileri.
- Totem, bucket veya yerlestirilmis yapilar.

## Config Guncelleme Mantigi

Sunucu sahiplerinin en cok dikkat etmesi gereken konu config guncellemeleridir.

Tavsiye edilen akis:

1. Eski `plugins/FishingPlus` klasorunu yedekleyin.
2. Yeni jar ile sunucuyu test ortaminda baslatin.
3. Yeni default dosyalari ayri bir yerde olusturun.
4. Eski configlerinize yeni keyleri kontrollu ekleyin.
5. Dil dosyalarinda eksik path var mi kontrol edin.
6. Canli sunucuya gecmeden once `/fishingadmin` ve temel menuleri deneyin.

## Komutlar

### Oyuncu Komutlari

| Komut | Alias | Aciklama |
| --- | --- | --- |
| `/fishingplus` | `/fp`, `/fish` | Ana komut. Dil, reload ve genel islemler. |
| `/journal` | - | Balik ansiklopedisi. |
| `/fishmarket` | - | Market ve bulk sell. |
| `/fishprofile` | - | Oyuncu profili. |
| `/olta` | `/rodparts` | Olta parcalari. |
| `/baits` | - | Yem menusu. |
| `/tournament` | - | Turnuva menusu/durumu. |
| `/fishguild` | `/fishingguild`, `/fpguild` | Guild sistemi. |
| `/seaevents` | `/fishevents`, `/seaevent` | Aktif sea event bilgisi. |
| `/fishwhere` | - | Balik nerede bulunur bilgisi. |
| `/fishtime` | - | Balikcilik takvim/saat bilgisi. |
| `/fishchat` | - | Balikcilik chat/kanal komutlari. |

### Admin Komutlari

| Komut | Alias | Aciklama |
| --- | --- | --- |
| `/fishingadmin` | `/fishadmin`, `/fpadmin`, `/fpa` | Admin paneli. |
| `/givebait` | - | Oyuncuya yem verir. |
| `/givebucket` | - | Oyuncuya bucket verir. |
| `/hotspot` | - | Hotspot yonetimi. |
| `/fishrng` | - | RNG test/debug. |
| `/fishdebug` | - | Debug bilgileri. |

## Izinler

| Permission | Varsayilan | Aciklama |
| --- | --- | --- |
| `fishingplus.player` | true/op ayarina gore | Temel oyuncu kullanimi. |
| `fishingplus.admin` | op | Admin GUI ve admin islemleri. |
| `fishingplus.givebait` | op | Yem verme komutu. |
| `fishingplus.givebucket` | op | Bucket verme komutu. |
| `fishingplus.tournament.admin` | op | Turnuva admin islemleri. |
| `fishingplus.admin.hotspot` | op | Hotspot admin komutlari. |
| `fishingplus.time` | op veya ayara gore | Balikcilik zamani komutlari. |
| `fishingplus.debug` | op | Debug komutlari. |
| `fishingplus.protection.bypass` | op | WorldGuard/claim gibi korumalari bypass eder. |

## Plugin Reload ve Restart

Bazi ayarlar reload ile uygulanabilir. Fakat su durumlarda restart tavsiye edilir:

- Yeni database tipi veya connection degisikligi.
- ItemsAdder namespace/model degisikligi.
- Buyuk fish/bait/processing dosyasi degisikligi.
- Sea Event scripting yapisi degisikligi.
- GUI dosyalarinin komple yeniden duzenlenmesi.

Minecraft `/reload` komutu tavsiye edilmez. Plugin reload komutu varsa onu kullanin veya temiz restart yapin.

## Admin GUI

`/fishadmin` admin panelini acar. Buradan balik ayarlari, testler ve yonetim ekranlari kullanilabilir. Balik duzenleme menusu YML'ye yazma ve baliklari yeniden yukleme akisini destekler. Canli sunucuda buyuk degisiklik yapmadan once dosya yedegi alin.

## Guvenli Item Kullanimi

FishingPlus ozel itemleri vanilla sistemlerde yanlislikla kullanilmamalidir. Bu yuzden baliklar, yemler, olta parcalari, boosterlar, bucketlar, facility itemleri ve malzemeler crafting, anvil, fuel gibi akislarda engellenmelidir.

Bu kritik bir ekonomidir:

- Oyuncu ozel itemi yakit olarak yakamamali.
- Ozel item crafting grid ile kaybolmamali.
- Anvil veya grindstone gibi bloklarda meta bozulmamali.
- Creative envanter tiklamalarinda plugin itemleri silinmemeli.

## Yedekleme

Yedeklenmesi gerekenler:

- `plugins/FishingPlus` klasoru.
- SQLite database dosyasi veya PostgreSQL dump.
- ItemsAdder content pack dosyalari.
- Wiki/release icin kullandiginiz jar arsivi.

Guncellemeden once mutlaka yedek alin.
