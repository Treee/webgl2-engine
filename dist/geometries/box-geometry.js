"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
const mat3_1 = require("../math/mat3");
class BoxGeometry {
    constructor() {
        this.position = new vec3_1.Vec3();
        this.scale = new vec3_1.Vec3(1, 1, 1);
        this.rotation = new vec3_1.Vec3(0, 1, 0);
        this.color = new vec4_1.Vec4();
    }
    getTransform() {
        let temp = new mat3_1.Mat3();
        temp = temp.multiplyMatrices(temp, this.getRotationMatrix());
        temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
        temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
        return temp;
    }
    translate(amountToTranslate) {
        const newPosition = this.getPosition().add(amountToTranslate);
        this.setPosition(newPosition);
    }
    getTranslationMatrix() {
        const position = this.getPosition();
        let translationMatrix = new mat3_1.Mat3();
        translationMatrix.set(1, 0, position.x, 0, 1, position.y, 0, 0, 1);
        return translationMatrix;
    }
    setPosition(newPosition) {
        this.position = newPosition;
    }
    getPosition() {
        return this.position.clone();
    }
    getScaleMatrix() {
        const scale = this.getScale();
        let scaleMatrix = new mat3_1.Mat3();
        scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, scale.z);
        return scaleMatrix;
    }
    setScale(newScale) {
        this.scale = newScale;
    }
    getScale() {
        return this.scale.clone();
    }
    // rotates clockwise starting from (0, 1, 0)
    rotate(angleInDegrees) {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const newRotation = new vec3_1.Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
        this.setRotation(newRotation);
    }
    getRotationMatrix() {
        const rotation = this.getRotation();
        let rotationMatrix = new mat3_1.Mat3();
        // [y, -x, 0,
        //  x, y, 0,
        //  0, 0, 1]
        rotationMatrix.set(rotation.y, rotation.x, 0, -rotation.x, rotation.y, 0, 0, 0, 1);
        return rotationMatrix;
    }
    setRotation(newRotation) {
        this.rotation = newRotation;
    }
    getRotation() {
        return this.rotation.clone();
    }
    setColor(newColor) {
        this.color = newColor;
    }
    getColor() {
        return this.color.clone();
    }
    drawObject(gl, transformLocation, colorLocation) {
        throw new Error('Implement Draw Object Function!!');
    }
}
exports.BoxGeometry = BoxGeometry;
//# sourceMappingURL=box-geometry.js.map