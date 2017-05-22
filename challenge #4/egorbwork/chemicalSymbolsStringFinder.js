class ChemicalSymbolsStringFinder {
    constructor(chemicalSymbols) {
        this.chemicalSymbols = chemicalSymbols;
        this.strategies = ['single-first', 'pair-first'];
    }

    find(stringForParsing, strategy = 'single-first') {

        this.validateInput(stringForParsing, strategy);

        let variantGenerator, result = [], isIterationFinished, wasSymbolValid = false;

        if (strategy === 'pair-first') {
            variantGenerator = this.chemicalSymbolsVariantsPairFirstGenerator(stringForParsing);
        } else if (strategy === 'single-first') {
            variantGenerator = this.chemicalSymbolsVariantsSingleFirstGenerator(stringForParsing);
        }

        do {
            let chemicalSymbolVariant;
            ({value: chemicalSymbolVariant, done: isIterationFinished} = variantGenerator.next(wasSymbolValid));

            if (this.chemicalSymbols.has(chemicalSymbolVariant)) {
                result.push(this.chemicalSymbols.get(chemicalSymbolVariant));
                wasSymbolValid = true;
            } else {
                wasSymbolValid = false;
            }
        } while (!isIterationFinished);

        return result;
    }

    validateInput(stringForParsing, strategy) {
        if (!this.strategies.includes(strategy)) {
            throw 'Strategy unknown!';
        }
        let regexValidator = /[A-Za-z]+/;
        if (!regexValidator.test(stringForParsing)) {
            throw 'Invalid string provided!';
        }
    }

    * chemicalSymbolsVariantsSingleFirstGenerator(stringForParsing) {
        let wasUsed = false;
        for (
            let currentCharacterPosition = 0, nextCharacterPosition = 1, stringLength = stringForParsing.length;
            nextCharacterPosition < stringLength;
            currentCharacterPosition++, nextCharacterPosition++
        ) {
            if (wasUsed) {
                // If This character was used at previous iteration, reset was used status and skip this iteration
                wasUsed = false;
                continue;
            } else {
                wasUsed = yield stringForParsing[currentCharacterPosition].toLowerCase();
            }
            if (wasUsed) {
                // Next character is not used in this iteration
                wasUsed = false;
            } else {
                wasUsed = yield stringForParsing.substr(currentCharacterPosition, 2).toLowerCase();
            }
        }
        if (!wasUsed) {
            // If last character was not used yield it
            yield stringForParsing[stringForParsing.length - 1].toLowerCase();
        }
    }

    * chemicalSymbolsVariantsPairFirstGenerator(stringForParsing) {
        let wasUsed = false;
        for (
            let currentCharacterPosition = 0, nextCharacterPosition = 1, stringLength = stringForParsing.length;
            nextCharacterPosition < stringLength;
            currentCharacterPosition++, nextCharacterPosition++
        ) {
            if (wasUsed) {
                // If first character was used at previous iteration, skip current iteration and reset was used status
                wasUsed = false;
                continue;
            } else {
                wasUsed = yield stringForParsing.substr(currentCharacterPosition, 2).toLowerCase();
            }
            if (wasUsed) {
                // If this character was used before, than it should be skipped
                continue;
            } else {
                yield stringForParsing[currentCharacterPosition].toLowerCase();
            }
        }
        if (!wasUsed) {
            yield stringForParsing[stringForParsing.length - 1].toLowerCase();
        }
    }
}
