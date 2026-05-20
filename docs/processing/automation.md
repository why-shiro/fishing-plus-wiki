---
description: Tesislere sandıkla otomatik girdi/çıktı bağlama.
---

# Sandık Otomasyonu

Sınıflar: `processing.HopperAutomationService`,
`processing.AutomationGui`.

## Yön kuralları

Tesisin yüzeyinin yönüne göre bitişik sandıklar (`CHEST`,
`TRAPPED_CHEST`):

| Yön | Görev |
|------|------|
| **SOL** sandık | Balık girdisi |
| **ARKA** sandık | Malzeme A kaynağı |
| **SAĞ** sandık | Malzeme B kaynağı |
| **ALT** sandık | Çıktı (yalnızca push) |

Malzeme A/B sıra şartı **yoktur** — tesis her ikisinden de eşit
şekilde çeker.

## Çekme döngüsü

`HopperAutomationService.FEED_PER_CYCLE` (sabit) her döngüde her
sandıktan kaç item çekilebileceğini belirler. Vanilla hopper davranışı
benzeri: tek seferde küçük bir miktar.

## Kapasite kontrolü

- `canFitOutput` — bir sonraki iş başlatılırken çıktının pending
  tampona sığıp sığmayacağını kontrol eder. Sığmıyorsa iş başlatılmaz,
  hologramda doluluk uyarısı gösterilir.
- Çıktı stack’i stackable ise tamponda birikir; değilse 1+ item
  birikince tampon dolu sayılır.

## Filtreleme

`AutomationGui` her tesis için bir `enabled_fish` set’i tutar
(tesise özel). Otomasyon yalnızca bu set’te yer alan türleri çeker.
Set **boşsa** otomasyon hiçbir balığı çekmez (intentional davranış).

## Seviye kontrolü

- Tesis sahibi online ve seviyesi `min_player_level`’ın altındaysa
  otomasyon iş başlatmaz; hologramda nedeni gösterir.
- Sahip offline ise seviye kontrolü uygulanmaz.

## Yaşam döngüsü

- `HopperAutomationService.start()` — `onEnable` sırasında zamanlanır.
- `HopperAutomationService.stop()` — `onDisable` sırasında durur.

## GUI

`AutomationGui` her tesis için aşağıdakileri sunar:

- Otomasyonu aç/kapat.
- Tesise hangi balık türlerinin çekileceğini (`enabled_fish`)
  filtrele.
- Mevcut sandık durumunu özet olarak gör.

GUI listener’ı `onEnable` sırasında kayıt edilir.
