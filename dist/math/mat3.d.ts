import { Matrix3 } from "three";
export declare class Mat3 extends Matrix3 {
    constructor();
    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): Mat3;
    multiply(matrix: Mat3): Mat3;
    multiplyMatrices(matrixA: Mat3, matrixB: Mat3): Mat3;
    prettyPrint(): string;
}
