class CloudGeneratorBuilder {
    /**
     * @param {number} radiusMinimum
     * @param {number} radiusMaximum
     * @param {number} lineWidthConstraint
     */
    constructor(radiusMinimum, radiusMaximum, lineWidthConstraint) {
        this.radiusMinimum = radiusMinimum;
        this.radiusMaximum = radiusMaximum;
        this.coordinatesRandomGenerator = this.getCoordinatesRandomGenerator();
        this.numberOfCircles = 2;
        this.lineWidthConstraint = lineWidthConstraint;
    }

    /**
     * @param {number} numberOfCircles
     */
    setNumberOfCircles(numberOfCircles) {
        this.numberOfCircles = numberOfCircles;
    }

    /**
     * @returns {number}
     */
    getRandomRadius() {
        return this.getRandomNumber(this.radiusMinimum, this.radiusMaximum / this.numberOfCircles);
    }

    /**
     * @param {number} minimum
     * @param {number} maximum
     * @returns {number}
     */
    getRandomNumber(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum)) + minimum;
    }

    /**
     * @param {number} minimum
     * @param {number} maximum
     */
    * getCoordinatesRandomGenerator() {
        let minimum = 200;
        let maximum = 900;
        while (true) {
            ({minimum, maximum} = yield this.getRandomNumber(minimum, maximum) || {minimum, maximum});
        }
    }

    /**
     * @returns {iterator}
     */
    * getCloudGenerator() {
        do {
            let cloud = [];
            for (let counter = 0; counter < this.numberOfCircles; counter++) {
                let circle;
                do {
                    circle = this.generateCircleForCloud(cloud);
                } while (!this.isValidCircleForCloud(circle, cloud));
                cloud.push(circle)
            }
            yield  cloud;
        } while(true);
    }

    /**
     * @param {Array<CloudCircle>} cloud
     * @returns {CloudCircle}
     */
    generateCircleForCloud(cloud) {
        let radius = this.getRandomRadius();
        let coordinateX = this.coordinatesRandomGenerator.next(
            {
                minimum: cloud.reduce(
                    (minimum, circle) => {
                        return minimum < (circle.centerPoint.coordinateX - circle.radius)
                            ? minimum
                            : circle.centerPoint.coordinateX - circle.radius;
                    }
                    , 400
                ) - 2 * radius + this.lineWidthConstraint * 2,
                maximum: cloud.reduce(
                    (maximum, circle) => {
                        return maximum > (circle.centerPoint.coordinateX + circle.radius)
                            ? maximum
                            : circle.centerPoint.coordinateX + circle.radius;
                    }
                    , 800
                ) + 2 * radius - this.lineWidthConstraint * 2
            }
        ).value;
        let coordinateY = this.coordinatesRandomGenerator.next(
            {
                minimum: cloud.reduce(
                    (minimum, circle) => {
                        return minimum < (circle.centerPoint.coordinateY - circle.radius)
                            ? minimum
                            : circle.centerPoint.coordinateY - circle.radius;
                    }
                    , 400
                ) - 2 * radius + this.lineWidthConstraint * 2,
                maximum: cloud.reduce(
                    (maximum, circle) => {
                        return maximum > (circle.centerPoint.coordinateY + circle.radius)
                            ? maximum
                            : circle.centerPoint.coordinateY + circle.radius;
                    }
                    , 800
                ) + 2 * radius - this.lineWidthConstraint * 2
            }
        ).value;
        let centerPoint = new Point(coordinateX, coordinateY);

        return new CloudCircle(centerPoint, radius);
    }

    /**
     * @param {CloudCircle} circle
     * @param {Array<CloudCircle>} cloud
     * @returns {boolean}
     */
    isValidCircleForCloud(circle, cloud) {
        // For empty cloud circle tangent status is true
        let tangentStatus = cloud.length === 0;
        for (let currentCircle of cloud) {
            if (currentCircle.centerPoint.isSamePoint(circle.centerPoint)) {
                return false;
            }
            if (currentCircle.isCircleInside(circle)) {
                return false;
            }
            if (currentCircle.isTangentCircle(circle)) {
                tangentStatus = true;
            }
        }
        let insideCloudStatus = this.isCirclePointsInsideOfExistingCloud(circle, cloud);
        let cloudCirclesInsideStatus = this.isCirclesPointsInsideOfExtendedCloud(circle, cloud);
        return tangentStatus && !(insideCloudStatus || cloudCirclesInsideStatus);
    }

    /**
     * @param {CloudCircle} circle
     * @param {Array<CloudCircle>} cloud
     * @returns {boolean}
     */
    isCirclesPointsInsideOfExtendedCloud(circle, cloud) {
        let extendedCloud = cloud.slice(0);
        extendedCloud.push(circle);
        for (let currentCircle of extendedCloud) {
            let remainingCloud = extendedCloud.filter(remainingCircle => remainingCircle !== currentCircle);
            if (this.isCirclePointsInsideOfExistingCloud(currentCircle, remainingCloud)) {
                return true;
            }
        }
        return false;
    }

    /**
     * @param {CloudCircle} circle
     * @param {Array<CloudCircle>} cloud
     * @returns {boolean}
     */
    isCirclePointsInsideOfExistingCloud(circle, cloud) {
        // Can be used only radius but than some of the cases will look like overlapping from line Width
        // Line width is doubled to be sure that it looks fine with simplified version
        let deltaRadius = circle.radius- this.lineWidthConstraint / 2 - 1;
        let northPoint = new Point(
            circle.centerPoint.coordinateX,
            circle.centerPoint.coordinateY - deltaRadius
        );
        let southPoint = new Point(
            circle.centerPoint.coordinateX,
            circle.centerPoint.coordinateY + deltaRadius
        );
        let eastPoint = new Point(
            circle.centerPoint.coordinateX + deltaRadius,
            circle.centerPoint.coordinateY
        );
        let westPoint = new Point(
            circle.centerPoint.coordinateX - deltaRadius,
            circle.centerPoint.coordinateY
        );
        // Not accurate but better than nothing
        // Using for point coordinates calculation angle of 45 degrees
        let sin45 = Math.sin(this.convertDegreesToRadians(45));
        let cos45 = Math.cos(this.convertDegreesToRadians(45));

        let northEastPoint = new Point(
            circle.centerPoint.coordinateX + deltaRadius * cos45,
            circle.centerPoint.coordinateY - deltaRadius * sin45
        );
        let northWestPoint = new Point(
            circle.centerPoint.coordinateX - deltaRadius * cos45,
            circle.centerPoint.coordinateY - deltaRadius * sin45
        );
        let southEastPoint = new Point(
            circle.centerPoint.coordinateX + deltaRadius * cos45,
            circle.centerPoint.coordinateY + deltaRadius * sin45
        );
        let southWestPoint = new Point(
            circle.centerPoint.coordinateX - deltaRadius * cos45,
            circle.centerPoint.coordinateY + deltaRadius * sin45
        );

        return this.isPointInsideOfExistingCloud(northPoint, cloud)
            && this.isPointInsideOfExistingCloud(southPoint, cloud)
            && this.isPointInsideOfExistingCloud(eastPoint, cloud)
            && this.isPointInsideOfExistingCloud(westPoint, cloud)
            && this.isPointInsideOfExistingCloud(northEastPoint, cloud)
            && this.isPointInsideOfExistingCloud(northWestPoint, cloud)
            && this.isPointInsideOfExistingCloud(southEastPoint, cloud)
            && this.isPointInsideOfExistingCloud(southWestPoint, cloud);
    }

    /**
     * @param {Point} point
     * @param {Array<CloudCircle>} cloud
     * @returns {boolean}
     */
    isPointInsideOfExistingCloud(point, cloud) {
        let isPointInsideOfCloud = false;
        for (let currentCircle of cloud) {
            isPointInsideOfCloud = isPointInsideOfCloud || currentCircle.isPointInsideOfCircle(point);
        }
        return isPointInsideOfCloud;
    }

    /**
     * @param {number} degrees
     * @returns {number}
     */
    convertDegreesToRadians(degrees) {
        return (Math.PI / 180) * degrees;
    }
}
