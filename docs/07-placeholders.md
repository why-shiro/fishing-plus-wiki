# PlaceholderAPI

FishingPlus placeholderlari `%fishingplus_<placeholder>%` formatini kullanir.

Bu sayfa placeholder gruplarini anlatir. Sunucunuzdaki aktif liste surume gore genisleyebilir.

## Zaman Placeholderlari

| Placeholder | Aciklama |
| --- | --- |
| `%fishingplus_month%` | Mevcut balikcilik ayi. |
| `%fishingplus_month2%` | Alternatif/formatli ay degeri. |
| `%fishingplus_month_name%` | Secili dile gore ay adi. |
| `%fishingplus_month_name_tr%` | Turkce ay adi. |
| `%fishingplus_month_abbr%` | Kisa ay adi. |
| `%fishingplus_month_abbr_tr%` | Turkce kisa ay adi. |
| `%fishingplus_day%` | Gun. |
| `%fishingplus_hour%` | Saat. |
| `%fishingplus_minute%` | Dakika. |
| `%fishingplus_second%` | Saniye. |

Bazi zaman placeholderlari `:world` ekiyle dunya bazli calisabilir.

## Dil Placeholderlari

| Placeholder | Aciklama |
| --- | --- |
| `%fishingplus_language%` | Oyuncunun aktif dil kodu. |
| `%fishingplus_lang%` | Kisa dil kodu aliasi. |

## Aktif Yem Placeholderlari

| Placeholder | Aciklama |
| --- | --- |
| `%fishingplus_bait_active_id%` | Aktif yem ID/key. |
| `%fishingplus_bait_active_display%` | Aktif yem gorunen adi. |
| `%fishingplus_bait_active_rarity%` | Yem nadirligi. |
| `%fishingplus_bait_active_uses%` | Kalan kullanim. |
| `%fishingplus_bait_active_consume_mode%` | Tuketim modu. |
| `%fishingplus_bait_active_is_infinite%` | Sonsuz kullanim mi? |
| `%fishingplus_bait_active_is_singleuse%` | Tek kullanim mi? |
| `%fishingplus_bait_active_is_multiuse%` | Cok kullanim mi? |
| `%fishingplus_bait_active_material%` | Item material. |
| `%fishingplus_bait_active_custom_model_data%` | CustomModelData degeri. |
| `%fishingplus_bait_active_freshwater_mult%` | Freshwater carpani. |
| `%fishingplus_bait_active_saltwater_mult%` | Saltwater carpani. |
| `%fishingplus_bait_active_doublecatch_chance%` | Double catch sansi. |
| `%fishingplus_bait_active_catchspeed_mult%` | Catch speed carpani. |
| `%fishingplus_bait_active_lure_bonus%` | Lure benzeri bonus. |
| `%fishingplus_bait_active_hotbar_slot%` | Aktif yem slotu. |
| `%fishingplus_bait_active_description_line1%` | Aciklama satiri. |

Dinamik placeholder ornekleri:

- `%fishingplus_bait_active_rarity_mult_COMMON%`
- `%fishingplus_bait_active_biome_mult_RIVER%`
- `%fishingplus_bait_active_species_mult_FRESHWATER%`
- `%fishingplus_bait_active_perfish_mult_trout%`

## Bucket Placeholderlari

| Placeholder | Aciklama |
| --- | --- |
| `%fishingplus_bucket_total_placed%` | Sunucudaki/oyuncudaki toplam placed bucket sayisi. |
| `%fishingplus_bucket_target_id%` | Hedef bucket ID. |
| `%fishingplus_bucket_target_type%` | Hedef bucket tipi. |
| `%fishingplus_bucket_target_owner%` | Sahip adi. |
| `%fishingplus_bucket_target_owner_uuid%` | Sahip UUID. |
| `%fishingplus_bucket_target_is_placed%` | Yerlestirilmis mi? |
| `%fishingplus_bucket_target_world%` | Dunya. |
| `%fishingplus_bucket_target_x%` | X koordinati. |
| `%fishingplus_bucket_target_y%` | Y koordinati. |
| `%fishingplus_bucket_target_z%` | Z koordinati. |
| `%fishingplus_bucket_target_size%` | Boyut/kapasite. |
| `%fishingplus_bucket_target_radius%` | Etki mesafesi. |
| `%fishingplus_bucket_target_slots_used%` | Kullanilan slot. |
| `%fishingplus_bucket_target_slots_free%` | Bos slot. |
| `%fishingplus_bucket_target_contents_total_items%` | Icerikteki toplam item. |
| `%fishingplus_bucket_target_contents_unique_slots%` | Dolu benzersiz slot. |
| `%fishingplus_bucket_target_distance%` | Oyuncuya mesafe. |

## Profil Placeholderlari

Ornekler:

- `%fishingplus_profile_level%`
- `%fishingplus_profile_xp%`
- `%fishingplus_profile_xp_next%`
- `%fishingplus_profile_total_catches%`
- `%fishingplus_profile_discovered%`
- `%fishingplus_profile_best_fish%`
- `%fishingplus_profile_best_weight%`
- `%fishingplus_profile_best_length%`

## Market Placeholderlari

Ornekler:

- `%fishingplus_market_last_sale%`
- `%fishingplus_market_total_sold%`
- `%fishingplus_market_daily_change%`
- `%fishingplus_market_multiplier%`
- `%fishingplus_market_price_<fishkey>%`

## Tournament Placeholderlari

Ornekler:

- `%fishingplus_tournament_active%`
- `%fishingplus_tournament_name%`
- `%fishingplus_tournament_type%`
- `%fishingplus_tournament_time_left%`
- `%fishingplus_tournament_time_left_hms%`
- `%fishingplus_tournament_rank%`
- `%fishingplus_tournament_score%`
- `%fishingplus_tournament_top1_name%`
- `%fishingplus_tournament_top1_score%`
- `%fishingplus_tournament_top2_name%`
- `%fishingplus_tournament_top2_score%`
- `%fishingplus_tournament_top3_name%`
- `%fishingplus_tournament_top3_score%`

## Hotspot Placeholderlari

Ornekler:

- `%fishingplus_hotspot_active%`
- `%fishingplus_hotspot_name%`
- `%fishingplus_hotspot_distance%`
- `%fishingplus_hotspot_bonus%`
- `%fishingplus_hotspot_time_left%`

## Achievement Placeholderlari

Ornekler:

- `%fishingplus_achievements_completed%`
- `%fishingplus_achievements_total%`
- `%fishingplus_achievement_<key>_done%`
- `%fishingplus_achievement_<key>_progress%`

## Journal / Discovery Placeholderlari

Ornekler:

- `%fishingplus_journal_discovered%`
- `%fishingplus_journal_total%`
- `%fishingplus_journal_percent%`
- `%fishingplus_fish_<key>_discovered%`
- `%fishingplus_fish_<key>_best_length%`
- `%fishingplus_fish_<key>_best_weight%`

## Guild Placeholderlari

Ornekler:

- `%fishingplus_guild_name%`
- `%fishingplus_guild_role%`
- `%fishingplus_guild_level%`
- `%fishingplus_guild_xp%`
- `%fishingplus_guild_members%`
- `%fishingplus_guild_rank%`
- `%fishingplus_guild_contribution%`
- `%fishingplus_guild_task_active%`
- `%fishingplus_guild_task_progress%`
- `%fishingplus_guild_task_goal%`

## Sea Event Placeholderlari

Ornekler:

- `%fishingplus_seaevent_active%`
- `%fishingplus_seaevent_active_name%`
- `%fishingplus_seaevent_time_left%`
- `%fishingplus_seaevent_time_left_hms%`
- `%fishingplus_seaevent_phase%`
- `%fishingplus_seaevent_effects%`

## Booster ve Totem Placeholderlari

Ornekler:

- `%fishingplus_booster_active%`
- `%fishingplus_booster_name%`
- `%fishingplus_booster_time_left%`
- `%fishingplus_totem_nearby%`
- `%fishingplus_totem_name%`
- `%fishingplus_totem_bonus%`

## Debug Placeholderlari

Debug placeholderlari genellikle test sunucularinda kullanilir:

- `%fishingplus_debug_biome%`
- `%fishingplus_debug_rng_pool%`
- `%fishingplus_debug_last_fish%`

Canli sunucuda debug placeholderlarini scoreboard gibi surekli guncellenen yerlerde kullanmayin.
