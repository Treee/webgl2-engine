"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
class Vec3 extends three_1.Vector3 {
    constructor(x, y, z) {
        super(x, y, z);
    }
    addVec3(vector) {
        return this.toVec3(super.add(vector));
    }
    subtract(vector) {
        return this.toVec3(super.sub(vector));
    }
    multiplyVec3ByScalar(scalar) {
        return this.toVec3(super.multiplyScalar(scalar));
    }
    cloneVec3() {
        return this.toVec3(super.clone());
    }
    toVec3(vector) {
        return new Vec3(vector.x, vector.y, vector.z);
    }
    prettyPrint() {
        const v = this.clone();
        return `[${v.x}, ${v.y}, ${v.z}]`;
    }
}
exports.Vec3 = Vec3;
//# sourceMappingURL=vec3.js.map