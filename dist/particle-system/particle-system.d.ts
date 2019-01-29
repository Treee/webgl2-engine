/// <reference types="webgl2" />
import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
import { Vec3 } from "../math/vec3";
import { ProgramInfo } from "../renderer/shaders/program-info";
export declare class ParticleSystem {
    particles: Particle[];
    constructor(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, programInfo: ProgramInfo);
    initializeParticles(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, programInfo: ProgramInfo): void;
    update(dt: number): void;
    draw(gl: WebGL2RenderingContext, projectionMatrix: Mat3): void;
    randomInt(range: number): number;
}
