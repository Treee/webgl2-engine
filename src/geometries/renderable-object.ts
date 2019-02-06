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
  }

  computeMatrix(viewProjectionMatrix: any, translation: any, xRotation: number, yRotation: number): m4.Mat4 {
    var matrix = m4.translate(viewProjectionMatrix, translation);
    matrix = m4.rotateX(matrix, xRotation);
    return m4.rotateY(matrix, yRotation);
  }
}