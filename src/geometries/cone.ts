import { RenderableObject } from "./renderable-object";
import { ProgramInfo, createBufferInfoFromArrays, createVAOFromBufferInfo } from "twgl.js";

export class Cone extends RenderableObject {

  coneHeight: number = 1;
  baseDiameter: number = 1;
  numConeSides: number = 16;

  defaultUniforms = {
    u_colorMult: [1, 1, 1, 1],
    u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  };

  constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any) {
    super();
    this.alias = 'cone';

    let conePositions = [];
    let coneIndices = [];
    let coneColors = [];
    let theta = (2 * Math.PI) / this.numConeSides;
    for (let coneSide = 0; coneSide < this.numConeSides; coneSide++) {
      let leftBaseTheta = theta * coneSide;
      let rightBase = theta * (coneSide + 1);
      conePositions.push(0, this.coneHeight, 0, Math.cos(leftBaseTheta), 0, Math.sin(leftBaseTheta), Math.cos(rightBase), 0, Math.sin(rightBase));
      coneIndices.push(0, coneSide + 1, coneSide);
      coneColors.push(1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1);
    }

    let arrays = {
      position: conePositions,
      color: coneColors,
      indices: coneIndices
    }
    let coneBufferInfo = createBufferInfoFromArrays(gl, arrays);

    this.bufferInfo = coneBufferInfo;
    this.programInfo = progInfo;
    this.vertexArray = createVAOFromBufferInfo(gl, progInfo, coneBufferInfo) as unknown as WebGLVertexArrayObject;
    this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
  }

  rotate(dt: number) {
    this.rotationX = dt;
    this.rotationY = -dt;
  }
}
