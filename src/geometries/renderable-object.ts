import { ProgramInfo, BufferInfo, m4 } from "twgl.js";

export abstract class RenderableObject {
  programInfo!: ProgramInfo;
  bufferInfo!: BufferInfo;
  vertexArray!: WebGLVertexArrayObject;
  uniforms!: any; // object of arrays

  alias: string = 'default';
  position: number[] = [0, 0, 0];
  rotationX: number = 0;
  rotationY: number = 0;

  constructor() {

  }
}