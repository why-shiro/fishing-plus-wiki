---
description: Tüm YAML dosyalarının özet listesi ve görevleri.
---

# Konfigürasyon Dosyaları

Dosyalar plugin veri klasörü içinde tutulur
(`plugins/FishingPlus/`). Her dosyanın detaylı şeması ilgili sistem
sayfasında açıklanmıştır.

## Liste

| Dosya | Görevi |
|------|--------|
| `settings.yml` | Genel ayarlar, veritabanı, sohbet, hologram, spoilage, environment, fishing modu, akvaryum, NPC, processing toggle |
| `fish.yml` | Balık türleri (id, kategori, nadirlik, model, boyut, biyom, ay, saat, komut, etki) |
| `baits.yml` | Yem tanımları ve etkileri |
| `boosters.yml` | Tüketilebilir geçici istatistik takviyesi |
| `totems.yml` | Çok bloklu yapı totemleri ve aura etkileri |
| `achievements.yml` | Başarım koşulları ve ödülleri |
| `hotspots.yml` | Dinamik yem noktası türleri |
| `bounty_tasks.yml` | Görev panosu havuzları (3 saatlik / günlük / haftalık / aylık) |
| `processing.yml` | Tesis tarifleri |
| `ingredients.yml` | İşleme malzemesi kataloğu |
| `profile.yml` | Seviye, XP eğrisi, milestone bonusları, seviye ödülleri |
| `tournaments.yml` | Turnuva modları, skor ağırlıkları |
| `rod_base.yml` | Olta gövdesi parçaları |
| `hook.yml` | Olta kancası parçaları |
| `fishing_line.yml` | Olta misina parçaları |
| `plugin.yml` | Komut ve izin tanımları |
| `messages/messages_<kod>.yml` | Dile özel metinler (varsayılan: `en`, `tr`) |
| `facilities.yml` | Yerleştirilen tesislerin kalıcı durumu (runtime) |
| `placed_totems.yml` | Aktif totemlerin kalıcı kaydı (runtime) |

## Genel ayar grupları (`settings.yml`)

`settings.yml` aşağıdaki üst düzey anahtarları kullanır:

- `language` — varsayılan dil kodu.
- `debug` — global debug modu (`enabled`, `log_to_console`).
- `market` — fiyat geçmişi saklama süresi.
- `fishmarket` — sınıf/sezon/spoilage çarpanları.
- `aquarium_display` — kova üzeri görsel.
- `npc_trader`, `npc.economy` — NPC tüccarı.
- `database` — SQLite/Postgres bağlantısı.
- `worlds.enabled_worlds` — eklentinin aktif olduğu dünyalar.
- `chat` — yakalama mesajları, sohbet biçimi, tier etiketleri.
- `hologram` — tesis hologramları ve aylık eşleme.
- `tournament` — turnuva duyuru ayarları.
- `aquarium` — kova kapasitesi ve slot limitleri.
- `processing` — `owner_only_open` toggle.
- `spoilage` — tazelik geçiş süreleri.
- `environment` — hava ve ay evresi etkileri.
- `fishing` — yakalama modu ve mini oyun ayarları.

## Sürüm ve uyumluluk

`plugin.yml: api-version 1.21` — eklenti Minecraft 1.21 API’sini
hedefler. Daha eski sunucularda yüklenmez.
