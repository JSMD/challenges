function findWordOccurrencesInInput(input, word = 'JSMD') {
    let stringifiedInput = JSON.stringify(input);
    let regexp = RegExp(word, 'g');
    let matches;

    if (matches = stringifiedInput.match(regexp)) {
        return matches.length;
    } else {
        return 0;
    }
}

function testFindWordOccurrencesInInput() {
    console.log(findWordOccurrencesInInput([ [ [ "JSMD" ] ] ]));
    console.log(findWordOccurrencesInInput({ a: { b: { c: "JSMD" } } }));
    console.log(findWordOccurrencesInInput({ a: { b: { c: 'JSMD' }, d: "JSMD", JSMD: '22', text: '\'JSMD\'"JSMD"' } }));
    console.log(findWordOccurrencesInInput({ a: [ "random-string", "JSDM", "JMSD", "J S M D", "BDSM" ] }));
}

testFindWordInInput();
