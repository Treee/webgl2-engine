"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const particle_1 = require("./particle");
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
class ParticleSystem {
    constructor(numberOfParticles, gl, shaderProgram) {
        this.particles = [];
        this.initializeParticles(numberOfParticles, gl, shaderProgram);
    }
    // initializes particles that disperse in a spherical pattern
    initializeParticles(numberOfParticles, gl, shaderProgram) {
        let x, y;
        let z = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            x = -1 + 2 * +(Math.random().toFixed(2));
            y = -1 + 2 * +(Math.random().toFixed(2));
            z = -1 + 2 * +(Math.random().toFixed(2));
            const particle = new particle_1.Particle(new vec3_1.Vec3(x, y, 0), new vec3_1.Vec3(Math.cos(x), Math.sin(y), x), new vec4_1.Vec4(x, y, z, 1), 3);
            particle.createVertexArrayObject(gl, shaderProgram);
            this.particles.push(particle);
        }
    }
    updateParticles(dt) {
        this.particles.forEach((particle) => {
            particle.update(dt);
        });
    }
    draw(dt, gl, transformUniformLocation, colorUniformLocation, projectionMatrix) {
        this.particles.forEach((particle) => {
            particle.update(dt);
            particle.draw(gl, transformUniformLocation, colorUniformLocation, projectionMatrix);
        });
    }
    randomInt(range) {
        return Math.floor(Math.random() * range);
    }
}
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle-system.js.map