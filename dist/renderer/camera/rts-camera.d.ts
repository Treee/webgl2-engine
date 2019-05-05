import { Camera } from "./camera";
import { v3 } from "twgl.js";
export declare class RtsCamera extends Camera {
    constructor(startPosition?: v3.Vec3, width?: number, height?: number, near?: number, far?: number);
    getForward(): v3.Vec3;
}
