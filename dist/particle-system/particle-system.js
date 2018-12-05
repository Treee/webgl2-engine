"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const particle_1 = require("./particle");
class ParticleSystem {
    constructor(numberOfParticles) {
        this.particles = [];
        this.particles = Array(numberOfParticles).fill(new particle_1.Particle());
    }
}
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle-system.js.map