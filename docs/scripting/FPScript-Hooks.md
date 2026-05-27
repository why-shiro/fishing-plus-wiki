# FPScript Hooks

Hooks fire when Bukkit dispatches a matching event. The script receives the event as
the parameter named in the hook header (`e` by default). Hook bodies run in their own
scope — `e` and any `var` declarations are local to the call.

## Lifecycle

| Hook         | Fires when                                | Notes                             |
| ------------ | ----------------------------------------- | --------------------------------- |
| `on start`   | Event begins (just before first state).   | Runs after the event init body.   |
| `on stop`    | Event ends.                               | After current state's `on exit`.  |
| `on enter`   | (state-scoped) Entering a state.          | State's modifiers run first.      |
| `on exit`    | (state-scoped) Leaving a state.           |                                   |
| `on tick`    | NOT yet implemented — use `every 1t`.     |                                   |

## Bukkit-mapped hooks

All these are dispatched from `FpScriptHookListener` and filtered by the event's world
(an event scoped to `world_nether` ignores Overworld dispatches).

### Fishing

| Hook                | Context keys                                                            |
| ------------------- | ----------------------------------------------------------------------- |
| `on playerFish(e)`  | `player`, `hook`, `caught`, `state` (`CAUGHT_FISH`, `BITE`, ...), `cancelled` |
| `on fishCaught(e)`  | Same as `playerFish` but only when `state == CAUGHT_FISH`.              |
| `on fishBite(e)`    | Fired when the bobber dips (state `BITE`).                              |
| `on fishCast(e)`    | Fired when the rod is cast (state `FISHING`).                           |
| `on fishFailed(e)`  | `FAILED_ATTEMPT` / `IN_GROUND`.                                         |
| `on hookedEntity(e)`| `CAUGHT_ENTITY`. `caught` is the hooked entity.                         |

### Player

| Hook                   | Context keys                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `on playerJoin(e)`     | `player`, `location`, `world`                                                                         |
| `on playerQuit(e)`     | `player`, `location`, `world`                                                                         |
| `on playerInteract(e)` | `player`, `action`, `hand`, `item`, `block`, `location`, `world`, `cancelled`                         |
| `on playerMove(e)`     | `player`, `from`, `to`, `location`, `world`, `cancelled`. Throttled to block-coordinate changes only. |
| `on itemDrop(e)`       | `player`, `item` (ItemStack), `drop` (Item entity), `entity`, `location`, `world`, `cancelled`        |
| `on playerDamage(e)`   | `player`, `entity`, `damager`, `damage`, `cause`, `cancelled`                                         |
| `on playerDeath(e)`    | `player`, `location`, `world`                                                                         |

### Entity

| Hook                          | Context keys                                                          |
| ----------------------------- | --------------------------------------------------------------------- |
| `on entityDamage(e)`          | `entity`, `damage`, `cause`, `cancelled`, `location`, `world`         |
| `on entityDamageByEntity(e)`  | `entity`, `victim`, `damager`, `damage`, `cause`, `cancelled`         |
| `on entityDeath(e)`           | `entity`, `killer`, `drops`, `exp`, `location`, `world`               |
| `on projectileHit(e)`         | `projectile`, `shooter`, `hitEntity`, `hitBlock`, `location`, `world` |

## Mutable fields

These can be assigned to inside a hook body and the change propagates back to the
Bukkit event:

| Field          | Hooks                                                       | Effect                          |
| -------------- | ----------------------------------------------------------- | ------------------------------- |
| `e.damage`     | `entityDamage`, `entityDamageByEntity`, `playerDamage`      | Sets the final damage amount.   |
| `e.cancelled`  | Any hook whose Bukkit event is `Cancellable`.               | Cancels the underlying event.   |

Example:

```fps
on playerDamage(e) {
    if (e.cause == "FALL" and e.player != null) {
        e.damage = e.damage * 0.5
        e.player.actionbar("&aSenin acin yarisi.")
    }
}

on playerInteract(e) {
    if (e.item != null and e.item.has_tag("storm_amulet")) {
        e.cancelled = true
        e.player.message("&8Amulet calismadi, sabir et.")
    }
}
```

## Hook + wait

Hooks support `wait` (and nested function calls with `wait`) thanks to the snapshot+restore
scope mechanism:

```fps
on fishCaught(e) {
    e.player.actionbar("&aHazirlaniyor...")
    wait 1s
    e.player.actionbar("&aBONUS!")
    e.player.give(Item("EMERALD", 1))
}
```

`e` and any locals stay alive across waits.

## Multiple handlers for one hook

You can define the same hook name multiple times in one event — they run sequentially in
declaration order, each in its own scope.

```fps
on fishCaught(e) {
    log("first handler")
}

on fishCaught(e) {
    log("second handler")
}
```
