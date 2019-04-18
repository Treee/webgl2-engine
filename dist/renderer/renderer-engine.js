"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_manager_1 = require("./shaders/shader-manager");
const renderable_manager_1 = require("./renderables/renderable-manager");
class RendererEngine {
    constructor() {
        this.shaderManager = new shader_manager_1.ShaderManager();
    }
    initializeRenderer(htmlCanvasElement, width, height) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);
        this.shaderManager.initializeShaderPrograms(this.gl);
        this.renderableManager = new renderable_manager_1.RenderableManager(this.gl, this.shaderManager);
        this.renderableManager.setDefaultScene();
    }
    drawScene(dt) {
        this.renderableManager.drawScene(this.gl, dt);
    }
    applyUserInput(activeKeysMap, mouseInputs) {
        this.renderableManager.applyUserInput(activeKeysMap, mouseInputs);
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
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}
exports.RendererEngine = RendererEngine;
//# sourceMappingURL=renderer-engine.js.map