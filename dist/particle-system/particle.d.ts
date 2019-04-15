/// <reference types="webgl2" />
import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";
import { Mat3 } from "../math/mat3";
import { Renderable } from '../renderer/renderables/renderable';
import { ProgramInfoTree } from "../renderer/shaders/program-info";
export declare class Particle extends Renderable {
    velocity: Vec3;
    isActive: boolean;
    decay: number;
    constructor(position: Vec3 | undefined, velocity: Vec3 | undefined, color: Vec4 | undefined, decay: number | undefined, gl: WebGL2RenderingContext, programInfo: ProgramInfoTree);
    reinitializeParticle(position?: Vec3, velocity?: Vec3, color?: Vec4, decay?: number): void;
    draw(gl: WebGL2RenderingContext, projectionMatrix: Mat3): void;
    update(dt: number): void;
    disableParticleCheck(): void;
}
