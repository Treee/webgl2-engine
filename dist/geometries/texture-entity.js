"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class TextureEntity extends renderable_object_1.RenderableObject {
    constructor(gl, progInfo, uniforms) {
        super();
        this.xAxisRange = 1;
        this.zAxisRange = 1;
        this.defaultUniforms = {
            u_colorMult: [1, 1, 1, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.texture = {};
        this.alias = 'texture-entity';
        let arrays = {
            position: { numComponents: 3, data: [
                    -this.xAxisRange, 0, -this.zAxisRange,
                    this.xAxisRange, 0, -this.zAxisRange,
                    -this.xAxisRange, 0, this.zAxisRange,
                    this.xAxisRange, 0, this.zAxisRange // front right corner
                ] },
            texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1] },
            normal: { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1] },
            indices: { numComponents: 3, data: [0, 1, 2, 1, 2, 3] }
        };
        // let arrays = {
        //   position: [
        //     -this.xAxisRange, 0, -this.zAxisRange, // back left corner
        //     this.xAxisRange, 0, -this.zAxisRange,  // back right corner
        //     -this.xAxisRange, 0, this.zAxisRange,  // front left corner
        //     this.xAxisRange, 0, this.zAxisRange    // front right corner
        //   ],
        //   color: [
        //     0, 1, 0, 1, // back left corner
        //     0, 1, 0, 1, // back right corner
        //     0, 0, 1, 1, // front left corner
        //     0, 0, 1, 1  // front right corner
        //   ],
        //   indices: [0, 2, 1, 1, 2, 3] // counter clock-wise is front face
        // }
        let planeBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.texture = twgl_js_1.createTexture(gl, {
            test1: { src: '../assets/images/texture-test.jpg' }
        });
        this.bufferInfo = planeBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, planeBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    }
    draw(gl) {
        let programInfo = this.programInfo;
        gl.useProgram(programInfo.program);
        gl.bindVertexArray(this.vertexArray);
        twgl_js_1.setUniforms(programInfo, this.uniforms);
        twgl_js_1.drawBufferInfo(gl, this.bufferInfo);
    }
    rotate(dt) {
        this.rotationX = dt;
        this.rotationY = -dt;
    }
}
exports.TextureEntity = TextureEntity;
//# sourceMappingURL=texture-entity.js.map