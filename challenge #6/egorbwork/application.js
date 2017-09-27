let lineWidth = 5;
let cloudGeneratorBuilder = new CloudGeneratorBuilder(10, 1000, lineWidth);
let cloudGenerator = cloudGeneratorBuilder.getCloudGenerator();
cloudGeneratorBuilder.setNumberOfCircles(8);
document.addEventListener("DOMContentLoaded", function() {
    let cloud = cloudGenerator.next().value;
    // Test data:
    // let a = new CloudCircle(new Point(200, 200), 70);
    // let b = new CloudCircle(new Point(100, 100), 100);
    // let c = new CloudCircle(new Point(250, 250), 100);
    // let e = new CloudCircle(new Point(300, 300), 80);
    // let f = new CloudCircle(new Point(300, 240), 90);
    //
    // let testCloud = [
    //     a,
    //     b,
    //     c,
    //     e,
    //     f
    // ];
    let drawingEngine = new CloudDrawingEngine(document.getElementById('cloud').getContext('2d'), lineWidth);
    drawingEngine.drawCloud(cloud);
});
