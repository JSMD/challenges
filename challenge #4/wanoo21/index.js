'use strict';

const symbols = require('./chemical-symbols.json')
const word = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
const foundSymbols = []

const findSymbols = (() => {
  symbols.forEach(symbol => {
    const output = new RegExp(symbol.symbol, 'i').exec(word)
    output && foundSymbols.push(symbol)
  })
  return foundSymbols
})()

console.log(findSymbols)
