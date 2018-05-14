import { Matrix3 } from "three";
export class Mat3 extends Matrix3 {
    constructor() {
        super();
    }

    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): Mat3 {
        super.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);
        return this;
    }

    multiply(matrix: Mat3): Mat3 {
        super.multiply(matrix);
        return this;
    }

    multiplyMatrices(matrixA: Mat3, matrixB: Mat3): Mat3 {
        super.multiplyMatrices(matrixA, matrixB);
        return this;
    }

    prettyPrint(): string {
        const t = this.clone().transpose().toArray();
        return `[${t[0]}, ${t[1]}, ${t[2]}\n${t[3]}, ${t[4]}, ${t[5]}\n${t[6]}, ${t[7]}, ${t[8]}]`;
    }
}