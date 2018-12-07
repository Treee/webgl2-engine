"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const particle_1 = require("./particle");
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
class ParticleSystem {
    constructor(position, numberOfParticles, gl, shaderProgram) {
        this.particles = [];
        this.initializeParticles(position, numberOfParticles, gl, shaderProgram);
    }
    // initializes particles that disperse in a spherical pattern
    initializeParticles(position, numberOfParticles, gl, shaderProgram) {
        let x, y;
        let z = 0;
        let step = Math.PI;
        for (let i = 0; i < numberOfParticles; i++) {
            x = -1 + 2 * +(Math.random().toFixed(2));
            y = -1 + 2 * +(Math.random().toFixed(2));
            z = -1 + 2 * +(Math.random().toFixed(2));
            const velocity = new vec3_1.Vec3(Math.cos(x * step), Math.sin(y * step), x);
            step += step;
            const color = new vec4_1.Vec4(x, y, z, 1);
            const decay = this.randomInt(7);
            const particle = new particle_1.Particle(position, velocity, color, decay);
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
            if (particle.isActive) {
                particle.draw(gl, transformUniformLocation, colorUniformLocation, projectionMatrix);
            }
        });
    }
    randomInt(range) {
        return Math.floor(Math.random() * range);
    }
}
exports.ParticleSystem = ParticleSystem;
//# sourceMappingURL=particle-system.js.map