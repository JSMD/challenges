'use strict';

const symbols = require('./chemical-symbols.json')
const phrase = process.argv[3] || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
const foundSymbols = []

const findSymbols = (() => {
  symbols.forEach(symbol => {
    const output = new RegExp(symbol.symbol, 'i').exec(phrase)
    output && foundSymbols.push(symbol)
  })
  return foundSymbols
})()

console.log(findSymbols)
