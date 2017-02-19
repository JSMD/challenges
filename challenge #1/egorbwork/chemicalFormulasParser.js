class chemicalFormulasParser {
    constructor() {
        this.chemicalFormulaProcessed = '';
        this.regexpSquaresGroup = /\[.*\][0-9]+/g;
        this.regexpBracersGroup = /\(.*\)[0-9]+/g;
        this.regexBracersMultiplier = /\][0-9]+/g;
        this.regexBracersMultiplier = /\)[0-9]+/g;
        this.regexpForAtomsGroups = /[A-Z][a-z]?[0-9]*/g;
        this.regexpForAtomNumber = /[A-Z][a-z]?|[0-9]+/g;
        this.result = {};
    }

    parse(chemicalFormula) {
        this.result = {};
        this.chemicalFormulaProcessed = chemicalFormula;

        this.parseSquaresGroups();
        this.parseBracersGroups();
        this.parseSimpleAtomGroups();

        return this.result;
    }

    parseSquaresGroups() {
        let squaresGroupMatches = this.chemicalFormulaProcessed.match(this.regexpSquaresGroup);
        let reducedChemicalFormulaProcessed;
        for (let squaresGroupMatchKey in squaresGroupMatches) {
            let squaresGroup = squaresGroupMatches[squaresGroupMatchKey];
            reducedChemicalFormulaProcessed = this.chemicalFormulaProcessed.replace(squaresGroup, '');
            this.chemicalFormulaProcessed = squaresGroup;
            this.parseSquaresGroup();
        }
        this.chemicalFormulaProcessed = reducedChemicalFormulaProcessed || this.chemicalFormulaProcessed;
    }

    parseSquaresGroup() {
        let BracersMultiplierMatches = this.chemicalFormulaProcessed.match(this.regexBracersMultiplier);
        let squaresMultiplier = parseInt(BracersMultiplierMatches[0].substr(1));
        this.parseBracersGroups(squaresMultiplier);
        this.parseSimpleAtomGroups(squaresMultiplier);
    }

    parseBracersGroups(multiplier = 1) {
        let bracersGroupMatches = this.chemicalFormulaProcessed.match(this.regexpBracersGroup);
        let reducedChemicalFormulaProcessed;
        for (let bracersGroupMatchKey in bracersGroupMatches) {
            let bracersGroup = bracersGroupMatches[bracersGroupMatchKey];
            reducedChemicalFormulaProcessed = this.chemicalFormulaProcessed.replace(bracersGroup, '');
            this.chemicalFormulaProcessed = bracersGroup;
            this.parseBracersGroup(multiplier);
        }
        this.chemicalFormulaProcessed = reducedChemicalFormulaProcessed || this.chemicalFormulaProcessed;
    }

    parseBracersGroup(multiplier = 1) {
        let bracersMultiplierMatches = this.chemicalFormulaProcessed.match(this.regexBracersMultiplier);
        let bracersMultiplier = parseInt(bracersMultiplierMatches[0].substr(1));
        this.parseSimpleAtomGroups(bracersMultiplier * multiplier);
    }

    parseSimpleAtomGroups(multiplier = 1) {
        let atomGroupMatches = this.chemicalFormulaProcessed.match(this.regexpForAtomsGroups);
        for (let atomGroupKey in atomGroupMatches) {
            this.parseAtomGroup(atomGroupMatches[atomGroupKey], multiplier);
        }
    }

    parseAtomGroup(atomGroup, multiplier = 1) {
        let parsedAtomNameNumber = atomGroup.match(this.regexpForAtomNumber);
        let atomName = parsedAtomNameNumber[0];
        let atomNumber = (parsedAtomNameNumber.length > 1) ? parseInt(parsedAtomNameNumber[1]) : 1;
        this.addAtomGroup(atomName, atomNumber * multiplier);
    }

    addAtomGroup(atomName, atomNumber) {
        if (this.result.hasOwnProperty(atomName)) {
            this.result[atomName] += atomNumber;
        } else {
            this.result[atomName] = atomNumber;
        }
    }
}

function testParseChemicalFormula() {
    let parser = new chemicalFormulasParser();
    console.log(parser.parse('H2O'));
    console.log(parser.parse('CH3COOH'));
    console.log(parser.parse('Al2SO4(CH3CO2)4'));
    console.log(parser.parse('K4[ON(SO3)2]2'));
}

testParseChemicalFormula();
