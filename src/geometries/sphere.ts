import { RenderableObject } from "./renderable-object";
import { ProgramInfo, primitives, createVAOFromBufferInfo } from "twgl.js";

export class Sphere extends RenderableObject {
  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'sphere';
    let sphereBufferInfo = primitives.createSphereBufferInfo(gl, 10, 12, 6);
    // let attr = {
    //   color: [0, 1, 0, 1]
    // }
    // sphereBufferInfo = createBufferInfoFromArrays(gl, attr, sphereBufferInfo);

    this.bufferInfo = sphereBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, sphereBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = uniforms;
    this.position = [0, 0, 0];
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = dt;
  }
}