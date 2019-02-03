import { RenderableObject } from "./renderable-object";
import { ProgramInfo, primitives, createVAOFromBufferInfo } from "twgl.js";

export class Cone extends RenderableObject {
  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'cone';
    let coneBufferInfo = primitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);
    this.bufferInfo = coneBufferInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, coneBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = uniforms;
    this.position = [40, 0, 0];
  }
}