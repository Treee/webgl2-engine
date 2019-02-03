"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Cone extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.alias = 'cone';
        let coneBufferInfo = twgl_js_1.primitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);
        let attr = {
            a_color: [1, 0, 0, 1]
        };
        coneBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, attr, coneBufferInfo);
        this.bufferInfo = coneBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, coneBufferInfo);
        this.uniforms = uniforms;
        this.position = [40, 0, 0];
    }
}
exports.Cone = Cone;
//# sourceMappingURL=cone.js.map