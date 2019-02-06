import { RenderableObject } from "./renderable-object";
import { ProgramInfo, primitives, createVAOFromBufferInfo } from "twgl.js";

export class Cube extends RenderableObject {
  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'cube';
    let cubeBufferInfo = primitives.createCubeBufferInfo(gl, 20);

    this.bufferInfo = cubeBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, cubeBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = uniforms;
    this.position = [-40, 0, 0];
  }

  rotate(dt: number) {
    this.rotationX = -dt;
    this.rotationY = dt;
  }
}