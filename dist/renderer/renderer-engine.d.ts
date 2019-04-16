/// <reference types="webgl2" />
import { ShaderManager } from './shaders/shader-manager';
import { RenderableObject } from './renderables/renderable-object';
import { Camera } from './camera/camera';
import * as twgl from 'twgl.js';
export declare class RendererEngine {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    shaderManager: ShaderManager;
    debugCamera: Camera;
    projectionMatrix: twgl.m4.Mat4;
    vs: string;
    fs: string;
    textureVS: string;
    textureFS: string;
    drawableObjects: RenderableObject[];
    defaultProgramInfo: twgl.ProgramInfo;
    textureImageProgramInfo: twgl.ProgramInfo;
    constructor();
    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number): void;
    addDrawableObject(type: string, position: number[], imageSource?: string): void;
    getCanvasDimensions(): twgl.v3.Vec3;
    private initializeCanvasGL;
    drawScene(gl: WebGL2RenderingContext, dt: number): void;
    applyUserInput(activeKeysMap: any, mouseInputs: any): void;
}
