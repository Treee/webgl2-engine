"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_manager_1 = require("./shaders/shader-manager");
const camera_1 = require("./camera/camera");
const twgl = require("twgl.js");
const helper_1 = require("../math/helper");
const renderable_manager_1 = require("./renderables/renderable-manager");
class RendererEngine {
    constructor() {
        this.projectionMatrix = twgl.m4.identity();
        this.shaderManager = new shader_manager_1.ShaderManager();
        this.debugCamera = new camera_1.Camera([0, 0, 0]);
    }
    initializeRenderer(htmlCanvasElement, width, height) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);
        this.shaderManager.initializeShaderPrograms(this.gl);
        this.renderableManager = new renderable_manager_1.RenderableManager(this.gl, this.shaderManager);
        this.renderableManager.setDefaultScene();
    }
    getCanvasDimensions() {
        let canvasDimensions = [0, 0, 0];
        if (this.canvas) {
            canvasDimensions = [this.canvas.width, this.canvas.height, 0];
        }
        return canvasDimensions;
    }
    drawScene(dt) {
        this.renderableManager.drawScene(this.gl, dt, this.debugCamera, this.projectionMatrix);
    }
    applyUserInput(activeKeysMap, mouseInputs) {
        if (activeKeysMap['w']) {
            // move forward
            this.debugCamera.moveForward();
        }
        if (activeKeysMap['s']) {
            // movve backward
            this.debugCamera.moveBackward();
        }
        if (activeKeysMap['a']) {
            // strafe left
            this.debugCamera.moveLeft();
        }
        if (activeKeysMap['d']) {
            // strafe right
            this.debugCamera.moveRight();
        }
        if (activeKeysMap['r']) {
            // rise
            this.debugCamera.moveUp();
        }
        if (activeKeysMap['f']) {
            // fall
            this.debugCamera.moveDown();
        }
        if (mouseInputs.leftMouseClicked && mouseInputs.mouseIsMoving) {
            this.debugCamera.pitch(mouseInputs.y);
            this.debugCamera.yaw(mouseInputs.x);
        }
    }
    initializeCanvasGL(htmlCanvasElement, width, height) {
        // get the canvas from the html
        this.canvas = htmlCanvasElement;
        if (!this.canvas) {
            throw new Error('The Canvas is not defined.');
        }
        // get the webgl 2 context
        this.gl = this.canvas.getContext('webgl2');
        if (!this.gl) {
            throw new Error('GL Context not initialized.');
        }
        // set the width and height of the canvas
        this.canvas.width = width;
        this.canvas.height = height;
        let aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        let fieldOfViewRadians = helper_1.degreesToRadian(90);
        this.projectionMatrix = twgl.m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}
exports.RendererEngine = RendererEngine;
//# sourceMappingURL=renderer-engine.js.map