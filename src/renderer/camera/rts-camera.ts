import { Camera } from "./camera";
import { v3 } from "twgl.js";
import { Quaternion, Vector3 } from "three";

export class RtsCamera extends Camera {
    constructor(startPosition: v3.Vec3 = [0, 0, 0], width: number = 1366, height: number = 768, near: number = 1, far: number = 100) {
        super(startPosition);
        this.setDiametricProjection(0, width, 0, height, near, far);
    }

    getForward(): v3.Vec3 {
        const forward = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 1.5708);
        const oldRight = this.getRight();
        const converted = new Vector3(oldRight[0], oldRight[1], oldRight[2]);
        const forwardVec = converted.applyQuaternion(forward);
        const convertedVec = [forwardVec.x, forwardVec.y, forwardVec.z];
        return convertedVec;
    }

    // getUp(): v3.Vec3 {
    //     return [0, 0, 0];
    // }
}