"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Sphere extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.alias = 'sphere';
        let sphereBufferInfo = twgl_js_1.primitives.createSphereBufferInfo(gl, 10, 12, 6);
        this.bufferInfo = sphereBufferInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, sphereBufferInfo);
        this.uniforms = uniforms;
        this.position = [0, 0, 0];
    }
}
exports.Sphere = Sphere;
//# sourceMappingURL=sphere.js.map