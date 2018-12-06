/// <reference types="webgl2" />
import { Particle } from "./particle";
import { Mat3 } from '../math/mat3';
export declare class ParticleSystem {
    particles: Particle[];
    constructor(numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram);
    initializeParticles(numberOfParticles: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram): void;
    draw(dt: number, gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3): void;
    randomInt(range: number): number;
}
