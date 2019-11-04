import * as twgl from 'twgl.js';
import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';
export declare class ShaderManager {
    programs: Map<string, twgl.ProgramInfo>;
    vs: VertexShader;
    fs: FragmentShader;
    constructor();
    initializeShaderPrograms(gl: WebGLRenderingContext): void;
    getShader(shaderKey: string): twgl.ProgramInfo;
    private initializeBasicShader;
    private initializeBasicTextureShader;
    private initializeShaderProgram;
}
