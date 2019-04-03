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
        this.scaleValue = [1, 1, 1];
        this.modelMatrix = twgl_js_1.m4.identity();
    }
    translate(dt, translateAmount) {
        let newPosition = twgl_js_1.v3.add(this.position, translateAmount);
        this.position = newPosition;
    }
    scale(dt, scaleAmount) {
        let newScale = twgl_js_1.v3.add(this.scaleValue, scaleAmount);
        this.scaleValue = newScale;
    }
    rotate(dt) { }
    move(dt, viewProjectionMatrix) {
        if (this.uniforms) {
            this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);
        }
    }
    computeMatrix(viewProjectionMatrix) {
        var matrix = twgl_js_1.m4.translate(viewProjectionMatrix, this.position);
        matrix = twgl_js_1.m4.scale(matrix, this.scaleValue);
        matrix = twgl_js_1.m4.rotateX(matrix, this.rotationX);
        matrix = twgl_js_1.m4.rotateY(matrix, this.rotationY);
        matrix = twgl_js_1.m4.rotateZ(matrix, this.rotationZ);
        return matrix;
    }
    update(dt) { }
    draw(gl) {
        let programInfo = this.programInfo;
        gl.useProgram(programInfo.program);
        gl.bindVertexArray(this.vertexArray);
        twgl_js_1.setUniforms(programInfo, this.uniforms);
        twgl_js_1.drawBufferInfo(gl, this.bufferInfo);
    }
}
exports.RenderableObject = RenderableObject;
//# sourceMappingURL=renderable-object.js.map