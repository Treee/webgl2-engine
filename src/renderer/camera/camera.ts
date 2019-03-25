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

  private targetOrientation: Quaternion = new Quaternion();

  private angleStepSize: number = 0.001;
  private pi: number = Math.PI;
  private twoPi = this.pi * 2;

  constructor(startPosition: v3.Vec3) {
    this.position = startPosition;
    this.target = v3.subtract(startPosition, [0, 0, 1]);
    this.cameraMatrix = m4.lookAt(this.position, this.target, this.up);
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

  getForward(): v3.Vec3 {
    const pureZ = new Quaternion(0, 0, 0, 1);
    const qw = new Quaternion().copy(this.targetOrientation);
    const conj = new Quaternion().copy(qw).conjugate();
    const normalZ = conj.multiply(pureZ).multiply(qw);
    return [normalZ.x, normalZ.y, normalZ.z];
  }

  getPosition(): v3.Vec3 {
    return this.position;
  }

  getViewMatrix(): m4.Mat4 {
    // this.cameraMatrix = m4.lookAt(this.getPosition(), this.target, this.up);

    const translatedForward = v3.add(this.getPosition(), this.getForward());

    this.cameraMatrix = m4.lookAt(this.getPosition(), translatedForward, this.up);
    return m4.inverse(this.cameraMatrix);
  }

  getViewProjectionMatrix(projectionMatrix: m4.Mat4): m4.Mat4 {
    return m4.multiply(projectionMatrix, this.getViewMatrix());
  }

  private moveCamera(amountToMove: v3.Vec3) {
    this.position = v3.add(this.getPosition(), amountToMove);
  }

  moveForward() {
    this.moveCamera(v3.add(this.getForward(), v3.mulScalar([0, 0, -1], this.translateStepSize)));
  }
  moveBackward() {
    this.moveCamera(v3.add(this.getForward(), v3.mulScalar([0, 0, 1], this.translateStepSize)));
  }

  moveLeft() { this.moveCamera([-1, 0, 0]); }
  moveRight() { this.moveCamera([1, 0, 0]); }
  moveUp() { this.moveCamera([0, 1, 0]); }
  moveDown() { this.moveCamera([0, -1, 0]); }

  turnLeft() {
    this.xAngle += -this.angleStepSize;
  }

  turnRight() {
    this.xAngle += this.angleStepSize;
  }

  yaw() {
    //while the Angle is greater than 2pi (a full revolution, 360degrees)
    while (this.xAngle > this.twoPi) {//subtract 2pi from the angle to "wrap" it back to 0ish
      this.xAngle = this.xAngle - this.twoPi;
    }//this is the same but for the reverse direction
    while (this.xAngle < -this.twoPi) {
      this.xAngle = this.xAngle + this.twoPi;
    }
    //yaw the given angle over the y unit vector
    // this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.xAngle);
    this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(0, 1, 0), (this.xAngle * (180 / this.pi)));
  }

  rotateForward() {

  }

  rotateBackward() {

  }

}