---
description: FishingPlus eklentisinin teknik referansı — Bukkit/Paper 1.21 için.
---

# FishingPlus

FishingPlus, vanilya balık tutma akışını genişleten modüler bir Bukkit
eklentisidir. Bu site eklentinin tüm alt sistemlerini, kullandıkları
YAML dosyalarını ve davranış kurallarını teknik bir referans olarak
listeler.

## Bu doküman ne içerir?

- **Genel bakış** — mimari, ana sınıf, stats merge zinciri.
- **Konfigürasyon dosyaları** — `settings.yml`, `fish.yml`, `baits.yml`
  ve diğerlerinin şemaları.
- **Sistemler** — balık RNG’si, yakalama modları, oltalar, yemler,
  hotspot/booster/totem, profil, başarım, turnuva, market, bounty,
  spoilage, environment, işleme tesisleri, akvaryum kova, journal,
  lokalizasyon ve daha fazlası.
- **Referans** — komut listesi, izin hiyerarşisi, veritabanı, geliştirici
  notları.

## Hızlı bilgiler

| Alan | Değer |
|------|-------|
| Ana sınıf | `net.neostellar.fishingPlus.FishingPlus` |
| API sürümü | `1.21` (Bukkit / Paper) |
| Zorunlu bağımlılıklar | `ProtocolLib`, `Vault` |
| Yumuşak bağımlılıklar | `PlaceholderAPI`, `ItemsAdder`, `WorldGuard`, `GriefPrevention` |
| Veritabanı | SQLite (varsayılan) veya PostgreSQL |
| Diller | `en`, `tr` |

## Nereden başlamalı?

- [Genel Mimari](getting-started/architecture.md)
- [Konfigürasyon Dosyaları](getting-started/configuration-files.md)
- [Komut Listesi](reference/commands.md)

> Bu bir referans dokümanıdır; promosyon veya kurulum kılavuzu değildir.
> Davranış kuralları doğrudan kaynak koddan ve YAML şemalarından
> türetilmiştir.
