import { ShaderManager } from './shaders/shader-manager';
import { Camera } from './camera/camera';

import * as twgl from 'twgl.js';

import { degreesToRadian } from '../math/helper';
import { RenderableManager } from './renderables/renderable-manager';

export class RendererEngine {

    canvas!: HTMLCanvasElement;

    gl!: WebGL2RenderingContext;

    renderableManager!: RenderableManager;
    shaderManager!: ShaderManager;
    debugCamera!: Camera;

    projectionMatrix: twgl.m4.Mat4 = twgl.m4.identity();

    constructor() {
        this.shaderManager = new ShaderManager();
        this.debugCamera = new Camera([0, 0, 0]);
    }

    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);

        this.shaderManager.initializeShaderPrograms(this.gl);

        this.renderableManager = new RenderableManager(this.gl, this.shaderManager);
        this.renderableManager.setDefaultScene();
    }

    public getCanvasDimensions(): twgl.v3.Vec3 {
        let canvasDimensions = [0, 0, 0];
        if (this.canvas) {
            canvasDimensions = [this.canvas.width, this.canvas.height, 0];
        }
        return canvasDimensions;
    }

    public drawScene(gl: WebGL2RenderingContext, dt: number): void {
        this.renderableManager.drawScene(gl, dt, this.debugCamera, this.projectionMatrix);
    }

    public applyUserInput(activeKeysMap: any, mouseInputs: any): void {
        if (activeKeysMap['w']) {
            // move forward
            this.debugCamera.moveForward();
        } if (activeKeysMap['s']) {
            // movve backward
            this.debugCamera.moveBackward();
        } if (activeKeysMap['a']) {
            // strafe left
            this.debugCamera.moveLeft();
        } if (activeKeysMap['d']) {
            // strafe right
            this.debugCamera.moveRight();
        } if (activeKeysMap['r']) {
            // rise
            this.debugCamera.moveUp();
        } if (activeKeysMap['f']) {
            // fall
            this.debugCamera.moveDown();
        } if (mouseInputs.leftMouseClicked && mouseInputs.mouseIsMoving) {
            this.debugCamera.pitch(mouseInputs.y);
            this.debugCamera.yaw(mouseInputs.x);
        }
    }

    private initializeCanvasGL(htmlCanvasElement: HTMLCanvasElement, width: number, height: number): void {
        // get the canvas from the html
        this.canvas = htmlCanvasElement;
        if (!this.canvas) {
            throw new Error('The Canvas is not defined.');
        }

        // get the webgl 2 context
        this.gl = this.canvas.getContext('webgl2') as WebGL2RenderingContext;
        if (!this.gl) {
            throw new Error('GL Context not initialized.');
        }

        // set the width and height of the canvas
        this.canvas.width = width;
        this.canvas.height = height;


        let aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        let fieldOfViewRadians = degreesToRadian(90);
        this.projectionMatrix = twgl.m4.perspective(fieldOfViewRadians, aspect, 0.01, 2000);
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}