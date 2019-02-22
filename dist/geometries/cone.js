"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Cone extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.defaultUniforms = {
            u_colorMult: [0.5, 0.5, 1, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.alias = 'cone';
        let coneBufferInfo = twgl_js_1.primitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);
        this.bufferInfo = coneBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, coneBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    }
    rotate(dt) {
        this.rotationX = dt;
        this.rotationY = -dt;
    }
}
exports.Cone = Cone;
//# sourceMappingURL=cone.js.map