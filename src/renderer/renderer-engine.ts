import { Vec3 } from '../math/vec3';
import { Mat3 } from '../math/mat3';
import { BoxGeometry } from '../geometries/box-geometry';
import { ShaderManager } from './shaders/shader-manager';
import { RenderableObject } from '../geometries/renderable-object';
import { Camera } from './camera/camera';

import * as twgl from 'twgl.js';
import { Cube } from '../geometries/cube';
import { Cone } from '../geometries/cone';
import { Sphere } from '../geometries/sphere';
import { Axis3D } from '../geometries/axis-3d';
import { Plane } from '../geometries/plane';
import { TextureEntity } from '../geometries/texture-entity';

export class RendererEngine {

    canvas!: HTMLCanvasElement;

    gl!: WebGL2RenderingContext;

    shaderManager!: ShaderManager;
    debugCamera!: Camera;

    projectionMatrix: Mat3 = new Mat3();

    fieldOfViewRadians: number = 0;

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
        // an attribute is an input (in) to a vertex shader.
        // It will receive data from a buffer
        in vec2 a_position;
        in vec2 a_texCoord;

        // Used to pass in the resolution of the canvas
        uniform vec2 u_resolution;

        // Used to pass the texture coordinates to the fragment shader
        out vec2 v_texCoord;

        // all shaders have a main function
        void main() {

        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

        // pass the texCoord to the fragment shader
        // The GPU will interpolate this value between points.
        v_texCoord = a_texCoord;
        }
    `;

    textureFS = `#version 300 es
        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default. It means "medium precision"
        precision mediump float;

        // our texture
        uniform sampler2D u_image;

        // the texCoords passed in from the vertex shader.
        in vec2 v_texCoord;

        // we need to declare an output for the fragment shader
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

        this.fieldOfViewRadians = this.degreesToRadian(60);
        twgl.setAttributePrefix("a_");
        // create program info
        this.defaultProgramInfo = twgl.createProgramInfo(this.gl, [this.vs, this.fs]);
        this.textureImageProgramInfo = twgl.createProgramInfo(this.gl, [this.textureVS, this.textureFS]);

        let myCube = new Cube(this.gl, this.defaultProgramInfo, {});
        myCube.translate(0, [-40, 0, 0]);
        let myCube1 = new Cube(this.gl, this.defaultProgramInfo, {});
        let myCube2 = new Cube(this.gl, this.defaultProgramInfo, {});
        let myCube3 = new Cube(this.gl, this.defaultProgramInfo, {});
        let myCube4 = new Cube(this.gl, this.defaultProgramInfo, {});
        let myCube5 = new Cube(this.gl, this.defaultProgramInfo, {});
        let myCone = new Cone(this.gl, this.defaultProgramInfo, {});

        myCone.translate(0, [40, 0, 0]);
        let mySphere = new Sphere(this.gl, this.defaultProgramInfo, {});
        let myAxis = new Axis3D(this.gl, this.defaultProgramInfo, {});
        let myPlane = new Plane(this.gl, this.defaultProgramInfo, {});
        this.drawableObjects.push(myCube);
        this.drawableObjects.push(myCone);
        this.drawableObjects.push(mySphere);
        this.drawableObjects.push(myAxis);
        this.drawableObjects.push(myCube1);
        this.drawableObjects.push(myCube2);
        this.drawableObjects.push(myCube3);
        this.drawableObjects.push(myCube4);
        this.drawableObjects.push(myCube5);
        this.drawableObjects.push(myPlane);

        myCube1.translate(0, [-0, 0, -20]);
        myCube2.translate(0, [-20, 0, 0]);
        myCube3.translate(0, [0, 0, 20]);
        myCube4.translate(0, [20, 0, 0]);
        myCube5.translate(0, [40, 0, 0]);
        myPlane.scale(0, [100, 0, 100]);

        this.shaderManager.initializeShaderPrograms(this.gl);
    }

    drawFrame(dt: Number, renderableObjects: BoxGeometry[]) {
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

    getCanvasDimensions(): Vec3 {
        let canvasDimensions = new Vec3();
        if (this.canvas) {
            canvasDimensions.set(this.canvas.width, this.canvas.height, 0);
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
        this.gl = this.canvas.getContext('webgl2') as any;
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
        this.projectionMatrix.set(
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1
        );
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }

    drawScene(gl: WebGL2RenderingContext, dt: any) {
        dt = dt * 0.001; // take the current dt and make it even smaller
        twgl.resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let projectionMatrix = twgl.m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);

        let viewProjectionMatrix = this.debugCamera.getViewProjectionMatrix(projectionMatrix);

        this.drawableObjects.forEach(obj => {
            // obj.rotate(dt);
            obj.move(dt, viewProjectionMatrix);

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

    drawObjects(gl: WebGL2RenderingContext, objectsToDraw: RenderableObject[]) {
        objectsToDraw.forEach(obj => {
            let programInfo = obj.programInfo;
            gl.useProgram(programInfo.program);
            gl.bindVertexArray(obj.vertexArray);
            twgl.setUniforms(programInfo, obj.uniforms);
            twgl.drawBufferInfo(gl, obj.bufferInfo);
        });
    }

    degreesToRadian(degrees: number) {
        return degrees * Math.PI / 180;
    }

}