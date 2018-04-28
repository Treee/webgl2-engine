import { Vec3 } from "./vec3";

describe('Vec3', () => {

    let testVector: Vec3;

    beforeEach(() => {
        testVector = new Vec3();
    });

    describe('Construction', () => {
        it('is intialized with 0s for all values', () => {
            expect(testVector.x).toBe(0);
            expect(testVector.y).toBe(0);
            expect(testVector.z).toBe(0);
            expect(testVector).toEqual(new Vec3());
        });

        it('can take x, y, and z input via constructor', () => {
            testVector = new Vec3(1, 20, 300);
            expect(testVector.x).toBe(1);
            expect(testVector.y).toBe(20);
            expect(testVector.z).toBe(300);
            expect(testVector).toEqual(new Vec3(1, 20, 300));
        });
    });

    describe('Normalize', () => {
        it('exists on the object', () => {
            expect(testVector.normalize).toBeDefined();
        });

        it('correctly normalizes a vector', () => {
            testVector = new Vec3(0, 1, 0);
            const expectedVector = new Vec3(0, 1, 0);
            const actualVector = testVector.normalize();
            expect(actualVector).toEqual(expectedVector);
        });

        it('correctly normalizes a different vector', () => {
            testVector = new Vec3(1, 1, 0);
            const length = Math.sqrt((testVector.x * testVector.x) + (testVector.y * testVector.y) + (testVector.z * testVector.z));
            const expectedVector = new Vec3(testVector.x / length, testVector.y / length, testVector.z / length);
            const actualVector = testVector.normalize();
            expect(actualVector).toEqual(expectedVector);
        });
    });

    describe('Dot', () => {
        it('', () => {

        });
    });

});
