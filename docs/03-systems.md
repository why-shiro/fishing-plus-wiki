# Sistemler

Bu sayfa FishingPlus'in ana mekaniklerini detayli anlatir.

## RNG Sistemi

FishingPlus'ta balik secimi tek bir sabit loot table degildir. Eklenti once mevcut kosullara uygun balik havuzunu cikarir, sonra agirliklari ve bonuslari uygular.

Degerlendirilen temel kosullar:

- Dunya ve biyom.
- Oyun ici ay.
- Oyun ici saat.
- Baligin kategori ve nadirligi.
- Yem etkileri.
- Olta parcalari.
- Booster etkileri.
- Totem etkileri.
- Hotspot etkileri.
- Sea Event etkileri.
- Sunucu configinde tanimli carpimlar.

### Uygunluk ve Agirlik

Bir balik once uygun mu diye kontrol edilir. Ornegin balik sadece `RIVER` biyomunda ve `5-11` saatleri arasinda cikiyorsa, oyuncu okyanusta gece balik tutarken o balik havuza girmez.

Uygun balik havuzu olustuktan sonra agirlik/carpan mantigi devreye girer. Yem, rod part, booster, totem veya sea event belirli bir baligi, kategori grubunu ya da nadirligi daha olasi hale getirebilir.

### Nadirlik

Nadirlik hem yakalama sansini hem de ekonomik degeri etkileyebilir.

Yaygin nadirlikler:

- `COMMON`
- `UNCOMMON`
- `RARE`
- `EPIC`
- `LEGENDARY`
- `MYTHIC`

Configlerde nadirlik isimleri genellikle enum olarak yazilir. Buyuk harf kullanmak daha guvenlidir.

## Balik Sistemi

Baliklar `fish.yml` icinde tanimlanir. Her balik sunlari tasir:

- Benzersiz `id`.
- Teknik veya gorunen `name`.
- Cok dilli `translations`.
- `category`.
- `rarity`.
- Model bilgisi.
- Uzunluk ve agirlik araligi.
- Biyom listesi.
- Ay listesi.
- Saat araligi.
- Opsiyonel yem veya tüketim bilgisi.

Balik yakalandiginda eklenti rastgele uzunluk, agirlik ve class hesaplar. Lore bu verilere gore uretilir.

## Cok Dilli Item Sistemi

Plugin itemleri icin hedef mantik su sekildedir:

- Mekanik veri itemin kalici datasinda saklanir.
- Gorunen ad ve lore oyuncunun diline gore uretilir.
- Oyuncu dil degistirdiginde envanterindeki plugin itemleri tekrar render edilir.
- Yere atilmis itemler veya hologramlar oyuncuya ozel paketlerle gosteriliyorsa her oyuncu kendi dilinde gorur.

Bu sistem sunu cozer: Turkce oyuncu ayni baligi Turkce, Almanca oyuncu Almanca gorebilir.

## Market Sistemi

Fish Market ham balik ekonomisini yonetir.

Fiyat hesaplamasinda kullanilabilecek faktorler:

- Baligin base fiyati.
- Nadirlik carpani.
- Class carpani.
- Tazelik carpani.
- Dinamik gunluk fiyat degisimi.
- Server configinde tanimli limitler.

### Kesfedilmemis Baliklar

Kesfedilmemis baliklar satilamaz. Oyuncu markette bu baliklari `???` ve bariyer gibi gizli itemlerle gorebilir. Fiyat ve nerede kesfedilebilecegi gosterilebilir, ama satis engellenir.

Bulk Sell de ayni kurala uyar. Kesfedilmemis baliklar toplu satisa dahil edilmez ve oyuncuya bilgi verilir.

### Dinamik Fiyat

Dinamik fiyat sistemi oyun ici gun degisiminde pazar dengesini degistirir.

Basit mantik:

- Bir balik cok tutulduysa arz fazladir ve fiyati duser.
- Daha az tutulan baliklarin fiyati artar.
- Degisim yuzdesi max limit ile sinirlanir.
- Varsayilan veya configte belirlenen limit ornegin `%20` olabilir.

Bu sistem oyunculari hep ayni baligi farm etmek yerine farkli biyomlara ve tur arayisina iter.

## Spoilage / Tazelik

Baliklar zamanla tazeligini kaybedebilir. Tazelik item datasindan hesaplanir ve lore'a yazilir.

Kullanildigi yerler:

- Market fiyati.
- Lore gosterimi.
- Processing girdi kalitesi.
- Bazi bounty veya achievement kontrolleri.

Dil sisteminde tazelik tek bir dilde gorunmelidir. Ayni lore'da hem secili dil hem Turkce fallback gorunuyorsa ceviri/fallback yolu kontrol edilmelidir.

## Bait Sistemi

Yemler RNG'ye bonus veren kullanilabilir itemlerdir.

Etkileyebilecekleri alanlar:

- Freshwater veya saltwater carpani.
- Catch speed.
- Double catch sansi.
- Belirli biyomlar.
- Belirli kategori veya turler.
- Belirli nadirlikler.

Tuketim modlari:

- `ON_THROW`: Olta suya atilinca tuketilir.
- `ON_CATCH`: Balik basariyla yakalaninca tuketilir.
- `ON_CAST`: Eski configlerden gelen alias; yeni dosyalarda `ON_THROW` tercih edilir.

## Rod Parts Sistemi

Olta parcalari, oyuncunun oltasini ozellestirmesini saglar. Parca turleri enum olarak tutulur ama oyuncuya guzel formatla gosterilir.

Tipik parcalar:

- Base rod.
- Hook.
- Line.

Parca ID'leri oyuncu lore'unda gizlenebilir. Oyuncu sadece parcanin adini, tipini, nadirligini ve bonuslarini gormelidir.

## Booster Sistemi

Boosterlar sureli bonuslardir. Aktif boosterlar database'e yazildiginda sunucu kapanip acildiktan sonra kalan sure korunabilir.

Ornek etkiler:

- RNG carpani.
- Catch speed.
- Double catch.
- XP veya para bonusu.
- Market etkisi.

Booster suresi oyuncu offline olsa bile tasarima gore akmaya devam edebilir. Bu davranis sunucu ekonomisi icin net belirlenmelidir.

## Totem Sistemi

Totemler dunyada konumlu etki kaynaklaridir. Yakindaki oyunculara stat etkileri verebilir.

Dikkat edilmesi gerekenler:

- Totem yokken servis pahali tarama yapmamalidir.
- Hologramlar oyuncu diline gore guncellenmelidir.
- Cikis-giris yapinca hologram klonlanmamali, eski client-side entity temizlenmelidir.
- Range hesaplari optimize edilmelidir.

## Hotspot Sistemi

Hotspotlar belli bolgelerde ozel balikcilik etkisi verir. Sunucu bunlari manuel olusturabilir veya sistem otomatik yonetebilir.

Hotspot oyuncuya:

- Ozel balik sansi.
- Nadirlik bonusu.
- Catch speed etkisi.
- Hologram/particle gorseli.

gibi bilgiler verebilir.

## Processing Sistemi

Processing baliklari veya malzemeleri daha degerli urunlere donusturur.

Tesis mantigi:

- Input slotlari.
- Output slotlari.
- Progress.
- Sure.
- Recipe veya urun havuzu.
- Owner ve permission kontrolu.
- Otomasyon girdi/cikti mantigi.

Processing GUI'da otomasyondan gelen baliklar oyuncu diline gore render edilmelidir.

## Bucket Sistemi

Bucketlar balik veya ozel verili itemleri saklayabilir. Placed bucket mantigi varsa dunya konumu database'e yazilir.

Kritik noktalar:

- Kova alininca item verisi bozulmamali.
- Dil degisiminde ad ve lore yenilenmeli.
- Creative modda tiklama ile silinmemeli.
- Hologramlar klonlanmamali.

## Achievement Sistemi

Achievementler oyunculara uzun vadeli hedefler verir. Configten hedef ve odul tanimlanir.

Hedef turleri sunucu tasarimina gore degisebilir:

- Ilk yakalama.
- Belirli balik sayisi.
- Belirli nadirlik.
- Belirli kategori.
- Market satisi.
- Journal ilerlemesi.
- Guild katkisi.

## Bounty Sistemi

Bounty gorevleri belirli sure icinde belirli baliklari veya urunleri hedefler. Bounty sistemi market, guild veya oyuncu profiliyle iliskili olabilir.

Bounty ekraninda oyuncunun anlamasi gerekenler:

- Hedef nedir?
- Kac adet gerekir?
- Kalan sure nedir?
- Odul havuzu nedir?
- Oyuncu katkisi nedir?

## Guild Sistemi

Guild sistemi oyunculari balikcilik odakli gruplara ayirir.

Ana parcalar:

- Guild olusturma.
- Uye listesi.
- Rol sistemi.
- Oyuncu bazli permission.
- Rol bazli permission.
- Guild gorevleri.
- Guild katkisi.
- Guild rank/siralama.
- Top 10 guild listesi.
- Diger guildlerin ozet ekranlari.

### Permission Manager

Permission manager GUI icinde iki ana yol olmalidir:

- Rol secimi: member, moderator, admin, owner gibi rollerin izinleri toggle edilir.
- Oyuncu secimi: guilddeki oyuncular listelenir, oyuncuya ozel izinler toggle edilir.

### Guild Tasks

Guild gorevleri configten yonetilir.

Mantik:

- Genel gorev havuzu vardir.
- Ozel tarih araligina sahip gorev varsa o tarihlerde o gorev aktif olur.
- Ozel tarihli gorev yoksa random gunluk gorev secilir.
- Her guild ayni gun ayni gorevleri alabilir veya tasarima gore ayrilabilir.

## Tournament Sistemi

Turnuva sistemi belirli sureli yarismalar sunar. Boss bar kalan sureyi gosterir. Broadcast belirli araliklarla top 3 ve mevcut durumu yayinlayabilir.

Top 3 broadcast ornekleri:

- En buyuk balik: oyuncu adi + uzunluk.
- En kucuk balik: oyuncu adi + uzunluk.
- En agir balik: oyuncu adi + kg.
- En cok balik: oyuncu adi + adet.

Yetersiz oyuncu varsa tek dilde mesaj atilmalidir. Ayni anda hem Ingilizce hem Turkce broadcast gelmesi iki farkli mesaj yolunun calistigini gosterir.

## Sea Event Sistemi

Sea Events balikcilik kosullarini degistiren olaylardir. Basit stat efektlerinden scriptli fazlara kadar genisleyebilir.

Ornek eventler:

- Calm Waters: daha kolay veya daha sakin balikcilik kosullari.
- Storm: catch speed, risk ve nadirlik degisimi.
- Black Moon Storm: yagmur, uyarili simsek, mob spawn, MythicMobs fazlari.

Event GUI oyuncuya sadece isim gostermemeli; ne ise yaradigini, kalan sureyi, aktif etkileri ve riskleri anlatmalidir.

## PlaceholderAPI Sistemi

PAPI placeholderlari scoreboard, tab, chat, hologram ve GUI pluginlerinde FishingPlus verilerini gostermek icin kullanilir.

Ornek:

- `%fishingplus_month_name%`
- `%fishingplus_bait_active_display%`
- `%fishingplus_tournament_time_left%`
- `%fishingplus_guild_name%`
- `%fishingplus_seaevent_active_name%`

Tum liste icin PlaceholderAPI sayfasina bakin.
