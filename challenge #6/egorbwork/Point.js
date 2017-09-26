class Point {
    /**
     * @param {number} coordinateX
     * @param {number} coordinateY
     */
    constructor(coordinateX, coordinateY) {
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
    }

    /**
     * @param {Point} point
     * @returns {number}
     */
    getDistanceFor(point) {
        return Math.sqrt(
            (point.coordinateX - this.coordinateX) ** 2 + (point.coordinateY - this.coordinateY) ** 2
        );
    }
}
