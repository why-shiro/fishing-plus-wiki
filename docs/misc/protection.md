---
description: WorldGuard ve GriefPrevention entegrasyonu.
---

# Bölge Koruma

Sınıf: `protection.ProtectionService`.

## Davranış

Aktif bir bölge yönetim eklentisi varsa (`WorldGuard`,
`GriefPrevention`), FishingPlus eylemleri o bölge kurallarına tabi
olur:

- Yakalama, tesis yerleştirme, totem inşası gibi etkileşimler
  bölgenin izin verdiği oyunculara açıktır.
- Korunan bölgede yetkisi olmayan oyuncuya işlem reddedilir.

Her iki eklenti de yumuşak bağlıdır (`softdepend`); yoksa koruma
katmanı sessizce atlanır.

## Bypass

```
fishingplus.protection.bypass
```

İzin: yöneticiler (varsayılan `op`). Bu izne sahip oyuncular tüm
koruma kontrollerini atlar.
