#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')

let touch = co.wrap(function* () {
    let ctime = new Date()
    yield fs.utimes(process.argv[2], ctime.getTime()/1000, ctime.getTime()/1000)
})

function* main() {
    yield touch()
}

module.exports = main