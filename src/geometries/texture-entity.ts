import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createBufferInfoFromArrays, createVAOFromBufferInfo, createTexture, TextureOptions, setUniforms, drawBufferInfo, createTextures } from "twgl.js";

export class TextureEntity extends RenderableObject {

  xAxisRange: number = 1;
  zAxisRange: number = 1;

  defaultUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: ImageData) {
    super();
    this.alias = 'texture-entity';

    let arrays = {
      position: [
        -this.xAxisRange, 0, -this.zAxisRange, // back left corner
        this.xAxisRange, 0, -this.zAxisRange,  // back right corner
        -this.xAxisRange, 0, this.zAxisRange,  // front left corner
        this.xAxisRange, 0, this.zAxisRange    // front right corner
      ],
      color: [
        0, 1, 0, 1, // back left corner
        0, 1, 0, 1, // back right corner
        0, 0, 1, 1, // front left corner
        0, 0, 1, 1  // front right corner
      ],
      indices: [0, 2, 1, 1, 2, 3], // counter clock-wise is front face
      texCoord: [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
      ]
    };

    let textures = createTextures(gl, {
      default: { src: './assets/images/test-texture1.png', mag: gl.NEAREST }
    });

    let otherUniforms = {
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_image: [textures.default]
    }

    let textureBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.bufferInfo = textureBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, textureBufferInfo) as unknown as WebGLVertexArrayObject;
    otherUniforms = Object.assign({}, otherUniforms, uniforms);
    this.uniforms = Object.assign({}, this.defaultUniforms, otherUniforms);
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = -dt;
  }
}
