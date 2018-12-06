/// <reference types="webgl2" />
import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";
import { Mat3 } from '../math/mat3';
export declare class Particle {
    private vao;
    private vertices;
    private scale;
    color: Vec4;
    position: Vec3;
    velocity: Vec3;
    isActive: boolean;
    decay: number;
    constructor(position?: Vec3, velocity?: Vec3, color?: Vec4, decay?: number);
    reinitializeParticle(position?: Vec3, velocity?: Vec3, color?: Vec4, decay?: number): void;
    update(dt: number): void;
    disableParticleCheck(): void;
    setVertices(newVertices: number[]): void;
    translate(newPosition: Vec3): void;
    getScale(): Vec3;
    getScaleMatrix(): Mat3;
    getPosition(): Vec3;
    getColor(): Vec4;
    getTranslationMatrix(): Mat3;
    getTransform(projectionMatrix: Mat3): Mat3;
    draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3): void;
    createVertexArrayObject(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram): void;
    private createBindAndBufferData;
}
