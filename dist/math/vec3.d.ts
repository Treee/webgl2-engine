import { Vector3 } from "three";
export declare class Vec3 extends Vector3 {
    constructor(x?: number, y?: number, z?: number);
    add(vector: Vec3): Vec3;
    toVec3(vector: Vector3): Vec3;
    prettyPrint(): string;
}
