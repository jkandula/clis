#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise

function* echo() {
    // Use 'yield' in here
    // Your implementation here
    process.stdout.write(process.argv[2]+'\n')
}

module.exports = echo
