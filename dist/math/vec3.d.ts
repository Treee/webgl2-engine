import { Vector3 } from "three";
export declare class Vec3 extends Vector3 {
    constructor(x?: number, y?: number, z?: number);
    addVec3(vector: Vec3): Vec3;
    subtract(vector: Vec3): Vec3;
    multiplyVec3ByScalar(scalar: number): Vec3;
    cloneVec3(): Vec3;
    toVec3(vector: Vector3): Vec3;
    prettyPrint(): string;
}
