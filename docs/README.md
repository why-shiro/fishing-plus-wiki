# FishingPlus Dokumantasyonu

FishingPlus, Minecraft balikciligini biyom, zaman, yem, olta parcalari, booster, totem, hotspot, sea event, guild, turnuva, market ve processing sistemleriyle genisleten Paper eklentisidir.

Bu dokumantasyon iki kitle icin yazildi:

- Oyuncular: Hangi menude ne var, baliklar nasil bulunur, market nasil calisir, guild ve turnuvalar ne ise yarar?
- Sunucu sahipleri: Hangi YML ne yapar, ItemsAdder nasil baglanir, dil sistemi nasil kurulur, event scriptleri nasil yazilir?

## Okuma Sirasi

Yeni baslayan bir oyuncuysaniz once [Oyuncu Rehberi](01-player-guide.md) sayfasini okuyun. Sunucu kuruyorsaniz [Kurulum ve Yonetim](02-admin-installation.md) ile baslayin, sonra [YML Referansi](04-configuration-reference.md) ve [ItemsAdder ve Entegrasyonlar](05-itemsadder-and-integrations.md) sayfalarina gecin.

## Ana Basliklar

- [Oyuncu Rehberi](01-player-guide.md)
- [Kurulum ve Yonetim](02-admin-installation.md)
- [Sistemler](03-systems.md)
- [YML Referansi](04-configuration-reference.md)
- [ItemsAdder ve Entegrasyonlar](05-itemsadder-and-integrations.md)
- [Sea Events Scripting](06-sea-events-scripting.md)
- [PlaceholderAPI](07-placeholders.md)
- [Sorun Giderme](08-troubleshooting.md)
- [v1.0.4 Notlari](09-release-1.0.4.md)

## Eklentinin Ana Felsefesi

FishingPlus'ta mekanik ayarlar, dil dosyalari ve GUI ayarlari birbirinden ayrilmaya calisir. Bu sayede sunucu sahibi bir baligin yakalanma kosullarini degistirirken ayni anda uc farkli dil dosyasinda mekanik ayar kopyalamaz. Dil dosyalari gorunen metinleri, ana YML dosyalari ise sistemi ve ekonomiyi yonetir.

Oyuncu bazli dil destegi hedeflenir. Bir oyuncu Turkce, baska bir oyuncu Ingilizce veya Almanca menuleri gorebilir. Eksik ceviri oldugunda fallback devreye girer.
