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
    constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, image: ImageData);
    setStuff(gl: WebGL2RenderingContext, program: WebGLProgram, image: ImageData): void;
    setRectangle(gl: WebGL2RenderingContext, x: number, y: number, width: number, height: number): void;
    draw(gl: WebGL2RenderingContext): void;
    rotate(dt: number): void;
}
