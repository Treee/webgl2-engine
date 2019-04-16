/// <reference types="webgl2" />
import * as twgl from 'twgl.js';
import { VertexShader } from './vertex-shader';
import { FragmentShader } from './fragment-shader';
export declare class ShaderManager {
    programs: Map<string, twgl.ProgramInfo>;
    vs: VertexShader;
    fs: FragmentShader;
    constructor();
    initializeShaderPrograms(gl: WebGL2RenderingContext): void;
    getShader(shaderKey: string): WebGLProgram;
    private initializeBasicShader;
    private initializeShaderProgram;
}
