import { RenderableObject } from "./renderable-object";
import { ProgramInfo } from "twgl.js";
export declare class Cube extends RenderableObject {
    xAxisRange: number;
    yAxisRange: number;
    zAxisRange: number;
    defaultUniforms: {
        u_colorMult: number[];
        u_matrix: number[];
    };
    constructor();
    initializeObject(gl: WebGLRenderingContext, progInfo: ProgramInfo, uniforms: any): void;
    rotate(dt: number): void;
}
