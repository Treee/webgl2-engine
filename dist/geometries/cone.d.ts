/// <reference types="webgl2" />
import { RenderableObject } from "./renderable-object";
import { ProgramInfo } from "twgl.js";
export declare class Cone extends RenderableObject {
    constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any);
    rotate(dt: number): void;
}
