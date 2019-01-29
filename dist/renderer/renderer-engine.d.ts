/// <reference types="webgl2" />
import { Vec3 } from '../math/vec3';
import { Mat3 } from '../math/mat3';
import { BoxGeometry } from '../geometries/box-geometry';
import { ShaderManager } from './shaders/shader-manager';
export declare class RendererEngine {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    shaderManager: ShaderManager;
    projectionMatrix: Mat3;
    constructor();
    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number): void;
    drawFrame(dt: Number, renderableObjects: BoxGeometry[]): void;
    getCanvasDimensions(): Vec3;
    private initializeCanvasGL;
}
