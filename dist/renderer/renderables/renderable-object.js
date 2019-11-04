"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twgl_js_1 = require("twgl.js");
class RenderableObject {
    constructor() {
        this.alias = 'default';
        this.isDirty = false; // helps us only update things that need to be updated
        this.position = [0, 0, 0];
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.scaleValue = [1, 1, 1];
        this.modelMatrix = twgl_js_1.m4.identity();
    }
    initializeObject(gl, progInfo, uniforms) { }
    ;
    translate(dt, translateAmount) {
        let newPosition = twgl_js_1.v3.add(this.position, translateAmount);
        this.position = newPosition;
        this.setDirty(true);
    }
    scale(dt, scaleAmount) {
        this.scaleValue = scaleAmount;
        this.setDirty(true);
    }
    rotate(dt) {
        this.rotationX = -dt;
        this.rotationY = dt;
        this.setDirty(true);
    }
    lerp(start, end, step) {
        // ((1 - step) * start) + (step * end)
        return twgl_js_1.v3.add(twgl_js_1.v3.mulScalar(start, (1 - step)), twgl_js_1.v3.mulScalar(end, step));
    }
    computeMatrix(viewProjectionMatrix) {
        var matrix = twgl_js_1.m4.translate(viewProjectionMatrix, this.position);
        matrix = twgl_js_1.m4.scale(matrix, this.scaleValue);
        matrix = twgl_js_1.m4.rotateX(matrix, this.rotationX);
        matrix = twgl_js_1.m4.rotateY(matrix, this.rotationY);
        matrix = twgl_js_1.m4.rotateZ(matrix, this.rotationZ);
        return matrix;
    }
    update(dt, viewProjectionMatrix) {
        // if (this.isDirty) { // if this object needs updating
        if (this.uniforms) { //if there are uniforms
            this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);
        }
        // this.setDirty(false);
        // }
    }
    setDirty(isDirty) {
        this.isDirty = isDirty;
    }
    draw(gl) {
        // gl.clearColor(0, 0, 0, 0);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        let programInfo = this.programInfo;
        gl.useProgram(programInfo.program);
        // gl.bindVertexArray(this.vertexArray);
        twgl_js_1.setUniforms(programInfo, this.uniforms);
        twgl_js_1.drawBufferInfo(gl, this.bufferInfo);
    }
}
exports.RenderableObject = RenderableObject;
//# sourceMappingURL=renderable-object.js.map