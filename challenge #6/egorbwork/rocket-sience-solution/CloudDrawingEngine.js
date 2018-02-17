class CloudDrawingEngine {
    /**
     * @param {CanvasRenderingContext2D} drawingContext
     * @param {number} lineWidth
     */
    constructor(drawingContext, lineWidth) {
        this.drawingContext = drawingContext;
        this.drawingContext.lineWidth = lineWidth;
        this.drawingContext.fillStyle = 'white';
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
     * @param cloud
     */
    drawCloudScheme(cloud) {
        this.drawingContext.clearRect(0, 0, 5000, 5000);
        this.drawScheme(cloud);
    }

    /**
     * For each circle in cloud draw
     * @param cloud
     */
    drawScheme(cloud) {
        this.drawingContext.strokeStyle = 'black';
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
     * Draw at overlapping parts arcs to cover them with white.
     * @param {Array<CloudCircle>} cloud
     */
    removeOverlappingParts(cloud) {
        this.drawingContext.strokeStyle = 'white';
        // Strange But the white is one point less at drawing
        this.drawingContext.lineWidth = this.drawingContext.lineWidth + 1;
        // A bit improves images, and multiple number of elements is still ugly
        let deltaRadians = 0.000005;
        let tangentCases = this.generateTangentCases(cloud);
        for (let tangentCase of tangentCases) {
            // First circle
            this.drawingContext.beginPath();
            this.drawingContext.arc(
                tangentCase.firstCircle.centerPoint.coordinateX,
                tangentCase.firstCircle.centerPoint.coordinateY,
                tangentCase.firstCircle.radius,
                tangentCase.firstCircle.calculateArcAngleForPoint(tangentCase.firstPoint) + deltaRadians,
                tangentCase.firstCircle.calculateArcAngleForPoint(tangentCase.secondPoint) - deltaRadians,
                tangentCase.firstCircleTangentOrientation
            );
            this.drawingContext.stroke();

            // Second circle
            this.drawingContext.beginPath();
            this.drawingContext.arc(
                tangentCase.secondCircle.centerPoint.coordinateX,
                tangentCase.secondCircle.centerPoint.coordinateY,
                tangentCase.secondCircle.radius,
                tangentCase.secondCircle.calculateArcAngleForPoint(tangentCase.firstPoint) + deltaRadians,
                tangentCase.secondCircle.calculateArcAngleForPoint(tangentCase.secondPoint) - deltaRadians,
                tangentCase.secondCircleTangentOrientation
            );
            this.drawingContext.stroke();
        }
        this.drawingContext.lineWidth = this.drawingContext.lineWidth - 1;
    }

    /**
     * @param {Array<CloudCircle>} cloud
     * @returns {Array<CloudTangentCase>}
     */
    generateTangentCases(cloud) {
        let tangentCases = [];
        let processedList = [];
        for (let circle of cloud) {
            processedList.push(circle);
            // Calculate tangents
            let remainingCircles = cloud.filter(remainingCircle => !processedList.includes(remainingCircle));
            for (let remainingCircle of remainingCircles) {
                if (circle.isTangentCircle(remainingCircle)) {
                    tangentCases.push(circle.calculateCloudTangentCaseForCircle(remainingCircle));
                }
            }
        }

        return tangentCases;
    }
}
