"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_manager_1 = require("./shaders/shader-manager");
const camera_1 = require("./camera/camera");
const twgl = require("twgl.js");
const cube_1 = require("./renderables/cube");
const cone_1 = require("./renderables/cone");
const sphere_1 = require("./renderables/sphere");
const axis_3d_1 = require("./renderables/axis-3d");
const plane_1 = require("./renderables/plane");
const texture_entity_1 = require("./renderables/texture-entity");
const helper_1 = require("../math/helper");
class RendererEngine {
    constructor() {
        this.projectionMatrix = twgl.m4.identity();
        this.vs = `#version 300 es

        in vec4 a_position;
        in vec4 a_color;

        uniform mat4 u_matrix;

        out vec4 v_color;

        void main() {
            // Multiply the position by the matrix.
            gl_Position = u_matrix * a_position;

            // Pass the color to the fragment shader.
            v_color = a_color;
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
        this.textureVS = `#version 300 es

    in vec4 a_position;
    in vec4 a_color;
    in vec2 a_texCoord;

    uniform mat4 u_matrix;
    uniform vec2 u_resolution;

    out vec4 v_color;
    out vec2 v_texCoord;

    void main() {
        // Multiply the position by the matrix.
        gl_Position = u_matrix * a_position;
    
        // pass the texCoord to the fragment shader
        // The GPU will interpolate this value between points.
        v_texCoord = a_texCoord;
    }
`;
        this.textureFS = `#version 300 es
    precision mediump float;

    // Passed in from the vertex shader.
    in vec4 v_color;
    in vec2 v_texCoord;

    uniform vec4 u_colorMult;
    uniform sampler2D u_image;

    out vec4 outColor;

    void main() {
        outColor = texture(u_image, v_texCoord);
    }
    `;
        this.drawableObjects = [];
        this.shaderManager = new shader_manager_1.ShaderManager();
        this.debugCamera = new camera_1.Camera([0, 0, 0]);
    }
    initializeRenderer(htmlCanvasElement, width, height) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);
        twgl.setAttributePrefix("a_");
        // create program info
        this.defaultProgramInfo = twgl.createProgramInfo(this.gl, [this.vs, this.fs]);
        this.textureImageProgramInfo = twgl.createProgramInfo(this.gl, [this.textureVS, this.textureFS]);
        this.addDrawableObject('cube', [-40, 0, 0]);
        this.addDrawableObject('cube', [-0, 0, -20]);
        this.addDrawableObject('cube', [-20, 0, 0]);
        this.addDrawableObject('cube', [0, 0, 20]);
        this.addDrawableObject('cube', [20, 0, 0]);
        this.addDrawableObject('cube', [40, 0, 0]);
        this.addDrawableObject('cone', [0, -10, 0]);
        this.addDrawableObject('sphere', [0, 0, -50]);
        this.addDrawableObject('axis', [0, 0, 0]);
        this.addDrawableObject('plane', [0, -5, 0]);
        this.addDrawableObject('texture', [0, 0, 0], './assets/images/test-aoe2-screenshot.png');
        this.shaderManager.initializeShaderPrograms(this.gl);
    }
    addDrawableObject(type, position, imageSource = './assets/images/test-texture1.png') {
        switch (type) {
            case 'texture':
                let tex = new texture_entity_1.TextureEntity(this.gl, this.textureImageProgramInfo, {}, imageSource);
                tex.translate(0, position);
                tex.scale(0, [100, 0, 100]);
                this.drawableObjects.push(tex);
                return;
            case 'cube':
                let myCube = new cube_1.Cube(this.gl, this.defaultProgramInfo, {});
                myCube.translate(0, position);
                this.drawableObjects.push(myCube);
                return;
            case 'sphere':
                let sphere = new sphere_1.Sphere(this.gl, this.defaultProgramInfo, {});
                sphere.translate(0, position);
                this.drawableObjects.push(sphere);
                return;
            case 'cone':
                let cone = new cone_1.Cone(this.gl, this.defaultProgramInfo, {});
                cone.translate(0, position);
                this.drawableObjects.push(cone);
                return;
            case 'axis':
                let axis = new axis_3d_1.Axis3D(this.gl, this.defaultProgramInfo, {});
                axis.translate(0, position);
                axis.scale(0, [100, 100, 100]);
                this.drawableObjects.push(axis);
                return;
            case 'plane':
                let plane = new plane_1.Plane(this.gl, this.defaultProgramInfo, {});
                plane.translate(0, position);
                plane.scale(0, [200, 0, 200]);
                this.drawableObjects.push(plane);
                return;
            default:
                let stuff = new cube_1.Cube(this.gl, this.defaultProgramInfo, {});
                stuff.translate(0, position);
                this.drawableObjects.push(stuff);
                return;
        }
    }
    getCanvasDimensions() {
        let canvasDimensions = [0, 0, 0];
        if (this.canvas) {
            canvasDimensions = [this.canvas.width, this.canvas.height, 0];
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
        let aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        let fieldOfViewRadians = helper_1.degreesToRadian(90);
        this.projectionMatrix = twgl.m4.perspective(fieldOfViewRadians, aspect, 0.01, 2000);
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
    drawScene(gl, dt) {
        dt = dt * 0.001; // take the current dt and make it even smaller
        twgl.resizeCanvasToDisplaySize(gl.canvas);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        // gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        let viewProjectionMatrix = this.debugCamera.getViewProjectionMatrix(this.projectionMatrix);
        this.drawableObjects.forEach(obj => {
            // obj.rotate(dt);
            obj.update(dt, viewProjectionMatrix);
            obj.draw(gl);
        });
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
}
exports.RendererEngine = RendererEngine;
//# sourceMappingURL=renderer-engine.js.map