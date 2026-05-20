---
description: plugin.yml içindeki tüm izinler ve hiyerarşi.
---

# İzinler

Tanımlandığı yer: `plugin.yml`.

## Hiyerarşi

```
fishingplus.player (default: true)
├── fishingplus.fishchat
├── fishingplus.baits
├── fishingplus.journal
├── fishingplus.rodparts        (default: op)
├── fishingplus.profile.view
├── fishingplus.market
├── fishingplus.achievements
├── fishingplus.booster
├── fishingplus.totem
└── fishingplus.use

fishingplus.admin (default: op)
├── fishingplus.player          (üst dalı dahil eder)
├── fishingplus.givebait
├── fishingplus.givebucket
├── fishingplus.tournament.admin
├── fishingplus.admin.hotspot
├── fishingplus.time
├── fishingplus.debug
└── fishingplus.protection.bypass
```

## Oyuncu izinleri

| İzin | Varsayılan | Açıklama |
|------|:---------:|----------|
| `fishingplus.player` | `true` | Standart oyuncu komutlarının üst dalı |
| `fishingplus.fishchat` | `true` | Yakalama mesajı toggle’ı |
| `fishingplus.baits` | `true` | Yem GUI’si |
| `fishingplus.journal` | `true` | Balık günlüğü |
| `fishingplus.rodparts` | `op` | Olta parça menüsü |
| `fishingplus.profile.view` | `true` | Profil görüntüleme |
| `fishingplus.market` | `true` | Market GUI |
| `fishingplus.achievements` | `true` | Başarım komutları |
| `fishingplus.booster` | `true` | Booster komutları |
| `fishingplus.totem` | `true` | Totem komutları |
| `fishingplus.use` | `true` | Temel FishingPlus kullanımı |

## Yönetici izinleri

| İzin | Varsayılan | Açıklama |
|------|:---------:|----------|
| `fishingplus.admin` | `op` | Tüm yönetici komutlarının üst dalı |
| `fishingplus.givebait` | `op` | Yem verme |
| `fishingplus.givebucket` | `op` | Kova verme |
| `fishingplus.tournament.admin` | `op` | Turnuva başlat/durdur |
| `fishingplus.admin.hotspot` | `op` | Hotspot yönetimi |
| `fishingplus.time` | `op` | Yönetici zaman erişimi |
| `fishingplus.debug` | `op` | Debug + RNG tanılama |
| `fishingplus.protection.bypass` | `op` | WorldGuard / GriefPrevention bypass |
