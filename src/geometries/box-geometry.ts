import { Vec3 } from '../math/vec3';

export class BoxGeometry {

    private position: Vec3;
    private scale: Vec3;
    private rotation: Vec3;

    constructor(position?: Vec3, scale?: Vec3, rotation?: Vec3) {
        this.position = position ? position : new Vec3();
        this.scale = scale ? scale : new Vec3(1, 1, 1);
        this.rotation = rotation ? rotation : new Vec3(0, 0, 0);
    }

    translate(amountToTranslate: Vec3) {
        const temp = this.getPosition().add(amountToTranslate);
        this.setPosition(temp);
    }

    private setPosition(newPosition: Vec3) {
        this.position = newPosition;
    }

    getPosition(): Vec3 {
        return this.position.clone();
    }

    scaleGeometry(amountToScale: Vec3) {
        const temp = this.getScale().add(amountToScale);
        this.setScale(temp);
    }

    private setScale(newScale: Vec3) {
        this.scale = newScale;
    }

    getScale(): Vec3 {
        return this.scale.clone();
    }

    rotate() {

    }

    private setRotation(newRotation: Vec3) {
        this.rotation = newRotation;
    }

    getRotation(): Vec3 {
        return this.rotation.clone();
    }



}