class CloudCircle {
    /**
     * @param {Point} centerPoint
     * @param {number} radius
     */
    constructor(centerPoint, radius) {
        this.centerPoint = centerPoint;
        this.radius = radius;
        this.tangents = [];
        this.tangentCircles = [];
    }

    /**
     * @param {CloudCircle} circle
     * @returns {boolean}
     */
    isTangentCircle(circle) {
        let distanceBetweenCircles = this.centerPoint.getDistanceFor(circle.centerPoint);
        return distanceBetweenCircles < (this.radius + circle.radius) && !this.isCircleInside(circle);
    }

    /**
     * @param {Point} point
     * @returns {boolean}
     */
    isPointInsideOfCircle(point) {
        let distanceTillPoint = point.getDistanceFor(this.centerPoint);
        return distanceTillPoint <= this.radius;
    }

    /**
     * @param {CloudCircle} circle
     * @returns {boolean}
     */
    isCircleInside(circle) {
        return this.isPointInsideOfCircle(circle.centerPoint)
            && this.radius > circle.radius
            && (circle.centerPoint.getDistanceFor(this.centerPoint) + circle.radius) < this.radius;
    }
}
