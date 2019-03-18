"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Cube extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.xAxisRange = 1;
        this.yAxisRange = 1;
        this.zAxisRange = 1;
        this.defaultUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        };
        this.alias = 'cube';
        let arrays = {
            position: [
                // top
                -this.xAxisRange, this.yAxisRange, -this.zAxisRange,
                this.xAxisRange, this.yAxisRange, -this.zAxisRange,
                -this.xAxisRange, this.yAxisRange, this.zAxisRange,
                this.xAxisRange, this.yAxisRange, this.zAxisRange,
                // bot
                -this.xAxisRange, -this.yAxisRange, -this.zAxisRange,
                this.xAxisRange, -this.yAxisRange, -this.zAxisRange,
                -this.xAxisRange, -this.yAxisRange, this.zAxisRange,
                this.xAxisRange, -this.yAxisRange, this.zAxisRange // front right corner
            ],
            color: [
                // top
                1, 0, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
                1, 1, 1, 1,
                // bot
                1, 0, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
                1, 1, 1, 1 // front right corner
            ],
            indices: [
                0, 2, 1, 1, 2, 3,
                3, 2, 7, 7, 2, 6,
                6, 4, 2, 2, 4, 0,
                0, 1, 4, 4, 1, 5,
                5, 3, 1, 1, 7, 3,
                4, 6, 5, 5, 6, 7 // bot face
            ] // counter clock-wise is front face
        };
        let cubeBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.bufferInfo = cubeBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, cubeBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    }
    rotate(dt) {
        this.rotationX = -dt;
        this.rotationY = dt;
    }
}
exports.Cube = Cube;
//# sourceMappingURL=cube.js.map