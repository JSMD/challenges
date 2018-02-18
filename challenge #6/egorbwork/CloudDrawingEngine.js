class CloudDrawingEngine {
    /**
     * @param {CanvasRenderingContext2D} drawingContext
     * @param {number} drawingContext
     */
    constructor(drawingContext, lineWidth) {
        this.drawingContext = drawingContext;
        this.drawingContext.lineWidth = lineWidth;
        this.drawingContext.strokeStyle = 'black';
    }

    /**
     * @param {Array<CloudCircle>}
     */
    drawCloud(cloud) {
        this.prepareCloud(cloud);
        this.drawingContext.clearRect(0, 0, 5000, 5000);
        for(let circle of cloud.sort(this.compareCircleByUsedTangents)) {
            let currentTangents = circle.getUsedTangents();
            if (currentTangents.length > 2) {
                for (let tangentsGroup of this.getGroupedTangents(currentTangents)) {
                    let {first: firstTangent, second: secondTangent} = tangentsGroup;
                    this.drawingContext.beginPath();
                    this.drawingContext.arc(
                        circle.centerPoint.coordinateX,
                        circle.centerPoint.coordinateY,
                        circle.radius,
                        // Full circle visibility for Testing
                        // 0, 2 * Math.PI,
                        circle.calculateArcAngleForPoint(firstTangent.point),
                        circle.calculateArcAngleForPoint(secondTangent.point),
                        this.getArcClockWiseStatusForTangent(firstTangent, circle, cloud)
                    );
                    firstTangent.addDrawnWith(secondTangent);
                    secondTangent.addDrawnWith(firstTangent);
                    this.drawingContext.stroke();
                    // Tangent Points drawing for testing
                    // this.drawingContext.beginPath();
                    // this.drawingContext.fillStyle = 'red';
                    // this.drawingContext.fillRect(firstTangent.point.coordinateX, firstTangent.point.coordinateY, 5, 5);
                    // this.drawingContext.fillRect(secondTangent.point.coordinateX, secondTangent.point.coordinateY, 5, 5);
                }
            } else {
                let [firstTangent, secondTangent] = currentTangents;
                this.drawingContext.beginPath();
                this.drawingContext.arc(
                    circle.centerPoint.coordinateX,
                    circle.centerPoint.coordinateY,
                    circle.radius,
                    // Full circle visibility for Testing
                    // 0, 2 * Math.PI,
                    circle.calculateArcAngleForPoint(firstTangent.point),
                    circle.calculateArcAngleForPoint(secondTangent.point),
                    this.getArcClockWiseStatusForTangent(firstTangent, circle, cloud)
                );
                firstTangent.addDrawnWith(secondTangent);
                secondTangent.addDrawnWith(firstTangent);
                this.drawingContext.stroke();
                // Tangent Points drawing for testing
                // this.drawingContext.beginPath();
                // this.drawingContext.fillStyle = 'red';
                // this.drawingContext.fillRect(firstTangent.point.coordinateX, firstTangent.point.coordinateY, 5, 5);
                // this.drawingContext.fillRect(secondTangent.point.coordinateX, secondTangent.point.coordinateY, 5, 5);
            }
        }

    }

    /**
     * @param {Array<CloudCircle>}
     */
    prepareCloud(cloud) {
        let preparedList = [];
        for (let circle of cloud) {
            preparedList.push(circle);
            // Calculate tangents
            let remainingCircles = cloud.filter(remainingCircle => !preparedList.includes(remainingCircle));
            for (let remainingCircle of remainingCircles) {
                if (circle.isTangentCircle(remainingCircle)) {
                    circle.calculateCloudTangentsForCircle(remainingCircle);
                }
            }
            // Mark not used in cloud tangents
            for (let tangent of circle.tangents) {
                for (let remainingCircle of cloud) {
                    if (remainingCircle !== tangent.firstCircle
                        && remainingCircle !== tangent.secondCircle
                        && remainingCircle.isPointInsideOfCircle(tangent.point)
                    ) {
                        tangent.setUsed(false);
                    }
                }
            }
        }
    }

    /**
     * @param {CloudTangent} tangent
     * @param {CloudCircle} circle
     * @param {Array<CloudCircle>} circles
     * @returns {boolean}
     */
    getArcClockWiseStatusForTangent(tangent, circle, circles) {
        let testPoint = this.getClockWiseTestPoint(tangent, circle);
        for (let testCircle of circles) {
            if (testCircle === circle) {
                continue;
            } else if(testCircle.isPointInsideOfCircle(testPoint)) {
                return false;
            }
        }
        return true;
    }

    /**
     * @param {CloudTangent} tangent
     * @param {CloudTangent} secondTangent
     * @param {CloudCircle} circle
     * @returns {Point}
     */
    getClockWiseTestPoint(tangent, circle) {
        let modifier = 1;
        if (tangent.point.coordinateX > circle.centerPoint.coordinateX
            && tangent.point.coordinateY >= circle.centerPoint.coordinateY
        ) {
            return new Point(
                tangent.point.coordinateX + (
                    tangent.point.coordinateY === circle.centerPoint.coordinateY
                        ? (-modifier) : modifier
                ),
                tangent.point.coordinateY - modifier
            );
        } else if (tangent.point.coordinateX >= circle.centerPoint.coordinateX
            && tangent.point.coordinateY < circle.centerPoint.coordinateY
        ) {
            return new Point(
                tangent.point.coordinateX - modifier,
                tangent.point.coordinateY + (
                    tangent.point.coordinateX === circle.centerPoint.coordinateX
                        ? modifier : (-modifier)
                )
            );
        } else if (tangent.point.coordinateX < circle.centerPoint.coordinateX
            && tangent.point.coordinateY <= circle.centerPoint.coordinateY
        ) {
            return new Point(
                tangent.point.coordinateX + (
                    tangent.point.coordinateY === circle.centerPoint.coordinateY
                        ? modifier : (-modifier)
                ),
                tangent.point.coordinateY + modifier
            );
        } else {
            return new Point(
                tangent.point.coordinateX + modifier,
                tangent.point.coordinateY + (
                    tangent.point.coordinateX === circle.centerPoint.coordinateX
                        ? (-modifier) : modifier
                )
            );
        }
    }

    /**
     * @param {Array<CloudTangent>} tangents
     */
    * getGroupedTangents(tangents) {
        let usedTangents = [];
        let remainingTangents = tangents.slice(0);
        for (let tangent of tangents) {
            remainingTangents.splice(remainingTangents.indexOf(tangent), 1);
            if (tangent.drawnWith.length === 2 || usedTangents.includes(tangent)) {
                continue;
            }
            let availableTangent;
            let minimumDistance;
            for (let comparableTangent of remainingTangents) {
                if (comparableTangent.drawnWith.length === 2 || comparableTangent.drawnWith.includes(tangent)
                    || usedTangents.includes(comparableTangent)
                ) {
                    continue;
                }
                let distanceBetweenTangentPoints = tangent.point.getDistanceFor(comparableTangent.point);
                if (!minimumDistance || minimumDistance > distanceBetweenTangentPoints) {
                    minimumDistance = distanceBetweenTangentPoints;
                    availableTangent = comparableTangent;
                }
            }
            usedTangents.push(availableTangent);

            yield  {first: tangent, second: availableTangent};
        }
    }

    /**
     * @param {CloudCircle} firstCircle
     * @param {CloudCircle} secondCircle
     * @returns {number}
     */
    compareCircleByUsedTangents(firstCircle, secondCircle) {
        return firstCircle.getUsedTangents().length - secondCircle.getUsedTangents().length;
    }
}
