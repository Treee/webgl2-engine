/// <reference types="webgl2" />
import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';
import { Mat3 } from '../math/mat3';
export declare class BoxGeometry {
    private position;
    private scale;
    private rotation;
    private color;
    constructor();
    getTransform(): Mat3;
    translate(amountToTranslate: Vec3): void;
    getTranslationMatrix(): Mat3;
    private setPosition(newPosition);
    getPosition(): Vec3;
    getScaleMatrix(): Mat3;
    setScale(newScale: Vec3): void;
    getScale(): Vec3;
    rotate(angleInDegrees: number): void;
    getRotationMatrix(): Mat3;
    private setRotation(newRotation);
    getRotation(): Vec3;
    setColor(newColor: Vec4): void;
    getColor(): Vec4;
    drawObject(gl: WebGL2RenderingContext, transformLocation: any, colorLocation: any): void;
}
