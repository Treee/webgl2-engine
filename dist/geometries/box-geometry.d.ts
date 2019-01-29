/// <reference types="webgl2" />
import { Renderable } from './renderable';
import { ProgramInfo } from '../renderer/shaders/program-info';
export declare class BoxGeometry extends Renderable {
    constructor(gl: WebGL2RenderingContext, programInfo: ProgramInfo);
    private createRectangle;
    private createRandomRectangle;
    randomInt(range: number): number;
}
