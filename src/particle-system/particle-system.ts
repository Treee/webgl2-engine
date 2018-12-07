import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";

export class ParticleSystem {

  particles: Particle[] = [];

  constructor(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    this.initializeParticles(position, numberOfParticles, gl, shaderProgram);
  }

  // initializes particles that disperse in a spherical pattern
  initializeParticles(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    let x, y;
    let z = 0;
    let step = Math.PI;
    for (let i = 0; i < numberOfParticles; i++) {
      x = -1 + 2 * +(Math.random().toFixed(2));
      y = -1 + 2 * +(Math.random().toFixed(2));
      z = -1 + 2 * +(Math.random().toFixed(2));
      const velocity = new Vec3(Math.cos(x * step), Math.sin(y * step), x);
      step += step;
      const color = new Vec4(x, y, z, 1);
      const decay = this.randomInt(7);
      const particle = new Particle(position, velocity, color, decay);
      particle.createVertexArrayObject(gl, shaderProgram);
      this.particles.push(particle);
    }
  }

  update(dt: number) {
    this.particles.forEach((particle) => {
      particle.update(dt);
    });
  }

  draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3) {
    this.particles.forEach((particle) => {
      particle.draw(gl, transformUniformLocation, colorUniformLocation, projectionMatrix);
    });
  }
  randomInt(range: number): number {
    return Math.floor(Math.random() * range);
  }

}