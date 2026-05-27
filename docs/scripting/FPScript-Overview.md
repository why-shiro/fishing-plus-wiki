# FPScript

FPScript is FishingPlus' in-house scripting language for authoring sea events, custom
mob spawns, lore-driven rituals, and bespoke fishing rules without recompiling the plugin.

Scripts live in `plugins/FishingPlus/scripts/` and use the `.fps` extension. The engine
picks them up on plugin enable and `/fishingplus script reload`.

## Hello world

```fps
event hello_seas {
    on start {
        broadcast("&b[Hello] &7Deniz sana selam veriyor.")
    }

    state main for 30s {
        every 5s {
            for player in getPlayers() {
                player.actionbar("&aDalga geliyor...")
            }
        }
        next stop
    }

    on stop {
        broadcast("&b[Hello] &7Selamlama sona erdi.")
    }
}
```

Save as `scripts/hello.fps`, run `/fp script reload`, then `/fp script start hello_seas <world>`.

## Top-level declarations

| Keyword          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `event NAME`     | A multi-state, hook-driven sea event.       |
| `function ...`   | Reusable callable; can `wait` and `return`. |
| `mob_template`   | Reserved — parsed, not yet runtime-active.  |
| `item_template`  | Reserved — parsed, not yet runtime-active.  |
| `drop_table`     | Reserved — use `<entity>.drops { ... }`.    |

`event` blocks own the lifecycle. Everything inside (init body, hooks, states) lives in
that event's runtime scope.

## Anatomy of an event

```fps
event my_event {
    // 1) Top-level lines — event init, run once before on start.
    var counter = 0
    var lightningInterval = 12s

    // 2) Lifecycle hooks
    on start { broadcast("started") }
    on stop  { broadcast("stopped") }

    // 3) Bukkit event hooks
    on fishCaught(e)    { e.player.message("nice catch!") }
    on playerDamage(e)  { if (e.cause == "FALL") { e.cancelled = true } }

    // 4) States — sequential phases with their own timers + modifiers
    state warmup for 30s {
        on enter { broadcast("warming up") }
        every 5s { broadcast("tick") }
        next main
    }

    state main for 5m {
        modifiers {
            rarity.RARE = rarity.RARE * 1.20
            catchSpeed = catchSpeed * 0.85
        }
        every lightningInterval {
            for player in getFishers() {
                strikeLightningEffect(player.location)
            }
        }
        next stop
    }

    // 5) Locally-scoped functions
    function announce(player) {
        player.title("&bMy Event", "&7Welcome", 5, 40, 10)
    }
}

// 6) Global functions (available to every event)
function shared(msg) {
    broadcast("&8[Shared] " + msg)
}
```

## States

Each state runs sequentially. `next NAME` jumps to another state by name; `next stop`
ends the event and fires `on stop`. State duration is enforced by the engine — when the
`for X` time elapses, the engine auto-advances.

A state may contain:

- `on enter { ... }` — runs once when entering the state.
- `on exit { ... }` — runs once when leaving.
- `modifiers { ... }` — runs once on enter; mutates `rarity` map and `catchSpeed` for the
  state's lifetime. These feed into `FishRNGService.Stats`.
- `every <duration> { ... }` — repeating timer. Re-evaluates the duration each fire, so
  you can write `every lightningInterval` and mutate `lightningInterval` mid-flight.
- `after <duration> { ... }` — one-shot delayed block.
- `next <stateName | stop>` — terminator line.

## Scope rules

FPScript has proper lexical scope. Each function call, hook dispatch, and loop iteration
gets its own scope:

```fps
event scopes {
    var counter = 0          // event-wide

    on fishCaught(e) {       // e lives in hook scope
        var local = 5        // dies when hook ends
        counter = counter + 1  // walks UP — updates event-wide counter
    }

    state main for 1m {
        every 10s {
            for player in getPlayers() {   // player local to each iteration
                var temp = player.health   // dies at end of iteration
            }
            // counter still here, player & temp gone
        }
        next stop
    }
}
```

- `var x = ...` — creates a binding in the **innermost** scope.
- `x = ...` (no `var`) — walks **outward** to find an existing `x`; if none exists,
  creates one in the innermost scope.
- `wait` inside a function preserves all local bindings until the continuation fires.

## Wait semantics

`wait` inside a `scheduled` block defers execution to the Bukkit scheduler. The scope
including all parameters and locals is snapshotted and restored when the continuation
fires:

```fps
function lightningChain(player, count) {
    repeat count as i {
        strikeLightning(player.location)   // player still bound
        wait 8t
    }
}
```

`wait` is **not** allowed in synchronous-only contexts (e.g. block evaluated by tests).
Top-level event handlers (`on start`, `on enter`, `every`, etc.) and user functions all
run in scheduled mode, so `wait` works there.

## Commands

| Command                                       | Purpose                                |
| --------------------------------------------- | -------------------------------------- |
| `/fishingplus script reload`                  | Re-read every `.fps` file.             |
| `/fishingplus script validate`                | Parse-check; doesn't restart events.   |
| `/fishingplus script list`                    | Loaded files + declarations.           |
| `/fishingplus script events`                  | Defined events with their states.      |
| `/fishingplus script active`                  | Currently running events.              |
| `/fishingplus script start <event> [world]`   | Manually start an event.               |
| `/fishingplus script stop <event>`            | Stop an active event.                  |
| `/fishingplus script entities`                | Inspect the entity registry.           |
| `/fishingplus script hooks`                   | List supported hooks.                  |
| `/fishingplus script constants`               | List constant namespaces.              |
| `/fishingplus script debug`                   | Last 20 runtime errors + counters.     |

## Sea event integration

Set `script: my_event` in `plugins/FishingPlus/sea_events.yml` under a `SeaEventType`
entry. When the SeaEventManager spawns that event, the matching FPScript will start
automatically (and stop when the sea event ends).

See **[FPScript-Hooks](FPScript-Hooks.md)**, **[FPScript-Bridge](FPScript-Bridge.md)**,
and **[FPScript-Examples](FPScript-Examples.md)** for the full surface.
