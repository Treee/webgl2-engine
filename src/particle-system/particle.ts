import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";
import { Renderable } from '../geometries/renderable';

export class Particle extends Renderable {

  velocity: Vec3 = new Vec3();
  isActive: boolean = false;
  decay: number = 3;


  constructor(position: Vec3 = new Vec3(), velocity: Vec3 = new Vec3(), color: Vec4 = new Vec4(), decay: number = 3, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    super();
    this.reinitializeParticle(position, velocity, color, decay);
    this.geometryData.setData(gl.FLOAT, gl.POINTS, false, 2, 0, 0, 1);
    this.createVertexArrayObject(gl, shaderProgram);
  }

  reinitializeParticle(position: Vec3 = new Vec3(), velocity: Vec3 = new Vec3(), color: Vec4 = new Vec4(), decay: number = 3) {
    this.decay = decay;
    this.velocity = velocity;
    this.isActive = true;
    this.setVertices([0, 0]);
    this.translate(position);
    this.setColor(color);
  }

  update(dt: number) {
    if (this.isActive) {
      this.decay -= dt;
      const newPosition = this.position.clone().add(this.velocity);
      const newVec = new Vec3(newPosition.x, newPosition.y, newPosition.z);
      // this.position.add(this.velocity);
      this.translate(newVec);
      this.disableParticleCheck();
    }
  }

  disableParticleCheck() {
    if (this.decay < 0) {
      this.isActive = false;
    }
  }
}