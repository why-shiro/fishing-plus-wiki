---
description: Tüm komutlar, alias’lar ve izin gereksinimleri.
---

# Komutlar

## Ana komutlar

### `/fishingplus` (alias: `/fp`, `/fish`)

Tüm oyuncu işlevlerinin giriş noktası.

| Alt komut | Yönlendirme | İzin |
|-----------|------------|------|
| `help` | – | `fishingplus.player` |
| `baits` | `/baits` | `fishingplus.baits` |
| `journal` | `/journal` | `fishingplus.journal` |
| `rod` / `rodparts` | `/olta` | `fishingplus.rodparts` |
| `profile` | `/fishprofile` | `fishingplus.profile.view` |
| `market` | `/fishmarket` | `fishingplus.market` |
| `time` | `/fishtime` | `fishingplus.player` |
| `where` | `/fishwhere` | `fishingplus.player` |
| `chat <on/off>` | `/fishchat` | `fishingplus.fishchat` |
| `language [kod]` | – | `fishingplus.player` |
| `tournament` | `/tournament` | – |
| `achievements` (alias `ach`, `basarim`) | – | `fishingplus.achievements` |
| `booster <…>` | – | `fishingplus.booster` |
| `totem <…>` | – | `fishingplus.totem` |
| `reload` | – | `fishingplus.admin` |
| `facility give <TYPE> [oyuncu]` | – | `fishingplus.admin` |
| `ingredient give <ID> [oyuncu] [miktar]` | – | `fishingplus.admin` |

### `/fishingadmin` (alias: `/fishadmin`, `/fpadmin`)

Yönetici komutları için giriş noktası.

| Alt komut | Açıklama | İzin |
|-----------|----------|------|
| `gui` | Yönetim GUI’si | `fishingplus.admin` |
| `givebait <id> [oyuncu] [miktar]` | Yem ver | `fishingplus.givebait` |
| `givebucket <oyuncu> <type>` | Kova ver | `fishingplus.givebucket` |
| `hotspot` | Hotspot yönetimi | `fishingplus.admin.hotspot` |
| `tournament start <mode>` | Turnuva başlat | `fishingplus.tournament.admin` |
| `tournament stop` | Turnuvayı durdur | `fishingplus.tournament.admin` |
| `rng here` | Bulunduğu yerde RNG olasılıkları | `fishingplus.debug` |
| `debug [on/off/status]` | Global debug | `fishingplus.debug` |

## Eski (legacy) doğrudan komutlar

Geriye dönük uyumluluk için korunur; `/fishingplus` ve
`/fishingadmin` tercih edilmelidir.

| Komut | Açıklama | İzin |
|------|----------|------|
| `/fishchat <on/off>` | Yakalama mesajlarını aç/kapat | `fishingplus.fishchat` |
| `/fishtime` | Özel takvim saati | `fishingplus.player` |
| `/fishwhere` | Bulunduğu biyomdaki balıklar | `fishingplus.player` |
| `/baits` | Yem GUI’si | `fishingplus.baits` |
| `/journal [oyuncu]` | Balık günlüğü | `fishingplus.journal` |
| `/olta` (alias `/rodparts`) | Olta parça menüsü | `fishingplus.rodparts` |
| `/fishprofile [oyuncu]` | Profil görüntüleme | `fishingplus.profile.view` |
| `/tournament [status/top/start/stop]` | Turnuva | – |
| `/fishmarket` | Market hub | `fishingplus.market` |
| `/givebait <baitId> [oyuncu] [miktar]` | Yem ver | `fishingplus.givebait` |
| `/givebucket <oyuncu> <wood/iron/gold>` | Kova ver | `fishingplus.givebucket` |
| `/hotspot` | Hotspot yönetimi | `fishingplus.admin.hotspot` |
| `/fishrng here` | RNG olasılıkları | `fishingplus.debug` |
| `/fishdebug [on/off/status]` | Global debug | `fishingplus.debug` |

## Booster alt komutları

`/booster <…>` veya `/fp booster <…>`:

| Alt komut | Açıklama |
|-----------|----------|
| `active` | Aktif booster’ları listele |
| `list` | Tüm tanımlı booster’ları listele |
| `give <id> [oyuncu] [miktar]` | Booster item ver |
| `reload` | `boosters.yml`’i yeniden yükle |

## Totem alt komutları

`/totem <…>` veya `/fp totem <…>`:

| Alt komut | Açıklama |
|-----------|----------|
| `list` | Tanımlı totem tiplerini listele |
| `active` | Aktif aura’ları göster |
| `near` | Yakın aktif totemler |
| `reload` | `totems.yml`’i yeniden yükle |

## Başarım alt komutları

`/achievements <…>` veya `/fp ach <…>`:

| Alt komut | Açıklama |
|-----------|----------|
| (varsayılan) | GUI aç |
| `list` | Tanımlı başarımları listele |
| `grant <oyuncu> <id>` | Başarımı tamamlanmış olarak işaretle |
| `reset <oyuncu> [id]` | İlerlemeyi sıfırla |
| `reload` | `achievements.yml`’i yeniden yükle |
