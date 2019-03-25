"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twgl_js_1 = require("twgl.js");
const three_1 = require("three");
class Camera {
    constructor(startPosition) {
        this.cameraMatrix = twgl_js_1.m4.identity();
        this.position = [0, 0, 1];
        this.target = [0, 0, 0];
        this.up = [0, 1, 0];
        this.translateStepSize = 1.0;
        this.xAngle = 1.0;
        this.yAngle = 1.0;
        this.xRotation = new three_1.Quaternion();
        this.targetOrientation = new three_1.Quaternion();
        this.angleStepSize = 0.001;
        this.pi = Math.PI;
        this.twoPi = this.pi * 2;
        this.position = startPosition;
        this.target = twgl_js_1.v3.subtract(startPosition, [0, 0, 1]);
        this.cameraMatrix = twgl_js_1.m4.lookAt(this.position, this.target, this.up);
    }
    getModelMatrix() {
        // let rotation = new Matrix4().makeRotationFromQuaternion(this.targetOrientation);
        // let scale = new Matrix4().makeScale(1, 1, 1);
        // let translation = new Matrix4().makeTranslation(this.position[0], this.position[1], this.position[2]);
        // const modelMatrix = rotation.multiply(scale).multiply(translation);
        // return modelMatrix;
        let translation = new three_1.Matrix4().makeTranslation(this.position[0], this.position[1], this.position[2]);
        let rotation = new three_1.Matrix4().makeRotationFromQuaternion(this.targetOrientation);
        const cameraModelMatrix = translation.multiply(rotation);
        return cameraModelMatrix;
    }
    getForward() {
        const pureZ = new three_1.Quaternion(0, 0, 0, 1);
        const qw = new three_1.Quaternion().copy(this.targetOrientation);
        const conj = new three_1.Quaternion().copy(qw).conjugate();
        const normalZ = conj.multiply(pureZ).multiply(qw);
        return [normalZ.x, normalZ.y, normalZ.z];
    }
    getPosition() {
        return this.position;
    }
    getViewMatrix() {
        // this.cameraMatrix = m4.lookAt(this.getPosition(), this.target, this.up);
        this.cameraMatrix = twgl_js_1.m4.lookAt(this.getPosition(), this.getForward(), this.up);
        return twgl_js_1.m4.inverse(this.cameraMatrix);
    }
    getViewProjectionMatrix(projectionMatrix) {
        return twgl_js_1.m4.multiply(projectionMatrix, this.getViewMatrix());
    }
    moveCamera(amountToMove) {
        this.position = twgl_js_1.v3.add(this.getPosition(), amountToMove);
    }
    moveForward() {
        this.moveCamera(twgl_js_1.v3.add(this.getForward(), twgl_js_1.v3.mulScalar([0, 0, -1], this.translateStepSize)));
    }
    moveBackward() {
        this.moveCamera(twgl_js_1.v3.add(this.getForward(), twgl_js_1.v3.mulScalar([0, 0, 1], this.translateStepSize)));
    }
    moveLeft() { this.moveCamera([-1, 0, 0]); }
    moveRight() { this.moveCamera([1, 0, 0]); }
    moveUp() { this.moveCamera([0, 1, 0]); }
    moveDown() { this.moveCamera([0, -1, 0]); }
    turnLeft() {
        this.xAngle += -this.angleStepSize;
    }
    turnRight() {
        this.xAngle += this.angleStepSize;
    }
    yaw() {
        //while the Angle is greater than 2pi (a full revolution, 360degrees)
        while (this.xAngle > this.twoPi) { //subtract 2pi from the angle to "wrap" it back to 0ish
            this.xAngle = this.xAngle - this.twoPi;
        } //this is the same but for the reverse direction
        while (this.xAngle < -this.twoPi) {
            this.xAngle = this.xAngle + this.twoPi;
        }
        //yaw the given angle over the y unit vector
        // this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.xAngle);
        this.xRotation = this.xRotation.setFromAxisAngle(new three_1.Vector3(0, 1, 0), (this.xAngle * (180 / this.pi)));
    }
    rotateForward() {
    }
    rotateBackward() {
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map