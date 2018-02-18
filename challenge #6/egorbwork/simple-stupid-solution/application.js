/**
 * Simple solution, has problem with overlapping
 */

let lineWidth = 5;
let cloudGeneratorBuilder = new CloudGeneratorBuilder(10, 800, lineWidth);
let cloudGenerator = cloudGeneratorBuilder.getCloudGenerator();
let scheme = false;
let drawingEngine, cloud;

document.addEventListener("DOMContentLoaded", function() {
    cloudGeneratorBuilder.setNumberOfCircles(8);
    drawingEngine = new CloudDrawingEngine(document.getElementById('cloud').getContext('2d'), lineWidth);
    cloud = cloudGenerator.next().value;
    drawingEngine.drawCloud(cloud);

    addSchemeButtonHandler();
    addRedrawButtonHandler();
});

function addSchemeButtonHandler() {
    let schemeButton = document.getElementById('scheme');

    schemeButton.addEventListener('click', () => {
        let alternativeText = schemeButton.getAttribute('data-text');
        schemeButton.setAttribute('data-text', schemeButton.textContent);
        schemeButton.textContent = alternativeText;
        scheme = !scheme;
        if (scheme) {
            drawingEngine.drawScheme(cloud);
        } else {
            drawingEngine.drawCloud(cloud);
        }
    });
}

function addRedrawButtonHandler() {
    let redrawButton = document.getElementById('redraw');
    let inputNumber = document.getElementById('numberOfCircles');

    redrawButton.addEventListener('click', () => {
        let numberOfCircles = inputNumber.value;
        cloudGeneratorBuilder.setNumberOfCircles(numberOfCircles);
        cloud = cloudGenerator.next().value;
        if (scheme) {
            drawingEngine.drawCloudScheme(cloud);
        } else {
            drawingEngine.drawCloud(cloud);
        }
    });
}


