"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
class Particle {
    constructor(position = new vec3_1.Vec3(), velocity = new vec3_1.Vec3(), color = new vec4_1.Vec4(), decay = 3) {
        this.position = position;
        this.decay = decay;
        this.velocity = velocity;
        this.color = color;
        this.isActive = true;
    }
    reinitializeParticle(position = new vec3_1.Vec3(), velocity = new vec3_1.Vec3(), color = new vec4_1.Vec4(), decay = 3) {
        this.position = position;
        this.decay = decay;
        this.velocity = velocity;
        this.color = color;
        this.isActive = true;
    }
    update(dt) {
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
exports.Particle = Particle;
//# sourceMappingURL=particle.js.map