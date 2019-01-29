/// <reference types="webgl2" />
import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
import { Vec3 } from "../math/vec3";
import { BasicShaderVariables } from "../renderer/shaders/shader-bound-variables";
export declare class ParticleSystem {
    particles: Particle[];
    constructor(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram);
    initializeParticles(position: Vec3, numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram): void;
    update(dt: number): void;
    draw(gl: WebGL2RenderingContext, shaderVariables: BasicShaderVariables, projectionMatrix: Mat3): void;
    randomInt(range: number): number;
}
