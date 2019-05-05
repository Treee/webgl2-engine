import { Camera } from "./camera";
import { v3 } from "twgl.js";

export class RtsCamera extends Camera {
    constructor(startPosition: v3.Vec3 = [0, 0, 0], width: number = 1366, height: number = 768, near: number = 1, far: number = 100) {
        super(startPosition);
        this.setDiametricProjection(0, width, 0, height, near, far);
    }

    // getForward(): v3.Vec3 {
    //     const right = this.getRight();
    //     return [right[0], -right[1], right[2]];
    // }

    // getUp(): v3.Vec3 {
    //     return [0, 0, 0];
    // }
}