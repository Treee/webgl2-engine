import { VertexShaderType, FragmentShaderType } from './shader-types';

import * as twgl from 'twgl.js';
import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';

export class ShaderManager {

  programs: Map<string, twgl.ProgramInfo>;
  vs: VertexShader;
  fs: FragmentShader;

  constructor() {
    this.programs = new Map<string, twgl.ProgramInfo>();
    this.vs = new VertexShader();
    this.fs = new FragmentShader();
  }

  public initializeShaderPrograms(gl: WebGLRenderingContext) {
    this.programs.set('basic-shader', this.initializeBasicShader(gl));
    this.programs.set('basic-texture-shader', this.initializeBasicTextureShader(gl));
  }

  public getShader(shaderKey: string): twgl.ProgramInfo {
    if (!this.programs.has(shaderKey)) {
      throw new Error('Shader key does not exist.');
    }
    const shaderProgram = this.programs.get(shaderKey);
    if (!shaderProgram) {
      throw new Error('Shader program does not exist.');
    }
    return shaderProgram;
  }


  private initializeBasicShader(gl: WebGLRenderingContext): twgl.ProgramInfo {
    return this.initializeShaderProgram(gl, this.vs.getVertexShaderCode(VertexShaderType.THREE_D), this.fs.getfragmentShaderCode(FragmentShaderType.PASS_THROUGH));
  }

  private initializeBasicTextureShader(gl: WebGLRenderingContext): twgl.ProgramInfo {
    return this.initializeShaderProgram(gl, this.vs.getVertexShaderCode(VertexShaderType.TEXTURE), this.fs.getfragmentShaderCode(FragmentShaderType.TEXTURE));
  }

  private initializeShaderProgram(gl: WebGLRenderingContext, vertexShader: string, fragmentShader: string, attributePrefix: string = 'a_'): twgl.ProgramInfo {
    twgl.setAttributePrefix(attributePrefix);
    return twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
  }
}