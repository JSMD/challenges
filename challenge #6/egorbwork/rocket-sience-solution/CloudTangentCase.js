class CloudTangentCase {
    /**
     * @param {Point} firstPoint
     * @param {Point} secondPoint
     * @param {CloudCircle} firstCircle
     * @param {CloudCircle} secondCircle
     */
    constructor(firstPoint, secondPoint, firstCircle, secondCircle) {
        // Order the tangent points from bottom to top and left to right
        if ((firstPoint.coordinateX > secondPoint.coordinateX)
            || (firstPoint.coordinateX === secondPoint.coordinateX && firstPoint.coordinateY < secondPoint.coordinateY)
        ) {
            this.firstPoint = secondPoint;
            this.secondPoint = firstPoint;
        } else {
            this.firstPoint = firstPoint;
            this.secondPoint = secondPoint;
        }
        // Order the circles vice versa from right to left
        if (firstCircle.centerPoint.coordinateX > secondCircle.centerPoint.coordinateX) {
            this.firstCircle = firstCircle;
            this.secondCircle = secondCircle;
        } else {
            this.firstCircle = secondCircle;
            this.secondCircle = firstCircle;
        }
        this.firstCircleTangentOrientation = false;
        this.secondCircleTangentOrientation = false;
        this.calculateOverlapOrientations();
    }

    /**
     * Calculates when the overlapped part of tangent circles should be covered clockwise and anti-clockwise
     */
    calculateOverlapOrientations() {
        let firstTestPoint = this.calculateTestPointForCircle(this.firstCircle);
        // For case of the same coordinateX the anti-clockwise should be applied for negated case
        this.firstCircleTangentOrientation = (this.firstPoint.coordinateX !== this.secondPoint.coordinateX
            && this.secondCircle.isPointInsideOfCircle(firstTestPoint)) || (this.firstPoint.coordinateX === this.secondPoint.coordinateX
            && !this.secondCircle.isPointInsideOfCircle(firstTestPoint));
        this.secondCircleTangentOrientation = !this.firstCircleTangentOrientation;
    }

    /**
     * Generates a test point for checking orientation of the arc
     * @param {CloudCircle} circle
     * @returns {Point}
     */
    calculateTestPointForCircle(circle) {
        let testPositionX, testPositionY;
        if (this.firstPoint.coordinateX !== this.secondPoint.coordinateX) {
            testPositionX = (this.firstPoint.coordinateX + this.secondPoint.coordinateX) / 2;
            let relativeY = Math.sqrt(
                circle.radius ** 2 - (testPositionX - circle.centerPoint.coordinateX) ** 2
            );
            testPositionY = circle.centerPoint.coordinateY + relativeY;
        } else {
            testPositionY = (this.firstPoint.coordinateY + this.secondPoint.coordinateY) / 2;
            let relativeX = Math.sqrt(
                circle.radius ** 2 - (testPositionY - circle.centerPoint.coordinateY) ** 2
            );
            testPositionX = circle.centerPoint.coordinateX - relativeX;
        }

        return new Point(testPositionX, testPositionY);
    }
}
