"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Cube extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.defaultUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        };
        this.alias = 'cube';
        let cubeBufferInfo = twgl_js_1.primitives.createCubeBufferInfo(gl, 20);
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