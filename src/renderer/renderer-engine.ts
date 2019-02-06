import { Vec3 } from '../math/vec3';
import { Mat3 } from '../math/mat3';
import { BoxGeometry } from '../geometries/box-geometry';
import { ShaderManager } from './shaders/shader-manager';
import { RenderableObject } from '../geometries/renderable-object';

import * as twgl from 'twgl.js';
import { Cube } from '../geometries/cube';
import { Cone } from '../geometries/cone';
import { Sphere } from '../geometries/sphere';

export class RendererEngine {

    canvas!: HTMLCanvasElement;

    gl!: WebGL2RenderingContext;

    shaderManager!: ShaderManager;

    projectionMatrix: Mat3 = new Mat3();

    fieldOfViewRadians: number = 0;

    cubeUniforms: any = {};
    sphereUniforms: any = {};
    coneUniforms: any = {};

    vs = `#version 300 es

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

    drawableObjects: RenderableObject[] = [];

    constructor() {
        this.shaderManager = new ShaderManager();
    }

    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number) {
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

        let myCube = new Cube(this.gl, programInfo, this.cubeUniforms);
        let myCone = new Cone(this.gl, programInfo, this.coneUniforms);
        let mySphere = new Sphere(this.gl, programInfo, this.sphereUniforms);
        this.drawableObjects.push(myCube);
        this.drawableObjects.push(myCone);
        this.drawableObjects.push(mySphere);
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
        dt = dt * 0.0005;
        twgl.resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let projectionMatrix = twgl.m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);

        let cameraPosition = [0, 0, 100];
        let target = [0, 0, 0];
        let up = [0, 1, 0];
        let cameraMatrix = twgl.m4.lookAt(cameraPosition, target, up);

        let viewMatrix = twgl.m4.inverse(cameraMatrix);

        let viewProjectionMatrix = twgl.m4.multiply(projectionMatrix, viewMatrix);

        this.drawableObjects.forEach(obj => {
            if (obj.alias === 'sphere') {
                obj.rotationX = dt;
                obj.rotationY = dt;
            }
            if (obj.alias === 'cone') {
                obj.rotationX = dt;
                obj.rotationY = -dt;
            }
            if (obj.alias === 'cube') {
                obj.rotationX = -dt;
                obj.rotationY = dt;
            }
            obj.uniforms.u_matrix = this.computeMatrix(viewProjectionMatrix,
                obj.position,
                obj.rotationX,
                obj.rotationY);

            let programInfo = obj.programInfo;
            gl.useProgram(programInfo.program);
            gl.bindVertexArray(obj.vertexArray);
            twgl.setUniforms(programInfo, obj.uniforms);
            twgl.drawBufferInfo(gl, obj.bufferInfo);
        });
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

    computeMatrix(viewProjectionMatrix: any, translation: any, xRotation: number, yRotation: number) {
        var matrix = twgl.m4.translate(viewProjectionMatrix, translation);
        matrix = twgl.m4.rotateX(matrix, xRotation);
        return twgl.m4.rotateY(matrix, yRotation);
    }

}
