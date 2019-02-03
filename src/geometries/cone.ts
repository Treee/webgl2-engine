import { RenderableObject } from "./renderable-object";
import { ProgramInfo, primitives, createBufferInfoFromArrays, createVAOFromBufferInfo } from "twgl.js";

export class Cone extends RenderableObject {
  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'cone';
    let coneBufferInfo = primitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);
    let attr = {
      color: [0, 0, 1, 1]
    }
    coneBufferInfo = createBufferInfoFromArrays(gl, attr, coneBufferInfo);

    this.bufferInfo = coneBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, coneBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = uniforms;
    this.position = [40, 0, 0];
  }
}
