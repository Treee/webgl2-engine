"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
const renderable_1 = require("../renderer/renderables/renderable");
class Particle extends renderable_1.Renderable {
    constructor(position = new vec3_1.Vec3(), velocity = new vec3_1.Vec3(), color = new vec4_1.Vec4(), decay = 3, gl, programInfo) {
        super(programInfo);
        this.velocity = new vec3_1.Vec3();
        this.isActive = false;
        this.decay = 3;
        this.reinitializeParticle(position, velocity, color, decay);
        this.geometryData.setData(gl.FLOAT, gl.POINTS, false, 2, 0, 0, 1);
        this.createVertexArrayObject(gl, programInfo.program);
    }
    reinitializeParticle(position = new vec3_1.Vec3(), velocity = new vec3_1.Vec3(), color = new vec4_1.Vec4(), decay = 3) {
        this.decay = decay;
        this.velocity = velocity;
        this.isActive = true;
        this.setVertices([0, 0]);
        this.translate(position);
        this.setColor(color);
    }
    draw(gl, projectionMatrix) {
        if (this.isActive) {
            super.draw(gl, projectionMatrix);
        }
    }
    update(dt) {
        if (this.isActive) {
            this.decay -= dt;
            const newPosition = this.position.clone().add(this.velocity);
            const newVec = new vec3_1.Vec3(newPosition.x, newPosition.y, newPosition.z);
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
exports.Particle = Particle;
//# sourceMappingURL=particle.js.map