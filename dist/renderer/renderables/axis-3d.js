"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Axis3D extends renderable_object_1.RenderableObject {
    constructor() {
        super();
        this.xAxisRange = 100;
        this.yAxisRange = 100;
        this.zAxisRange = 100;
        this.defaultUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        };
        this.alias = 'axis-3d';
    }
    initializeObject(gl, progInfo, uniforms) {
        let arrays = {
            position: [-this.xAxisRange, 0, 0, this.xAxisRange, 0, 0, 0, -this.yAxisRange, 0, 0, this.yAxisRange, 0, 0, 0, -this.zAxisRange, 0, 0, this.zAxisRange],
            color: [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
            indices: [0, 1, 2, 3, 4, 5]
        };
        let axisBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.bufferInfo = axisBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, axisBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
        this.position = [0, 0, 0];
        this.setDirty(true);
    }
    draw(gl) {
        let programInfo = this.programInfo;
        gl.useProgram(programInfo.program);
        // gl.bindVertexArray(this.vertexArray);
        twgl_js_1.setUniforms(programInfo, this.uniforms);
        twgl_js_1.drawBufferInfo(gl, this.bufferInfo, gl.LINES);
    }
}
exports.Axis3D = Axis3D;
//# sourceMappingURL=axis-3d.js.map