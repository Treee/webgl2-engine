import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createBufferInfoFromArrays, createVAOFromBufferInfo, createTexture, TextureOptions } from "twgl.js";

export class TextureEntity extends RenderableObject {

  xAxisRange: number = 1;
  zAxisRange: number = 1;

  defaultUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    u_texture: {}
  };

  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
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
      indices: [0, 2, 1, 1, 2, 3] // counter clock-wise is front face
    }

    let planeBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.defaultUniforms.u_texture = createTexture(gl, {
      test1: { src: 'texture-test.jpg', mag: gl.NEAREST }
    } as TextureOptions);

    this.bufferInfo = planeBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, planeBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = -dt;
  }
}
