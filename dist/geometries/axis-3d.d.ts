/// <reference types="webgl2" />
import { RenderableObject } from "./renderable-object";
import { ProgramInfo } from "twgl.js";
export declare class Axis3D extends RenderableObject {
    defaultUniforms: {
        u_colorMult: number[];
        u_matrix: number[];
    };
    constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any);
    draw(gl: WebGL2RenderingContext): void;
}
