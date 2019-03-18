/// <reference types="webgl2" />
import { RenderableObject } from "./renderable-object";
import { ProgramInfo } from "twgl.js";
export declare class Cone extends RenderableObject {
    coneHeight: number;
    baseDiameter: number;
    numConeSides: number;
    defaultUniforms: {
        u_colorMult: number[];
        u_matrix: number[];
    };
    constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any);
    rotate(dt: number): void;
}
