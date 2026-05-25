# Oyuncu Rehberi

Bu sayfa FishingPlus'i oynayan oyuncular icindir. Admin ayarlari ve YML detaylari ayri sayfalardadir.

## Balik Tutma Nasil Calisir?

FishingPlus vanilla Minecraft balik tutma sistemini tamamen daha detayli bir RNG havuzuna baglar. Bir balik cikmadan once eklenti su kosullari degerlendirir:

- Bulundugunuz biyom.
- Oyun ici ay ve saat.
- Baligin nadirligi.
- Kullanilan yem.
- Oltanin parcalari.
- Aktif boosterlar.
- Yakindaki veya oyuncuya etki eden totemler.
- Hotspot alanlari.
- Aktif Sea Event etkileri.
- Bazi durumlarda oyuncu profili, guild veya event bonuslari.

Bu yuzden ayni oltayla her yerde ayni baliklari yakalamazsiniz. Nehir, okyanus, derin okyanus, bataklik, Nether biyomlari veya ozel bolgeler farkli balik havuzlari olusturabilir.

## Balik Esyasi Lore'u

Yakaladiginiz balik esyasi genellikle su bilgileri tasir:

- Balik adi ve class degeri.
- Kategori: freshwater, saltwater veya other.
- Nadirlik.
- Uzunluk ve agirlik.
- Biyom bilgisi.
- Ay ve saat araligi.
- Gerekli veya tavsiye edilen yem.
- Koleksiyon grubu.
- Tazelik/spoilage durumu.

Dil degistirdiginizde FishingPlus esyalarinin adi ve lore'u oyuncunun secili diline gore yenilenir. Bu yenileme ozellikle baliklar, kovalar, boosterlar, yemler ve olta parcalari icin onemlidir.

## Class Sistemi

Baliklar yalnizca tur ve nadirlikten ibaret degildir. Ayni tur balik farkli class degerleri ile gelebilir. Class, baligin kalitesini ve bazi durumlarda market degerini etkiler.

Ornek class kullanimi:

- `C-`, `C`, `C+`
- `B-`, `B`, `B+`
- `A-`, `A`, `A+`
- `S-`, `S`, `S+`

Mini oyunlarda basari durumu baligin class sonucunu etkileyebilir. Mesela Sweep modunda hedef alanin disina cikmak veya sari alanda yakalamak, beklenen class'i dusurebilir.

## Tazelik ve Spoilage

Baliklar zamanla tazeligini kaybedebilir. Tazelik bilgisi lore'da gorunur. Sunucu ayarina gore taze baliklar daha degerli, bayat baliklar daha dusuk fiyatli olabilir.

Genel mantik:

- Taze balik daha iyi satis degeri verir.
- Zaman gecince balik bayatlayabilir.
- Market ve processing sistemleri tazelige gore farkli davranabilir.

## Journal / Balik Ansiklopedisi

Journal, yakaladiginiz ve henuz kesfetmediginiz baliklari takip eder.

Journal icinde:

- Kesfedilmis baliklari gorebilirsiniz.
- Kesfedilmemis baliklar gizli veya `???` olarak gorunebilir.
- Biyom, ay, saat, kategori ve nadirlik bilgilerine gore filtreleme yapabilirsiniz.
- Bir baligin nerede bulunabilecegini lore'dan takip edebilirsiniz.

Kesfedilmemis baliklarin tam adi veya gorunumu saklanabilir. Bu, oyuncunun ansiklopedi ilerlemesini anlamli hale getirir.

## Fish Market

Fish Market balik satmak icin kullanilir. Market iki ana sekilde calisabilir:

- Tek tek balik satisi.
- Bulk Sell ile toplu satis.

Kesfedilmemis baliklar satilamaz. Bu kural hem tek satis hem toplu satis icin gecerlidir. Oyuncuya sohbetten bilgi verilir ve bu baliklar satisa dahil edilmez.

## Dinamik Fiyat Sistemi

Market fiyatlari sabit olmak zorunda degildir. Sunucu ayarina gore oyun ici gun degistiginde fiyatlar yeniden hesaplanabilir.

Genel mantik:

- Cok tutulan baliklarin fiyati dusebilir.
- Az tutulan baliklarin fiyati artabilir.
- Maksimum gunluk degisim yuzdesi configten ayarlanabilir.
- Bulk Sell ekranindaki fiyatlar da ayni dinamik fiyat sistemini kullanir.

Market lore'unda fiyat degisimi yuzde olarak gorunebilir. Boylece oyuncu hangi baligin deger kazandigini anlayabilir.

## Bulk Sell

Bulk Sell envanterinizdeki satilabilir baliklari topluca satar.

Dikkat edilmesi gerekenler:

- Kesfedilmemis baliklar otomatik atlanir.
- Plugin esyasi olmayan itemler atlanir.
- Fiyat dinamik marketle ayni hesaplanir.
- Onay menusu toplam adet ve toplam kazanci gosterebilir.

## Baits / Yemler

Yemler balik RNG'sini degistirebilir. Bazi yemler belirli biyomlarda, turlerde veya nadirliklerde daha etkilidir.

Yem lore'unda genellikle sunlar vardir:

- Yem adi.
- Nadirlik.
- Kalan kullanim.
- Tuketim modu.
- Etkiledigi statlar.
- Aciklama.

Tuketim modlari:

- `ON_THROW`: Olta suya atildiginda yem tuketilir.
- `ON_CATCH`: Balik yakalandiginda yem tuketilir.
- `ON_CAST`: Eski alias olarak desteklenebilir; yeni configte `ON_THROW` kullanmak daha nettir.

## Olta ve Rod Parts

Olta sistemi parcalardan olusabilir. Parcalar farkli bonuslar verebilir:

- Base rod.
- Hook.
- Line.
- Baska sunucuya ozel parcalar.

Parca turleri oyuncuya daha okunabilir isimlerle gosterilir. Configte enum olarak kalabilir ama menude `Hook`, `Line`, `Base Rod` gibi formatlanmis gorunur.

Olta parcalari:

- RNG agirliklarini etkileyebilir.
- Catch speed veya double catch gibi degerleri degistirebilir.
- Bazi nadirliklere bonus verebilir.
- Belirli balik turlerinde etkili olabilir.

## Mini Oyunlar

Sunucunun aktif ettigi moda gore balik tutarken mini oyun cikabilir.

### Spam Click

Oyuncunun belirli anda tiklama yapmasi gereken reaksiyon oyunudur. Oyun tamamlanmadan sag tiklama ile yemi geri cekme engellenir; aksi halde oyuncu mini oyunu istemeden iptal edebilirdi.

### Sweep

Imlec veya gosterge dogru alana denk getirilmeye calisilir. Yesil alan genellikle en iyi sonucu verir. Sari alan kismi basari sayilabilir ve class dususu yaratabilir.

Daha nadir veya daha yuksek class hedefleri daha zor olabilir.

## Buckets / Kovalar

Balik kovalarla saklanabilir veya yerlestirilebilir. Bucket sistemi sunucu ayarina gore kapasite, hologram ve gorsel destek kullanabilir.

Kova kullanirken:

- Kova yere konabilir.
- Tekrar alinabilir.
- Icinde balik veya ozel veri tasiyabilir.
- Dil degisiminde kova adi ve lore'u yenilenmelidir.

## Processing / Uretim Tesisleri

Baliklari ham satmak yerine isleyebilirsiniz. Processing sistemi tesis mantigiyla calisir.

Tipik akis:

1. Balik veya malzeme input slotuna konur.
2. Tesis islemi baslatir.
3. Progress dolunca output urun olusur.
4. Oyuncu urunu alir veya otomasyon sistemi kullanilir.

Tesisler input/output slotlari, sure, urun havuzu ve otomasyon mantigi ile configten yonetilebilir.

## Bounty

Bounty gorevleri oyunculara veya guildlere belirli baliklari hedef olarak verebilir. Gorevler sureli olabilir, odul havuzu kullanabilir ve market/katki sistemleriyle iliskili olabilir.

## Achievements

Achievement sistemi oyuncuya ekstra hedefler verir. Ornek hedefler:

- Ilk balik.
- Belirli sayida balik tutmak.
- Belirli nadirlikte balik yakalamak.
- Market satisi yapmak.
- Journal kesiflerini tamamlamak.

Basarim tamamlandiginda XP, para veya ozel oduller verilebilir.

## Boosterlar

Boosterlar sureli bonuslardir. Oyuncunun aktif booster suresi veri tabaninda tutulabilir. Bu sayede sunucu kapanip acildiginda kalan sure mantigi korunur.

Boosterlar su etkileri verebilir:

- Catch speed artisi.
- Double catch sansi.
- Belirli nadirlik bonusu.
- Market veya XP bonusu.

## Totemler

Totemler dunyaya yerlestirilen ve yakindaki oyunculara bonus verebilen yapilardir. Hologramlari oyuncunun diline gore gosterilebilir. Totem yoksa servis bos calismali ve performans maliyeti dusuk olmalidir.

## Hotspots

Hotspotlar belirli bolgelerde olusan balikcilik avantajlaridir. Oyuncu hotspot alaninda balik tutarsa RNG veya stat etkileri degisebilir.

Hotspot hologramlari da dil degisimine duyarlidir.

## Guilds

Guild sistemi balikcilik odakli topluluk ilerlemesi sunar.

Guildlerde bulunabilecek ozellikler:

- Guild olusturma ve katilma.
- Member, moderator, admin, owner gibi roller.
- Oyuncu bazli permission yonetimi.
- Rol bazli permission yonetimi.
- Guild gorevleri.
- Guild katkisi.
- Guild siralamasi.
- Uye istatistikleri.

Guild gorevleri configten havuz olarak tanimlanabilir. Ozel tarihli event/gorev varsa o tarih araliginda o secilir; yoksa random gunluk gorev atanabilir.

## Turnuvalar

Turnuvalar oyunculari belirli sure icinde yaristirir. Moduna gore hedef degisebilir:

- En buyuk balik.
- En kucuk balik.
- En agir balik.
- En nadir balik.
- En cok balik.

Turnuva sirasinda boss bar kalan sureyi gosterebilir. Broadcast mesajlari belirli araliklarla top 3 siralamayi ve mevcut durumu paylasabilir.

## Sea Events

Sea Events, balikcilik kosullarini degistiren sunucu olaylaridir. Basit eventler sadece stat etkisi verebilir; gelismis eventler hava durumunu degistirebilir, ses/partikul oynatabilir, oyunculara uyarilar gonderebilir, mob spawnlayabilir veya MythicMobs kullanabilir.

Oyuncu acisindan sea event ekraninda sunlar anlasilir olmalidir:

- Event adi.
- Ne kadar sure kaldigi.
- Ne ise yaradigi.
- Pozitif/negatif etkileri.
- Riskli fazlar varsa uyarilar.

## Dil Secimi

`/fishingplus language` ile desteklenen diller arasinda gecis yapilabilir. Dil degistirdiginizde menuler, mesajlar, hologramlar ve plugin esyalarinin gorunen kisimlari yenilenir.

Sunucuda eksik ceviri varsa fallback devreye girer. Ornegin Almanca dosyada bir satir yoksa Ingilizce veya ana config metni gorunebilir.
