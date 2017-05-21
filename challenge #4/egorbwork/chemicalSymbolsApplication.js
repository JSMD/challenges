var finder = new ChemicalSymbolsStringFinder(chemicalSymbols);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('findSymbolsButton').addEventListener('click', findChemicalSymbols);
});

function findChemicalSymbols() {
    let resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
    let textInput = document.getElementById('stringForSearch');
    let radioButtons = document.getElementsByName('find-strategy');
    let strategy = 'single-first';
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            strategy = radioButton.value;
        }
    }

    try {
        let result = finder.find(textInput.value, strategy);

        resultContainer.innerHTML = result.length ? result.toString(): 'Nothing found';
    } catch (exception) {
        alert(exception);
    }

}
