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

## Usage
```
npm run compare
```
