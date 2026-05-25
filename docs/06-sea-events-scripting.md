# Sea Events Scripting

Sea Events sistemi sadece "aktif event var" demek icin degil, oyuncunun balik tuttugu ortami degistiren scriptli olaylar olusturmak icin tasarlanir.

Bu sayfadaki ornekler config mantigini anlatir. Kendi sunucunuzda path isimleri surume gore ufak fark gosterebilir; mevcut `sea_events.yml` dosyanizi esas alin.

## Event Yapisi

Tipik bir event su bolumlerden olusur:

```yaml
black_moon_storm:
  enabled: true
  display:
    tr: "Kara Ay Firtinasi"
    en: "Black Moon Storm"
    de: "Schwarzmondsturm"
  description:
    tr:
      - "Deniz huzursuz. Simsekler balikcilari hedef alabilir."
    en:
      - "The sea is restless. Lightning may target fishers."
    de:
      - "Das Meer ist unruhig. Blitze koennen Angler treffen."
  duration_seconds: 1800
  weight: 1
  icon: LIGHTNING_ROD
  effects:
    rarity_multipliers:
      RARE: 1.15
      EPIC: 1.08
    catch_speed_multiplier: 0.92
  phases:
    - at_seconds: 0
      actions:
        - type: weather
          storm: true
          thunder: true
        - type: message
          target: "player[hasItem=\"minecraft:fishing_rod\"]"
          message_key: "sea_events.black_moon.started"
```

## Faz Mantigi

`phases`, event suresi icinde belirli anlarda calisan bloklardir.

Alanlar:

- `at_seconds`: Event basladiktan kac saniye sonra faz baslar.
- `actions`: Bu fazda calisacak islemler.

Ornek:

```yaml
phases:
  - at_seconds: 600
    actions:
      - type: message
        target: "player[hasItem=\"minecraft:fishing_rod\"]"
        message_key: "sea_events.black_moon.phase_two"
```

Bu event basladiktan 10 dakika sonra oyunculara ikinci faz mesajini gonderir.

## Tekrarlayan Action

Bazi actionlar belirli sure boyunca tekrar edebilir.

Alanlar:

- `duration_seconds`: Action kac saniye devam eder.
- `repeat_seconds`: Kac saniyede bir tekrarlar.
- `repeat_times`: Kac kez tekrarlar.

Ornek: 1 dakika boyunca 10 saniyede bir simsek uyarisi.

```yaml
- type: lightning_warning
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  duration_seconds: 60
  repeat_seconds: 10
  warning_seconds: 3
  damage: false
  sound: "minecraft:entity.chicken.step"
```

## Selector Sistemi

Actionlar hedef secmek icin selector kullanabilir.

### Player Selector

```text
player[hasItem="minecraft:fishing_rod",health>=10,hunger<=18,isFlying="false",hasPermission="fishingplus.event.blackmoon"]
```

Desteklenebilecek filtre ornekleri:

- `hasItem="minecraft:cod"`
- `health>=10`
- `health<=5`
- `hunger>=10`
- `hunger<=18`
- `hasPotionEffect="SPEED"`
- `isFlying="true"`
- `isFlying="false"`
- `hasPermission="permission.node"`

### Entity Selector

```text
entity[type="DROWNED",health>=5,radius<=24]
```

Desteklenebilecek filtre ornekleri:

- `type="DROWNED"`
- `health>=10`
- `radius<=24`
- `hasPotionEffect="SLOWNESS"`

Selectorlar ileride genisletilebilir. Config yazarken cok karmasik sartlari parcalara ayirmak daha sagliklidir.

## Placeholderlar

Action icinde su placeholderlar kullanilabilir:

| Placeholder | Aciklama |
| --- | --- |
| `{player}` | Hedef oyuncu adi. |
| `{entity}` | Hedef entity adi veya tipi. |
| `{entity_uuid}` | Entity UUID. |
| `{entity_type}` | Entity tipi. |
| `{world}` | Hedef dunya. |
| `{x}` | Konum X. |
| `{y}` | Konum Y. |
| `{z}` | Konum Z. |
| `{mob}` | Spawnlanan veya actionda belirtilen mob adi. |

## Action Tipleri

### `weather`

Dunya hava durumunu degistirir.

```yaml
- type: weather
  storm: true
  thunder: true
  duration_seconds: 600
```

### `message`

Oyuncuya mesaj gonderir.

```yaml
- type: message
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  message_key: "sea_events.black_moon.warning"
```

Mesajlar `messages/messages_xx.yml` icinde tutulmalidir.

### `play_sound`

Ses oynatir.

```yaml
- type: play_sound
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  sound: "minecraft:entity.chicken.step"
  volume: 10
  pitch: 2
```

### Hizlanan Tik Sesi

Simsek uyarisi gibi durumlarda ses araliklari giderek kisalabilir.

```yaml
- type: lightning_warning
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  warning_steps: 8
  start_interval_ticks: 16
  end_interval_ticks: 3
  sound: "minecraft:entity.chicken.step"
  volume: 10
  pitch: 2
  damage: true
  damage_amount: 4
```

Mantik:

- Ilk tikler yavas gelir.
- Her adimda aralik azalir.
- Son tikler hizlanir.
- Sonunda simsek veya damage action calisir.

### `lightning_warning`

Oyuncuyu simsek carpmasindan once uyarir.

```yaml
- type: lightning_warning
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  radius: 2
  warning_steps: 8
  start_interval_ticks: 16
  end_interval_ticks: 3
  sound: "minecraft:entity.chicken.step"
  damage: true
  damage_amount: 4
```

Bu action oyuncuya etrafinda bir tehlike oldugunu hissettirmek icin kullanilir.

### `damage`

Hedefe hasar verir.

```yaml
- type: damage
  target: "player[health>=6]"
  amount: 3
  cause: LIGHTNING
```

### `particle`

Partikul spawnlar.

Basit ornek:

```yaml
- type: particle
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  particle: ELECTRIC_SPARK
  count: 20
  radius: 2
```

Line ornegi:

```yaml
- type: particle
  particle: ELECTRIC_SPARK
  shape: line
  origin: "{player}"
  y_offset: 1.2
  length: 8
  step: 0.35
  forward: true
  yaw_offset: 0
  pitch_offset: 0
```

Line alanlari:

- `origin`: `{player}` veya `{entity}`.
- `forward`: oyuncunun/entity'nin baktigi yone dogru cizer.
- `length`: cizginin uzunlugu.
- `step`: iki particle arasi mesafe.
- `y_offset`: baslangic yuksekligi.
- `yaw_offset`: yatay aci farki.
- `pitch_offset`: dikey aci farki.

### `spawn_mobs`

Vanilla mob spawnlar.

```yaml
- type: spawn_mobs
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  mob: DROWNED
  count: 3
  radius: 8
```

### `mythicmobs_spawn`

MythicMobs mob spawnlar.

```yaml
- type: mythicmobs_spawn
  target: "player[hasItem=\"minecraft:fishing_rod\"]"
  mob: "BlackMoonDrowned"
  count: 2
  radius: 10
```

MythicMobs kurulu degilse bu action atlanabilir.

### `command`

Konsol veya oyuncu komutu calistirir.

```yaml
- type: command
  executor: console
  command: "effect give {player} minecraft:glowing 5 0 true"
```

Dikkat: Komut actionlari gucludur. Oyuncu girdisi dogrudan komuta eklenmemelidir.

## Black Moon Storm Tam Ornek

```yaml
black_moon_storm:
  enabled: true
  display:
    tr: "Kara Ay Firtinasi"
    en: "Black Moon Storm"
    de: "Schwarzmondsturm"
  duration_seconds: 1800
  weight: 1
  icon: LIGHTNING_ROD
  effects:
    rarity_multipliers:
      RARE: 1.20
      EPIC: 1.10
    catch_speed_multiplier: 0.90
  phases:
    - at_seconds: 0
      actions:
        - type: weather
          storm: true
          thunder: true
          duration_seconds: 1800
        - type: message
          target: "player[hasItem=\"minecraft:fishing_rod\"]"
          message_key: "sea_events.black_moon.started"

    - at_seconds: 600
      actions:
        - type: message
          target: "player[hasItem=\"minecraft:fishing_rod\"]"
          message_key: "sea_events.black_moon.phase_two"
        - type: lightning_warning
          target: "player[hasItem=\"minecraft:fishing_rod\",isFlying=\"false\"]"
          duration_seconds: 60
          repeat_seconds: 10
          warning_steps: 8
          start_interval_ticks: 16
          end_interval_ticks: 3
          sound: "minecraft:entity.chicken.step"
          volume: 10
          pitch: 2
          damage: true
          damage_amount: 4

    - at_seconds: 900
      actions:
        - type: spawn_mobs
          target: "player[hasItem=\"minecraft:fishing_rod\"]"
          mob: DROWNED
          count: 3
          radius: 8
        - type: particle
          target: "player[hasItem=\"minecraft:fishing_rod\"]"
          particle: ELECTRIC_SPARK
          shape: line
          origin: "{player}"
          y_offset: 1.2
          length: 8
          step: 0.35
          forward: true

    - at_seconds: 1200
      actions:
        - type: mythicmobs_spawn
          target: "player[hasPermission=\"fishingplus.event.blackmoon\"]"
          mob: "BlackMoonDrowned"
          count: 1
          radius: 12
```

## Tasarim Tavsiyeleri

- Event GUI'da eventin ne yaptigini acik yazin.
- Negatif etki varsa oyuncuya onceden uyarin.
- Damage actionlari icin makul cooldown kullanin.
- Cok fazla particle veya mob spawn performansi etkileyebilir.
- MythicMobs actionlari MythicMobs olmayan sunucularda sorun cikarmayacak sekilde opsiyonel olmalidir.
- Broadcast spam yapmayin; kritik fazlarda mesaj gonderin.
