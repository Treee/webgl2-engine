import { Particle } from "./particle";

export class ParticleSystem {

  particles: Particle[] = [];

  constructor(numberOfParticles: number) {
    this.particles = Array(numberOfParticles).fill(new Particle());
  }

}