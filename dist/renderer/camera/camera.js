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
    moveCamera(amountToMove) {
        this.position = twgl_js_1.v3.add(this.position, amountToMove);
    }
    moveForward() { this.moveCamera([0, 0, -1]); }
    moveBackward() { this.moveCamera([0, 0, 1]); }
    moveLeft() { this.moveCamera([-1, 0, 0]); }
    moveRight() { this.moveCamera([1, 0, 0]); }
    moveUp() { this.moveCamera([0, 1, 0]); }
    moveDown() { this.moveCamera([0, -1, 0]); }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map