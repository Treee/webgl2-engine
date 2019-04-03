"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twgl_js_1 = require("twgl.js");
const three_1 = require("three");
class Camera {
    constructor(startPosition) {
        this.cameraMatrix = twgl_js_1.m4.identity();
        this.position = [0, 0, 1];
        this.up = [0, 1, 0];
        this.translateStepSize = 1.0;
        this.xAngle = 0;
        this.yAngle = 0;
        this.zAngle = 0;
        this.xRotation = new three_1.Quaternion();
        this.yRotation = new three_1.Quaternion();
        this.zRotation = new three_1.Quaternion();
        this.targetOrientation = new three_1.Quaternion();
        this.angleStepSize = 0.005;
        this.pi = Math.PI;
        this.twoPi = this.pi * 2;
        this.pureX = new three_1.Quaternion(1, 0, 0, 0);
        this.pureY = new three_1.Quaternion(0, 1, 0, 0);
        this.pureZ = new three_1.Quaternion(0, 0, -1, 0);
        this.position = startPosition;
        this.xAngle = this.pi; // rotate 90 degrees so we are looking down the -z axis
        this.yAngle = -this.pi;
        this.yaw(0);
        this.pitch(0);
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
    // this forward is a pure normal forward not translated to position.
    getForward() {
        const qw = new three_1.Quaternion().copy(this.targetOrientation);
        const conj = new three_1.Quaternion().copy(qw).conjugate();
        const normalZ = conj.multiply(this.pureZ).multiply(qw);
        return [normalZ.x, normalZ.y, normalZ.z];
    }
    //returns an up vector based on where we have rotated from
    getUp() {
        const qw = new three_1.Quaternion().copy(this.targetOrientation);
        const conj = new three_1.Quaternion().copy(qw).conjugate();
        const normalY = conj.multiply(this.pureY).multiply(qw);
        return [normalY.x, normalY.y, normalY.z];
    }
    //returns a vec3 that is perpendicular to the cameras forward and up vectors
    getRight() {
        const qw = new three_1.Quaternion().copy(this.targetOrientation);
        const conj = new three_1.Quaternion().copy(qw).conjugate();
        const normalX = conj.multiply(this.pureX).multiply(qw);
        return [normalX.x, normalX.y, normalX.z];
    }
    getPosition() {
        return this.position;
    }
    getViewMatrix() {
        const translatedForward = twgl_js_1.v3.add(this.getPosition(), this.getForward());
        this.cameraMatrix = twgl_js_1.m4.lookAt(this.getPosition(), translatedForward, this.up);
        return twgl_js_1.m4.inverse(this.cameraMatrix);
    }
    getViewProjectionMatrix(projectionMatrix) {
        return twgl_js_1.m4.multiply(projectionMatrix, this.getViewMatrix());
    }
    moveCamera(amountToMove) {
        this.position = twgl_js_1.v3.add(this.getPosition(), amountToMove);
        // console.log(`Pos: ${this.getPosition()} Forward: ${this.getForward()} Test: ${v3.add(this.getPosition(), this.getForward())}`);
    }
    moveForward() { this.moveCamera(twgl_js_1.v3.mulScalar(this.getForward(), this.translateStepSize)); }
    moveBackward() { this.moveCamera(twgl_js_1.v3.mulScalar(this.getForward(), -this.translateStepSize)); }
    moveLeft() { this.moveCamera(twgl_js_1.v3.mulScalar(this.getRight(), this.translateStepSize)); }
    moveRight() { this.moveCamera(twgl_js_1.v3.mulScalar(this.getRight(), -this.translateStepSize)); }
    moveUp() { this.moveCamera(twgl_js_1.v3.mulScalar([0, 1, 0], this.translateStepSize)); }
    moveDown() { this.moveCamera(twgl_js_1.v3.mulScalar([0, -1, 0], this.translateStepSize)); }
    yaw(amount) {
        this.yAngle += amount * -this.angleStepSize;
        //while the Angle is greater than 2pi (a full revolution, 360degrees)
        while (this.yAngle > this.twoPi) { //subtract 2pi from the angle to "wrap" it back to 0ish
            this.yAngle = this.yAngle - this.twoPi;
        } //this is the same but for the reverse direction
        while (this.yAngle < -this.twoPi) {
            this.yAngle = this.yAngle + this.twoPi;
        }
        //yaw the given angle over the y unit vector
        this.yRotation = this.yRotation.setFromAxisAngle(new three_1.Vector3(0, 1, 0), this.yAngle);
        this.applyRotation();
    }
    pitch(amount) {
        this.xAngle += amount * -this.angleStepSize;
        //while the Angle is greater than 2pi (a full revolution, 360degrees)
        while (this.xAngle > this.twoPi) { //subtract 2pi from the angle to "wrap" it back to 0ish
            this.xAngle = this.xAngle - this.twoPi;
        } //this is the same but for the reverse direction
        while (this.xAngle < -this.twoPi) {
            this.xAngle = this.xAngle + this.twoPi;
        }
        //yaw the given angle over the y unit vector
        this.xRotation = this.xRotation.setFromAxisAngle(new three_1.Vector3(1, 0, 0), this.xAngle);
        this.applyRotation();
    }
    roll(amount) {
        this.zAngle += amount * -this.angleStepSize;
        //while the Angle is greater than 2pi (a full revolution, 360degrees)
        while (this.zAngle > this.twoPi) { //subtract 2pi from the angle to "wrap" it back to 0ish
            this.zAngle = this.zAngle - this.twoPi;
        } //this is the same but for the reverse direction
        while (this.zAngle < -this.twoPi) {
            this.zAngle = this.zAngle + this.twoPi;
        }
        //roll the given angle over the z unit vector
        this.zRotation = this.zRotation.setFromAxisAngle(new three_1.Vector3(0, 0, 1), this.zAngle);
        this.applyRotation();
    }
    applyRotation() {
        this.targetOrientation = new three_1.Quaternion().multiply(this.xRotation).multiply(this.yRotation);
        // console.log(`X: ${this.xAngle * (180 / this.pi)} Y: ${this.yAngle * (180 / this.pi)}`);
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map