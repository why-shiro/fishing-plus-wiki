# FPScript Examples

Drop these into `plugins/FishingPlus/scripts/`, run `/fp script reload`, then start them
with `/fp script start <id> <world>`.

## 1. Golden Hour — 5-minute bonus window

Demonstrates: state chain, hooks, modifiers, particles, scheduled function calls.

```fps
event golden_hour {
    var bonusChance = 20%

    on start { broadcast("&6&l[Altin Saat] &eDeniz altinla dolup tasiyor!") }

    on fishCaught(e) {
        if (randomChance(bonusChance)) {
            triggerBonus(e.player)
        }
    }

    state warmup for 30s {
        every 5s {
            for player in getPlayers() {
                player.actionbar("&eAltin saat baslamak uzere...")
            }
        }
        next active
    }

    state active for 4m {
        on enter {
            for player in getPlayers() {
                player.title("&6&lAltin Saat", "&eBonus aktif", 10, 60, 20)
            }
        }
        modifiers {
            rarity.RARE = rarity.RARE * 1.20
            catchSpeed  = catchSpeed * 0.85
        }
        every 15s {
            for player in getPlayers() {
                particle("END_ROD", player.location.add(0, 2.2, 0), 12)
            }
        }
        next stop
    }

    on stop { broadcast("&6[Altin Saat] &eBitti.") }
}

function triggerBonus(player) {
    player.actionbar("&6&l+ BONUS!")
    player.playSound("minecraft:entity.player.levelup", 1.0, 1.8)
    var reward = Item("EMERALD", 2).name("&aAltin Saat Bonusu")
    player.give(reward)
    repeat 3 as i {
        particle("END_ROD", player.location.add(0, 1.0 + i * 0.3, 0), 4)
        wait 4t
    }
}
```

## 2. Kraken Summon — random boss spawn on catch

Demonstrates: entity equipment, custom drops, `on entityDeath`, tagged cleanup.

```fps
event kraken_summon {
    var summonChance = 8%
    var krakenCount = 0
    var maxKrakens = 3

    on fishCaught(e) {
        if (randomChance(summonChance) and krakenCount < maxKrakens) {
            summonKraken(e.player)
            krakenCount = krakenCount + 1
        }
    }

    on entityDeath(e) {
        if (e.entity.tags.has("kraken")) {
            krakenCount = krakenCount - 1
            if (e.killer != null) grantTrophy(e.killer)
        }
    }

    state main for 15m {
        every 30s {
            for player in getPlayers() {
                particle("SQUID_INK", player.location.add(0, 1, 0), 6)
            }
        }
        next stop
    }

    on stop {
        removeTagged("kraken")
        broadcast("&5[Kraken] &dCagri sona erdi.")
    }
}

function summonKraken(player) {
    var loc = randomLocationNear(player.location, 6)
    var mob = spawn("DROWNED", loc)
    mob.name = "&5&lKraken Spawnu"
    mob.max_health = 80
    mob.health = 80
    mob.glowing = true
    mob.target = player
    mob.tags.add("kraken")

    mob.equipment.mainhand = Item("TRIDENT")
        .enchant("loyalty", 3)
        .enchant("impaling", 5)
        .unbreakable(true)
    mob.equipment.helmet = Item("TURTLE_HELMET").enchant("protection", 3)
    mob.add_potion("WATER_BREATHING", 0, 9999s)
}

function grantTrophy(player) {
    var trophy = Item("HEART_OF_THE_SEA")
        .name("&5&lKraken Kalbi")
        .lore(["&7Bir Kraken Spawnu'ndan elde edildi.", "&dSahibine sans getirir."])
        .enchant("luck_of_the_sea", 5)
    player.give(trophy)
    player.title("&5&lKRAKEN AVCISI", "&7Bir kalbi avladin", 10, 60, 20)
}
```

## 3. Tide Pool — buffs + random lightning + creature spawns

Demonstrates: `getFishers()`, variable interval, `randomChoice`, multi-state with timers.

```fps
event tide_pool {
    var lightningInterval = 8s
    var spawnedCreatures = 0
    var creatureCap = 12

    on start { broadcast("&3[Tide] &bGel git aksi yumusadi.") }

    state setup for 20s {
        on enter {
            for player in getPlayers() {
                applyTideBuffs(player)
            }
        }
        every 5s {
            for player in getPlayers() {
                applyTideBuffs(player)
            }
        }
        next main
    }

    state main for 5m {
        modifiers { rarity.RARE = rarity.RARE * 1.10 }

        every 12s {
            for player in getPlayers() {
                if (spawnedCreatures < creatureCap) {
                    spawnTideCreature(player)
                    spawnedCreatures = spawnedCreatures + 1
                }
            }
        }

        every lightningInterval {
            zapRandomFisher()
            if (lightningInterval > 4s) {
                lightningInterval = lightningInterval - 1s
            }
        }

        next stop
    }

    on stop {
        removeTagged("tide_creature")
        broadcast("&3[Tide] &bDeniz yeniden sakin.")
    }
}

function applyTideBuffs(player) {
    player.add_potion("WATER_BREATHING", 0, 30s)
    player.add_potion("DOLPHINS_GRACE", 1, 30s)
    player.add_potion("NIGHT_VISION", 0, 30s)
}

function spawnTideCreature(player) {
    var loc = randomLocationNear(player.location, 8)
    var pool = list("SQUID", "AXOLOTL", "DOLPHIN")
    var mob = spawn(pool.random(), loc)
    mob.glowing = true
    mob.tags.add("tide_creature")
    particle("SPLASH", loc.add(0, 0.5, 0), 18)
}

function zapRandomFisher() {
    var crowd = getFishers()        // only actively fishing players
    if (size(crowd) == 0) return
    var pick = crowd.random()
    strikeLightning(pick.location)
    pick.playSound("minecraft:entity.lightning_bolt.thunder", 0.5, 1.0)
}
```

## 4. Cursed Haul — stackable curse with redemption

Demonstrates: per-player state via scoreboard tags, `wait` recursion, item PDC tags,
multi-handler hooks.

```fps
event cursed_haul {
    var curseChance = 25%

    on start { broadcast("&8[Lanet] &7Denizden eski bir koku yukseliyor...") }

    on fishCaught(e) {
        if (randomChance(curseChance)) {
            curseFish(e.player)
        }
    }

    on itemDrop(e) {
        if (e.player.tags.has("cursed_haul_pending") and e.item.has_tag("cursed_haul_token")) {
            e.player.tags.remove("cursed_haul_pending")
            e.player.actionbar("&aLanet kirildi!")
        }
    }

    state main for 10m {
        every 1m {
            for player in getPlayers() where it.tags.has("cursed_haul_pending") {
                particle("SOUL", player.location.add(0, 1.4, 0), 12)
            }
        }
        next stop
    }
}

function curseFish(player) {
    if (player.tags.has("cursed_haul_pending")) return
    if (!player.has_empty_slots(1)) return

    var token = Item("SKELETON_SKULL")
        .name("&8&lLanetli Kafatasi")
        .lore(["&75 saniye icinde yere at", "&8Atamazsan lanetlenirsin"])
        .tag("cursed_haul_token", "1")
    player.give_random_empty(token)
    player.tags.add("cursed_haul_pending")
    curseCountdown(player, 5)
}

function curseCountdown(player, secondsLeft) {
    if (!player.tags.has("cursed_haul_pending")) return
    if (secondsLeft <= 0) {
        player.tags.remove("cursed_haul_pending")
        player.damage(6)
        player.fire_ticks = 80
        return
    }
    player.actionbar("&c&lLanet patliyor: &f" + secondsLeft + "s")
    wait 1s
    curseCountdown(player, secondsLeft - 1)
}
```

## 5. Mailbox — lookup offline player to ship rewards

Demonstrates: `getOfflinePlayer`, `getPlayer`, scoreboard tags, conditional gift.

```fps
event mailbox {
    on start { broadcast("&b[Mailbox] &7Bekleyen hediyeler gonderiliyor.") }

    state main for 30s {
        on enter {
            sendGift("why_shiro")
            sendGift("yuugeen_")
        }
        next stop
    }
}

function sendGift(name) {
    var player = getPlayer(name)
    if (player != null) {
        player.message("&aBir hediye geldi!")
        player.give(Item("DIAMOND", 1).name("&bGunluk Hediye"))
        return
    }
    var offline = getOfflinePlayer(name)
    if (offline != null) {
        log("Mailbox: " + name + " offline, hediye askida.")
        // Burada bir DB tag'i ile bekleyen liste tutabilirsiniz.
    }
}
```

## Anti-patterns

- **Don't** loop without bounds: there is no `while`. Use `repeat N` or `every X`.
- **Don't** mutate a list while iterating it. `for x in someList { someList.add(...) }` is
  undefined; use `var snapshot = list(...)` first.
- **Don't** assume `e.player` is non-null on `playerDamage` — environmental damage with no
  player target leaves it null. Guard with `if (e.player != null)`.
- **Don't** use `lightningEffect(loc.add(0, 12, 0))` if you want damage. That's visual-only
  and 12 blocks up. Use `strikeLightning(player.location)` for real impact.
