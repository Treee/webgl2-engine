"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Sphere extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.defaultUniforms = {
            u_colorMult: [0.5, 1, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.alias = 'sphere';
        let sphereBufferInfo = twgl_js_1.primitives.createSphereBufferInfo(gl, 10, 12, 6);
        // let attr = {
        //   color: [0, 1, 0, 1]
        // }
        // sphereBufferInfo = createBufferInfoFromArrays(gl, attr, sphereBufferInfo);
        this.bufferInfo = sphereBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, sphereBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    }
    rotate(dt) {
        this.rotationX = dt;
        this.rotationY = dt;
    }
}
exports.Sphere = Sphere;
//# sourceMappingURL=sphere.js.map