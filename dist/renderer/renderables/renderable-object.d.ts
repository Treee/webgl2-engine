import { ProgramInfo, BufferInfo, m4, v3 } from 'twgl.js';
export declare abstract class RenderableObject {
    programInfo: ProgramInfo;
    bufferInfo: BufferInfo;
    vertexArray: WebGLVertexArrayObject;
    uniforms: any;
    alias: string;
    isDirty: boolean;
    position: v3.Vec3;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleValue: v3.Vec3;
    modelMatrix: m4.Mat4;
    constructor();
    initializeObject(gl: WebGLRenderingContext, progInfo: ProgramInfo, uniforms: any): void;
    translate(dt: number, translateAmount: v3.Vec3): void;
    scale(dt: number, scaleAmount: v3.Vec3): void;
    rotate(dt: number): void;
    lerp(start: v3.Vec3, end: v3.Vec3, step: number): number[] | Float32Array;
    computeMatrix(viewProjectionMatrix: m4.Mat4): m4.Mat4;
    update(dt: number, viewProjectionMatrix: any): void;
    setDirty(isDirty: boolean): void;
    draw(gl: WebGLRenderingContext): void;
}
