"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const mat3_1 = require("../math/mat3");
const shader_program_1 = require("../renderer/shaders/shader-program");
class RendererEngine {
    constructor() {
        this.projectionMatrix = new mat3_1.Mat3();
    }
    initializeRenderer(htmlCanvasElement, width, height) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);
        this.initializeShaderPrograms(this.gl);
    }
    drawFrame(dt, renderableObjects) {
        if (!this.gl) {
            throw new Error('Cannot Draw Frame, GL is undefined');
        }
        // Tell it to use our program (pair of shaders)
        this.gl.useProgram(this.basicShader);
        // set up attribute and uniforms (vertex shader)
        const transformUniformLocation = this.gl.getUniformLocation(this.basicShader, 'u_transform');
        // // set up attribute and uniforms (fragment shader)
        const colorUniformLocation = this.gl.getUniformLocation(this.basicShader, 'u_color');
        // Clear the canvas
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        if (!renderableObjects) {
            throw new Error('Cannot Draw Frame, Renderable Objects is undefined');
        }
        renderableObjects.forEach(renderable => {
            if (!this.gl) {
                throw new Error('Cannot Draw Renderable, GL is undefined');
            }
            renderable.draw(this.gl, colorUniformLocation, transformUniformLocation, this.projectionMatrix);
        });
    }
    getCanvasDimensions() {
        let canvasDimensions = new vec3_1.Vec3();
        if (this.canvas) {
            canvasDimensions.set(this.canvas.width, this.canvas.height, 0);
        }
        return canvasDimensions;
    }
    initializeShaderPrograms(gl) {
        // create the default shader program for a 2d program
        const shaderProgram = new shader_program_1.ShaderProgram();
        this.basicShader = shaderProgram.getBasic2dProgram(gl);
        this.basicParticleShader = shaderProgram.getBasicParticleProgram(gl);
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
        // note the -2 for the height. this flips the axis so 0 is at the top
        // width    0     0
        //   0   -height  0
        //  -1      1     1
        this.projectionMatrix.set(2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1);
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}
exports.RendererEngine = RendererEngine;
//# sourceMappingURL=renderer-engine.js.map