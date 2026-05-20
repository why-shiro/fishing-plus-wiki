---
description: Hologram renkleri, ofsetleri ve aylık eşleme ayarları.
---

# Hologramlar

## Genel ayarlar (`settings.yml: hologram`)

```yaml
hologram:
  colors:
    FRESHWATER: "blue"
    SALTWATER: "green"
    OTHER: "red"
  y_offset: 0.85
  tick_interval: 2

  month_mapping:
    enabled: false
```

| Alan | Açıklama |
|------|----------|
| `colors.<CATEGORY>` | Balık kategorisine göre hologram rengi |
| `y_offset` | Holograma uygulanan dikey ofset |
| `tick_interval` | Güncelleme aralığı (tick) |
| `month_mapping.enabled` | Özel takvim → ay eşlemesi (off varsayılan) |

## Tesis hologramı

Sınıf: `processing.FacilityHologramService`.

Tesise yerleştirildiğinde tepe noktasında bir TextDisplay entity’si
gösterir. İçerik:

- Tampon satırı: `B:<balık> M1:<malzemeA> M2:<malzemeB>`.
- Durum satırı: geri sayım / hazır / kapasite dolu / otomasyon durumu.
- Çıktı tamponu doluysa kırmızı uyarı: `!! Üretim Kapasitesi Doldu !!`.

## Kova hologramı

Sınıf: `bucket.BucketHologramService`.

Yerleştirilen akvaryum kovasının üstünde doluluk ve içerik özet
metnini gösterir.

## Kapanış temizliği

`onDisable` sırasında `FacilityHologramService.stop()` çağrılır;
TextDisplay entity’lerinin world save’e sızması engellenir. Crash
durumunda boot’ta yapılan tarama ölü hologramları siler.
