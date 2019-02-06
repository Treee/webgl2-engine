/// <reference types="webgl2" />
import { ProgramInfo, BufferInfo, m4 } from "twgl.js";
export declare abstract class RenderableObject {
    programInfo: ProgramInfo;
    bufferInfo: BufferInfo;
    vertexArray: WebGLVertexArrayObject;
    uniforms: any;
    alias: string;
    position: number[];
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleValue: number;
    modelMatrix: m4.Mat4;
    constructor();
    translate(dt: number): void;
    scale(dt: number): void;
    rotate(dt: number): void;
    move(dt: number, viewProjectionMatrix: any): void;
    computeMatrix(viewProjectionMatrix: m4.Mat4): m4.Mat4;
}
