import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";

export class ParticleSystem {

  particles: Particle[] = [];

  constructor(numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    this.initializeParticles(numberOfParticles, gl, shaderProgram);
  }

  // initializes particles that disperse in a spherical pattern
  initializeParticles(numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    let x, y;
    let z = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      x = -1 + 2 * +(Math.random().toFixed(2));
      y = -1 + 2 * +(Math.random().toFixed(2));
      z = -1 + 2 * +(Math.random().toFixed(2));
      const particle = new Particle(new Vec3(x, y, 0), new Vec3(Math.cos(x), Math.sin(y), x), new Vec4(x, y, z, 1), 3);
      particle.createVertexArrayObject(gl, shaderProgram);
      this.particles.push(particle);
    }
  }

  updateParticles(dt: number) {
    this.particles.forEach((particle) => {
      particle.update(dt);
    });
  }

  draw(dt: number, gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3) {
    this.particles.forEach((particle) => {
      particle.update(dt);
      particle.draw(gl, transformUniformLocation, colorUniformLocation, projectionMatrix);
    });
  }
  randomInt(range: number): number {
    return Math.floor(Math.random() * range);
  }

}