#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')

let cat = co.wrap(function* () {
    process.stdout.write((yield fs.readFile(process.argv[2]))+'\n')
})

function* main() {
    yield cat()
}

module.exports = main