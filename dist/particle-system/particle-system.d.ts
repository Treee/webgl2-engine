/// <reference types="webgl2" />
import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
import { Vec3 } from "../math/vec3";
export declare class ParticleSystem {
    particles: Particle[];
    constructor(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram);
    initializeParticles(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram): void;
    update(dt: number): void;
    draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3): void;
    randomInt(range: number): number;
}
