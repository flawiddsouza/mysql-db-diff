import * as dotenv from 'dotenv'
import { printTable } from 'console-table-printer'
import { getDbData, getTableDiff } from './helpers.js'

const { parsed: config } = dotenv.config()

const [ tables, dbData ] = await getDbData(config)

const tableDiff = getTableDiff(config.TABLE_ID, tables, dbData)

for(const table of Object.keys(tableDiff)) {
    console.log(`${table} (${config.OLD_DB} -> ${config.NEW_DB})`)
    printTable(tableDiff[table])
    console.log()
}
