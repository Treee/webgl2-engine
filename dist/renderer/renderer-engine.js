"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const mat3_1 = require("../math/mat3");
const shader_manager_1 = require("./shaders/shader-manager");
const camera_1 = require("./camera/camera");
const twgl = require("twgl.js");
const cube_1 = require("../geometries/cube");
const cone_1 = require("../geometries/cone");
const sphere_1 = require("../geometries/sphere");
class RendererEngine {
    constructor() {
        this.projectionMatrix = new mat3_1.Mat3();
        this.fieldOfViewRadians = 0;
        this.cubeUniforms = {};
        this.sphereUniforms = {};
        this.coneUniforms = {};
        this.vs = `#version 300 es

        in vec4 a_position;
        in vec4 a_color;

        uniform mat4 u_matrix;

        out vec4 v_color;

        void main() {
        // Multiply the position by the matrix.
        gl_Position = u_matrix * a_position;

        // Pass the color to the fragment shader.
        // v_color = a_color;
        v_color = a_position;
        }
    `;
        this.fs = `#version 300 es
        precision mediump float;

        // Passed in from the vertex shader.
        in vec4 v_color;

        uniform vec4 u_colorMult;

        out vec4 outColor;

        void main() {
        outColor = v_color * u_colorMult;
        }
    `;
        this.drawableObjects = [];
        this.shaderManager = new shader_manager_1.ShaderManager();
        this.debugCamera = new camera_1.Camera([0, 0, 100]);
    }
    initializeRenderer(htmlCanvasElement, width, height) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);
        this.fieldOfViewRadians = this.degreesToRadian(60);
        twgl.setAttributePrefix("a_");
        // create program info
        let programInfo = twgl.createProgramInfo(this.gl, [this.vs, this.fs]);
        //set uniforms
        this.cubeUniforms = {
            u_colorMult: [1, 0.5, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        };
        this.coneUniforms = {
            u_colorMult: [0.5, 0.5, 1, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.sphereUniforms = {
            u_colorMult: [0.5, 1, 0.5, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        let myCube = new cube_1.Cube(this.gl, programInfo, this.cubeUniforms);
        let myCone = new cone_1.Cone(this.gl, programInfo, this.coneUniforms);
        let mySphere = new sphere_1.Sphere(this.gl, programInfo, this.sphereUniforms);
        this.drawableObjects.push(myCube);
        this.drawableObjects.push(myCone);
        this.drawableObjects.push(mySphere);
        this.shaderManager.initializeShaderPrograms(this.gl);
    }
    drawFrame(dt, renderableObjects) {
        if (!this.gl) {
            throw new Error('Cannot Draw Frame, GL is undefined');
        }
        // Tell it to use our program (pair of shaders)
        // this.gl.useProgram(this.shaderManager.getShader('basic-shader'));
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
            renderable.draw(this.gl, this.projectionMatrix);
        });
    }
    getCanvasDimensions() {
        let canvasDimensions = new vec3_1.Vec3();
        if (this.canvas) {
            canvasDimensions.set(this.canvas.width, this.canvas.height, 0);
        }
        return canvasDimensions;
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
    drawScene(gl, dt) {
        dt = dt * 0.001; // take the current dt and make it even smaller
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let projectionMatrix = twgl.m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);
        let viewProjectionMatrix = this.debugCamera.getViewProjectionMatrix(projectionMatrix);
        this.drawableObjects.forEach(obj => {
            obj.rotate(dt);
            obj.move(dt, viewProjectionMatrix);
            let programInfo = obj.programInfo;
            gl.useProgram(programInfo.program);
            gl.bindVertexArray(obj.vertexArray);
            twgl.setUniforms(programInfo, obj.uniforms);
            twgl.drawBufferInfo(gl, obj.bufferInfo);
        });
    }
    drawObjects(gl, objectsToDraw) {
        objectsToDraw.forEach(obj => {
            let programInfo = obj.programInfo;
            gl.useProgram(programInfo.program);
            gl.bindVertexArray(obj.vertexArray);
            twgl.setUniforms(programInfo, obj.uniforms);
            twgl.drawBufferInfo(gl, obj.bufferInfo);
        });
    }
    degreesToRadian(degrees) {
        return degrees * Math.PI / 180;
    }
}
exports.RendererEngine = RendererEngine;
//# sourceMappingURL=renderer-engine.js.map