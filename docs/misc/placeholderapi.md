---
description: PlaceholderAPI uzantısı — FishingPlusExpansion.
---

# PlaceholderAPI

Sınıf: `papi.FishingPlusExpansion`.

## Kayıt

`onEnable` sırasında, `PlaceholderAPI` yüklü ise expansion otomatik
olarak kayıt edilir:

```java
if (Bukkit.getPluginManager().isPluginEnabled("PlaceholderAPI")) {
    new FishingPlusExpansion(this, timeProvider).register();
}
```

PlaceholderAPI yoksa eklenti hatasız çalışmaya devam eder; placeholder
çağrıları döndürülmez.

## Veri kaynakları

Expansion aşağıdaki bileşenlere erişir:

- `MultiWorldTimeProvider` — özel takvim saati.
- `ProfileService` — oyuncu seviyesi, XP, milestone bilgisi.
- `TournamentManager` — aktif turnuva durumu, sıralama.
- `BountyService` ve `MonthlyService` — aktif görevler.

Yer tutucu adları için ilgili `FishingPlusExpansion` sınıfının kaynak
koduna bakın.
