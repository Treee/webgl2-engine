"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camera_1 = require("./camera");
const twgl_js_1 = require("twgl.js");
const three_1 = require("three");
class RtsCamera extends camera_1.Camera {
    constructor(startPosition = [0, 0, 0], width = 1366, height = 768, near = 1, far = 100) {
        super(startPosition);
        this.setDiametricProjection(0, width, 0, height, near, far);
    }
    getRtsForward() {
        const forward = new three_1.Quaternion().setFromAxisAngle(new three_1.Vector3(0, 1, 0), 1.5708);
        const oldRight = this.getRight();
        const converted = new three_1.Vector3(oldRight[0], oldRight[1], oldRight[2]);
        const forwardVec = converted.applyQuaternion(forward);
        const convertedVec = [forwardVec.x, forwardVec.y, forwardVec.z];
        return convertedVec;
    }
    moveForward() { this.moveCamera(twgl_js_1.v3.mulScalar(this.getRtsForward(), this.translateStepSize)); }
    moveBackward() { this.moveCamera(twgl_js_1.v3.mulScalar(this.getRtsForward(), -this.translateStepSize)); }
}
exports.RtsCamera = RtsCamera;
//# sourceMappingURL=rts-camera.js.map