import { Mat3 } from "./mat3";

describe('Mat3', () => {

    let testMatrix: Mat3;
    const identityArray = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1
    ]

    beforeEach(() => {
        testMatrix = new Mat3();
        expect(testMatrix).toBeDefined();
    });

    describe('Construction', () => {
        it('is the identity matrix', () => {
            expect(testMatrix.toArray()).toEqual(identityArray);
        });
    });

    describe('Set', () => {
        it('sets the matrix using column major format', () => {
            const expectedMatrix = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            testMatrix.set(1, 4, 7, 2, 5, 8, 3, 6, 9);
            expect(testMatrix.toArray()).toEqual(expectedMatrix);
        });
    });

    describe('Pretty Print', () => {
        it('prints the identity matrix correctly', () => {
            const expected = `[1, 0, 0\n0, 1, 0\n0, 0, 1]`;
            testMatrix = new Mat3();
            const actual = testMatrix.prettyPrint();

            expect(actual).toEqual(expected);
        });

        it('prints a random matrix correctly', () => {
            const a00 = Math.random();
            const a01 = Math.random();
            const a02 = Math.random();
            const a10 = Math.random();
            const a11 = Math.random();
            const a12 = Math.random();
            const a20 = Math.random();
            const a21 = Math.random();
            const a22 = Math.random();
            const expected = `[${a00}, ${a01}, ${a02}\n${a10}, ${a11}, ${a12}\n${a20}, ${a21}, ${a22}]`;
            testMatrix = new Mat3();
            testMatrix = testMatrix.set(
                a00, a01, a02,
                a10, a11, a12,
                a20, a21, a22
            );
            const actual = testMatrix.prettyPrint();
            expect(actual).toEqual(expected);
        });

    });
});