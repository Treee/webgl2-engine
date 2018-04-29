import { Vec3 } from '../math/vec3';

export class BoxGeometry {

    private position: Vec3;

    constructor() {
        this.position = new Vec3();
    }

    getPosition() {
        return this.position.clone();
    }

}