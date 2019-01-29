import { ShaderProgram } from './shader-program';
import { ProgramInfo } from './program-info';
export class ShaderManager {

  programs: Map<string, ProgramInfo>;

  constructor() {
    this.programs = new Map<string, ProgramInfo>();
  }

  public initializeShaderPrograms(gl: WebGL2RenderingContext) {
    // create the default shader program for a 2d program
    const shaderProgram = new ShaderProgram();
    const basicProgramInfo = new ProgramInfo();
    basicProgramInfo.program = shaderProgram.getBasic2dProgram(gl);
    basicProgramInfo.setUniforms(gl, ['u_transform', 'u_color']);
    this.programs.set('basic-shader', basicProgramInfo);


    const basicParticleProgramInfo = new ProgramInfo();
    basicParticleProgramInfo.program = shaderProgram.getBasicParticleProgram(gl);
    basicParticleProgramInfo.setUniforms(gl, ['u_transform', 'u_color']);
    this.programs.set('basic-particle-shader', basicParticleProgramInfo);
  }

  public getShader(shaderKey: string): WebGLProgram {
    if (!this.programs.has(shaderKey)) {
      throw new Error('Shader key does not exist.');
    }
    const shaderProgram = this.programs.get(shaderKey);
    if (!shaderProgram) {
      throw new Error('Shader program does not exist.');
    }
    return shaderProgram.program;
  }
}