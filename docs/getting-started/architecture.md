---
description: Eklentinin yapısı, ana sınıfı ve istatistik birleştirme zinciri.
---

# Genel Mimari

## Ana sınıf

`net.neostellar.fishingPlus.FishingPlus` (singleton). Tüm servislere
statik erişim sağlar (`FishingPlus.getRNG()`,
`FishingPlus.getBaitManager()`, vb.).

## Bağımlılıklar

| Bağımlılık | Türü | Kullanımı |
|-----------|------|----------|
| ProtocolLib | Zorunlu | Yaklaşma overlay’i ve paket bazlı görsel efektler |
| Vault | Zorunlu | Ekonomi entegrasyonu (`money` ödülleri, market, NPC) |
| PlaceholderAPI | Yumuşak | `FishingPlusExpansion` placeholder’ları |
| ItemsAdder | Yumuşak | Özel item modelleri |
| WorldGuard | Yumuşak | Bölge koruma kuralları |
| GriefPrevention | Yumuşak | Bölge koruma kuralları |

## Dünya kapsamı

`settings.yml: worlds.enabled_worlds` listesinde adı geçen dünyalarda
çalışır. Bu liste boşsa eklenti açılışta kendini devre dışı bırakır.

## İstatistik birleştirme zinciri

Cast anında oyuncunun aktif istatistikleri sırayla birleştirilir:

```
bait → level → hotspot → booster → totem
```

Birleştirme kuralları (`FishingPlus.mergeStatsInto`):

- Harita değerleri (`rarityMult`, `speciesMult`, `perFishMult`,
  `biomeMult`) **çarpımsal** birleştirilir.
- Skaler ofset değerleri (`doubleCatchChance`,
  `catchSpeedMultiplier`, `specialChanceMult`, `spRareMult`,
  `spMythicMult`) **toplamsal** birleştirilir.
- `freshwaterMult` ve `saltwaterMult` çarpımsaldır; 0 girişi 1.0 gibi
  davranır.

`FishRNGService.Stats.IDENTITY` nötr başlangıç istatistik nesnesidir.

## Yakalama akışı

Yakalama olayları `listeners.CatchReplaceListener` üzerinden geçer:

1. `applyCatchRoll` — RNG balığı belirler, profil/turnuva/başarım
   kancalarını çağırır.
2. `applyNameAndLore` — `messages.yml: fish_drop.card.*` şablonu ile
   item adı ve lore’u üretir.

## Açılışta yüklenen YAML kaynakları

`onEnable` sırasında `saveResource(...)` ile diske yazılan dosyalar:

- `settings.yml`
- `fish.yml`
- `fishing_line.yml`, `hook.yml`, `rod_base.yml`
- `profile.yml`
- `tournaments.yml`
- `hotspots.yml`

Diğer YAML’lar ilgili registry/manager ilk yüklendiğinde varsayılan
kaynaktan kopyalanır: `baits.yml`, `boosters.yml`, `totems.yml`,
`achievements.yml`, `processing.yml`, `ingredients.yml`,
`bounty_tasks.yml`.

## Yeniden yükleme

`/fishingplus reload` aşağıdaki bileşenleri yeniden yükler:

- Dil dosyaları ve mesaj cache’i (`LanguageManager`,
  `MessageManager`).
- Balık türleri (`ConfigLoader.loadFishTypes()`).
- RNG servisi (`FishRNGService`).
- Yem yöneticisi (`BaitManager.reload()`).
- Debug bayrağı (`DebugLogger.reload()`).
- Yakalama modu konfigürasyonu (`FishingModeConfig.reload`).
- Tazelik konfigürasyonu (`SpoilageConfig.reload`).
- Environment boostları (`EnvironmentBoosts.reload`).
- Malzeme ve tarif registry’leri.
- NPC listener.
- Akvaryum görüntüleyici.

## Kapanış davranışı

`onDisable` sırasında:

- Aquarium display, overlay, bounty/monthly servisleri durur.
- Slot rehberleri kapatılır.
- Booster/totem ticker’ları durur, totem durumu kalıcı diske yazılır.
- Hopper otomasyonu durur.
- Tesis hologramları temizlenir; tesis tampon kaydı flush edilir.
- Oyuncu sohbet tercihleri DB’ye yazılır.
- Time provider, turnuva yöneticisi, async DB ve DB kapatılır.
