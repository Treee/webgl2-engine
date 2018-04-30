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
});