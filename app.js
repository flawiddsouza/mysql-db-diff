import * as dotenv from 'dotenv'
import { getDbData, getTableDiff, displayTableDiffInConsole } from './helpers.js'

const { parsed: config } = dotenv.config()

const [ tables, dbData ] = await getDbData(config)

const tableDiff = getTableDiff(config.TABLE_ID, tables, dbData)

displayTableDiffInConsole(tableDiff, config.OLD_DB, config.NEW_DB)
