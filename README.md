# MySQL DB Diff

Compare two MySQL databases for data differences. Very basic tool for quick row diffing.

## Setup

```
git clone https://github.com/flawiddsouza/mysql-db-diff
cd mysql-db-diff
npm install
touch .env
```

|Required variables for .env |
|-|
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
OLD_DB=database-name-1
NEW_DB=database_name_2

| Optional variables for .env | |
|-|-|
TABLE_FILTER_PREFIX=master_ | compare only tables that start with master_
TABLE_ID=${table}_id | ${table} will be subtituted with the table being compared

## Usage
```
npm run compare
```

### Example Output
```
master_daily_reward (record-breaker-dev -> recordbreaker-v1)
┌────────────────────────┬─────────────┬──────────────┐
│ master_daily_reward_id │ probability │ reward_count │
├────────────────────────┼─────────────┼──────────────┤
│                      1 │     8 -> 10 │              │
│                      2 │             │      5 -> 75 │
│                      3 │      3 -> 5 │              │
│                      4 │      3 -> 5 │              │
│                      5 │      3 -> 5 │              │
│                      6 │      3 -> 5 │              │
│                      7 │    25 -> 10 │              │
└────────────────────────┴─────────────┴──────────────┘

master_iap (record-breaker-dev -> recordbreaker-v1)
┌───────────────┬──────────┐
│ master_iap_id │ quantity │
├───────────────┼──────────┤
│             7 │   1 -> 3 │
│             8 │  5 -> 10 │
│             9 │  5 -> 20 │
└───────────────┴──────────┘

master_iap_bundle (record-breaker-dev -> recordbreaker-v1)
┌──────────────────────┬──────────────────────────────────────────────┬────────────────┐
│ master_iap_bundle_id │                                     iap_name │          price │
├──────────────────────┼──────────────────────────────────────────────┼────────────────┤
│                    1 │    Busker's Bundle -> Street Artist's Bundle │                │
│                    2 │    Influencer’s bundle -> Indie Label Bundle │                │
│                    3 │       Indie Label Bundle  -> Platinum Bundle │                │
│                    6 │ Rockstar bundle -> Certified Rockstar bundle │ 74.99 -> 50.99 │
└──────────────────────┴──────────────────────────────────────────────┴────────────────┘

master_iap_bundle_items (record-breaker-dev -> recordbreaker-v1)
┌───────────────────────────┬──────────────────────┬────────┬──────────┬─────────────────────────┐
│ master_iap_bundle_item_id │ master_iap_bundle_id │   type │ quantity │ unlimited_life_duration │
├───────────────────────────┼──────────────────────┼────────┼──────────┼─────────────────────────┤
│                   16 -> 1 │               3 -> 1 │ 2 -> 1 │ 0 -> 350 │                 15 -> 0 │
└───────────────────────────┴──────────────────────┴────────┴──────────┴─────────────────────────┘

master_powerup (record-breaker-dev -> recordbreaker-v1)
┌───────────────────┬───────────────┐
│ master_powerup_id │ initial_count │
├───────────────────┼───────────────┤
│                 1 │        3 -> 0 │
│                 2 │        3 -> 0 │
│                 3 │        3 -> 0 │
│                 4 │        3 -> 0 │
│                 5 │        3 -> 0 │
│                 6 │        3 -> 0 │
│                 7 │        3 -> 0 │
└───────────────────┴───────────────┘

master_surprise_reward (record-breaker-dev -> recordbreaker-v1)
┌───────────────────────────┬──────────────┬─────────────┬─────────────────────────┬──────────────────┐
│ master_surprise_reward_id │ reward_count │ probability │ unlimited_life_duration │ life_reward_type │
├───────────────────────────┼──────────────┼─────────────┼─────────────────────────┼──────────────────┤
│                         1 │      5 -> 50 │    35 -> 30 │                         │                  │
│                         2 │    25 -> 100 │     4 -> 20 │                         │                  │
│                         3 │    50 -> 200 │     1 -> 15 │                         │                  │
│                         4 │       1 -> 2 │     30 -> 7 │                 15 -> 0 │           1 -> 0 │
│                         5 │              │      5 -> 7 │                 30 -> 0 │                  │
│                         6 │      5 -> 10 │      1 -> 6 │                 60 -> 0 │                  │
│                         7 │       1 -> 2 │      8 -> 5 │                         │                  │
│                         8 │       1 -> 2 │      8 -> 5 │                         │                  │
│                         9 │       1 -> 2 │      8 -> 5 │                         │                  │
└───────────────────────────┴──────────────┴─────────────┴─────────────────────────┴──────────────────┘
```
