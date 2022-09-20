import { getTableDiff, displayTableDiffInConsole } from './helpers.js'
import { readFileSync } from 'node:fs'
import chalk from 'chalk'
import assert from 'node:assert'
import stripAnsi from 'strip-ansi'

function test1() {
    const { tables, dbData, tableDiff } = JSON.parse(readFileSync('test-data/test1.json'))

    const tableDiffGenerated = getTableDiff('${table}_id', tables, dbData)

    try {
        assert.deepStrictEqual(tableDiffGenerated, tableDiff)

        console.log(chalk.green('Test 1 Passed'))
        console.log()
    } catch(e) {
        console.log(chalk.red('Test 1 Failed'))
        console.log()
        console.log(e.message.replace('Expected values to be strictly deep-equal', 'Generated table diff does not match expected table diff'))
    }
}

function test2() {
    const { tables, dbData } = JSON.parse(readFileSync('test-data/test1.json'))

    const tableDiffGenerated = getTableDiff('${table}_id', tables, dbData)

    const consoleOutput = readFileSync('test-data/test2.txt', 'utf-8')

    const consoleLogOriginal = console.log
    let consoleOutputGenerated = ''
    console.log = (message) => {
        if(message) {
            consoleOutputGenerated += stripAnsi(message) + '\n'
        } else {
            consoleOutputGenerated += '\n'
        }
    }
    displayTableDiffInConsole(tableDiffGenerated, 'record-breaker-dev', 'recordbreaker-v1')
    console.log = consoleLogOriginal

    try {
        assert.deepStrictEqual(consoleOutputGenerated, consoleOutput)

        console.log(chalk.green('Test 2 Passed'))
        console.log()
    } catch(e) {
        console.log(chalk.red('Test 2 Failed'))
        console.log()
        console.log(e.message.replace('Expected values to be strictly deep-equal', 'Generated output does not match expected output'))
    }
}

test1()
test2()
