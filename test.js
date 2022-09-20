import { getTableDiff } from './helpers.js'
import { readFileSync } from 'node:fs'
import chalk from 'chalk'
import assert from 'node:assert'

const { tables, dbData, tableDiff } = JSON.parse(readFileSync('test-data.json'))

const tableDiffGenerated = getTableDiff('${table}_id', tables, dbData)

try {
    assert.deepStrictEqual(tableDiffGenerated, tableDiff)

    console.log(chalk.green('Test Passed'))
    console.log()
} catch(e) {
    console.log(chalk.red('Test Failed'))
    console.log()
    console.log(e.message.replace('Expected values to be strictly deep-equal', 'Generated table diff does not match expected table diff'))
}
