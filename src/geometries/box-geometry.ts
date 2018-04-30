import { Vec3 } from '../math/vec3';
import { Mat3 } from '../math/mat3';

export class BoxGeometry {

    private position: Vec3;
    private scale: Vec3;
    private rotation: Vec3;

    constructor(position?: Vec3, scale?: Vec3, rotationAngle?: number) {
        this.position = position ? position : new Vec3();
        this.scale = scale ? scale : new Vec3(1, 1, 1);
        this.rotation = new Vec3();
        this.rotate(rotationAngle ? rotationAngle : 0);
    }

    translate(amountToTranslate: Vec3): void {
        const newPosition = this.getPosition().add(amountToTranslate);
        this.setPosition(newPosition);
    }

    getTranslationMatrix(): Mat3 {
        const position = this.getPosition();
        let translationMatrix = new Mat3();
        translationMatrix.set(1, 0, position.x, 0, 1, position.y, 0, 0, 1);
        return translationMatrix;
    }

    private setPosition(newPosition: Vec3): void {
        this.position = newPosition;
    }

    getPosition(): Vec3 {
        return this.position.clone();
    }

    scaleGeometry(amountToScale: Vec3): void {
        const newScale = this.getScale().add(amountToScale);
        this.setScale(newScale);
    }

    getScaleMatrix(): Mat3 {
        const scale = this.getScale();
        let scaleMatrix = new Mat3();
        scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1);
        return scaleMatrix;
    }

    private setScale(newScale: Vec3): void {
        this.scale = newScale;
    }

    getScale(): Vec3 {
        return this.scale.clone();
    }

    // rotates clockwise starting from (0, 1, 0)
    rotate(angleInDegrees: number): void {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const x = Math.sin(angleInRadians);
        const y = Math.cos(angleInRadians);
        const newRotation = new Vec3(x, y, 0);
        this.setRotation(newRotation);
    }

    private setRotation(newRotation: Vec3): void {
        this.rotation = newRotation;
    }

    getRotation(): Vec3 {
        return this.rotation.clone();
    }



}