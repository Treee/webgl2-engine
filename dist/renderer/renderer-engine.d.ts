/// <reference types="webgl2" />
import { Vec3 } from '../math/vec3';
import { Mat3 } from '../math/mat3';
import { BoxGeometry } from '../geometries/box-geometry';
import { ShaderManager } from './shaders/shader-manager';
import { RenderableObject } from '../geometries/renderable-object';
export declare class RendererEngine {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    shaderManager: ShaderManager;
    projectionMatrix: Mat3;
    fieldOfViewRadians: number;
    cubeUniforms: any;
    sphereUniforms: any;
    coneUniforms: any;
    vs: string;
    fs: string;
    drawableObjects: RenderableObject[];
    constructor();
    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number): void;
    drawFrame(dt: Number, renderableObjects: BoxGeometry[]): void;
    getCanvasDimensions(): Vec3;
    private initializeCanvasGL;
    drawScene(gl: WebGL2RenderingContext, dt: any): void;
    drawObjects(gl: WebGL2RenderingContext, objectsToDraw: RenderableObject[]): void;
    degreesToRadian(degrees: number): number;
    computeMatrix(viewProjectionMatrix: any, translation: any, xRotation: number, yRotation: number): number[] | Float32Array;
}
