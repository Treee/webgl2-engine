import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createBufferInfoFromArrays, createVAOFromBufferInfo } from "twgl.js";

export class Cube extends RenderableObject {

  xAxisRange: number = 1;
  yAxisRange: number = 1;
  zAxisRange: number = 1;

  defaultUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  };

  constructor() {
    super();
    this.alias = 'cube';
  }

  initializeObject(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    let arrays = {
      position: [
        // top
        -this.xAxisRange, this.yAxisRange, -this.zAxisRange, // back left corner
        this.xAxisRange, this.yAxisRange, -this.zAxisRange,  // back right corner
        -this.xAxisRange, this.yAxisRange, this.zAxisRange,  // front left corner
        this.xAxisRange, this.yAxisRange, this.zAxisRange,    // front right corner
        // bot
        -this.xAxisRange, -this.yAxisRange, -this.zAxisRange, // back left corner
        this.xAxisRange, -this.yAxisRange, -this.zAxisRange,  // back right corner
        -this.xAxisRange, -this.yAxisRange, this.zAxisRange,  // front left corner
        this.xAxisRange, -this.yAxisRange, this.zAxisRange    // front right corner
      ],
      color: [
        // top
        1, 0, 0, 1, // back left corner
        0, 1, 0, 1, // back right corner
        0, 0, 1, 1, // front left corner
        0.5, 0.5, 0.5, 1,  // front right corner
        // bot
        1, 0, 0, 1, // back left corner
        0, 1, 0, 1, // back right corner
        0, 0, 1, 1, // front left corner
        0.5, 0.5, 0.5, 1  // front right corner
      ],
      indices: [
        0, 2, 1, 1, 2, 3, // top face
        3, 2, 7, 7, 2, 6, // front face
        6, 2, 4, 4, 2, 0, // left face
        0, 1, 4, 4, 1, 5, // rear face
        5, 1, 3, 3, 7, 5, // right face
        5, 7, 4, 4, 7, 6// bot face
      ] // counter clock-wise is front face
    }

    let cubeBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.bufferInfo = cubeBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, cubeBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
  }

  rotate(dt: number) {
    this.rotationX = -dt;
    this.rotationY = dt;
  }
}