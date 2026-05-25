# FishingPlus Wiki

FishingPlus, Minecraft'taki vanilla balik tutma dongusunu daha okunabilir, ilerlemeli ve sunucu ekonomisine baglanabilir bir sisteme donusturen Paper eklentisidir. Eklenti baliklari biyom, saat, ay, yem, olta parcasi, aktif booster, totem, hotspot, sea event ve oyuncu ilerlemesi gibi bircok etkene gore secip oyuncuya koleksiyon, pazar, guild, turnuva ve uretim akislari sunar.

Bu wiki, oyuncularin eklentiyi nasil oynayacagini ve sunucu sahiplerinin tum YML dosyalarini nasil yonetecegini anlatmak icin hazirlandi. ItemsAdder kullanan sunucular, vanilla CustomModelData kullanan sunucular, cok dilli sunucular ve PlaceholderAPI entegrasyonu kullanan paneller icin ayri bolumler vardir.

## Hizli Baslangic

1. Sunucuda Paper/Purpur 1.21.x ve Java 21 kullanin.
2. `ProtocolLib` ve `Vault` kurulu olsun. Ekonomi icin Vault destekli bir ekonomi plugini gerekir.
3. Istege bagli olarak `PlaceholderAPI`, `ItemsAdder`, `MythicMobs`, `WorldGuard` veya `GriefPrevention` kurabilirsiniz.
4. FishingPlus jar dosyasini `plugins` klasorune koyun.
5. Sunucuyu bir kez baslatip kapatin. Bu adim config dosyalarini olusturur.
6. `plugins/FishingPlus` altindaki YML dosyalarini duzenleyin.
7. Sunucuyu tekrar baslatin veya desteklenen durumlarda `/fishingplus reload` kullanin.

## Oyuncu Icin Kisa Ozet

- Baliklar her yerde ayni cikmaz. Biyom, ay, saat ve kullanilan yem onemlidir.
- Yakaladiginiz baliklar Journal/Ansiklopedi icinde kesfedilir.
- Kesfedilmemis baliklar markette gizli gorunur ama nerede bulunabilecegine dair ipuclari gosterilebilir.
- Fish Market fiyatlari oyun ici gunlere gore degisebilir. Cok tutulan baliklar ucuzlayabilir, az tutulanlar pahalanabilir.
- Bait, rod part, booster, totem ve hotspot sistemleri RNG uzerinde farkli etkiler yaratir.
- Sea Events aktif oldugunda balikcilik kosullari, ortam efektleri ve riskler degisebilir.
- Guild, turnuva, bounty ve achievement sistemleri oyunculara uzun vadeli hedef verir.

## Dokuman Haritasi

- [Oyuncu Rehberi](docs/01-player-guide.md): menuler, balik tutma, market, journal, guild, turnuva ve gunluk oynanis.
- [Kurulum ve Yonetim](docs/02-admin-installation.md): gereksinimler, komutlar, izinler, database, guncelleme akisi.
- [Sistemler](docs/03-systems.md): RNG, market, spoilage, processing, bucket, rod parts, booster, totem, guild, sea event mantigi.
- [YML Referansi](docs/04-configuration-reference.md): tum ana YML ve GUI YML dosyalari.
- [ItemsAdder ve Entegrasyonlar](docs/05-itemsadder-and-integrations.md): IA model tanimlari, PAPI, MythicMobs, WorldGuard, Vault, ProtocolLib.
- [Sea Events Scripting](docs/06-sea-events-scripting.md): event fazlari, action sistemi, selector ve placeholder mantigi.
- [PlaceholderAPI](docs/07-placeholders.md): kullanilabilir placeholder gruplari.
- [Sorun Giderme](docs/08-troubleshooting.md): en sik hatalar ve cozumleri.
- [v1.0.4 Notlari](docs/09-release-1.0.4.md): son surumdeki onemli degisiklikler.

## Indirme

Son yayinlanan surum GitHub Releases uzerindedir:

- [FishingPlus v1.0.4](https://github.com/why-shiro/fishing-plus-wiki/releases/tag/v1.0.4)

## Temel Komutlar

| Komut | Aciklama |
| --- | --- |
| `/fishingplus` veya `/fp` | Ana oyuncu komutu. Dil, reload ve genel alt komutlar buradan yonetilir. |
| `/journal` | Balik ansiklopedisini acar. |
| `/fishmarket` | Fish Market menulerini acar. |
| `/fishprofile` | Oyuncunun balikcilik profilini acar. |
| `/olta` veya `/rodparts` | Olta parcalari menulerini acar. |
| `/baits` | Yem menulerini acar. |
| `/tournament` | Turnuva durumunu ve katilimi yonetir. |
| `/fishguild` | Guild menulerini acar. |
| `/seaevents` | Sea event bilgisini gosterir. |
| `/fishingadmin` veya `/fishadmin` | Admin menusu. Balik ayarlari, debug ve yonetim ekranlari icin. |

## Temel Izinler

| Permission | Aciklama |
| --- | --- |
| `fishingplus.player` | Oyuncu komutlari icin temel izin. |
| `fishingplus.admin` | Admin komutlari ve admin GUI. |
| `fishingplus.givebait` | Yem verme komutu. |
| `fishingplus.givebucket` | Bucket verme komutu. |
| `fishingplus.tournament.admin` | Turnuva admin islemleri. |
| `fishingplus.admin.hotspot` | Hotspot yonetimi. |
| `fishingplus.time` | Balikcilik zamani komutlari. |
| `fishingplus.debug` | Debug/RNG inceleme komutlari. |
| `fishingplus.protection.bypass` | Koruma kontrollerini bypass eder. |

## Cok Dil Mantigi

FishingPlus, oyuncu bazli dil mantigini hedefler. Bir oyuncu Turkce menuleri gorurken baska bir oyuncu Almanca veya Ingilizce gorebilir. Configlerde ortak mekanik degerler tek yerde tutulur; gorunen isim, lore ve mesajlar `translations` bloklari veya `messages/messages_xx.yml` dosyalari ile ayrilir.

Fallback mantigi soyledir:

1. Oyuncunun sectigi dilde ceviri varsa o kullanilir.
2. Eksikse varsayilan dil veya Ingilizce metin kullanilir.
3. O da yoksa configteki ana `name`, `display` veya ham key gorunebilir.

Bu sayede sunucu sahibi her yeni dil icin tum mekanik dosyalari kopyalamak zorunda kalmaz. Sadece cevirilecek alanlar eklenir.
