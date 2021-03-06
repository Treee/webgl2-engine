import { m4, v3 } from "twgl.js";
import { Quaternion, Vector3, Matrix4 } from "three";

export class Camera {

  private cameraMatrix: m4.Mat4 = m4.identity();
  protected projectionMatrix: m4.Mat4 = m4.identity();

  private position: v3.Vec3 = [0, 0, 1];
  private up: v3.Vec3 = [0, 1, 0];
  protected translateStepSize: number = 1.0;

  private xAngle: number = 0;
  private yAngle: number = 0;
  private zAngle: number = 0;

  private xRotation: Quaternion = new Quaternion();
  private yRotation: Quaternion = new Quaternion();
  private zRotation: Quaternion = new Quaternion();

  private targetOrientation: Quaternion = new Quaternion();

  private pi: number = Math.PI;
  private twoPi = this.pi * 2;

  private pureX: Quaternion = new Quaternion(1, 0, 0, 0);
  private pureY: Quaternion = new Quaternion(0, 1, 0, 0);
  private pureZ: Quaternion = new Quaternion(0, 0, -1, 0);

  constructor(startPosition: v3.Vec3) {
    this.position = startPosition;
    this.xAngle = this.pi; // rotate 90 degrees so we are looking down the -z axis
    this.yAngle = -this.pi;
    this.yaw(0);
    this.pitch(0);
    this.setProjectionMatrix();
  }

  setProjectionMatrix(fieldOfViewRadians: number = 1.5708, aspectRatio: number = 4 / 3, near: number = 1, far: number = 1000) {
    this.projectionMatrix = m4.perspective(fieldOfViewRadians, aspectRatio, near, far);
  }

  setDiametricProjection(left: number = 0, right: number = 640, top: number = 0, bot: number = 480, near: number = 1, far: number = 10) {
    this.yaw(-45);
    this.pitch(-30);
    this.projectionMatrix = m4.identity([
      ((right - left) / 2), 0, 0, 0,
      0, ((top - bot) / 2), 0, 0,
      0, 0, ((far - near) / -2), 0,
      ((left + right) / 2), ((top + bot) / 2), -((far + near) / 2), 1
    ]);
    return this.projectionMatrix;
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
    const qw = new Quaternion().copy(this.targetOrientation);
    const conj = new Quaternion().copy(qw).conjugate();
    const normalZ = conj.multiply(this.pureZ).multiply(qw);
    return [normalZ.x, normalZ.y, normalZ.z];
  }

  //returns an up vector based on where we have rotated from
  getUp(): v3.Vec3 {
    const qw = new Quaternion().copy(this.targetOrientation);
    const conj = new Quaternion().copy(qw).conjugate();
    const normalY = conj.multiply(this.pureY).multiply(qw);
    return [normalY.x, normalY.y, normalY.z];
  }

  //returns a vec3 that is perpendicular to the cameras forward and up vectors
  getRight(): v3.Vec3 {
    const qw = new Quaternion().copy(this.targetOrientation);
    const conj = new Quaternion().copy(qw).conjugate();
    const normalX = conj.multiply(this.pureX).multiply(qw);
    return [normalX.x, normalX.y, normalX.z];
  }

  getPosition(): v3.Vec3 {
    return this.position;
  }

  getViewMatrix(): m4.Mat4 {
    const translatedForward = v3.add(this.getPosition(), this.getForward())
    this.cameraMatrix = m4.lookAt(this.getPosition(), translatedForward, this.up);
    return m4.inverse(this.cameraMatrix);
  }

  getViewProjectionMatrix(): m4.Mat4 {
    return m4.multiply(this.projectionMatrix, this.getViewMatrix());
  }

  protected moveCamera(amountToMove: v3.Vec3) {
    this.position = v3.add(this.getPosition(), amountToMove);
    console.log(`Pos: ${this.getPosition()} Forward: ${this.getForward()} Test: ${v3.add(this.getPosition(), this.getForward())}`);
  }

  moveForward() { this.moveCamera(v3.mulScalar(this.getForward(), this.translateStepSize)); }
  moveBackward() { this.moveCamera(v3.mulScalar(this.getForward(), -this.translateStepSize)); }

  moveLeft() { this.moveCamera(v3.mulScalar(this.getRight(), this.translateStepSize)); }
  moveRight() { this.moveCamera(v3.mulScalar(this.getRight(), -this.translateStepSize)); }
  moveUp() { this.moveCamera(v3.mulScalar([0, 1, 0], this.translateStepSize)); }
  moveDown() { this.moveCamera(v3.mulScalar([0, -1, 0], this.translateStepSize)); }

  yaw(amount: number) {
    this.yAngle += amount;
    //while the Angle is greater than 2pi (a full revolution, 360degrees)
    while (this.yAngle > this.twoPi) {//subtract 2pi from the angle to "wrap" it back to 0ish
      this.yAngle = this.yAngle - this.twoPi;
    }//this is the same but for the reverse direction
    while (this.yAngle < -this.twoPi) {
      this.yAngle = this.yAngle + this.twoPi;
    }
    //yaw the given angle over the y unit vector
    this.yRotation = this.yRotation.setFromAxisAngle(new Vector3(0, 1, 0), this.yAngle);
    this.applyRotation();
  }

  pitch(amount: number) {
    this.xAngle += amount;
    //while the Angle is greater than 2pi (a full revolution, 360degrees)
    while (this.xAngle > this.twoPi) {//subtract 2pi from the angle to "wrap" it back to 0ish
      this.xAngle = this.xAngle - this.twoPi;
    }//this is the same but for the reverse direction
    while (this.xAngle < -this.twoPi) {
      this.xAngle = this.xAngle + this.twoPi;
    }
    //yaw the given angle over the y unit vector
    this.xRotation = this.xRotation.setFromAxisAngle(new Vector3(1, 0, 0), this.xAngle);
    this.applyRotation();
  }

  roll(amount: number) {
    this.zAngle += amount;
    //while the Angle is greater than 2pi (a full revolution, 360degrees)
    while (this.zAngle > this.twoPi) {//subtract 2pi from the angle to "wrap" it back to 0ish
      this.zAngle = this.zAngle - this.twoPi;
    }//this is the same but for the reverse direction
    while (this.zAngle < -this.twoPi) {
      this.zAngle = this.zAngle + this.twoPi;
    }
    //roll the given angle over the z unit vector
    this.zRotation = this.zRotation.setFromAxisAngle(new Vector3(0, 0, 1), this.zAngle);
    this.applyRotation();
  }

  applyRotation() {
    this.targetOrientation = new Quaternion().multiply(this.xRotation).multiply(this.yRotation);
    // console.log(`X: ${this.xAngle * (180 / this.pi)} Y: ${this.yAngle * (180 / this.pi)}`);
  }

}