/// <reference types="webgl2" />
import { Renderable } from './renderable';
export declare class BoxGeometry extends Renderable {
    constructor(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram);
    private createRectangle;
    private createRandomRectangle;
    randomInt(range: number): number;
}
