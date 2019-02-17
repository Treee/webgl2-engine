import { RenderableObject } from "./renderable-object";
import { ProgramInfo, primitives, createVAOFromBufferInfo } from "twgl.js";

export class Cone extends RenderableObject {

  defaultUniforms = {
    u_colorMult: [0.5, 0.5, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'cone';
    let coneBufferInfo = primitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

    this.bufferInfo = coneBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, coneBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    this.position = [40, 0, 0];
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = -dt;
  }
}
