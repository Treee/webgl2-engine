import { v3, m4 } from "twgl.js";
import { Camera } from "./camera";

export class RtsCamera extends Camera {
    constructor(startPosition: v3.Vec3) {
        super(startPosition);
        const right = 640;
        const left = 0;
        const top = 0;
        const bot = 480;
        const near = 1;
        const far = 10;
        this.yaw(-45);
        this.pitch(-30);
        this.projectionMatrix = m4.identity([
            ((right - left) / 2), 0, 0, 0,
            0, ((top - bot) / 2), 0, 0,
            0, 0, ((far - near) / -2), 0,
            ((left + right) / 2), ((top + bot) / 2), -((far + near) / 2), 1
        ]);
    }
}