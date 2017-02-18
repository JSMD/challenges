class TriangleDrawingEngine {

    constructor(drawingContext) {
        this.drawingContext = drawingContext;
        this.cubeDimension = 100;
        this.yellowColor = '#FFD700';
        this.redColor = '#FF6347';
        this.greenColor = '#008080';
        this.destinationOverAllColors = 'all';
    }

    drawCube(coordinateX = 0, coordinateY = 0, destinationOverColor = false) {
        this.drawingContext.save();

        this.drawingContext.rotate(this.convertDegreesToRadians(20));

        this.drawingContext.globalCompositeOperation =
            destinationOverColor === this.redColor || destinationOverColor === this.destinationOverAllColors
                ? 'destination-over' : 'source-over';
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(coordinateX, coordinateY);
        this.drawingContext.lineTo(coordinateX - this.cubeDimension, coordinateY - this.cubeDimension * 0.5);
        this.drawingContext.lineTo(coordinateX - this.cubeDimension, coordinateY - this.cubeDimension * 1.5);
        this.drawingContext.lineTo(coordinateX, coordinateY - this.cubeDimension);
        this.drawingContext.closePath();
        this.drawingContext.fillStyle = this.redColor;
        this.drawingContext.fill();

        this.drawingContext.globalCompositeOperation =
            destinationOverColor === this.greenColor || destinationOverColor === this.destinationOverAllColors
                ? 'destination-over' : 'source-over';
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(coordinateX, coordinateY);
        this.drawingContext.lineTo(coordinateX + this.cubeDimension, coordinateY - this.cubeDimension * 0.5);
        this.drawingContext.lineTo(coordinateX + this.cubeDimension, coordinateY - this.cubeDimension * 1.5);
        this.drawingContext.lineTo(coordinateX, coordinateY - this.cubeDimension);
        this.drawingContext.closePath();
        this.drawingContext.fillStyle = this.greenColor;
        this.drawingContext.fill();

        this.drawingContext.globalCompositeOperation =
            destinationOverColor === this.yellowColor || destinationOverColor === this.destinationOverAllColors
                ? 'destination-over' : 'source-over';
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(coordinateX, coordinateY - this.cubeDimension);
        this.drawingContext.lineTo(coordinateX - this.cubeDimension, coordinateY - this.cubeDimension * 1.5);
        this.drawingContext.lineTo(coordinateX, coordinateY - this.cubeDimension * 2);
        this.drawingContext.lineTo(coordinateX + this.cubeDimension, coordinateY - this.cubeDimension * 1.5);
        this.drawingContext.closePath();
        this.drawingContext.fillStyle = this.yellowColor;
        this.drawingContext.fill();

        this.drawingContext.restore();
    }

    drawImpossibleTriangle() {
        // All positions were selected by eye
        // Left triangle line
        this.drawCube(400, 700);
        this.drawCube(420, 550);
        this.drawCube(440, 400);
        this.drawCube(460, 250);

        // Right triangle line
        this.drawCube(600, 330);
        this.drawCube(740, 400);
        this.drawCube(890, 490);

        // Base triangle line
        this.drawCube(570, 630, this.destinationOverAllColors);
        this.drawCube(730, 560, this.redColor);
    }

    convertDegreesToRadians(degrees) {
        return (Math.PI / 180) * degrees;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var drawingEngine = new TriangleDrawingEngine(document.getElementById('triangle').getContext('2d'));
    drawingEngine.drawImpossibleTriangle();
});


