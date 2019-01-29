/// <reference types="webgl2" />
import { ProgramInfo } from './program-info';
export declare class ShaderManager {
    programs: Map<string, ProgramInfo>;
    constructor();
    initializeShaderPrograms(gl: WebGL2RenderingContext): void;
    getShader(shaderKey: string): WebGLProgram;
}
