/// <reference types="webgl2" />
import { Renderable } from './renderable';
import { ProgramInfo } from '../renderer/shaders/program-info';
export declare class Point2D extends Renderable {
    constructor(x: number, y: number, gl: WebGL2RenderingContext, programInfo: ProgramInfo);
}
