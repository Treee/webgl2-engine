/// <reference types="webgl2" />
export declare class ShaderProgram {
    constructor();
    getBasic2dProgram(gl: WebGL2RenderingContext): WebGLProgram;
    private createShaderProgram(gl, vertexShaderType, fragmentShaderType);
    private createVertexShader(gl, vertexShaderType);
    private createFragmentShader(gl, fragmentShaderType);
    private createProgram(gl, vertexShader, fragmentShader);
    private compileShader(gl, shaderSource, shaderType);
}
