import { m4, v3 } from "twgl.js";
import { Matrix4 } from "three";
export declare class Camera {
    private cameraMatrix;
    private position;
    private target;
    private up;
    private translateStepSize;
    private xAngle;
    private yAngle;
    private xRotation;
    private yRotation;
    private targetOrientation;
    private angleStepSize;
    private pi;
    private twoPi;
    constructor(startPosition: v3.Vec3);
    getModelMatrix(): Matrix4;
    getForward(): v3.Vec3;
    getPosition(): v3.Vec3;
    getViewMatrix(): m4.Mat4;
    getViewProjectionMatrix(projectionMatrix: m4.Mat4): m4.Mat4;
    private moveCamera;
    moveForward(): void;
    moveBackward(): void;
    moveLeft(): void;
    moveRight(): void;
    moveUp(): void;
    moveDown(): void;
    turnLeft(): void;
    turnRight(): void;
    yaw(): void;
    pitch(): void;
    applyRotation(): void;
    rotateForward(): void;
    rotateBackward(): void;
}
