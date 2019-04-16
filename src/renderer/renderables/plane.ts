import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createBufferInfoFromArrays, createVAOFromBufferInfo } from "twgl.js";

export class Plane extends RenderableObject {

  xAxisRange: number = 1;
  zAxisRange: number = 1;

  defaultUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  constructor() {
    super();
    this.alias = 'plane';
  }

  initializeObject(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
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
