// import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
// import { Matrix3, Vector2 } from 'three';

// import { Geometry2D, ShaderProgram } from 'tree-xyz-webgl2-engine';

// @Component({
//   selector: 'app-renderer',
//   templateUrl: './renderer.component.html',
//   styleUrls: ['./renderer.component.css']
// })
// export class RendererComponent implements AfterViewInit {

//   @ViewChild('myCanvas') canvasRef: ElementRef;

//   @Input() public width = 400;
//   @Input() public height = 400;

//   gl: any;
//   shaderProgram: ShaderProgram = new ShaderProgram();
//   basicShader: WebGLProgram;
//   projectionMatrix: Matrix3 = new Matrix3();
//   canvasScale: Vector2 = new Vector2();

//   constructor() {
//   }

//   ngAfterViewInit(): void {
//     this.restartRenderer();
//   }

//   restartRenderer() {
//     this.initCanvas();
//     this.initializeShaderPrograms(this.gl);
//   }

//   private initCanvas() {
//     // get the canvas from the html
//     const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;

//     // get the webgl 2 context
//     this.gl = canvasEl.getContext('webgl2') as any;
//     if (!this.gl) {
//       return -1;
//     }

//     // set the width and height of the canvas
//     canvasEl.width = this.width;
//     canvasEl.height = this.height;

//     this.canvasScale.set(2 / this.gl.canvas.width, 2 / this.gl.canvas.height);

//     // note the -2 for the height. this flips the axis so 0 is at the top
//     this.projectionMatrix.set(
//       2 / this.width, 0, 0,
//       0, -2 / this.height, 0,
//       -1, 1, 1
//     );
//     // set the viewport for the renderer
//     this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
//   }

//   private initializeShaderPrograms(gl: any) {
//     // create the default shader program for a 2d program
//     this.basicShader = this.shaderProgram.getBasic2dProgram(gl);
//   }

//   drawFrame(dt: Number, shaderProgram: WebGLProgram, renderableObjects: Geometry2D[]) {
//     // Tell it to use our program (pair of shaders)
//     this.gl.useProgram(shaderProgram);

//     // set up attribute and uniforms (vertex shader)
//     const transformUniformLocation = this.gl.getUniformLocation(shaderProgram, 'u_transform');
//     // set up attribute and uniforms (fragment shader)
//     const colorUniformLocation = this.gl.getUniformLocation(shaderProgram, 'u_color');

//     // Clear the canvas
//     this.gl.clearColor(0, 0, 0, 0);
//     this.gl.clear(this.gl.COLOR_BUFFER_BIT);

//     if (!renderableObjects) {
//       return;
//     }

//     renderableObjects.forEach(renderable => {
//       renderable.drawObject(this.gl, transformUniformLocation, colorUniformLocation);
//     });
//   }
// }
