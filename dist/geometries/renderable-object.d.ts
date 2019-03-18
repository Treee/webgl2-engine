/// <reference types="webgl2" />
import { ProgramInfo, BufferInfo, m4, v3 } from "twgl.js";
export declare abstract class RenderableObject {
    programInfo: ProgramInfo;
    bufferInfo: BufferInfo;
    vertexArray: WebGLVertexArrayObject;
    uniforms: any;
    alias: string;
    position: v3.Vec3;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleValue: v3.Vec3;
    modelMatrix: m4.Mat4;
    constructor();
    translate(dt: number, translateAmount: v3.Vec3): void;
    scale(dt: number, scaleAmount: v3.Vec3): void;
    rotate(dt: number): void;
    move(dt: number, viewProjectionMatrix: any): void;
    computeMatrix(viewProjectionMatrix: m4.Mat4): m4.Mat4;
    update(dt: number): void;
    draw(gl: WebGL2RenderingContext): void;
}
