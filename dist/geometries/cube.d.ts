/// <reference types="webgl2" />
import { RenderableObject } from "./renderable-object";
import { ProgramInfo } from "twgl.js";
export declare class Cube extends RenderableObject {
    constructor(gl: WebGL2RenderingContext, progInfo: ProgramInfo, uniforms: any);
}
