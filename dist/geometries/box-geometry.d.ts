/// <reference types="webgl2" />
import { Renderable } from './renderable';
import { ProgramInfoTree } from '../renderer/shaders/program-info';
export declare class BoxGeometry extends Renderable {
    constructor(gl: WebGL2RenderingContext, programInfo: ProgramInfoTree);
    private createRectangle;
    private createRandomRectangle;
    randomInt(range: number): number;
}
