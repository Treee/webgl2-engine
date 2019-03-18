"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Plane extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.xAxisRange = 1;
        this.zAxisRange = 1;
        this.defaultUniforms = {
            u_colorMult: [0.5, 0.5, 1, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.alias = 'plane';
        let arrays = {
            position: [
                -this.xAxisRange, 0, -this.zAxisRange,
                this.xAxisRange, 0, -this.zAxisRange,
                -this.xAxisRange, 0, this.zAxisRange,
                this.xAxisRange, 0, this.zAxisRange // front right corner
            ],
            color: [
                0, 1, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
                0, 0, 1, 1 // front right corner
            ],
            indices: [0, 1, 2, 1, 2, 3]
        };
        let planeBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.bufferInfo = planeBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, planeBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    }
    rotate(dt) {
        this.rotationX = dt;
        this.rotationY = -dt;
    }
}
exports.Plane = Plane;
//# sourceMappingURL=plane.js.map