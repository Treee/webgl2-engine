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
  rotationZ: number = 0;

  scaleValue: number = 1;

  modelMatrix: m4.Mat4 = m4.identity();

  constructor() {

  }

  translate(dt: number) { }
  scale(dt: number) { }
  rotate(dt: number) { }

  move(dt: number, viewProjectionMatrix: any) {
    this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);
  }

  computeMatrix(viewProjectionMatrix: m4.Mat4): m4.Mat4 {
    var matrix = m4.translate(viewProjectionMatrix, this.position);
    matrix = m4.rotateX(matrix, this.rotationX);
    return m4.rotateY(matrix, this.rotationY);
  }
}