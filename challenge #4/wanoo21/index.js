'use strict';

const symbols = require('./chemical-symbols.json')
const phrase = process.argv[3] || 'NICU'

const findSymbols = (() => {
  const foundSymbols = []
  symbols.forEach(symbol => {
    const output = new RegExp(symbol.symbol, 'i').exec(phrase)
    output && foundSymbols.push(Object.assign(symbol, { index: output.index }))
  })
  return foundSymbols.sort((s, s2) => s.index - s2.index).map(symbol => {
    delete symbol.index
    return symbol
  })
})()

console.log(findSymbols)
