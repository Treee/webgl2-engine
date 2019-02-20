import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createVAOFromBufferInfo, createBufferInfoFromArrays } from "twgl.js";

export class Axis3D extends RenderableObject {

  defaultUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  };

  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'axis-3d';

    let arrays = {
      position: [0, 0, 0, 100, 0, 0],
      color: [0, 0, 0, 1, 1, 0, 0, 1]
    }

    let axisBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.bufferInfo = axisBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, axisBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    this.position = [0, 0, 0];
  }
}