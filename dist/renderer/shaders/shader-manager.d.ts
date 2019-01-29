/// <reference types="webgl2" />
import { BasicShaderVariables } from './shader-bound-variables';
export declare class ShaderManager {
    shaderVariables: BasicShaderVariables;
    basicShader: WebGLProgram;
    basicParticleShader: WebGLProgram;
    constructor();
    initializeShaderPrograms(gl: WebGL2RenderingContext): void;
}
