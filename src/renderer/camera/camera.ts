import { m4, v3 } from "twgl.js";
import { Quaternion, Vector3, Matrix4 } from "three";

export class Camera {

  private cameraMatrix: m4.Mat4 = m4.identity();

  private position: v3.Vec3 = [0, 0, 1];
  private target: v3.Vec3 = [0, 0, 0];
  private up: v3.Vec3 = [0, 1, 0];
  private translateStepSize: number = 1.0;

  private xAngle: number = 1.0;
  private yAngle: number = 1.0;

  private xRotation: Quaternion = new Quaternion();
  private yRotation: Quaternion = new Quaternion();

  private targetOrientation: Quaternion = new Quaternion();

  private angleStepSize: number = 0.05;
  private pi: number = Math.PI;
  private twoPi = this.pi * 2;

  constructor(startPosition: v3.Vec3) {
    this.position = startPosition;
    this.xAngle = this.pi / 2; // rotate 90 degrees so we are looking down the -z axis
    this.yaw();
  }

  getModelMatrix(): Matrix4 {
    // let rotation = new Matrix4().makeRotationFromQuaternion(this.targetOrientation);
    // let scale = new Matrix4().makeScale(1, 1, 1);
    // let translation = new Matrix4().makeTranslation(this.position[0], this.position[1], this.position[2]);
    // const modelMatrix = rotation.multiply(scale).multiply(translation);
    // return modelMatrix;
    let translation = new Matrix4().makeTranslation(this.position[0], this.position[1], this.position[2]);
    let rotation = new Matrix4().makeRotationFromQuaternion(this.targetOrientation);
    const cameraModelMatrix = translation.multiply(rotation);
    return cameraModelMatrix;
  }

  // this forward is a pure normal forward not translated to position.
  getForward(): v3.Vec3 {
    const pureZ = new Quaternion(0, 0, -1, 0);
    const qw = new Quaternion().copy(this.targetOrientation);
    const conj = new Quaternion().copy(qw).conjugate();
    const normalZ = conj.multiply(pureZ).multiply(qw);
    return [normalZ.x, normalZ.y, normalZ.z];
  }

  getPosition(): v3.Vec3 {
    return this.position;
  }

  getViewMatrix(): m4.Mat4 {
    const translatedForward = v3.add(this.getPosition(), this.getForward())
    this.cameraMatrix = m4.lookAt(this.getPosition(), translatedForward, this.up);
    return m4.inverse(this.cameraMatrix);
  }

  getViewProjectionMatrix(projectionMatrix: m4.Mat4): m4.Mat4 {
    return m4.multiply(projectionMatrix, this.getViewMatrix());
  }

  private moveCamera(amountToMove: v3.Vec3) {
    this.position = v3.add(this.getPosition(), amountToMove);
    console.log(`Pos: ${this.getPosition()} Forward: ${this.getForward()} Test: ${v3.add(this.getPosition(), this.getForward())}`);
  }

  moveForward() { this.moveCamera(v3.mulScalar([0, 0, -1], this.translateStepSize)); }
  moveBackward() { this.moveCamera(v3.mulScalar([0, 0, 1], this.translateStepSize)); }

  moveLeft() { this.moveCamera(v3.mulScalar([-1, 0, 0], this.translateStepSize)); }
  moveRight() { this.moveCamera(v3.mulScalar([1, 0, 0], this.translateStepSize)); }
  moveUp() { this.moveCamera(v3.mulScalar([0, 1, 0], this.translateStepSize)); }
  moveDown() { this.moveCamera(v3.mulScalar([0, -1, 0], this.translateStepSize)); }

  turnLeft() {
    this.yAngle += -this.angleStepSize;
    this.yaw();
  }

  turnRight() {
    this.yAngle += this.angleStepSize;
    this.yaw();
  }

  yaw() {
    //while the Angle is greater than 2pi (a full revolution, 360degrees)
    while (this.yAngle > this.twoPi) {//subtract 2pi from the angle to "wrap" it back to 0ish
      this.yAngle = this.yAngle - this.twoPi;
    }//this is the same but for the reverse direction
    while (this.yAngle < -this.twoPi) {
      this.yAngle = this.yAngle + this.twoPi;
    }
    //yaw the given angle over the y unit vector
    // this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.yAngle);
    this.yRotation = this.yRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.yAngle);
    this.applyRotation();
  }

  pitch() {
    //while the Angle is greater than 2pi (a full revolution, 360degrees)
    while (this.xAngle > this.twoPi) {//subtract 2pi from the angle to "wrap" it back to 0ish
      this.xAngle = this.xAngle - this.twoPi;
    }//this is the same but for the reverse direction
    while (this.xAngle < -this.twoPi) {
      this.xAngle = this.xAngle + this.twoPi;
    }
    //yaw the given angle over the y unit vector
    // this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.xAngle);
    this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.xAngle);
    this.applyRotation();
  }

  applyRotation() {
    this.targetOrientation = new Quaternion().multiply(this.xRotation).multiply(this.yRotation);
  }

  rotateForward() {
    this.xAngle -= this.angleStepSize;
    this.pitch();
  }

  rotateBackward() {
    this.xAngle += this.angleStepSize;
    this.pitch();
  }

}