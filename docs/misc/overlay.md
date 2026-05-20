---
description: Bobber yaklaşma uyarısı için ProtocolLib tabanlı görsel overlay.
---

# Yaklaşma Overlay’i

Sınıflar: `overlay.ApproachOverlay`,
`listeners.FishHookTracker`.

## Davranış

ProtocolLib mevcutsa, oyuncunun fırlattığı bobber’a balık yaklaştıkça
görsel bir uyarı render edilir. Sistem cast anında başlar, makara
çekildiğinde veya iptal edildiğinde durur.

`FishHookTracker` her oyuncunun aktif bobber’ını takip eder.
`ApproachOverlay` render döngüsünü çalıştırır.

## Bağımlılık

- ProtocolLib yoksa: konsola uyarı yazılır, overlay başlatılmaz.
- `fish.yml` boş ise: overlay başlatılmaz (çünkü render edilecek tür
  yoktur).

## Yaşam döngüsü

- `onEnable` — ProtocolLib ve fish türleri varsa
  `ApproachOverlay.start()`.
- `onDisable` — `ApproachOverlay.close()`.
