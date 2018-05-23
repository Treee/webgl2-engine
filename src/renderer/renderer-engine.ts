import { Vec3 } from '../math/vec3';
import { Mat3 } from '../math/mat3';
import { ShaderProgram } from '../renderer/shaders/shader-program';
import { BoxGeometry } from '../geometries/box-geometry';

export class RendererEngine {

    canvas!: HTMLCanvasElement;

    gl!: WebGL2RenderingContext;

    basicShader!: WebGLProgram;

    projectionMatrix: Mat3 = new Mat3();

    constructor() { }

    initializeRenderer(htmlCanvasElement: HTMLCanvasElement, width?: number, height?: number) {
        this.initializeCanvasGL(htmlCanvasElement, width ? width : 600, height ? height : 400);
        this.initializeShaderPrograms(this.gl);
    }

    drawFrame(dt: Number, shaderProgram: WebGLProgram, renderableObjects: BoxGeometry[]) {
        if (!this.gl) {
            throw new Error('Cannot Draw Frame, GL is undefined');
        }
        // Tell it to use our program (pair of shaders)
        this.gl.useProgram(shaderProgram);

        // set up attribute and uniforms (vertex shader)
        const transformUniformLocation = this.gl.getUniformLocation(shaderProgram, 'u_transform');
        // set up attribute and uniforms (fragment shader)
        const colorUniformLocation = this.gl.getUniformLocation(shaderProgram, 'u_color');

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
            renderable.drawObject(this.gl, transformUniformLocation, colorUniformLocation);
        });
    }

    getCanvasDimensions(): Vec3 {
        let canvasDimensions = new Vec3();
        if (this.canvas) {
            canvasDimensions.set(this.canvas.width, this.canvas.height, 0);
        }
        return canvasDimensions;
    }

    private initializeShaderPrograms(gl: WebGL2RenderingContext) {
        // create the default shader program for a 2d program
        const shaderProgram = new ShaderProgram();
        this.basicShader = shaderProgram.getBasic2dProgram(gl);
    }

    private initializeCanvasGL(htmlCanvasElement: HTMLCanvasElement, width: number, height: number): void {
        // get the canvas from the html
        this.canvas = htmlCanvasElement;

        // get the webgl 2 context
        this.gl = htmlCanvasElement.getContext('webgl2') as any;
        if (!this.gl) {
            throw new Error('GL Context not initialized');
        }

        // set the width and height of the canvas
        htmlCanvasElement.width = width;
        htmlCanvasElement.height = height;

        // note the -2 for the height. this flips the axis so 0 is at the top
        this.projectionMatrix.set(
            2 / width, 0, 0,
            0, -2 / height, 0,
            -1, 1, 1
        );
        // set the viewport for the renderer
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    }
}
