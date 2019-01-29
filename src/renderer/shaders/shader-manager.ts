import { ShaderProgram } from './shader-program';
import { BasicShaderVariables } from './shader-bound-variables';
export class ShaderManager {

  // shaderProgram: ShaderProgram | undefined;
  shaderVariables: BasicShaderVariables;

  basicShader!: WebGLProgram;
  basicParticleShader!: WebGLProgram;


  constructor() {
    this.shaderVariables = new BasicShaderVariables();
  }

  public initializeShaderPrograms(gl: WebGL2RenderingContext) {
    // create the default shader program for a 2d program
    const shaderProgram = new ShaderProgram();
    this.basicShader = shaderProgram.getBasic2dProgram(gl);
    this.basicParticleShader = shaderProgram.getBasicParticleProgram(gl);

    // set uniforms
    this.shaderVariables = new BasicShaderVariables();
    this.shaderVariables.u_transform = gl.getUniformLocation(this.basicShader, 'u_transform');
    this.shaderVariables.u_color = gl.getUniformLocation(this.basicShader, 'u_color');
  }
}