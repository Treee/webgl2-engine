/// <reference types="webgl2" />
import { ShaderManager } from './shaders/shader-manager';
import { RenderableManager } from './renderables/renderable-manager';
import { InputManager } from '../input-interfaces/input-manager';
export declare class RendererEngine {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    renderableManager: RenderableManager;
    shaderManager: ShaderManager;
    inputManager: InputManager;
    constructor(inputManager: InputManager);
    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number): void;
    drawScene(dt: number): void;
    applyUserInput(input: InputManager): void;
    private initializeCanvasGL;
}
