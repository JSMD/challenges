class CloudDrawingEngine {
    /**
     * @param {CanvasRenderingContext2D} drawingContext
     * @param {number} lineWidth
     */
    constructor(drawingContext, lineWidth) {
        this.drawingContext = drawingContext;
        this.drawingContext.lineWidth = lineWidth;
        this.drawingContext.fillStyle = 'white';
        this.drawingContext.strokeStyle = 'black';
    }

    /**
     * @param {Array<CloudCircle>} cloud
     */
    drawCloud(cloud) {
        this.drawCloudScheme(cloud);
        this.removeOverlappingParts(cloud);
    }

    /**
     * Clear canvas and Draw scheme with all circles
     * @param {Array<CloudCircle>} cloud
     */
    drawCloudScheme(cloud) {
        this.drawingContext.clearRect(0, 0, 5000, 5000);
        this.drawScheme(cloud);
    }

    /**
     * For each circle in cloud draw
     * @param {Array<CloudCircle>} cloud
     */
    drawScheme(cloud) {
        for (let circle of cloud) {
            this.drawingContext.beginPath();
            this.drawingContext.arc(
                circle.centerPoint.coordinateX,
                circle.centerPoint.coordinateY,
                circle.radius,
                0,
                2 * Math.PI
            );
            this.drawingContext.stroke();
        }
    }

    /**
     * @param {Array<CloudCircle>} cloud
     */
    removeOverlappingParts(cloud) {
        for (let circle of cloud) {
            this.drawingContext.beginPath();
            this.drawingContext.arc(
                circle.centerPoint.coordinateX,
                circle.centerPoint.coordinateY,
                // For more clear image it is better to have it a bit bigger radius
                circle.radius,
                0,
                2 * Math.PI
            );
            this.drawingContext.fill();
        }
    }
}
