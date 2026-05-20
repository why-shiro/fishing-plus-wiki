---
description: 3 saatlik / günlük / haftalık görev panosu ve aylık sunucu çapı görev.
---

# Bounty Panosu

Sınıflar: `bounty.BountyService`, `bounty.MonthlyService`,
`bounty.BountyTaskRegistry`, `bounty.BountyDao`, `bounty.Bounty`,
`bounty.BountyTier`, `bounty.BountyObjectiveType`,
`bounty.BountyBoardGui`.

Konfigürasyon: `bounty_tasks.yml`.

## Kademeler

Aktif görev her zaman kademe başına **bir** tanedir:

- `THREE_HOUR` — 3 saatlik kısa görev.
- `DAILY` — günlük görev.
- `WEEKLY` — haftalık görev.
- `monthly` — sunucu çapında ayda bir görev.

Bir görev biter veya süresi dolarsa, ilgili tiers’ın havuzundan
`weight` ağırlığı ile yeni bir görev seçilir.

## Görev girdisi şeması

```yaml
bounties:
  THREE_HOUR:
    - id: common_quick_sale
      objective: SELL_FISH_COUNT
      weight: 40
      rarities: [COMMON, UNCOMMON]
      target_min: 12
      target_max: 32
      reward_min: 5000
      reward_max: 20000
      duration_minutes: 180
```

| Alan | Açıklama |
|------|----------|
| `id` | Yöneticiler için iç etiket |
| `objective` | Hedef tipi |
| `weight` | Kademe içi rastgele seçim ağırlığı |
| `species_ids` | Hedef tür id’leri (opsiyonel) |
| `rarities` | Tür id’si verilmediyse nadirlik filtresi |
| `target_min`, `target_max` | Hedef sayı aralığı |
| `reward_min`, `reward_max` | Ödül aralığı |
| `duration_minutes` | Görev süresi (0 = kademe varsayılanı) |

### `objective` türleri

| Tür | Açıklama |
|-----|----------|
| `SELL_FISH_COUNT` | Belirli filtreyle uyan balıkları satma |
| `CATCH_FISH_COUNT` | Belirli filtreyle uyan balıkları yakalama |
| `SELL_ANY_COUNT` | Herhangi bir balık satma sayısı |
| `SELL_VALUE` | Toplam satış geliri (yalnızca aylık görev) |

## Aylık görev

```yaml
monthly:
  objective: SELL_VALUE
  target_value: 10000000
  reward_pool: 5000000
```

`MonthlyService` saatlik bir döngüyle ayın bitişini kontrol eder ve
önceki ayın ödemesini yapar. `reward_pool` toplam havuzdur; oyunculara
katkılarına göre dağıtılır.

## Servis yaşam döngüsü

- `BountyService.start()` — DB durumunu yükler, bir tarama task’ı
  başlatır. Süresi dolan görevleri kapatır, yeni görev seçer.
- `MonthlyService.start()` — saatlik döngü ile aylık devir.
- `BountyService.stop()` ve `MonthlyService.stop()` `onDisable`’da
  çağrılır.

## GUI

`BountyBoardGui` — her aktif görev, geri sayım, ilerleme çubuğu ve
ödül aralığını gösterir. `MarketHubGui` üzerinden erişilir.
