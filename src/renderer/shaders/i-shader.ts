export interface IShader {
    getBasicShader(gl: WebGLRenderingContext): WebGLShader | null;
}
