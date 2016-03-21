#!/usr/bin/env node --harmony --use-strict --harmony_destructuring --harmony_default_parameters

require('./helper')
let fs = require('fs').promise
let co = require('co')
let path = require('path')
let argv = require('yargs').argv

let ls = co.wrap(function* (rootpath, recursive) {
	let pathstat = yield fs.stat(rootpath)
	if(pathstat.isFile()) {
		console.log(rootpath)
	} else {
		let fileNames = yield fs.readdir(rootpath)
		let promises = []
		for(let fileName of fileNames) {
			let fullPath = path.join(rootpath, fileName)
			let fullPathStat = yield fs.stat(fullPath)
			if(fullPathStat.isFile()) {
				console.log(fullPath)
			} else if (recursive) {
				promises.push(ls(fullPath, recursive))
			}
		}
		yield Promise.all(promises)
	}
})

function* main() {
    yield ls(process.argv[2], argv.R ? true: false)
}

module.exports = main