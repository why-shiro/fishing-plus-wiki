# FPScript Changelog

Tracking script-runtime-relevant changes. Plugin-wide changes live in the project root
CHANGELOG.

## 1.0.5

**Engine**
- Proper lexical scope. Each function call, hook dispatch, and loop iteration runs in its
  own scope. `var x = ...` shadows; plain `x = ...` walks outward.
- `wait` is now safe inside functions, loops, and hooks. Continuation snapshots all
  locals and restores them when the scheduler fires, so `player` etc. survive deferred
  execution.
- `return value` is now a real return — `var x = someFunc()` reads the returned value.
- Targeted `popScope(scope)` — sibling async chains no longer pop each other's scopes.
- Modifier blocks (`rarity.X`, `catchSpeed`, `doubleCatch`) now feed `FishRNGService.Stats`
  so script-driven events actually move the RNG, not just dashboard counters.

**Bridge additions**
- `getPlayers([world])` / `getFishers([world])` / `getPlayer(idOrName)` /
  `getOfflinePlayer(idOrName)` — explicit player lookup.
- `list(a, b, c, ...)` — variadic list constructor.
- `randomChoice(list)` / `pickRandom(list)` — pick one; throws on empty.
- `shuffle(list)` — returns a new shuffled copy.
- `first(list)` / `last(list)` — edge accessors.
- List method dispatch: `list.first() / .last() / .random() / .shuffle() / .reverse() /`
  `.contains(x) / .size() / .isEmpty()`.
- Entity bridge: `tags.{add,remove,has,clear,size,all}`, `max_health`, `ai`, TNT
  `fuse_ticks/yield/incendiary`, `lookAt(loc)`, `heal(n)`.
- Equipment bridge: `entity.equipment.mainhand = item` (and all slots) — direct property
  assignment.
- World weather: `world.weather.{storm,thunder,duration,clear()}`.
- ItemStack: `unbreakable(b)`, `model(n)`, `tag(k, v)`, `has_tag(k)`, `tag_value(k)`.
- Player: `actionbar(s)`, `empty_slots`, `has_empty_slots(n)`, `give_random_empty(item)`,
  `has_permission(s)`.

**Diagnostics**
- Comparisons (`<`, `<=`, `>`, `>=`) and arithmetic (`+`, `-`) throw informative errors
  when an operand is null — pointing at the operator and suggesting common causes.
- `randomChoice([])`, `first([])`, `last([])` throw with explicit "empty list" messages
  rather than silently returning null.

**Hooks**
- New: `playerJoin`, `playerQuit`, `playerInteract`, `playerMove` (block-throttled),
  `projectileHit`, `playerDeath`, `itemDrop`, `fishCast`, `fishBite`, `fishFailed`,
  `hookedEntity`.
- Event handlers run with per-handler scope (multiple `on fishCaught(e)` blocks in one
  event no longer clobber each other).
- World filtering: hooks only dispatch to scripts whose event world matches the player's
  world (or scripts started world-less).

**Buckets (related)**
- Lazy aging: spoilage settles only on bucket open / fish-add. Periodic per-bucket sweep
  retired.
- Catch routing: fish goes to the catcher's OWN bucket only — strangers' buckets are
  ignored even when nearer.
- Open-time localization: each viewer sees fish names/lore in their selected language;
  stored ItemStack is unchanged.

**Hotspot fix (related)**
- Bobber landing location is captured at the event tick. Previously the live hook
  position was queried during CAUGHT_FISH retraction, which let the location drift back
  toward the player.

## 1.0.4

- First public engine cut: parser, basic bridge, event/state/timer skeleton, bundled
  Black Moon Storm example.
- Known holes (fixed in 1.0.5): `return value` swallowed, function param scope race with
  `wait`, modifier block read-only, hotspot stats keyed off player position.
