"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twgl_js_1 = require("twgl.js");
class Camera {
    constructor(startPosition) {
        this.cameraMatrix = twgl_js_1.m4.identity();
        this.position = [0, 0, 100];
        this.target = [0, 0, 0];
        this.up = [0, 1, 0];
        this.position = startPosition;
        this.cameraMatrix = twgl_js_1.m4.lookAt(this.position, this.target, this.up);
        ;
    }
    getViewMatrix() {
        this.cameraMatrix = twgl_js_1.m4.lookAt(this.position, this.target, this.up);
        return twgl_js_1.m4.inverse(this.cameraMatrix);
    }
    getViewProjectionMatrix(projectionMatrix) {
        return twgl_js_1.m4.multiply(projectionMatrix, this.getViewMatrix());
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map