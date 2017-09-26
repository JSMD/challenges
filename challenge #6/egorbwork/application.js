document.addEventListener("DOMContentLoaded", function() {
    // Test data:
    let drawingEngine = new CloudDrawingEngine(document.getElementById('cloud').getContext('2d'));
    let a = new CloudCircle(new Point(200, 200), 70);
    let b = new CloudCircle(new Point(100, 100), 100);
    let c = new CloudCircle(new Point(250, 250), 100);
    let e = new CloudCircle(new Point(300, 300), 80);
    let f = new CloudCircle(new Point(300, 240), 90);

    a.calculateCloudTangentsForCircle(b);
    a.calculateCloudTangentsForCircle(c);
    e.calculateCloudTangentsForCircle(c);
    f.calculateCloudTangentsForCircle(e);
    f.calculateCloudTangentsForCircle(c);
    let cloud = [
        a,
        b,
        c,
        e,
        f
    ];
    for (let d of a.tangents) {
        d.setUsed(true);
        for (let circle of cloud) {
            if ((circle !== d.firstCircle && circle !== d.secondCircle) && circle.isPointInsideOfCircle(d.point)) {
                d.setUsed(false);
            }
        }

    }
    for (let d of e.tangents) {
        d.setUsed(true);
        for (let circle of cloud) {
            if ((circle !== d.firstCircle && circle !== d.secondCircle) && circle.isPointInsideOfCircle(d.point)) {
                d.setUsed(false);
            }
        }
    }
    for (let d of f.tangents) {
        d.setUsed(true);
        for (let circle of cloud) {
            if ((circle !== d.firstCircle && circle !== d.secondCircle) && circle.isPointInsideOfCircle(d.point)) {
                d.setUsed(false);
            }
        }
    }
    drawingEngine.drawCloud(cloud);
});
