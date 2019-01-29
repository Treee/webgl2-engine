/// <reference types="webgl2" />
export declare class ProgramInfo {
    program: WebGLProgram;
    uniforms: Map<string, WebGLUniformLocation | null>;
    attributes: Map<string, WebGLUniformLocation | null>;
    constructor();
    setUniforms(gl: WebGL2RenderingContext, uniformKeys: string[]): void;
    getUniform(key: string): WebGLUniformLocation;
}
