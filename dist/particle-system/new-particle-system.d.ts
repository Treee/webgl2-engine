/// <reference types="webgl2" />
import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';
import { Mat3 } from '../math/mat3';
import { GeometryData } from '../geometries/geometry-data';
export declare class NewParticle {
    velocity: Vec3;
    isActive: boolean;
    decay: number;
    constructor();
}
export declare class NewParticleSystem {
    protected position: Vec3;
    protected scale: Vec3;
    protected rotation: Vec3;
    protected color: Vec4;
    geometryData: GeometryData;
    protected vao: WebGLVertexArrayObject;
    protected vertices: number[];
    numParticles: number;
    particles: NewParticle[];
    constructor(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram, numParticles: number | undefined, position: Vec3);
    reinitializeParticles(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram, numParticles?: number, generatorPosition?: Vec3, maxVelocity?: Vec3, maxDecay?: number): void;
    createParticle(maxVelocity: Vec3, maxDecay: number): NewParticle;
    update(dt: number): void;
    isParticleActive(particleDecay: number): boolean;
    lerp(pointA: Vec3, pointB: Vec3, dt: number): Vec3;
    protected setVertices(newVertices: number[]): void;
    getTransform(projectionMatrix: Mat3): Mat3;
    getTranslationMatrix(): Mat3;
    translate(newPosition: Vec3): void;
    getPosition(): Vec3;
    getScaleMatrix(): Mat3;
    getScale(): Vec3;
    setScale(newScale: Vec3): void;
    getRotationMatrix(): Mat3;
    rotate(angleInDegrees: number): void;
    getRotation(): Vec3;
    private setRotation;
    setColor(newColor: Vec4): void;
    getColor(): Vec4;
    draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3): void;
    createVertexArrayObject(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram): void;
    private createBindAndBufferData;
}
