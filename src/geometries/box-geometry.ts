import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';
import { Mat3 } from '../math/mat3';

export class BoxGeometry {

    private position: Vec3 = new Vec3();
    private scale: Vec3 = new Vec3(1, 1, 1);
    private rotation: Vec3 = new Vec3(0, 1, 0);

    private color: Vec4 = new Vec4();

    constructor() { }

    getTransform(): Mat3 {
        let temp = new Mat3();
        temp = temp.multiplyMatrices(temp, this.getRotationMatrix());
        temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
        temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
        return temp;
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

    getScaleMatrix(): Mat3 {
        const scale = this.getScale();
        let scaleMatrix = new Mat3();
        scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, scale.z);
        return scaleMatrix;
    }

    setScale(newScale: Vec3): void {
        this.scale = newScale;
    }

    getScale(): Vec3 {
        return this.scale.clone();
    }

    // rotates clockwise starting from (0, 1, 0)
    rotate(angleInDegrees: number): void {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const newRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
        this.setRotation(newRotation);
    }

    getRotationMatrix(): Mat3 {
        const rotation = this.getRotation();
        let rotationMatrix = new Mat3();
        // [y, -x, 0,
        //  x, y, 0,
        //  0, 0, 1]
        rotationMatrix.set(rotation.y, rotation.x, 0, -rotation.x, rotation.y, 0, 0, 0, 1);
        return rotationMatrix;
    }

    private setRotation(newRotation: Vec3): void {
        this.rotation = newRotation;
    }

    getRotation(): Vec3 {
        return this.rotation.clone();
    }

    setColor(newColor: Vec4): void {
        this.color = newColor;
    }

    getColor(): Vec4 {
        return this.color.clone();
    }

}