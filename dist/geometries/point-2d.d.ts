/// <reference types="webgl2" />
import { Renderable } from './renderable';
export declare class Point2D extends Renderable {
    constructor(x: number, y: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram);
}
