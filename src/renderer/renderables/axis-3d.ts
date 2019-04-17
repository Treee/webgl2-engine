import { RenderableObject } from './renderable-object';
import { ProgramInfo, createVAOFromBufferInfo, createBufferInfoFromArrays, setUniforms, drawBufferInfo } from 'twgl.js';

export class Axis3D extends RenderableObject {

  xAxisRange: number = 100;
  yAxisRange: number = 100;
  zAxisRange: number = 100;

  defaultUniforms = {
    u_colorMult: [1, 0.5, 0.5, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  };

  constructor() {
    super();
    this.alias = 'axis-3d';
  }

  initializeObject(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    let arrays = {
      position: [-this.xAxisRange, 0, 0, this.xAxisRange, 0, 0, 0, -this.yAxisRange, 0, 0, this.yAxisRange, 0, 0, 0, -this.zAxisRange, 0, 0, this.zAxisRange],
      color: [0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1],
      indices: [0, 1, 2, 3, 4, 5]
    }

    let axisBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.bufferInfo = axisBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, axisBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    this.position = [0, 0, 0];
    this.setDirty(true);
  }

  draw(gl: WebGL2RenderingContext) {
    let programInfo = this.programInfo;
    gl.useProgram(programInfo.program);
    gl.bindVertexArray(this.vertexArray);
    setUniforms(programInfo, this.uniforms);
    drawBufferInfo(gl, this.bufferInfo, gl.LINES);
  }
}