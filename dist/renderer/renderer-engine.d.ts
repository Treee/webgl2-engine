/// <reference types="webgl2" />
import { ShaderManager } from './shaders/shader-manager';
import { RenderableManager } from './renderables/renderable-manager';
export declare class RendererEngine {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    renderableManager: RenderableManager;
    shaderManager: ShaderManager;
    constructor();
    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number): void;
    drawScene(dt: number): void;
    applyUserInput(activeKeysMap: any, mouseInputs: any): void;
    private initializeCanvasGL;
}
