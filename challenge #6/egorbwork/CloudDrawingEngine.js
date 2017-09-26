class CloudDrawingEngine {
    /**
     * @param {CanvasRenderingContext2D} drawingContext
     */
    constructor(drawingContext) {
        this.drawingContext = drawingContext;
        this.drawingContext.lineWidth = 5;
        this.drawingContext.strokeStyle = 'black';
    }

    /**
     * @param {Array<CloudCircle>}
     */
    drawCloud(cloud) {
        this.drawingContext.clearRect(0, 0, 5000, 5000);
        for(let circle of cloud) {
            let currentTangents = circle.getUsedTangents();
            if (currentTangents.length > 2) {
                for (let tangentsGroup of this.getGroupedTangents(currentTangents)) {
                    let {first: firstTangent, second: secondTangent} = tangentsGroup;
                    this.drawingContext.beginPath();
                    this.drawingContext.arc(
                        circle.centerPoint.coordinateX,
                        circle.centerPoint.coordinateY,
                        circle.radius,
                        // 0, 2 * Math.PI,
                        circle.calculateArcAngleForPoint(firstTangent.point),
                        circle.calculateArcAngleForPoint(secondTangent.point),
                        this.getArcClockWiseStatusForTangent(firstTangent, circle, cloud)
                    );
                    firstTangent.addDrawnWith(secondTangent);
                    secondTangent.addDrawnWith(firstTangent);
                    this.drawingContext.stroke();
                }
            } else {
                let [firstTangent, secondTangent] = currentTangents;
                this.drawingContext.beginPath();
                this.drawingContext.arc(
                    circle.centerPoint.coordinateX,
                    circle.centerPoint.coordinateY,
                    circle.radius,
                    // 0, 2 * Math.PI,
                    circle.calculateArcAngleForPoint(firstTangent.point),
                    circle.calculateArcAngleForPoint(secondTangent.point),
                    this.getArcClockWiseStatusForTangent(firstTangent, circle, cloud)
                );
                firstTangent.addDrawnWith(secondTangent);
                secondTangent.addDrawnWith(firstTangent);
                this.drawingContext.stroke();
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
}
