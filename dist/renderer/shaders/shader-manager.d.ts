/// <reference types="webgl2" />
import { ProgramInfoTree } from './program-info';
export declare class ShaderManager {
    programs: Map<string, ProgramInfoTree>;
    constructor();
    initializeShaderPrograms(gl: WebGL2RenderingContext): void;
    getShader(shaderKey: string): WebGLProgram;
}
