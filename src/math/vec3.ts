import { Vector3 } from "three";
export class Vec3 extends Vector3 {
    constructor(x?: number, y?: number, z?: number) {
        super(x, y, z);
    }

    add(vector: Vec3): Vec3 {
        return this.toVec3(super.add(vector));
    }

    toVec3(vector: Vector3): Vec3 {
        return new Vec3(vector.x, vector.y, vector.z);
    }

    prettyPrint(): string {
        return `[${this.x}, ${this.y}, ${this.z}]`;
    }
}