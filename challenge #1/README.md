# Challenge #1 - Chemical Formulas Parser
Write a function that will receive as a parameter a string that will contain a chemical formula, `H20` (water) for example, and will return an object which should contain how many atoms are of each type:
```js
{
    H: 2
    O: 1
}
```

Take in consideration that the name of some atoms can have to letters, one uppercased letter and another lowercased letter like `Li`.

Some atoms can be found multiple times in the formula, like for `CH3COOH` (acetic acid) as a result we need:
```js
{
    C: 2,
    H: 4,
    O: 2
}
```

Some formulas can contain round and square brackets, which should also be parsed accordingly, examples:

Aluminium Sulfacetate formula: `Al2SO4(CH3CO2)4`
```js
{
    Al: 2,
    S: 1,
    O: 12,
    C: 8,
    H: 12
}
```

Fremy Salt formula: `K4[ON(SO3)2]2`
```js
{
    K: 4,
    O: 14,
    N: 2,
    S: 4
}
```