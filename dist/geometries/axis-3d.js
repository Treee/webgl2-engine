"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Axis3D extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.defaultUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        };
        this.alias = 'axis-3d';
        let arrays = {
            position: [0, 0, 0, 100, 0, 0],
            color: [0, 0, 0, 1, 1, 0, 0, 1]
        };
        let axisBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.bufferInfo = axisBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, axisBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
        this.position = [0, 0, 0];
    }
}
exports.Axis3D = Axis3D;
//# sourceMappingURL=axis-3d.js.map