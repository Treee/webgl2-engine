import { ProgramInfo, BufferInfo, m4, setUniforms, drawBufferInfo, v3 } from "twgl.js";

export abstract class RenderableObject {
  programInfo!: ProgramInfo;
  bufferInfo!: BufferInfo;
  vertexArray!: WebGLVertexArrayObject;
  uniforms!: any; // object of arrays

  alias: string = 'default';

  isDirty: boolean = false; // helps us only update things that need to be updated

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
    this.setDirty(true);
  }

  scale(dt: number, scaleAmount: v3.Vec3) {
    this.scaleValue = scaleAmount;
    this.setDirty(true);
  }

  rotate(dt: number) {
    this.rotationX = -dt;
    this.rotationY = dt;
    this.setDirty(true);
  }

  lerp(start: v3.Vec3, end: v3.Vec3, step: number) {
    // ((1 - step) * start) + (step * end)
    return v3.add(v3.mulScalar(start, (1 - step)), v3.mulScalar(end, step));
  }

  computeMatrix(viewProjectionMatrix: m4.Mat4): m4.Mat4 {
    var matrix = m4.translate(viewProjectionMatrix, this.position);
    matrix = m4.scale(matrix, this.scaleValue);
    matrix = m4.rotateX(matrix, this.rotationX);
    matrix = m4.rotateY(matrix, this.rotationY);
    matrix = m4.rotateZ(matrix, this.rotationZ);
    return matrix
  }

  update(dt: number, viewProjectionMatrix: any) {
    if (this.isDirty) { // if this object needs updating
      if (this.uniforms) { //if there are uniforms
        this.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix);
      }
      this.setDirty(false);
    }
  }

  setDirty(isDirty: boolean): void {
    this.isDirty = isDirty;
  }

  draw(gl: WebGL2RenderingContext) {
    // gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let programInfo = this.programInfo;
    gl.useProgram(programInfo.program);
    gl.bindVertexArray(this.vertexArray);
    setUniforms(programInfo, this.uniforms);
    drawBufferInfo(gl, this.bufferInfo);
  }
}