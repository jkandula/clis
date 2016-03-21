#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require('path')

let mkdir = co.wrap(function* (rootpath, paths) {
	try{
		yield fs.stat(path.join(rootpath, paths[0]))
	} catch (e) {
		yield fs.mkdir(path.join(rootpath, paths[0]))
	}
	if(paths.length > 1) {
		mkdir(rootpath+'/'+paths[0], paths.splice(1))
	}
})

function* main() {
	let paths = process.argv[2].split('/')
    yield mkdir(paths[0], paths.slice(1))
}

module.exports = main