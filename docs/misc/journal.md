---
description: Balık türü ve oyuncu kayıtlarını gösteren günlük.
---

# Balık Günlüğü

Sınıflar: `journal.JournalUIService`,
`journal.JournalUIListener`, `journal.JournalService`,
`journal.JournalStorage`.

## Davranış

Her oyuncu için her balık türünün:

- İlk yakalama zamanı
- En uzun yakalama (`length_cm`)
- En ağır yakalama (`weight_kg`)

kayıtları tutulur. `JournalStorage` veritabanına yazar;
`JournalService` `fish.yml` üzerindeki tüm türleri sayfa sayfa
listeler.

## GUI

`JournalUIService.openHome(player)` sayfalı bir GUI açar. Listener
`journal.JournalUIListener` etkileşimleri yönetir.

## Komut

- `/journal [oyuncu]` — başka oyuncunun günlüğünü görme.
- İzin: `fishingplus.journal` (varsayılan `true`).
