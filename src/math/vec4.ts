import { Vector4 } from "three";
export class Vec4 extends Vector4 {
    constructor(x?: number, y?: number, z?: number, w?: number) {
        super(x, y, z, w);
    }

    // clone(): this {
    //     return super.clone();
    // }
}
