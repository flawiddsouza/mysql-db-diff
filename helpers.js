import { Sequelize } from 'sequelize'
import differenceWith from 'lodash.differencewith'
import isEqual from 'lodash.isequal'

export async function getDbData(config) {
    const dbNames = [
        config.OLD_DB,
        config.NEW_DB
    ]

    let dbConnections = []

    for(const dbName of dbNames) {
        dbConnections.push(
            new Sequelize(dbName, config.DB_USERNAME, config.DB_PASSWORD, {
                host: config.DB_HOST,
                port: config.DB_PORT,
                dialect: 'mysql',
                logging: false
            })
        )
    }

    let [ tables ] = await dbConnections[0].query(`SELECT table_name as 'table' FROM information_schema.tables WHERE table_schema = '${dbNames[0]}';`)
    tables = tables.map(item => item.table)
    if(config.TABLE_FILTER_PREFIX) {
        tables = tables.filter(table => table.startsWith(config.TABLE_FILTER_PREFIX))
    }

    let dbData = []

    for(const table of tables) {
        for(let dbIndex = 0; dbIndex<2; dbIndex++) {
            if(dbIndex in dbData === false) {
                dbData[dbIndex] = {}
            }
            const [ rows ] = await dbConnections[dbIndex].query(`SELECT * FROM ${table};`)
            dbData[dbIndex][table] = rows
        }
    }

    for(let dbIndex = 0; dbIndex<2; dbIndex++) {
        dbConnections[dbIndex].close()
    }

    return [ tables, dbData ]
}

export function getTableDiff(tableId, tables, dbData) {
    let tableDiff = {}

    for(const table of tables) {
        const differences = differenceWith(dbData[0][table], dbData[1][table], isEqual)
        if(differences.length > 0) {
            tableDiff[table] = differences
            differences.forEach(difference => {
                const id = tableId ? eval('`' + tableId + '`') : 'id'
                const diffRecord = dbData[1][table].find(row => row[id] === difference[id])
                Object.keys(difference).forEach(property => {
                    if(!isEqual(difference[property], diffRecord[property])) {
                        difference[property] = difference[property] + ' -> ' + diffRecord[property]
                    } else {
                        if(property !== id) {
                            delete difference[property]
                        }
                    }
                })
            })
        }
    }

    return tableDiff
}
