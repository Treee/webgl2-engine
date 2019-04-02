import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createBufferInfoFromArrays, createVAOFromBufferInfo, createTexture, TextureOptions, setUniforms, drawBufferInfo } from "twgl.js";

export class TextureEntity extends RenderableObject {

  xAxisRange: number = 1;
  zAxisRange: number = 1;

  defaultUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  texture = {};

  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'texture-entity';
    let arrays = {
      position: { numComponents: 3, data: [
            -this.xAxisRange, 0, -this.zAxisRange, // back left corner
            this.xAxisRange, 0, -this.zAxisRange,  // back right corner
            -this.xAxisRange, 0, this.zAxisRange,  // front left corner
            this.xAxisRange, 0, this.zAxisRange    // front right corner
          ]},
      texcoord: {numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1]},
      normal: {numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]},
      indices: {numComponents: 3, data: [0, 1, 2, 1, 2, 3]}
    };




    // let arrays = {
    //   position: [
    //     -this.xAxisRange, 0, -this.zAxisRange, // back left corner
    //     this.xAxisRange, 0, -this.zAxisRange,  // back right corner
    //     -this.xAxisRange, 0, this.zAxisRange,  // front left corner
    //     this.xAxisRange, 0, this.zAxisRange    // front right corner
    //   ],
    //   color: [
    //     0, 1, 0, 1, // back left corner
    //     0, 1, 0, 1, // back right corner
    //     0, 0, 1, 1, // front left corner
    //     0, 0, 1, 1  // front right corner
    //   ],
    //   indices: [0, 2, 1, 1, 2, 3] // counter clock-wise is front face
    // }

    let planeBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.texture = createTexture(gl, {
      test1: { src: '../assets/images/texture-test.jpg' }
    } as TextureOptions);

    this.bufferInfo = planeBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, planeBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
  }

  draw(gl: WebGL2RenderingContext) {
    let programInfo = this.programInfo;
    gl.useProgram(programInfo.program);
    gl.bindVertexArray(this.vertexArray);
    setUniforms(programInfo, this.uniforms);    
    drawBufferInfo(gl, this.bufferInfo);
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = -dt;
  }
}
