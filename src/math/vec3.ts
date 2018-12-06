import { Vector3 } from "three";
export class Vec3 extends Vector3 {
    constructor(x?: number, y?: number, z?: number) {
        super(x, y, z);
    }

    addVec3(vector: Vec3): Vec3 {
        return this.toVec3(super.add(vector));
    }

    subtract(vector: Vec3): Vec3 {
        return this.toVec3(super.sub(vector));
    }

    multiplyVec3ByScalar(scalar: number): Vec3 {
        return this.toVec3(super.multiplyScalar(scalar));
    }

    cloneVec3() {
        return this.toVec3(super.clone());
    }

    toVec3(vector: Vector3): Vec3 {
        return new Vec3(vector.x, vector.y, vector.z);
    }

    prettyPrint(): string {
        const v = this.clone();
        return `[${v.x}, ${v.y}, ${v.z}]`;
    }
}