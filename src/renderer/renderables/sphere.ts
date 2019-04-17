import { RenderableObject } from "./renderable-object";
import { ProgramInfo, primitives, createVAOFromBufferInfo } from "twgl.js";

export class Sphere extends RenderableObject {

  defaultUniforms = {
    u_colorMult: [0.5, 1, 0.5, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  constructor() {
    super();
    this.alias = 'sphere';
  }

  initializeObject(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    let sphereBufferInfo = primitives.createSphereBufferInfo(gl, 10, 12, 6);
    // let attr = {
    //   color: [0, 1, 0, 1]
    // }
    // sphereBufferInfo = createBufferInfoFromArrays(gl, attr, sphereBufferInfo);

    this.bufferInfo = sphereBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, sphereBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    this.setDirty(true);
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = dt;
  }
}