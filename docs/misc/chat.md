---
description: Yakalama mesajları, sohbet biçimi ve tier etiketleri.
---

# Sohbet

Sınıflar: `messages.PlayerPrefs`, `messages.MessageManager`,
`commands.FishChatCommand`, `listeners.PrefsJoinQuitListener`.

## Ayarlar (`settings.yml: chat`)

```yaml
chat:
  enabled: true
  player_opt:
    default_receive: true
    save_to_db: true
  formats:
    use_mini_message: false
    prefix: "&6&lFishingPro &7>> "

  catch:
    private_enabled: true
    broadcast_enabled: true
    broadcast_min_rarity: RARE
    tiers:
      small_threshold_pct: 0.333
      medium_threshold_pct: 0.666
      small_tag: "[!]"
      medium_tag: "[!!]"
      large_tag: "[!!!]"
```

### Genel

| Alan | Açıklama |
|------|----------|
| `enabled` | Sohbet entegrasyonunu açar/kapatır |
| `player_opt.default_receive` | Yeni oyuncuların varsayılan tercihi |
| `player_opt.save_to_db` | Tercihleri DB’ye yaz |
| `formats.use_mini_message` | MiniMessage formatı (şu an desteklenmiyor) |
| `formats.prefix` | Tüm yakalama mesajlarının önekı (sondaki boşluğu koru) |

### Yakalama mesajları

| Alan | Açıklama |
|------|----------|
| `catch.private_enabled` | Yakalayan oyuncuya özel mesaj |
| `catch.broadcast_enabled` | Sunucu çapı duyuru |
| `catch.broadcast_min_rarity` | Duyuru için minimum nadirlik |

### Boyut tier etiketleri

Bir balık türünün `length` aralığına göre yakalama büyüklüğü 3 banda
ayrılır:

| Bant | Eşik | Etiket |
|------|------|--------|
| Küçük | `< small_threshold_pct` | `small_tag` |
| Orta | `< medium_threshold_pct` | `medium_tag` |
| Büyük | aksi halde | `large_tag` |

## Komut

`/fishchat <on|off>` — yakalama mesajlarını kişisel olarak aç/kapat.

| Argüman | Açıklama |
|---------|----------|
| `on` | Mesajları al |
| `off` | Mesajları alma |

İzin: `fishingplus.fishchat`.

Tercih join/quit anında `PrefsJoinQuitListener` tarafından yüklenir/
kaydedilir.
