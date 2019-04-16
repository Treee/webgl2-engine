/// <reference types="webgl2" />
import { ShaderManager } from './shaders/shader-manager';
import { Camera } from './camera/camera';
import * as twgl from 'twgl.js';
import { RenderableManager } from './renderables/renderable-manager';
export declare class RendererEngine {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    renderableManager: RenderableManager;
    shaderManager: ShaderManager;
    debugCamera: Camera;
    projectionMatrix: twgl.m4.Mat4;
    constructor();
    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number): void;
    getCanvasDimensions(): twgl.v3.Vec3;
    drawScene(gl: WebGL2RenderingContext, dt: number): void;
    applyUserInput(activeKeysMap: any, mouseInputs: any): void;
    private initializeCanvasGL;
}
