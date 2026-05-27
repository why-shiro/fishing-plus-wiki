# FPScript — Dil + Runtime + API Referansı

FPScript, FishingPlus eklentisi içinde gömülü, code-like sözdizimine sahip mini bir scripting dilidir.
Sea event'leri ve oyun içi etkinlikleri JavaScript benzeri bir yazımla kurmak için tasarlandı: değişkenler,
fonksiyonlar, koşullar, döngüler, state machine, hook'lar, Bukkit nesnelerine doğrudan property/method
erişimi. JVM içinde sandboxlanmış olarak çalışır — yani gerçek bir Java/Groovy script motoru değil,
FishingPlus'a özel bir interpreter'dır.

> Dosya uzantısı: `.fps`  (ayrıca `.fpevent`, `.fpmob` da tanınır ama runtime aynıdır.)
> Konum: `plugins/FishingPlus/scripts/` altında istediğin yere koyabilirsin, alt klasör destekli.

---

## İçindekiler

1. [Genel bakış](#genel-bakış)
2. [Komutlar](#komutlar)
3. [Söz dizimi temelleri](#söz-dizimi-temelleri)
4. [Veri tipleri ve literal'ler](#veri-tipleri-ve-literaller)
5. [Değişkenler ve scope](#değişkenler-ve-scope)
6. [Operatörler](#operatörler)
7. [Akış kontrolü](#akış-kontrolü)
8. [Fonksiyonlar](#fonksiyonlar)
9. [Top-level deklarasyonlar](#top-level-deklarasyonlar)
10. [Event yapısı](#event-yapısı)
11. [State yapısı](#state-yapısı)
12. [Hook'lar](#hooklar)
13. [Hook context'i (`e` parametresi)](#hook-contexti-e-parametresi)
14. [Bridge API — World](#bridge-api--world)
15. [Bridge API — Entity / Player](#bridge-api--entity--player)
16. [Bridge API — ItemStack](#bridge-api--itemstack)
17. [Bridge API — Equipment / Tags](#bridge-api--equipment--tags)
18. [Bridge API — Location / Vector](#bridge-api--location--vector)
19. [Global fonksiyonlar](#global-fonksiyonlar)
20. [Sabit namespace'ler](#sabit-namespaceler)
21. [Modifiers (deneysel)](#modifiers-deneysel)
22. [SeaEvent entegrasyonu](#seaevent-entegrasyonu)
23. [Sınırlar ve performans](#sınırlar-ve-performans)
24. [Tam örnek — Black Moon Storm](#tam-örnek--black-moon-storm)
25. [Sık karşılaşılan tuzaklar](#sık-karşılaşılan-tuzaklar)

---

## Genel bakış

FPScript şu özelliklere sahiptir:

- **Code-like syntax** — `var loc = player.location` gibi yazımlar, Skript cümlesi gibi değil.
- **Lexical scope** — function/hook/loop kendi scope'unda; `var x = ...` innermost'a deklare, `x = ...`
  zinciri yukarı yürüyüp mevcut binding'i günceller.
- **Bukkit obje köprüsü** — World, Player, Entity, ItemStack, Location, Vector üzerinde doğrudan
  property/method erişimi.
- **State machine** — `state main for 5m { ... next ending }` ile süreli durum geçişleri.
- **Hook'lar** — `on fishCaught(e) { ... }` ile Bukkit olaylarına abone olma.
- **Bukkit scheduler entegrasyonu** — `wait 5s` durduğunda script gerçekten 5 saniye duruyor (asenkron
  şekilde, ana thread'i meşgul etmeden).
- **Sandboxed** — `while` ve sonsuz döngü yok, max statement bütçesi var, sınırlı interpreter.

Bir script şuna benzer:

```fps
event golden_hour {
    var bonusChance = 20%

    on fishCaught(e) {
        if (randomChance(bonusChance)) {
            triggerBonus(e.player)
        }
    }

    state main for 5m {
        on enter {
            broadcast("&6&l[Altin Saat] &eBalik tut, bonus kap!")
        }

        every 15s {
            for player in fishers() {
                particle("END_ROD", player.location.add(0, 2, 0), 12)
            }
        }

        next stop
    }
}

function triggerBonus(player) {
    player.give(Item("EMERALD", 2).name("&aAltin Bonus"))
    player.playSound("minecraft:entity.player.levelup", 1.0, 1.8)
}
```

---

## Komutlar

Tümü `/fishingplus script <alt>` (veya `/fishingplus fpscript <alt>`) — admin yetkisi gerekir
(`fishingplus.admin`).

| Komut | Ne yapar |
|---|---|
| `validate` | Tüm `.fps` dosyalarını parse eder, sadece tanılama gösterir (yükleme yapmaz). |
| `reload` | Validate edip başarılıysa runtime'a yükler. Aktif event'ler durdurulur. |
| `list` | Yüklü dosyaları ve içlerindeki deklarasyonları listeler. |
| `dir` | Script dizininin tam yolunu yazar. |
| `events` | Yüklü event'lerin state listesini ve hook adlarını gösterir. |
| `active` | Şu an çalışan event runtime'larını ve mevcut state'lerini listeler. |
| `start <event> [world]` | Bir event'i manuel başlatır (test için). |
| `stop <event>` | Çalışan event'i durdurur. |
| `entities` | RAM'de tutulan script entity registry'sini (key ve tag'leri) gösterir. |
| `hooks` | Mevcut hook isimlerini ve sağladıkları field'ları listeler. |
| `constants` | Hazır sabit namespace'lerinin özetini yazar. |
| `debug` | Aktif event'ler, registry boyutları ve son 20 runtime error'ı gösterir. |

---

## Söz dizimi temelleri

- **Yorum:** `//` veya `#` ile başlar, satır sonuna kadar gider.
- **String:** `"çift tırnak"` veya `'tek tırnak'`. Escape: `\n`, `\t`, `\\`, `\"`.
- **Renk kodları:** String içinde `&` Bukkit renk koduna otomatik çevrilir (`&a` → yeşil).
- **Boş satırlar serbest.**
- **Noktalı virgül opsiyonel.** Satır sonu yeterli; sondaki `;` strip edilir.
- **Blok ayracı:** `{` ve `}`. Her blok ayrı satırlarda olabilir, header `{` ile aynı satırda olur:
  ```fps
  if (x > 5) {
      ...
  }
  ```

Identifier kuralı: `[A-Za-z_][A-Za-z0-9_]*` (Türkçe karakter veya boşluk içeremez).

---

## Veri tipleri ve literal'ler

| Tip | Örnekler | Notlar |
|---|---|---|
| Sayı | `42`, `3.14`, `-7` | Tüm sayılar `double` olarak tutulur. |
| String | `"hello"`, `'foo'` | `&` renk kodu çevirilir. |
| Boolean | `true`, `false` | |
| Null | `null` | |
| Duration | `5s`, `10m`, `2h`, `20t`, `1.5s` | t=tick, s=saniye, m=dakika, h=saat. Saniyeye çevrilip `double` olarak tutulur. |
| Yüzde | `20%`, `5.5%` | `0.20`, `0.055` olarak değerlendirilir. |
| Liste (oluşturulmuş) | `["a", "b"]` syntax'ı **yok** — sadece fonksiyon dönüş değeri olarak gelir (örn. `fishers()`). Item lore için method overload mevcut (aşağıda). | |

Duration sözdizimi `wait`, `every`, `after`, `state ... for ...` gibi her yerde kullanılabilir:

```fps
wait 3s
state main for 10m { ... }
every 20t { ... }                 // her 1 saniye
after max(3t, 14t - i * 2t) { ... }  // expression de olabilir
```

---

## Değişkenler ve scope

```fps
var x = 5                 // INNERMOST scope'a yeni binding (let-benzeri)
x = x + 1                 // mevcut binding'i bulup günceller; yoksa innermost'a oluşturur
```

### Scope kuralları

| Yer | Scope davranışı |
|---|---|
| Event body top-level | Event scope (en dış) |
| `on start`, `on stop`, `on enter`, `on exit`, `modifiers`, `every`, `after` | Event scope'u paylaşır — yeni scope açmaz |
| `if` / `else` | Parent scope'u paylaşır — yeni scope açmaz |
| `for ... in ...` her iterasyon | **Yeni scope** — `var` içerideki bir sonraki iterasyona aktarılmaz |
| `repeat N as i` her iterasyon | **Yeni scope** — index var ve içerideki `var`'lar iterasyon-local |
| `function name(p) { ... }` her çağrı | **Yeni scope** — parametreler ve `var`'lar çağrı-local; recursive call güvenli |
| `on hook(e)` her dispatch | **Yeni scope** — `e` ve içerideki `var`'lar hook-local |
| `.where(predicate)` | **Yeni scope** — `it`, `type`, `health` declare edilir |

### Shadowing örnekleri

```fps
event demo {
    var counter = 0          // event scope

    on fishCaught(e) {
        var local = 5        // hook scope, dışarı sızmaz
        counter = counter + 1  // var YOK → outer counter güncellenir
    }

    state s for 1m {
        every 5s {
            for player in fishers() {     // her iterasyon: yeni player binding
                var temp = player.health  // iterasyon-local
                counter = counter + 1     // event scope'taki counter
            }
        }
        next stop
    }
}

function helper(player) {       // function scope: player param
    counter = counter + 1       // outer event scope'taki counter görünür
    var inner = 99              // function-local
}
```

### `var` vs. `=`

- `var x = ...` → her zaman innermost scope'a yeni binding. Outer'da aynı isim varsa shadow eder.
- `x = ...` → chain'i yukarı tarar. Bulursa onu günceller. Hiç yoksa innermost'a oluşturur.

### Async scope güvenliği

`wait` ile süre dolduğunda continuation çalışır. O sırada içinde bulunduğu function/loop/hook scope'u
korunur. Yani:

```fps
function ritual(player) {
    repeat 5 as i {
        particle("END_ROD", player.location, 8)
        wait 4t                  // 4 tick beklendiğinde player ve i hala scope'ta
    }
    player.message("Bitti")     // burada da player hala scope'ta
}
```

Continuation çalışana kadar parametreler restore edilmez. Recursive `ritual(player)` çağrılırsa her
çağrı kendi scope stack frame'ini alır.

---

## Operatörler

| Kategori | Operatörler |
|---|---|
| Aritmetik | `+` `-` `*` `/` (unary `-` da var) |
| String birleşme | `+` (operandlardan biri string ise) |
| Karşılaştırma | `==` `!=` `<` `<=` `>` `>=` |
| Mantıksal | `and` / `&&`, `or` / `\|\|`, `not` / `!` |
| Yüzde | `20%` → `0.20` (literal) |

```fps
var ok = (health > 0) and (mob.tags.has("alive") or randomChance(50%))
var msg = "Skor: " + score + " (" + level + ")"
```

> Not: Operator precedence şudur (yüksek → düşük): `*` `/` > `+` `-` > karşılaştırma > `==` `!=` > `and` > `or`.

---

## Akış kontrolü

### if / else

```fps
if (health <= 6) {
    player.message("&cDikkat!")
} else if (health <= 12) {
    player.message("&eOrta seviye.")
} else {
    player.message("&aSaglikli.")
}
```

> Parantez opsiyoneldir ama tavsiye edilir: `if condition {` de geçerli.

### repeat (sayılı döngü)

```fps
repeat 5 {
    player.playSound("minecraft:block.note_block.pling", 1, 1)
    wait 4t
}

repeat 8 as i {                     // i = 0,1,2,...,7
    particle("FLAME", loc.add(0, i * 0.3, 0), 4)
}
```

Max iterasyon limiti var (default 500). Aşılırsa runtime hatası.

### for ... in ... (collection döngüsü)

```fps
for player in fishers() {
    player.actionbar("&eHazirla!")
}

for mob in entitiesWithTag("blackmoon") {
    mob.remove()
}

for entry in registry.values where entry.health > 0 {
    entry.heal(2)
}
```

`where` opsiyonel — predicate olarak değerlendirilir, false ise body atlanır.
Iterable olabilen şeyler: Collection, Iterable, Map (değerleri), array.

### wait

```fps
wait 5s
wait 20t
wait max(3t, 14t - i * 2t)   // expression destekli
```

- Yalnızca **scheduled** execution'da çalışır. Yani bir event body, hook handler, function veya state
  timer içinde olmalı. Top-level standalone'da değil.
- `for`/`repeat` içinde de çalışır, recursive scheduling ile.
- 0t'den küçük süre 1 tick'e clamp edilir.

### return

```fps
function findFirst(items, target) {
    for it in items {
        if (it.type == target) {
            return it
        }
    }
    return null
}
```

`return` ifadeli veya ifadesiz olabilir. Function gövdesinin orta yerinden erken çıkar.

---

## Fonksiyonlar

```fps
function name(arg1, arg2) {
    // body — return ile değer döndürebilir
}
```

- **Top-level fonksiyonlar** dosya kökünde bir kez tanımlanır, tüm event'ler tarafından çağrılabilir.
- **Event içi fonksiyonlar** sadece o event'e ait.
- Argümanlar pozisyonel; eksik gönderilirse `null` olur.
- Her çağrı yeni scope alır → recursive ve re-entrant güvenli.
- `wait` içerebilirler; o zaman çağıran kod (eğer aynı zincirde değilse) function bitmeden devam edebilir.

```fps
function warnLightning(player, damage) {
    repeat 8 as i {
        player.playSound("minecraft:entity.chicken.step", 10, 1.0 + i * 0.1)
        wait max(3t, 14t - i * 2t)
    }
    lightningEffect(player.location)
    player.damage(damage)
}
```

> ⚠️ Function `wait` kullanıyorsa çağıran tarafta da scheduled context gerekiyor (event body veya
> state timer içinde olmalı).

---

## Top-level deklarasyonlar

Bir `.fps` dosyasında şu blok türlerini tanımlayabilirsin:

| Anahtar kelime | Açıklama |
|---|---|
| `event <id> { ... }` | Bir event tanımı. Asıl mantık burada. |
| `function <name>(p, q) { ... }` | Global yardımcı fonksiyon. |
| `mob_template <id> { ... }` | Mob şablonu (şu anda parser tanır, runtime henüz factory olarak kullanmıyor). |
| `item_template <id> { ... }` | Item şablonu (a.g.). |
| `drop_table <id> { ... }` | Drop tablosu şablonu (a.g.). |

`while` **bilinçli olarak yasak** — sandbox'ta sonsuz döngüye karşı koruma. Bunun yerine `repeat N`,
`for ... in ...` veya `every X` kullan.

---

## Event yapısı

```fps
event <id> {
    // 1) Top-level init kısmı (opsiyonel):
    var stormPower = 1
    var lightningInterval = 12s
    display.tr = "Kara Ay Firtinasi"   // her atama event scope'a yazılır

    // 2) Lifecycle hook'lari:
    on start {
        broadcast("Basladi.")
    }
    on stop {
        broadcast("Bitti.")
    }

    // 3) Bukkit event hook'lari:
    on fishCaught(e) {
        e.player.message("Bonus!")
    }

    // 4) State machine:
    state warmup for 30s { ... next active }
    state active for 5m { ... next ending }
    state ending for 30s { ... next stop }

    // 5) Event icine ozel fonksiyonlar:
    function helper(x) { ... }
}
```

### Lifecycle sırası

1. `engine.startEvent(id, worldName)` çağrılır (manuel `/fishingplus script start` veya SeaEventManager).
2. Event scope açılır, `world`, `eventId`, registry'ler, default `rarity` map ve `catchSpeed` set edilir.
3. Top-level init satırları çalıştırılır (`var ...`, `display.tr = ...` vb.).
4. `on start` çalıştırılır.
5. İlk state'e geçilir (`firstState`).
6. State içinde:
   - Önceki state varsa `on exit` çalıştırılır.
   - `modifiers` bloğu çalıştırılır.
   - `on enter` çalıştırılır.
   - `every`/`after` timer'ları schedule edilir.
   - `state ... for <duration>` süresi dolunca `next <state>`'e geçer.
7. State `next stop` derse veya event manuel durdurulursa:
   - Mevcut state'in `on exit`'i çalışır.
   - `on stop` çalışır.

### Süre

`state ... for X` bir süre yazmaz veya yazamazsan state otomatik ilerlemez — sadece `next` ile geçer.
Event-level `duration = 30m` gibi atamalar parse edilir ve event scope'a yazılır ama runtime'ı sınırlamaz
(state sürelerinin toplamı belirleyici).

---

## State yapısı

```fps
state <id> for <duration> {
    on enter { ... }            // state'e girilince
    on exit { ... }             // state'ten çıkılınca (next geçişinde veya event stop'ta)

    modifiers {
        rarity.RARE = rarity.RARE * 1.15
        catchSpeed = catchSpeed * 0.9
    }

    every <duration|expr> {     // repeating timer; expression ise her fire'da yeniden değerlendirilir
        ...
    }

    after <duration|expr> {     // one-shot timer
        ...
    }

    next <state_id>             // bu state'in süresi dolunca hangisine geçilecek
    // next stop  → event'i durdur
}
```

### Variable interval timer

`every` interval'i bir expression olabilir; her fire'dan sonra yeniden değerlendirilir:

```fps
var lightningInterval = 12s

state danger for 10m {
    every lightningInterval {
        zapRandomFisher()
        if (lightningInterval > 4s) {
            lightningInterval = lightningInterval - 1s
        }
    }
    next stop
}
```

İlk fire ilk değer (`12s`) ile schedule edilir. Sonraki fire her seferinde güncel değerle.

---

## Hook'lar

`on <hook>(e) { ... }` ile Bukkit event'lerine bağlanır. Aynı isimde birden fazla hook tanımlanabilir
ama genelde tek tane kullanılır.

> Hook handler içinde `e` parametresi otomatik gelir (ismi değiştirilebilir: `on fishCaught(event) { ... }`).

> Event'in dünyası varsa (SeaEvent veya `start <event> <world>`), sadece o dünyadaki olaylar dispatch edilir.

| Hook adı | Field'lar | Notlar |
|---|---|---|
| `playerFish(e)` | player, hook, caught, state, location, world, cancelled | Tüm fishing state'leri için tetiklenir. |
| `fishCast(e)` | (playerFish ile aynı) | State == FISHING (olta atıldı). |
| `fishBite(e)` | (a.g.) | State == BITE. |
| `fishCaught(e)` | (a.g.) | State == CAUGHT_FISH. |
| `hookedEntity(e)` | (a.g.) | State == CAUGHT_ENTITY. |
| `fishFailed(e)` | (a.g.) | State == FAILED_ATTEMPT veya IN_GROUND. |
| `entityDamage(e)` | entity, cause, damage, cancelled, location, world | Cancelable. `damage` set edilebilir. |
| `entityDamageByEntity(e)` | + victim, damager | Bir entity başka bir entity'ye vurursa. |
| `playerDamage(e)` | + player | Hasar alan bir oyuncu ise. |
| `entityDeath(e)` | entity, killer, drops, exp, location, world | `drops` listesine ekleyebilirsin. |
| `playerDeath(e)` | player, location, world | Oyuncu öldü. |
| `playerJoin(e)` | player, location, world | Oyuncu sunucuya bağlandı. |
| `playerQuit(e)` | player, location, world | Oyuncu ayrıldı. |
| `playerInteract(e)` | player, action, hand, item, block, location, world, cancelled | Sağ/sol click. |
| `playerMove(e)` | player, from, to, location, world, cancelled | **Blok değişimi** olduğunda fire eder (her tick değil). |
| `projectileHit(e)` | projectile, shooter, hitEntity, hitBlock, location, world | Ok, trident, snowball vs. çarptığında. |

### Cancellable hook'lar

Eğer Bukkit event Cancellable ise:

```fps
on playerDamage(e) {
    if (e.cause == "LIGHTNING" and e.player.world == world) {
        e.damage = e.damage * 0.5    // hasarı yarıya indir
        if (e.player.health > 18) {
            e.cancelled = true       // tamamen iptal
        }
    }
}
```

---

## Hook context'i (`e` parametresi)

`e` bir context objesidir. Property'lerine `.` ile erişirsin. Common field'lar:

| Field | Tip | Hangi hook'larda |
|---|---|---|
| `e.player` | Player | playerFish, fishCaught, playerDamage, playerJoin, playerQuit, playerInteract, playerMove, playerDeath |
| `e.entity` | Entity | entityDamage, entityDeath |
| `e.victim` | Entity | entityDamageByEntity |
| `e.damager` | Entity | entityDamageByEntity, playerDamage |
| `e.cause` | String | entityDamage, playerDamage (örn. "LIGHTNING", "FIRE", "PROJECTILE") |
| `e.damage` | Number | hasar event'leri — **set edilebilir** |
| `e.cancelled` | Boolean | cancellable event'ler — **set edilebilir** |
| `e.location` | Location | tüm hook'lar (event'in geçtiği yer) |
| `e.world` | World | tüm hook'lar |
| `e.hook` | FishHook | playerFish family |
| `e.caught` | Entity | playerFish (yakalanan item entity'si) |
| `e.state` | String | playerFish (örn. "CAUGHT_FISH") |
| `e.killer` | Player/null | entityDeath |
| `e.drops` | List<ItemStack> | entityDeath — listeye `.add()` ile drop ekleyebilirsin |
| `e.exp` | Number | entityDeath |
| `e.action` | String | playerInteract (örn. "RIGHT_CLICK_BLOCK") |
| `e.item` | ItemStack | playerInteract |
| `e.block` | Block | playerInteract |
| `e.from`, `e.to` | Location | playerMove |
| `e.projectile` | Projectile | projectileHit |
| `e.shooter` | Entity | projectileHit |
| `e.hitEntity` | Entity | projectileHit |
| `e.hitBlock` | Block | projectileHit |

---

## Bridge API — World

```fps
world.name              // "world" (string)
world.time              // 18000 (Bukkit time, long)
world.thundering        // true / false
world.storming          // true / false (alias: stormy)
world.players           // List<Player>
world.entities          // List<Entity>
world.weather           // WeatherView (alt object)

world.time = 0
world.thundering = false
world.storming = false

world.weather.storm = true       // bool set
world.weather.thunder = true
world.weather.duration = 1200    // tick cinsinden
world.weather.clear()            // hem storm hem thunder false

world.spawn("DROWNED", loc)              // → Entity
world.dropItem(loc, itemStack)           // → Item entity
world.lightning(loc)                     // → gerçek hasar veren yıldırım
world.lightningEffect(loc)               // → sadece görsel/ses
world.particle("END_ROD", loc, 12)       // count
world.particle("END_ROD", loc, 12, 0.5)  // + spread (offset)
world.sound("minecraft:entity.chicken.step", loc, 1.0, 1.5)
world.broadcast("Sadece bu dunya")
```

---

## Bridge API — Entity / Player

### Ortak Entity property'leri (get)

| Property | Tip |
|---|---|
| `uuid` | String |
| `type` | String (örn. "DROWNED") |
| `name` | String (custom name, yoksa null) |
| `location` | Location |
| `world` | World |
| `valid` / `is_valid` | Boolean |
| `glowing` | Boolean |
| `gravity` | Boolean |
| `silent` | Boolean |
| `fire_ticks` / `fireTicks` | Number |
| `velocity` | Vector |
| `health` | Number (damageable ise) |
| `max_health` / `maxHealth` | Number |
| `target` | LivingEntity / null (sadece Mob) |
| `passengers` | List<Entity> |
| `equipment` | EntityEquipment (sadece LivingEntity) |
| `ai` | Boolean (sadece Mob) |
| `tags` | EntityTagView |
| `fuse_ticks` / `fuseTicks` | Number (sadece TNTPrimed) |
| `yield` | Number (sadece Explosive) |
| `incendiary` | Boolean (sadece Explosive) |

### Entity property'leri (set)

```fps
entity.name = "&cBoss"            // custom name set + visible
entity.health = 20.0
entity.max_health = 100           // attribute MAX_HEALTH'i değiştirir
entity.glowing = true
entity.ai = false                 // mob hareketi durdurur
entity.silent = true
entity.gravity = false
entity.fire_ticks = 200
entity.velocity = Vector(0, 1.5, 0)
entity.target = somePlayer        // sadece Mob

// TNT'ye özel:
tnt.fuse_ticks = 40
tnt.yield = 3.0
tnt.incendiary = false
```

### Entity metodları

```fps
entity.teleport(location)
entity.remove()
entity.damage(5)
entity.heal(3)
entity.nearby(8, 4, 8)                       // Entity listesi (xRadius, yRadius, zRadius)
entity.add_potion("SPEED", 1, 30s)           // type, amplifier, duration
entity.clear_potion("SPEED")
entity.lookAt(targetLocation)
```

### Sadece Player metodları

```fps
player.message("Selam")                       // alias: sendMessage
player.actionbar("&eHotbar uzeri")
player.playSound("minecraft:ui.toast.in", 1.0, 1.2)
player.give(itemStack)                        // envantere ekler
player.hasPermission("fishingplus.admin")     // boolean
player.title("Buyuk yazi", "Alt yazi", 10, 60, 20)   // fadeIn, stay, fadeOut (tick)
```

> Player aynı zamanda Entity property/metodlarını da destekler — `player.health`, `player.teleport(...)` vs.

---

## Bridge API — ItemStack

### Property'ler (get)

```fps
item.type         // "DIAMOND_SWORD"
item.amount       // 1
item.name         // display name (yoksa null)
item.unbreakable  // bool
```

### Property'ler (set)

```fps
item.amount = 3
item.name = "&aOzel Kilic"
item.unbreakable = true
item.model = 12001    // custom_model_data
```

### Fluent metodlar (chainable)

```fps
var sword = Item("DIAMOND_SWORD")
        .name("&5Karanlik Acgozluluk")
        .lore(["&7Mor isikla parliyor.", "&dKan emer."])
        .enchant("sharpness", 5)
        .enchant("fire_aspect", 2)
        .enchant("looting", 3)
        .unbreakable(true)
        .model(15001)
```

| Metod | Açıklama |
|---|---|
| `.amount(n)` | Yeni amount'lu klon döndürür. |
| `.name(s)` | Display name set + döndürür. |
| `.lore([s1, s2, ...])` | Liste tek argümanlıysa tüm lore'u replace eder. Birden fazla string argüman da kabul eder. |
| `.addLore(s)` | Sonuna lore satırı ekler. |
| `.clearLore()` | Tüm lore'u siler. |
| `.enchant(name, level)` | Unsafe enchant — vanilla isimleri `loyalty`, `fire_aspect`, `luck_of_the_sea` vs. |
| `.unbreakable(bool)` | Argüman opsiyonel — argsız çağrıda true varsayılır. |
| `.model(n)` | custom_model_data set. |
| `.tag(key, value)` | PDC string tag — namespace `fishingplus`. |

> Enchant ismi: hem vanilla namespace key (`loyalty`, `luck_of_the_sea`) hem de eski legacy enum name
> (`LOYALTY`, `LUCK_OF_THE_SEA`) kabul edilir. `-` ve `_` ikisi de işler.

---

## Bridge API — Equipment / Tags

### EntityEquipment

Living entity'lerin `entity.equipment` property'si.

```fps
mob.equipment.mainhand = Item("TRIDENT").enchant("loyalty", 3)
mob.equipment.offhand = Item("SHIELD")
mob.equipment.helmet = Item("DIAMOND_HELMET").enchant("protection", 4)
mob.equipment.chestplate = Item("DIAMOND_CHESTPLATE")
mob.equipment.leggings = Item("DIAMOND_LEGGINGS")
mob.equipment.boots = Item("DIAMOND_BOOTS").enchant("depth_strider", 3)

// Yöntem stili de var:
mob.equipment.set("HELMET", helm)
mob.equipment.clear()

// Read:
var current = mob.equipment.mainhand    // ItemStack
```

Slot isimleri: `mainhand`/`main_hand`, `offhand`/`off_hand`, `helmet`/`head`, `chestplate`/`chest`,
`leggings`/`legs`, `boots`/`feet`.

### EntityTagView (`entity.tags`)

Bukkit'in scoreboard tag sistemi. Script-spawn edilen mob'ları gruplamak için ideal.

```fps
mob.tags.add("blackmoon")
mob.tags.add("phase1")

if (mob.tags.has("blackmoon")) {
    mob.glowing = true
}

mob.tags.remove("phase1")
mob.tags.clear()

mob.tags.size      // sayı
mob.tags.all       // List<String>
```

> Tek bir entity için tag'ler vanilla scoreboard tag mekanizması (`/tag @e add foo`) ile aynı yerde saklanır.
> Sunucu restart'ında kalıcıdır (entity NBT'ye yazılır).
> Daha hızlı toplu erişim için `entitiesWithTag(tag)` global fonksiyonu var — bu **script registry**
> kullanır, vanilla tag arama yapmaz.

---

## Bridge API — Location / Vector

### Location property'leri

```fps
loc.world      // World
loc.x, loc.y, loc.z         // double
loc.yaw, loc.pitch          // double
loc.blockX, loc.blockY, loc.blockZ   // int

loc.x = 100
loc.y = loc.y + 10
loc.yaw = 90
```

### Location metodları

```fps
var above = loc.add(0, 5, 0)        // CLONE döndürür, orijinal değişmez
var below = loc.subtract(0, 2, 0)
var copy = loc.clone()
var nearby = loc.randomNearby(10)    // 10 blok yarıçapında rastgele
var dist = loc.distance(otherLoc)
```

### Vector

```fps
var v = Vector(0, 1, 0)
v.x = 0.5
var scaled = v.multiply(2.5)        // clone döndürür
var sum = v.add(other)              // clone döndürür
```

---

## Global fonksiyonlar

### Yardımcı / matematik

| Fonksiyon | Dönüş | Açıklama |
|---|---|---|
| `max(a, b, ...)` | Number | En büyük |
| `min(a, b, ...)` | Number | En küçük |
| `abs(x)` | Number | Mutlak değer |
| `clamp(x, lo, hi)` | Number | Aralığa kıstır |
| `floor(x)` / `ceil(x)` / `round(x)` | Number | |
| `randomInt(min, max)` | Number | Dahil-dahil |
| `randomChance(p)` | Boolean | `p` 0–1 veya 0–100 olabilir (`>1` ise /100). `20%` yazımı da işler. |
| `size(col)` | Number | Collection/Map/String/array boyutu |
| `isEmpty(col)` | Boolean | |

### Konstrüktörler

| Fonksiyon | Dönüş |
|---|---|
| `Location(world, x, y, z)` veya `Location(world, x, y, z, yaw, pitch)` | Location |
| `Vector(x, y, z)` | Vector |
| `Item(material)` veya `Item(material, amount)` | ItemStack |
| `ItemStack(material)` veya `ItemStack(material, amount)` | ItemStack (Item ile aynı) |

### Oyuncu listeleri

| Fonksiyon | Dönüş |
|---|---|
| `onlinePlayers()` | Tüm online oyuncular |
| `playersInWorld()` veya `playersInWorld(world)` | Event'in dünyasındaki (veya verilen dünyadaki) oyuncular |
| `fishers()` veya `fishers(world)` | Şu an `playersInWorld` ile aynı (ileride sadece olta tutanlara filtrelenecek) |
| `playersNear(location, radius)` | Lokasyona radius içindeki oyuncular |

### Entity / dünya etkileşimi

| Fonksiyon | Dönüş |
|---|---|
| `spawn("DROWNED", loc)` | Entity |
| `entitiesNear(loc, radius)` | List<Entity> |
| `randomLocationNear(loc, radius)` | Location |
| `dropItem(loc, item)` | Item entity |
| `strikeLightning(loc)` | LightningStrike (hasar verir) |
| `lightningEffect(loc)` | LightningStrike (sadece görsel) |
| `particle("END_ROD", loc, count)` | null (sadece efekt) |
| `sound("minecraft:entity.chicken.step", loc, vol)` veya `sound(name, loc, vol, pitch)` | null |
| `worldByName("world_nether")` | World veya null |

### Mesajlaşma

| Fonksiyon | Dönüş |
|---|---|
| `broadcast(msg)` | null — event'in dünyasındaki tüm oyunculara |
| `broadcastGlobal(msg)` | null — tüm sunucuya |
| `log(msg)` | null — server console'a `[FPScript] msg` formatında |

### Script entity registry

Script'in spawn ettiği mob'ları RAM'de takip etmek için. Sunucu restart'ında silinir.

| Fonksiyon | Açıklama |
|---|---|
| `rememberEntity(key, entity)` | Anahtar ile sakla. |
| `entity(key)` | Anahtardan al (entity invalid olduysa null). |
| `forgetEntity(key)` | Sil. |
| `tagEntity(entity, tag)` | Tag set, script-internal registry. |
| `entitiesWithTag(tag)` | Tag'li tüm entity'leri liste olarak ver. |
| `removeTagged(tag)` | Tag'li tüm entity'leri `.remove()` et. |

> Bu registry **scoreboard tag**'lerden farklıdır. Aynı isim için ikisi karışmaz. Script registry sadece
> script tarafından doldurulur ve RAM-only'dir.

---

## Sabit namespace'ler

Hazır gelen sabit map'leri — string olarak değer dönerler:

```fps
var cause = DamageCause.LIGHTNING    // "LIGHTNING"
if (e.cause == DamageCause.FIRE) { ... }

var type = EntityType.DROWNED        // "DROWNED"
var mat = Material.DIAMOND_SWORD     // "DIAMOND_SWORD"
var p = Particle.END_ROD             // "END_ROD"
var pe = PotionEffect.SPEED          // "SPEED"
```

Mevcut namespace'ler:

| Namespace | İçerik |
|---|---|
| `DamageCause` | Tüm `EntityDamageEvent.DamageCause` enum'u |
| `EntityType` | Tüm Bukkit EntityType |
| `Material` | Tüm Bukkit Material |
| `Particle` | Tüm Bukkit Particle |
| `Sound` | Yaygın ses isimleri (tam set için `"minecraft:..."` string'i de kullanabilirsin) |
| `Biome` | Yaygın biome isimleri |
| `GameMode` | SURVIVAL, CREATIVE, ADVENTURE, SPECTATOR |
| `EquipmentSlot` | MAIN_HAND, OFF_HAND, HEAD, CHEST, LEGS, FEET, HAND |
| `WeatherType` | CLEAR, DOWNFALL |
| `PotionEffect` | Yaygın effect isimleri |

> Namespace'ler aslında script'e default declare edilmiş `Map` objeleri. Hem `Material.DIAMOND_SWORD`
> hem `Material.diamond_sword` (lowercase) çalışır.

### Filter ile koleksiyon süzme

```fps
var lowHealth = fishers().where(it.health < 10)
var bigMobs = entitiesWithTag("blackmoon").where(it.type == "DROWNED")
```

`.where(...)` veya `.filter(...)` — predicate içinde `it` o anki elemanı temsil eder. Predicate scope'unda
ayrıca `type` ve `health` shortcut'ları otomatik declare edilir (elemanın property'leri varsa).

---

## Modifiers (deneysel)

`state` içindeki `modifiers { ... }` bloğu state'e girilince çalıştırılır. Şu anda iki özel değişken
runtime tarafından okunur:

```fps
modifiers {
    rarity.RARE = rarity.RARE * 1.15
    rarity.EPIC = rarity.EPIC * 1.08
    rarity.LEGENDARY = rarity.LEGENDARY * 1.25
    catchSpeed = catchSpeed * 0.9
}
```

- `rarity` — Map<String, Double>. Default tüm rarity'ler için 1.0.
- `catchSpeed` — Double. Default 1.0.

> ⚠️ **Şu anda bu değerler gerçek balıkçılık RNG'sine bağlı değil.** Sadece script context'inde yaşıyorlar
> ve `/fishingplus script debug` ile görünüyorlar. Gelecek sürümde FishRNGService modifier resolver'ına
> bağlanacak.

---

## SeaEvent entegrasyonu

`plugins/FishingPlus/sea_events.yml`'de bir sea event'e script bağlanabilir:

```yaml
events:
  BLACK_MOON_STORM:
    display: "&8&lBlack Moon Storm"
    icon: LIGHTNING_ROD
    script: black_moon_storm         # <— scripts/ altındaki event id
    description:
      - "..."
```

Sea event tetiklenince script de o dünyada otomatik başlar. Sea event biterse script'e `stop` gönderilir.
Manuel test için `/fishingplus script start black_moon_storm <world>` kullanabilirsin.

---

## Sınırlar ve performans

Default `FpScriptRuntimeLimits`:

| Limit | Default | Anlamı |
|---|---|---|
| `maxStatements` | 2000 | Tek `executeScheduled` çağrısında çalıştırılabilen max statement (`wait` continuation'ı yeni bütçe başlatır). |
| `maxRepeatIterations` | 500 | `repeat N` için max N. |
| `maxLoopIterations` | 1000 | `for ... in ...` için max iterasyon. |

Bütçe aşılırsa script o anda durur ve `/fishingplus script debug` runtime error listesine kayıt düşer.
`every` timer'larına bağlı script'ler kendi içlerinde bütçe yer ama timer fire'ları arası bağımsız —
yani 5 saniyede bir fire eden bir `every` her fire'da 2000 statement'a sahip.

### Performans önerileri

- `every 1t` çok pahalı — gerekmiyorsa `every 5t` veya `every 1s` kullan.
- Büyük `for` loop'larında her iterasyonda `wait` koymak yerine event'i state'lere böl.
- `entitiesNear(loc, radius)` her çağrıda Bukkit'in spatial scan'ini tetikler — sonuçları bir var'a alıp
  iterate et.
- `particle(name, loc, count)` count'u 100+ tutmaktan kaçın — server tick lag.

---

## Tam örnek — Black Moon Storm

```fps
// Karaay firtinasi: 30 dakikalik 4 fazli boss event.
event black_moon_storm {
    var stormPower = 1
    var lightningInterval = 12s

    on start {
        broadcast("&8[Kara Ay] &7Deniz kararmaya basladi...")
        if (world != null) {
            world.weather.storm = true
            world.weather.thunder = true
        }
    }

    on fishCaught(e) {
        e.player.message("&8[Kara Ay] &7Karanlik suda bir sey kipirdadi...")
    }

    on playerDamage(e) {
        if (e.cause == "LIGHTNING") {
            e.damage = e.damage * 0.75
        }
    }

    state warmup for 3m {
        on enter { broadcast("&8[Kara Ay] &7Dalgalar agirlasiyor.") }

        every 20s {
            for player in fishers() {
                player.actionbar("&7Dalgalar agirlasiyor...")
                player.playSound("minecraft:ambient.underwater.enter", 0.6, 0.7)
            }
        }
        next active
    }

    state active for 10m {
        on enter { broadcast("&8[Kara Ay] &7Firtina basladi!") }

        modifiers {
            rarity.RARE = rarity.RARE * 1.15
            rarity.EPIC = rarity.EPIC * 1.08
            catchSpeed = catchSpeed * 0.90
        }

        every 15s {
            for player in fishers() {
                particle("ELECTRIC_SPARK", player.location.add(0, 1.2, 0), 16)

                if (randomChance(20%)) {
                    var spawnLoc = randomLocationNear(player.location, 10)
                    var mob = spawn("DROWNED", spawnLoc)
                    mob.name = "&3Storm Drowned"
                    mob.max_health = 60
                    mob.health = 60
                    mob.target = player
                    mob.tags.add("blackmoon")

                    mob.equipment.mainhand = Item("TRIDENT")
                            .enchant("loyalty", 2)
                            .enchant("impaling", 3)
                    mob.equipment.helmet = Item("DIAMOND_HELMET")
                            .enchant("protection", 4)
                    mob.add_potion("SPEED", 1, 9999s)
                }
            }
        }
        next danger
    }

    state danger for 12m {
        on enter { broadcast("&8[Kara Ay] &cFirtinanin gozu sizin uzerinizde!") }

        modifiers {
            rarity.LEGENDARY = rarity.LEGENDARY * 1.25
            catchSpeed = catchSpeed * 0.75
        }

        every lightningInterval {
            for player in fishers() {
                if (player.health > 6) {
                    warnLightning(player, 4)
                }
                if (randomChance(30%)) {
                    var tnt = spawn("TNT", player.location.add(0, 12, 0))
                    tnt.fuse_ticks = 50
                    tnt.yield = 2
                    tnt.incendiary = false
                }
            }
        }

        every 2m {
            stormPower = stormPower + 1
            lightningInterval = max(5s, lightningInterval - 2s)
            broadcast("&8[Kara Ay] &7Firtina guclendi. Seviye: &c" + stormPower)
        }
        next ending
    }

    state ending for 1m {
        on enter { broadcast("&8[Kara Ay] &7Firtina zayifliyor...") }

        every 5s {
            for mob in entitiesWithTag("blackmoon") {
                particle("SMOKE", mob.location, 20)
                mob.remove()
            }
        }
        next stop
    }

    on stop {
        if (world != null) {
            world.weather.storm = false
            world.weather.thunder = false
        }
        removeTagged("blackmoon")
        broadcast("&8[Kara Ay] &7Deniz yeniden sakin.")
    }
}

function warnLightning(player, damage) {
    repeat 8 as i {
        player.playSound("minecraft:entity.chicken.step", 10, 1.0 + i * 0.1)
        wait max(3t, 14t - i * 2t)
    }
    lightningEffect(player.location)
    player.damage(damage)
}
```

---

## Sık karşılaşılan tuzaklar

| Belirti | Sebep / çözüm |
|---|---|
| `Unknown variable: player` | `for player in ...` veya `function f(player)` scope'undan sonra player'a erişiyorsun. Function param'larını fonksiyon dışına taşıma; loop var'larını döngüden sonra kullanma. Async `wait` continuation'larında scope korunur (proper lexical scope), o yüzden bu hata genelde scope'u tam kapatmamış bir kod parçası göstermez — script'te gerçekten o değişken o noktada yok. |
| `Unknown function: foo` | Function tanımı bu dosyada (veya başka bir `.fps`'te) global olarak yok. `function foo(...)` üst seviyede mi? `/fishingplus script list` ile gör. |
| `wait is only supported by scheduled FPScript execution.` | `wait` sadece event/state/function/hook context'inde çalışır. Standalone bir test bloğunda çalışmaz. |
| TNT spawn etti ama patlamadı | Doğal vanilla davranışı — `fuse_ticks` set etmek için entity'nin TNTPrimed olduğundan emin ol. `world.spawn("TNT", loc)` doğru tip döndürür. |
| Enchant bulunamadı | Modern key (`luck_of_the_sea`) veya legacy enum (`LUCK_OF_THE_SEA`) kullan. Tire de işler (`luck-of-the-sea`). |
| Hook field'ı null | Bukkit event'inde o field opsiyonel olabilir (örn. `e.killer` mob ölümünde her zaman dolu değil). `if (e.killer != null)` ile kontrol et. |
| State değişmiyor | `next <name>` satırını state body'sine ekledin mi? Süre dolmadan değişmez — `next stop` da geçerli. |
| `Could not pass event ...` paper hatası | Hook body'sinde NPE varsa Paper olay handler'ı failover'a düşürür. `/fishingplus script debug` ile son runtime error'a bak. |

---

> Yardım veya bug raporu için: `/fishingplus script debug` çıktısını paylaş, ilgili `.fps` dosyasını ekle.
