---
description: SQLite/Postgres bağlantı yapılandırması ve DAO katmanı.
---

# Veritabanı

Sınıflar: `db.DbManager`, `db.DbConfig`, `db.AsyncDb`,
`db.DatabaseType`, `db.SettingsLoader`, `db.PrefsDao`.

## Tip seçimi

```yaml
database:
  type: SQLITE   # SQLITE | POSTGRES
```

## SQLite

```yaml
database:
  type: SQLITE
  sqlite:
    file: "database/fishing.db"
    busy_timeout_ms: 5000
    wal_mode: true
```

| Alan | Açıklama |
|------|----------|
| `file` | Plugin veri klasörü altında dosya yolu |
| `busy_timeout_ms` | SQLite meşgul timeout’u |
| `wal_mode` | Write-Ahead Logging |

## PostgreSQL

```yaml
database:
  type: POSTGRES
  postgres:
    host: "127.0.0.1"
    port: 5432
    database: "astalis"
    user: "astalis"
    password: "secret"
    params: "sslmode=disable"
    pool:
      min_idle: 2
      max_pool_size: 10
      connection_timeout_ms: 10000
```

| Alan | Açıklama |
|------|----------|
| `host`, `port`, `database`, `user`, `password` | Bağlantı bilgileri |
| `params` | JDBC URL’ine eklenen ekstra parametreler |
| `pool.min_idle` | Havuzda tutulan minimum boş bağlantı |
| `pool.max_pool_size` | Azami eşzamanlı bağlantı |
| `pool.connection_timeout_ms` | Bağlantı bekleme süresi |

## Async erişim

`AsyncDb` — DAO işlemleri için arka plan yürütücüsü. SQLite altında
serileştirilmiş (single-threaded) çalışır; Postgres’te havuz tüm
boyutu kullanılabilir.

## DAO’lar

| DAO | Görevi |
|-----|--------|
| `PrefsDao` | Oyuncu sohbet tercihleri |
| `MarketDao` | Market fiyat geçmişi |
| `BountyDao` | Aktif/bitmiş görevler |
| `TournamentDao` | Turnuva sonuçları |
| `FacilityDao` | Tesis tampon durumu (`facilities.yml` ile birlikte) |
| `LevelRewardsDao` | Seviye ödülü teslimat durumu |
| `AchievementDao` | Başarım ilerlemesi (`fp_achievement` tablosu) |
| `JournalStorage` | Balık günlüğü |

Tablolar gerekirse boot sırasında oluşturulur (`init()`).

## Bağlantı erişimi

`FishingPlus.connSupplier()` → `Supplier<Connection>` döner. DAO’lar
bu supplier’ı parametre olarak alır.

## Kapanış

`onDisable`:

- Tüm sohbet tercihleri DB’ye flush edilir.
- `AsyncDb.shutdown()` arka plan yürütücüsünü kapatır.
- `DbManager.close()` bağlantı havuzunu kapatır.
