import { ShaderManager } from './shaders/shader-manager';
import { RenderableObject } from './renderables/renderable-object';
import { Camera } from './camera/camera';

import * as twgl from 'twgl.js';
import { Cube } from './renderables/cube';
import { Cone } from './renderables/cone';
import { Sphere } from './renderables/sphere';
import { Axis3D } from './renderables/axis-3d';
import { Plane } from './renderables/plane';
import { TextureEntity } from './renderables/texture-entity';

import { degreesToRadian } from '../math/helper';

export class RendererEngine {

    canvas!: HTMLCanvasElement;

    gl!: WebGL2RenderingContext;

    shaderManager!: ShaderManager;
    debugCamera!: Camera;

    projectionMatrix: twgl.m4.Mat4 = twgl.m4.identity();

    vs = `#version 300 es

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

    fs = `#version 300 es
        precision mediump float;

        // Passed in from the vertex shader.
        in vec4 v_color;

        uniform vec4 u_colorMult;

        out vec4 outColor;

        void main() {
            outColor = v_color * u_colorMult;
        }
    `;

    textureVS = `#version 300 es

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

    textureFS = `#version 300 es
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

    drawableObjects: RenderableObject[] = [];

    defaultProgramInfo!: twgl.ProgramInfo;
    textureImageProgramInfo!: twgl.ProgramInfo;

    constructor() {
        this.shaderManager = new ShaderManager();
        this.debugCamera = new Camera([0, 0, 0]);
    }

    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number) {
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

    addDrawableObject(type: string, position: number[], imageSource: string = './assets/images/test-texture1.png') {
        switch (type) {
            case 'texture':
                let tex = new TextureEntity(this.gl, this.textureImageProgramInfo, {}, imageSource);
                tex.translate(0, position);
                tex.scale(0, [100, 0, 100]);
                this.drawableObjects.push(tex);
                return;
            case 'cube':
                let myCube = new Cube(this.gl, this.defaultProgramInfo, {});
                myCube.translate(0, position);
                this.drawableObjects.push(myCube);
                return;
            case 'sphere':
                let sphere = new Sphere(this.gl, this.defaultProgramInfo, {});
                sphere.translate(0, position);
                this.drawableObjects.push(sphere);
                return;
            case 'cone':
                let cone = new Cone(this.gl, this.defaultProgramInfo, {});
                cone.translate(0, position);
                this.drawableObjects.push(cone);
                return;
            case 'axis':
                let axis = new Axis3D(this.gl, this.defaultProgramInfo, {});
                axis.translate(0, position);
                axis.scale(0, [100, 100, 100]);
                this.drawableObjects.push(axis);
                return;
            case 'plane':
                let plane = new Plane(this.gl, this.defaultProgramInfo, {});
                plane.translate(0, position);
                plane.scale(0, [200, 0, 200]);
                this.drawableObjects.push(plane);
                return;
            default:
                let stuff = new Cube(this.gl, this.defaultProgramInfo, {});
                stuff.translate(0, position);
                this.drawableObjects.push(stuff);
                return;
        }
    }

    getCanvasDimensions(): twgl.v3.Vec3 {
        let canvasDimensions = [0, 0, 0];
        if (this.canvas) {
            canvasDimensions = [this.canvas.width, this.canvas.height, 0];
        }
        return canvasDimensions;
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

    drawScene(gl: WebGL2RenderingContext, dt: number) {
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

    applyUserInput(activeKeysMap: any, mouseInputs: any) {
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
}