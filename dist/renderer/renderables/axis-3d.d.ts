/// <reference types="webgl2" />
import { RenderableObject } from './renderable-object';
import { ProgramInfo } from 'twgl.js';
export declare class Axis3D extends RenderableObject {
    xAxisRange: number;
    yAxisRange: number;
    zAxisRange: number;
    defaultUniforms: {
        u_colorMult: number[];
        u_matrix: number[];
    };
    constructor();
    initializeObject(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any): void;
    draw(gl: WebGL2RenderingContext): void;
}
