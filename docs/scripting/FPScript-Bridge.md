# FPScript Bridge

This is the canonical reference for global functions, constants, and the `.property` /
`.method()` accessors the engine exposes on Bukkit types.

## Global functions

### Players & worlds

| Function                              | Returns                                                               |
| ------------------------------------- | --------------------------------------------------------------------- |
| `onlinePlayers()`                     | Every online player on the server.                                    |
| `getPlayers([world])`                 | Online players in `world`, defaulting to the event's world.           |
| `playersInWorld([world])`             | Alias of `getPlayers`.                                                |
| `fishers([world])`                    | Alias of `getPlayers` (kept for legacy scripts).                      |
| `getFishers([world])`                 | Only players who currently have a rod cast (FishHookTracker hit).     |
| `playersNear(loc, radius)`            | Players within `radius` blocks of `loc`.                              |
| `entitiesNear(loc, radius)`           | All entities within `radius` blocks of `loc`.                         |
| `getPlayer(uuidOrName)`               | Online `Player` or `null`. Accepts UUID, UUID-string, or exact name.  |
| `getOfflinePlayer(uuidOrName)`        | Bukkit `OfflinePlayer` handle (never null for valid input).           |
| `worldByName(name)`                   | World by name or `null`.                                              |

### Spawn & effects

| Function                               | Effect                                                |
| -------------------------------------- | ----------------------------------------------------- |
| `spawn(typeName, location)`            | `world.spawnEntity(...)`. Returns the spawned entity. |
| `dropItem(location, itemStack)`        | Drops `itemStack` naturally.                          |
| `strikeLightning(location)`            | Real lightning (damages, sound).                      |
| `lightningEffect(location)`            | Visual-only lightning.                                |
| `particle(name, location[, count])`    | `world.spawnParticle(...)` with sane default offset.  |
| `sound(name, location, volume[, pitch])` | `world.playSound(...)`.                             |
| `randomLocationNear(loc, radius)`      | Returns a Location somewhere in `radius`.             |

### Entity registry

The engine keeps a UUID-keyed registry so scripts can park entities across timers without
holding stale Bukkit references.

| Function                          | Effect                                              |
| --------------------------------- | --------------------------------------------------- |
| `rememberEntity(key, entity)`     | Map `key` → entity's UUID.                          |
| `entity(key)`                     | Return entity for `key`, or `null` if despawned.    |
| `forgetEntity(key)`               | Drop a single key.                                  |
| `tagEntity(entity, tag)`          | Add the entity to a named bucket.                   |
| `entitiesWithTag(tag)`            | Live `List<Entity>` for the bucket.                 |
| `removeTagged(tag)`               | `entity.remove()` everything in the bucket.         |

### Math, random, lists

| Function                                | Returns                                                 |
| --------------------------------------- | ------------------------------------------------------- |
| `min(...)`, `max(...)`                  | Variadic min/max.                                       |
| `abs(x)`, `clamp(x, lo, hi)`            | Math helpers.                                           |
| `floor(x)`, `ceil(x)`, `round(x)`       | Rounding.                                               |
| `randomInt(min, max)`                   | Inclusive integer in `[min, max]`.                      |
| `randomChance(p)`                       | Bool. Accepts `0.2`, `20%`, etc.                        |
| `list(a, b, c, ...)`                    | Variadic list constructor.                              |
| `randomChoice(list)` / `pickRandom(list)` | Random element. Throws on empty.                      |
| `shuffle(list)`                         | New shuffled copy; never mutates the input.             |
| `first(list)`, `last(list)`             | Edge elements. Throws on empty.                         |
| `size(x)`, `isEmpty(x)`                 | Works on lists, maps, strings, arrays.                  |

### Item factories

| Function                            | Returns                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| `Item(materialName[, amount])`      | New ItemStack. Chainable: `.name(...).lore([...]).enchant(...)`.      |
| `ItemStack(materialName[, amount])` | Alias of `Item`.                                                     |
| `Location(world, x, y, z[, yaw, pitch])` | New Location.                                                  |
| `Vector(x, y, z)`                   | New Vector.                                                          |

### Output

| Function                  | Effect                                       |
| ------------------------- | -------------------------------------------- |
| `broadcast(msg)`          | Send to every player in the event's world.   |
| `broadcastGlobal(msg)`    | Send to the whole server.                    |
| `log(msg)`                | Plugin logger info.                          |

## Constant namespaces

Available as `Namespace.NAME` (case-insensitive).

```fps
var t = EntityType.DROWNED
var m = Material.PRISMARINE
var p = Particle.ELECTRIC_SPARK
var c = DamageCause.LIGHTNING
var g = GameMode.SURVIVAL
var s = EquipmentSlot.MAIN_HAND
```

Full list: `DamageCause`, `EntityType`, `Material`, `Particle`, `Sound`, `Biome`,
`GameMode`, `EquipmentSlot`, `WeatherType`, `PotionEffect`.

## Property / method access by type

### Location

```fps
loc.world           loc.x      loc.y      loc.z
loc.yaw             loc.pitch
loc.blockX          loc.blockY loc.blockZ

loc.add(dx, dy, dz)         // returns NEW Location
loc.subtract(dx, dy, dz)
loc.clone()
loc.distance(otherLoc)
loc.randomNearby(radius)
```

`loc.x = ...` and `loc.y = ...` are writable on a Location reference.

### World

```fps
world.name          world.time            world.weather
world.thundering    world.storming        world.players       world.entities

world.spawn("DROWNED", loc)
world.dropItem(loc, item)
world.lightning(loc)            // real strike
world.lightningEffect(loc)      // visual only
world.particle("FLAME", loc, count[, spread])
world.sound("minecraft:ui.button.click", loc, volume, pitch)
world.broadcast(msg)
```

Writable: `world.time`, `world.thundering`, `world.storming`.

### World weather view

```fps
world.weather.storm = true
world.weather.thunder = true
world.weather.duration = 6000
world.weather.clear()
```

### Entity (general)

```fps
entity.uuid         entity.type        entity.name        entity.location
entity.world        entity.valid       entity.glowing     entity.gravity
entity.silent       entity.fire_ticks  entity.velocity    entity.health
entity.max_health   entity.target      entity.passengers  entity.equipment
entity.ai           entity.tags        entity.fuse_ticks  entity.yield
entity.incendiary

entity.teleport(loc)
entity.remove()
entity.damage(amount)
entity.heal(amount)
entity.add_potion("SPEED", amplifier, durationSeconds)
entity.clear_potion("SPEED")
entity.nearby(dx, dy, dz)
entity.lookAt(loc)
```

Writable: `name`, `glowing`, `gravity`, `silent`, `fire_ticks`, `velocity`,
`health`, `max_health`, `target`, `ai`, `fuse_ticks`, `yield`, `incendiary`.

### Entity tags view

```fps
entity.tags.add("blackmoon")
entity.tags.remove("blackmoon")
entity.tags.has("blackmoon")
entity.tags.clear()
entity.tags.size
entity.tags.all          // List<String>
```

### Entity equipment view

```fps
entity.equipment.mainhand    // read or write
entity.equipment.offhand
entity.equipment.helmet
entity.equipment.chestplate
entity.equipment.leggings
entity.equipment.boots

entity.equipment.set("helmet", item)
entity.equipment.clear()
```

### Player (extends Entity)

```fps
player.message("...")          // alias: sendMessage
player.actionbar("...")
player.playSound(name, volume, pitch)
player.give(item)
player.has_permission("fp.use")
player.title(title, subtitle, fadeIn, stay, fadeOut)

player.empty_slots             // int count
player.has_empty_slots(n)      // bool
player.give_random_empty(item) // bool (true on success)
```

### ItemStack

```fps
item.type      item.amount     item.name     item.unbreakable

item.amount(n)                    // returns NEW stack with amount n
item.name("&aShiny")              // mutates and returns
item.lore(["line 1", "line 2"])
item.addlore("more")              // appends
item.clearlore()
item.enchant("loyalty", 3)
item.unbreakable(true)
item.model(1001)                  // CustomModelData
item.tag("storm_amulet", "v1")    // PDC store under fishingplus namespace
item.has_tag("storm_amulet")      // bool
item.tag_value("storm_amulet")    // String or null
```

### Vector

```fps
vec.x  vec.y  vec.z              // also writable
vec.multiply(k)
vec.add(otherVec)
vec.clone()
```

### Lists (and any Collection)

```fps
list.first()      list.last()      list.size()
list.contains(x)  list.has(x)
list.random()     // alias: randomChoice, pickRandom
list.shuffle()    // alias: shuffled
list.reverse()    // alias: reversed
list.isEmpty()
list.where(predicate)   // filter — see below
```

### Where filters (functional)

`list.where(predicate)` returns a NEW list of elements where `predicate` is true. Inside
the predicate, `it` refers to the current element. Implicit shortcut fields:

```fps
var armoredMobs = entitiesWithTag("blackmoon").where(type == "DROWNED")
var hurtPlayers = getPlayers().where(it.health < 6)
var crouchers   = getPlayers().where(it.location.y < 60)
```

## Stats modifiers (state-level)

Inside a `state ... { modifiers { ... } }` block you can shape the next fishing roll for
players in this event's world. These feed `FishRNGService.Stats`:

```fps
state danger for 12m {
    modifiers {
        rarity.RARE = rarity.RARE * 1.20
        rarity.EPIC = rarity.EPIC * 1.10
        catchSpeed  = catchSpeed * 0.85
        doubleCatch = 0.05
    }
    ...
}
```

| Variable        | Effect                                                      |
| --------------- | ----------------------------------------------------------- |
| `rarity.X`      | Multiplier on the named rarity's weight in the RNG roll.    |
| `catchSpeed`    | Multiplier on bite delay. Lower = faster bites.             |
| `doubleCatch`   | Probability of a second simultaneous catch (0–1).           |

Modifier values stack across active scripts and merge with hotspot/totem/booster stats.
