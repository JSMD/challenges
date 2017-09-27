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
        this.usageStatus = true;
        this.drawnWith = [];
    }

    /**
     * @param {boolean} status
     */
    setUsed(status) {
        this.usageStatus = status;
    }

    /**
     * @param {CloudTangent} tangent
     */
    addDrawnWith(tangent) {
        this.drawnWith.push(tangent);
    }
}
