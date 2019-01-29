export class ProgramInfo {
  program!: WebGLProgram;
  uniforms!: Map<string, WebGLUniformLocation | null>;
  attributes!: Map<string, WebGLUniformLocation | null>;

  constructor() {
    this.uniforms = new Map<string, WebGLUniformLocation>();
    this.attributes = new Map<string, WebGLUniformLocation>();
  }

  setUniforms(gl: WebGL2RenderingContext, uniformKeys: string[]) {
    uniformKeys.forEach((key) => {
      this.uniforms.set(key, gl.getUniformLocation(this.program, key));
    });
  }

  getUniform(key: string): WebGLUniformLocation {
    if (!this.uniforms.has(key)) {
      throw new Error(`Uniform Key ${key} does not exist in the uniform map.`);
    }
    const uniform = this.uniforms.get(key);
    if (!uniform) {
      throw new Error(`Uniform ${key} does not exist.`);
    }
    return uniform;
  }
}