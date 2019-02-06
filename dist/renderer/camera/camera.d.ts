import { m4, v3 } from "twgl.js";
export declare class Camera {
    private cameraMatrix;
    private position;
    private target;
    private up;
    constructor(startPosition: v3.Vec3);
    getViewMatrix(): m4.Mat4;
    getViewProjectionMatrix(projectionMatrix: m4.Mat4): m4.Mat4;
}
