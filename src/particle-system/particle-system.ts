import { Point2D } from "../geometries/point-2d";

export class ParticleSystem {

  particles: Point2D[] = [];

  constructor(numberOfParticles: number) {
    this.particles = Array(numberOfParticles).fill(new Point2D(0, 0));
  }

}