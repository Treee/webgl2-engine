/// <reference types="webgl2" />
import { ProgramInfo, BufferInfo } from "twgl.js";
export declare abstract class RenderableObject {
    programInfo: ProgramInfo;
    bufferInfo: BufferInfo;
    vertexArray: WebGLVertexArrayObject;
    uniforms: any;
    alias: string;
    position: number[];
    rotationX: number;
    rotationY: number;
    constructor();
}
