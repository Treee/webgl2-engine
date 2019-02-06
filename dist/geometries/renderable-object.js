"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twgl_js_1 = require("twgl.js");
class RenderableObject {
    constructor() {
        this.alias = 'default';
        this.position = [0, 0, 0];
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.scaleValue = 1;
        this.modelMatrix = twgl_js_1.m4.identity();
    }
    translate(dt) { }
    scale(dt) { }
    rotate(dt) { }
    move(dt, viewProjectionMatrix) {
    }
    computeMatrix(viewProjectionMatrix, translation, xRotation, yRotation) {
        var matrix = twgl_js_1.m4.translate(viewProjectionMatrix, translation);
        matrix = twgl_js_1.m4.rotateX(matrix, xRotation);
        return twgl_js_1.m4.rotateY(matrix, yRotation);
    }
}
exports.RenderableObject = RenderableObject;
//# sourceMappingURL=renderable-object.js.map