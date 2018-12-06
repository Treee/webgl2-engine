/// <reference types="webgl2" />
import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';
import { Mat3 } from '../math/mat3';
export declare class BoxGeometry {
    private position;
    private scale;
    private rotation;
    private color;
    private vao;
    private vertices;
    constructor();
    setVertices(newVertices: number[]): void;
    getTransform(projectionMatrix: Mat3): Mat3;
    translate(newPosition: Vec3): void;
    lerp(pointA: Vec3, pointB: Vec3, dt: number): Vec3;
    getTranslationMatrix(): Mat3;
    getPosition(): Vec3;
    getScaleMatrix(): Mat3;
    setScale(newScale: Vec3): void;
    getScale(): Vec3;
    rotate(angleInDegrees: number): void;
    getRotationMatrix(): Mat3;
    private setRotation;
    getRotation(): Vec3;
    setColor(newColor: Vec4): void;
    getColor(): Vec4;
    draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3): void;
    createVertexArrayObject(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram): void;
    private createBindAndBufferData;
    private createRectangle;
    private createRandomRectangle;
    randomInt(range: number): number;
}
