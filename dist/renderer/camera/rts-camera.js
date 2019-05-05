"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camera_1 = require("./camera");
class RtsCamera extends camera_1.Camera {
    constructor(startPosition = [0, 0, 0], width = 1366, height = 768, near = 1, far = 100) {
        super(startPosition);
        this.setDiametricProjection(0, width, 0, height, near, far);
    }
}
exports.RtsCamera = RtsCamera;
//# sourceMappingURL=rts-camera.js.map