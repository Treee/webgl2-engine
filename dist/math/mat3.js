"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
class Mat3 extends three_1.Matrix3 {
    constructor() {
        super();
    }
    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
        super.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
        return this;
    }
    multiply(matrix) {
        super.multiply(matrix);
        return this;
    }
    multiplyMatrices(matrixA, matrixB) {
        super.multiplyMatrices(matrixA, matrixB);
        return this;
    }
    prettyPrint() {
        const t = this.clone().transpose().toArray();
        return `[${t[0]}, ${t[1]}, ${t[2]}\n${t[3]}, ${t[4]}, ${t[5]}\n${t[6]}, ${t[7]}, ${t[8]}]`;
    }
}
exports.Mat3 = Mat3;
//# sourceMappingURL=mat3.js.map