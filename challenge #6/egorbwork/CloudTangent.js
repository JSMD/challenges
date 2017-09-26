class CloudTangent {
    /**
     * @param {Point} point
     * @param {CloudCircle} firstCircle
     * @param {CloudCircle} secondCircle
     */
    constructor(point, firstCircle, secondCircle) {
        this.point = point;
        this.firstCircle = firstCircle;
        this.secondCircle = secondCircle;
        this.usageStatus = false;
        this.drawnWith = [];
    }

    /**
     * @param {boolean} status
     */
    setUsed(status) {
        this.usageStatus = status;
    }

    /**
     * @param {CloudCircle} circle
     *
     * @returns {CloudCircle|null}
     */
    getTangentCircle(circle) {
        if (this.firstCircle === circle) {
            return this.secondCircle;
        } else if (this.secondCircle === circle) {
            return this.firstCircle;
        }
        return null;
    }

    /**
     * @param {CloudTangent} tangent
     */
    addDrawnWith(tangent) {
        this.drawnWith.push(tangent);
    }
}
