"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Cube extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.alias = 'cube';
        let cubeBufferInfo = twgl_js_1.primitives.createCubeBufferInfo(gl, 20);
        let attr = {
            color: [1, 0, 0, 1]
        };
        cubeBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, attr, cubeBufferInfo);
        this.bufferInfo = cubeBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, cubeBufferInfo);
        this.uniforms = uniforms;
        this.position = [-40, 0, 0];
    }
}
exports.Cube = Cube;
//# sourceMappingURL=cube.js.map