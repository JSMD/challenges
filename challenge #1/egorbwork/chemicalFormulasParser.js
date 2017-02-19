function parseChemicalFormula(chemicalFormula) {
    let chemicalFormulaProcessed = chemicalFormula;
    let resultContainer = {};
    let bracersGroupMatch, squaresGroupMatch;
    let regexpSquaresMultiplier = /\[.*\][0-9]+/g;
    let regexpBracersMultiplier = /\(.*\)[0-9]+/g;
    while (squaresGroupMatch = regexpSquaresMultiplier.exec(chemicalFormulaProcessed)) {
        let squaresGroup = squaresGroupMatch[0];
        chemicalFormulaProcessed = chemicalFormulaProcessed.replace(squaresGroup, '');
        parseSquaresGroup(resultContainer, squaresGroup);
    }
    while (bracersGroupMatch = regexpBracersMultiplier.exec(chemicalFormulaProcessed)) {
        let bracersGroup = bracersGroupMatch[0];
        chemicalFormulaProcessed = chemicalFormulaProcessed.replace(bracersGroup, '');
        parseBracersGroup(resultContainer, bracersGroup);
    }
    parseSimpleAtomGroups(resultContainer, chemicalFormulaProcessed);

    return resultContainer;
}

function parseSquaresGroup(resultContainer, squaresGroup) {
    let squaresGroupProcessed = squaresGroup;
    let regexBracersMultiplier = /\][0-9]+/g;
    let BracersMultiplierMatch = regexBracersMultiplier.exec(squaresGroup);
    let squaresMultiplier = parseInt(BracersMultiplierMatch[0].substr(1, BracersMultiplierMatch[0].length - 1));
    let regexpBracersMultiplier = /\(.*\)[0-9]+/g;
    let bracersGroupMatch;
    while (bracersGroupMatch = regexpBracersMultiplier.exec(squaresGroup)) {
        let bracersGroup = bracersGroupMatch[0];
        squaresGroupProcessed = squaresGroupProcessed.replace(bracersGroup, '');
        parseBracersGroup(resultContainer, bracersGroup, squaresMultiplier);
    }
    parseSimpleAtomGroups(resultContainer, squaresGroupProcessed, squaresMultiplier);
}

function parseBracersGroup(resultContainer, bracersGroup, multiplier = 1) {
    let regexBracersMultiplier = /\)[0-9]+/g;
    let BracersMultiplierMatch = regexBracersMultiplier.exec(bracersGroup);
    let bracersMultiplier = parseInt(BracersMultiplierMatch[0].substr(1, BracersMultiplierMatch[0].length - 1));
    parseSimpleAtomGroups(resultContainer, bracersGroup, bracersMultiplier * multiplier);
}

function parseSimpleAtomGroups(resultContainer, atomGroupString, multiplier = 1) {
    let regexpForAtomsGroups = /[A-Z][a-z]?[0-9]*/g;
    let atomGroup;
    while (atomGroup = regexpForAtomsGroups.exec(atomGroupString)) {
        parseAtomGroup(resultContainer, atomGroup, multiplier);
    }
}

function parseAtomGroup(resultContainer, atomGroup, multiplier = 1) {
    let regexpForAtomNumber = /[A-Z][a-z]?|[0-9]+/g;
    let parsedAtomName = regexpForAtomNumber.exec(atomGroup);
    let atomName = parsedAtomName[0];
    let parsedNumberMatch;
    let atomNumber = (parsedNumberMatch = regexpForAtomNumber.exec(atomGroup)) ? parseInt(parsedNumberMatch[0]) : 1;
    if (resultContainer.hasOwnProperty(atomName)) {
        resultContainer[atomName] += atomNumber * multiplier;
    } else {
        resultContainer[atomName] = atomNumber * multiplier;
    }
}

function testParseChemicalFormula() {
    console.log(parseChemicalFormula('H2O'));
    console.log(parseChemicalFormula('CH3COOH'));
    console.log(parseChemicalFormula('Al2SO4(CH3CO2)4'));
    console.log(parseChemicalFormula('K4[ON(SO3)2]2'));
}

testParseChemicalFormula();
