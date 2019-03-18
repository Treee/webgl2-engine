import { m4, v3 } from "twgl.js";

export class Camera {

  private cameraMatrix: m4.Mat4 = m4.identity();

  private position: v3.Vec3 = [0, 0, 1];
  private target: v3.Vec3 = [0, 0, 0];
  private up: v3.Vec3 = [0, 1, 0];

  private yRotation: number = 0;

  constructor(startPosition: v3.Vec3) {
    this.position = startPosition;
    this.target = v3.subtract(startPosition, [0, 0, 1]);
    this.cameraMatrix = m4.lookAt(this.position, this.target, this.up);;
  }

  getViewMatrix(): m4.Mat4 {
    this.cameraMatrix = m4.lookAt(this.position, this.target, this.up);
    return m4.inverse(this.cameraMatrix);
  }

  getViewProjectionMatrix(projectionMatrix: m4.Mat4): m4.Mat4 {
    return m4.multiply(projectionMatrix, this.getViewMatrix());
  }

  private moveCamera(amountToMove: v3.Vec3) {
    this.target = v3.add(this.target, amountToMove);
    this.position = v3.add(this.position, amountToMove);
  }

  moveForward() { this.moveCamera([0, 0, -1]); }
  moveBackward() { this.moveCamera([0, 0, 1]); }
  moveLeft() { this.moveCamera([-1, 0, 0]); }
  moveRight() { this.moveCamera([1, 0, 0]); }
  moveUp() { this.moveCamera([0, 1, 0]); }
  moveDown() { this.moveCamera([0, -1, 0]); }

  turnLeft() {
    let twoPi = Math.PI * 2;
    let remainder = this.yRotation - twoPi;
    this.yRotation += twoPi / 18;
    if (remainder > 0) {
      this.yRotation = remainder;
    }
    this.target = v3.add(this.target, [Math.cos(this.yRotation), 0, Math.sin(this.yRotation)]);
  }
  turnRight() {
    let twoPi = Math.PI * 2;
    let remainder = twoPi - this.yRotation;
    this.yRotation -= twoPi / 18;
    if (remainder < 0) {
      this.yRotation = remainder;
    }
    this.target = v3.add(this.target, [Math.cos(this.yRotation), 0, Math.sin(this.yRotation)]);
  }
}