class CloudCircle {
    /**
     * @param {Point} centerPoint
     * @param {number} radius
     */
    constructor(centerPoint, radius) {
        this.centerPoint = centerPoint;
        this.radius = radius;
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

    /**
     * source: http://2000clicks.com/mathhelp/GeometryConicSectionCircleIntersection.aspx
     * @param {CloudCircle} circle
     * @returns {CloudTangentCase}
     */
    calculateCloudTangentCaseForCircle(circle) {
        let distanceBetweenCircles = this.centerPoint.getDistanceFor(circle.centerPoint);
        let areaOfCirclesTriangle = 0.25 * Math.sqrt(
            ((this.radius + circle.radius) ** 2 - distanceBetweenCircles ** 2)
            * (distanceBetweenCircles ** 2 - (this.radius - circle.radius) ** 2)
        );
        let firstTangentPoint = new Point(
            0.5 * (circle.centerPoint.coordinateX + this.centerPoint.coordinateX)
            + 0.5 * (circle.centerPoint.coordinateX - this.centerPoint.coordinateX)
            * (this.radius ** 2 - circle.radius ** 2) / distanceBetweenCircles ** 2
            + 2 * (circle.centerPoint.coordinateY - this.centerPoint.coordinateY) * areaOfCirclesTriangle
            / distanceBetweenCircles ** 2,
            0.5 * (circle.centerPoint.coordinateY + this.centerPoint.coordinateY)
            + 0.5 * (circle.centerPoint.coordinateY - this.centerPoint.coordinateY)
            * (this.radius ** 2 - circle.radius ** 2) / distanceBetweenCircles ** 2
            - 2 * (circle.centerPoint.coordinateX - this.centerPoint.coordinateX) * areaOfCirclesTriangle
            / distanceBetweenCircles ** 2
        );
        let secondTangentPoint = new Point(
            0.5 * (circle.centerPoint.coordinateX + this.centerPoint.coordinateX)
            + 0.5 * (circle.centerPoint.coordinateX - this.centerPoint.coordinateX)
            * (this.radius ** 2 - circle.radius ** 2) / distanceBetweenCircles ** 2
            - 2 * (circle.centerPoint.coordinateY - this.centerPoint.coordinateY) * areaOfCirclesTriangle
            / distanceBetweenCircles ** 2,
            0.5 * (circle.centerPoint.coordinateY + this.centerPoint.coordinateY)
            + 0.5 * (circle.centerPoint.coordinateY - this.centerPoint.coordinateY)
            * (this.radius ** 2 - circle.radius ** 2) / distanceBetweenCircles ** 2
            + 2 * (circle.centerPoint.coordinateX - this.centerPoint.coordinateX) * areaOfCirclesTriangle
            / distanceBetweenCircles ** 2
        );

        return new CloudTangentCase(firstTangentPoint, secondTangentPoint, this, circle);
    }

    /**
     * source: https://gamedev.stackexchange.com/questions/33709/get-angle-in-radians-given-a-point-on-a-circle
     * @param {Point} point
     * @returns {number}
     */
    calculateArcAngleForPoint(point) {
        return Math.atan2(point.coordinateY - this.centerPoint.coordinateY, point.coordinateX - this.centerPoint.coordinateX);
    }
}
