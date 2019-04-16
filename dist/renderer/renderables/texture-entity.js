"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class TextureEntity extends renderable_object_1.RenderableObject {
    constructor() {
        super();
        this.xAxisRange = 1;
        this.zAxisRange = 1;
        this.defaultUniforms = {
            u_colorMult: [1, 1, 1, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.alias = 'texture-entity';
    }
    initializeObject(gl, progInfo, uniforms) {
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
            indices: [0, 2, 1, 1, 2, 3],
            texCoord: [
                0.0, 1.0,
                1.0, 1.0,
                0.0, 0.0,
                1.0, 0.0,
            ]
        };
        let textures = twgl_js_1.createTextures(gl, {
            default: { src: './assets/images/test-texture1.png', mag: gl.NEAREST }
            // default: { src: imageSource, mag: gl.NEAREST }
        });
        let otherUniforms = {
            u_resolution: [gl.canvas.width, gl.canvas.height],
            u_image: textures.default
        };
        let textureBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.bufferInfo = textureBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, textureBufferInfo);
        otherUniforms = Object.assign({}, otherUniforms, uniforms);
        this.uniforms = Object.assign({}, this.defaultUniforms, otherUniforms);
    }
    rotate(dt) {
        this.rotationX = dt;
        this.rotationY = -dt;
    }
}
exports.TextureEntity = TextureEntity;
//# sourceMappingURL=texture-entity.js.map