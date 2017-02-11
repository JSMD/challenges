# Challenge #2 - Find "JSMD"
Write a function that will receive as a parameter an object, which can have any structure, and finds in this object the string `"JSMD"`. The function should return `true` if the string was found and `false` - otherwise.

Examples:
```js
[ [ [ "JSMD" ] ] ] // => true

{ a: { b: { c: "JSMD" } } } // => true

{ a: [ "random-string", "JSDM", "JMSD", "J S M D", "BDSM" ] } // => false
```

An additional condition would be to make the function more complex and find all the occurrences of the string in the object and return the number of occurrences.