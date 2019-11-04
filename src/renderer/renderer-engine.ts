import { ShaderManager } from './shaders/shader-manager';
import { RenderableManager } from './renderables/renderable-manager';
import { InputManager } from '../input-interfaces/input-manager';

export class RendererEngine {

    canvas!: HTMLCanvasElement;

    gl!: WebGLRenderingContext;

    renderableManager!: RenderableManager;
    shaderManager: ShaderManager;
    inputManager: InputManager;

    constructor(inputManager: InputManager) {
        this.shaderManager = new ShaderManager();
        this.inputManager = inputManager;
    }

    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);

        this.shaderManager.initializeShaderPrograms(this.gl);

        this.renderableManager = new RenderableManager(this.gl, this.shaderManager, this.inputManager);
        this.renderableManager.setDefaultScene();
    }

    public drawScene(dt: number): void {
        this.renderableManager.drawScene(this.gl, dt);
    }

    public applyUserInput(input: InputManager): void {
        this.renderableManager.applyUserInput(input);
    }

    private initializeCanvasGL(htmlCanvasElement: HTMLCanvasElement, width: number, height: number): void {
        // get the canvas from the html
        this.canvas = htmlCanvasElement;
        if (!this.canvas) {
            throw new Error('The Canvas is not defined.');
        }

        // get the webgl 2 context
        this.gl = this.canvas.getContext('webgl2') as WebGLRenderingContext;
        if (!this.gl) {
            throw new Error('GL Context not initialized.');
        }

        // set the width and height of the canvas
        this.canvas.width = width;
        this.canvas.height = height;

        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}