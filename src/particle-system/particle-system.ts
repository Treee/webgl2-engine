import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";
import { BasicShaderVariables } from "../renderer/shaders/shader-bound-variables";

export class ParticleSystem {

  particles: Particle[] = [];

  constructor(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    this.initializeParticles(position, numberOfParticles, gl, shaderProgram);
  }

  // initializes particles that disperse in a spherical pattern
  initializeParticles(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
    let x, y;
    let z = 0;
    let step = Math.PI / 7;
    const twoPi = Math.PI * Math.PI;
    for (let i = 0; i < numberOfParticles; i++) {
      if (step > twoPi) {
        step = (step - twoPi);
      }
      x = -1 + 2 * +(Math.random().toFixed(2));
      y = -1 + 2 * +(Math.random().toFixed(2));
      z = -1 + 2 * +(Math.random().toFixed(2));
      const velocity = new Vec3(x * Math.cos(step), y * Math.sin(step), x);
      step += step;
      const color = new Vec4(x, y, z, 1);
      const decay = 3;
      const particle = new Particle(position, velocity, color, decay, gl, shaderProgram);
      particle.createVertexArrayObject(gl, shaderProgram);
      this.particles.push(particle);
    }
  }

  update(dt: number) {
    this.particles.forEach((particle) => {
      particle.update(dt);
    });
  }

  draw(gl: WebGL2RenderingContext, shaderVariables: BasicShaderVariables, projectionMatrix: Mat3) {
    this.particles.forEach((particle) => {
      if (particle.isActive) {
        particle.draw(gl, shaderVariables, projectionMatrix);
      }
    });
  }
  randomInt(range: number): number {
    return Math.floor(Math.random() * range);
  }

}