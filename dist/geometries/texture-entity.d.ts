/// <reference types="webgl2" />
import { RenderableObject } from "./renderable-object";
import { ProgramInfo } from "twgl.js";
export declare class TextureEntity extends RenderableObject {
    xAxisRange: number;
    zAxisRange: number;
    defaultUniforms: {
        u_colorMult: number[];
        u_matrix: number[];
    };
    texture: {};
    constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any);
    draw(gl: WebGL2RenderingContext): void;
    rotate(dt: number): void;
}
