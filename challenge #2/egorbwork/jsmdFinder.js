function findWordInInput(input, word = 'JSMD') {
    let stringifiedInput = JSON.stringify(input);
    let regexp = RegExp(word, 'g');

    if (regexp.exec(stringifiedInput)) {
        let result = 0;
        do {
            result++;
        } while (regexp.exec(stringifiedInput) !== null);

        return result;
    } else {
        return false;
    }
}

function testFindWordInInput() {
    console.log(findWordInInput([ [ [ "JSMD" ] ] ]));
    console.log(findWordInInput({ a: { b: { c: "JSMD" } } }));
    console.log(findWordInInput({ a: { b: { c: 'JSMD' }, d: "JSMD", JSMD: '22', text: '\'JSMD\'"JSMD"' } }));
    console.log(findWordInInput({ a: [ "random-string", "JSDM", "JMSD", "J S M D", "BDSM" ] }));
}

testFindWordInInput();
