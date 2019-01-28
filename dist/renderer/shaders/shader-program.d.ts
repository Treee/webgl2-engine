/// <reference types="webgl2" />
export declare class ShaderProgram {
    constructor();
    getBasic2dProgram(gl: WebGL2RenderingContext): WebGLProgram;
    getBasicParticleProgram(gl: WebGL2RenderingContext): WebGLProgram;
    private createShaderProgram;
    private createVertexShader;
    private createFragmentShader;
    private createProgram;
    private compileShader;
}
