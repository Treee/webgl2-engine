import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";
export declare class Particle {
    color: Vec4;
    position: Vec3;
    velocity: Vec3;
    isActive: boolean;
    decay: number;
    constructor(position?: Vec3, velocity?: Vec3, color?: Vec4, decay?: number);
    reinitializeParticle(position?: Vec3, velocity?: Vec3, color?: Vec4, decay?: number): void;
    update(dt: number): void;
    disableParticleCheck(): void;
}
