---
description: Etiketli köylüler üzerinden market erişimi ve NPC alım çarpanları.
---

# NPC Tüccarı

Sınıf: `listeners.NPCListener`.
Konfigürasyon: `settings.yml: npc_trader`, `settings.yml: npc`.

## Etiketleme

```yaml
npc_trader:
  enabled: true
  tag: "fish_trader"
```

| Alan | Açıklama |
|------|----------|
| `enabled` | NPC entegrasyonunu açar/kapatır |
| `tag` | Köylüde bulunması gereken etiket (`addScoreboardTag(tag)`) |

Etiketli bir köylüye sağ tıklayan oyuncu için `MarketHubGui` açılır.

## NPC alım çarpanları

```yaml
npc:
  economy:
    enabled: true
    price_multiplier:
      COMMON: 1.0
      UNCOMMON: 1.4
      RARE: 2.0
      MYTHIC: 3.5
```

| Alan | Açıklama |
|------|----------|
| `economy.enabled` | NPC alımını açar/kapatır |
| `economy.price_multiplier.<rarity>` | NPC’nin satın alma çarpanı |

## Yeniden yükleme

`/fishingplus reload` `NPCListener.reload()`’u çağırır; etiket
adı ve çarpanlar yeniden okunur.
