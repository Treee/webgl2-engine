import { Vec3 } from "../math/vec3";

export class Particle {

  position: Vec3;
  velocity: Vec3;
  isActive: boolean = true;
  decay: number;

  constructor(position: Vec3 = new Vec3(), velocity: Vec3 = new Vec3(), decay: number = 3) {
    this.position = position;
    this.decay = decay;
    this.velocity = velocity;
  }

  update(dt: number) {
    if (this.isActive) {
      this.decay -= dt;
      this.position.add(this.velocity);
      this.disableParticleCheck();
    }
  }

  disableParticleCheck() {
    if (this.decay < 0) {
      this.isActive = false;
    }
  }
}