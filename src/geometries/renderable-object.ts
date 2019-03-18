import { ProgramInfo, BufferInfo, m4, setUniforms, drawBufferInfo, v3 } from "twgl.js";

export abstract class RenderableObject {
  programInfo!: ProgramInfo;
  bufferInfo!: BufferInfo;
  vertexArray!: WebGLVertexArrayObject;
  uniforms!: any; // object of arrays

  alias: string = 'default';

  position: v3.Vec3 = [0, 0, 0];

  rotationX: number = 0;
  rotationY: number = 0;
  rotationZ: number = 0;

  scaleValue: v3.Vec3 = [1, 1, 1];

  modelMatrix: m4.Mat4 = m4.identity();

  constructor() {

  }

  translate(dt: number, translateAmount: v3.Vec3) {
    let newPosition = v3.add(this.position, translateAmount);
    this.position = newPosition;
  }

  scale(dt: number, scaleAmount: v3.Vec3) {
    let newScale = v3.add(this.scaleValue, scaleAmount);
    this.scaleValue = newScale;
  }

  rotate(dt: number) { }

  move(dt: number, viewProjectionMatrix: any) {
    this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);
  }

  computeMatrix(viewProjectionMatrix: m4.Mat4): m4.Mat4 {
    var matrix = m4.translate(viewProjectionMatrix, this.position);
    matrix = m4.scale(matrix, this.scaleValue);
    matrix = m4.rotateX(matrix, this.rotationX);
    matrix = m4.rotateY(matrix, this.rotationY);
    matrix = m4.rotateZ(matrix, this.rotationZ);
    return matrix
  }

  update(dt: number) { }

  draw(gl: WebGL2RenderingContext) {
    let programInfo = this.programInfo;
    gl.useProgram(programInfo.program);
    gl.bindVertexArray(this.vertexArray);
    setUniforms(programInfo, this.uniforms);
    drawBufferInfo(gl, this.bufferInfo);
  }
}