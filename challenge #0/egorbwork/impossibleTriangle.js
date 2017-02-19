class TriangleDrawingEngine {

    constructor(drawingContext) {
        this.drawingContext = drawingContext;
        this.cubeDimension = 90;
        this.yellowColor = '#FFD700';
        this.redColor = '#FF6347';
        this.greenColor = '#008080';
        this.destinationOverAllColors = [this.yellowColor, this.redColor, this.greenColor];
        this.positionXGenerator = this.animationXPositionGeneration();
        this.positionYGenerator = this.animationYPositionGeneration();
    }

    drawCube(coordinateX = 0, coordinateY = 0, destinationOverColors = []) {
        this.drawingContext.save();

        this.drawingContext.globalCompositeOperation =
            destinationOverColors.includes(this.redColor)
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
            destinationOverColors.includes(this.greenColor)
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
            destinationOverColors.includes(this.yellowColor)
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

    drawImpossibleTriangle(animationPositionX = 0, animationPositionY = 0) {
        // All positions now were calculated
        // Moving vertical
        this.drawCube(400, 700 - animationPositionY);
        this.drawCube(400, 550 - animationPositionY);
        this.drawCube(400, 400 - animationPositionY);

        // Moving from right to left and from top to bottom
        this.drawCube(400 + animationPositionX, 250 + (animationPositionY / 2));
        this.drawCube(530 + animationPositionX, 325 + (animationPositionY / 2));
        this.drawCube(660 + animationPositionX, 400 + (animationPositionY / 2));


        // Moving from left to right and from top to bottom

        // This cube is destination over for start
        if (animationPositionY <= 75) {
            this.drawCube(
                790 - animationPositionX,
                475 + (animationPositionY / 2)
            );
        }
        // Specific order to keep required order of colors
        this.drawCube(530 - animationPositionX, 625 + (animationPositionY / 2), this.destinationOverAllColors);
        this.drawCube(
            660 - animationPositionX,
            550 + (animationPositionY / 2),
            animationPositionY <= 75 ? [this.redColor] : [this.redColor, this.yellowColor]
        );

        // Now this cube has only red color as destination over
        if (animationPositionY >= 75) {
            this.drawCube(
                790 - animationPositionX,
                475 + (animationPositionY / 2),
                [this.redColor]
            );
        }
    }

    animateImpossibleTriangle() {
        this.drawingContext.clearRect(0, 0, 1000, 1000);
        this.drawImpossibleTriangle(this.positionXGenerator.next().value, this.positionYGenerator.next().value);
        window.requestAnimationFrame(() => {this.animateImpossibleTriangle();});
    }

    * animationXPositionGeneration() {
        while(true) {
            for (let counter = 0; counter <= 150; counter += 2) {
                // Keeping same speed animation speed with Y coordinates, but keeping in ming that instead of 150
                // it uses 130 for standard cycle
                yield counter * 13 / 15;
            }
        }
    }

    * animationYPositionGeneration() {
        while(true) {
            for (let counter = 0; counter <= 150; counter += 2) {
                yield counter;
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var drawingEngine = new TriangleDrawingEngine(document.getElementById('triangle').getContext('2d'));
    drawingEngine.animateImpossibleTriangle();
});


