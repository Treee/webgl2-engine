import { Vec4 } from "./vec4";

describe('Vec4', () => {

    let testVector: Vec4;

    beforeEach(() => {
        testVector = new Vec4();
        expect(testVector).toBeDefined();
    });

    describe('Construction', () => {
        it('is intialized with (0, 0, 0, 1) for all values', () => {
            expect(testVector.x).toBe(0);
            expect(testVector.y).toBe(0);
            expect(testVector.z).toBe(0);
            expect(testVector.w).toBe(1);
            expect(testVector).toEqual(new Vec4());
        });

        it('can take x, y, and z input via constructor', () => {
            testVector = new Vec4(1, 20, 300, 4000);
            expect(testVector.x).toBe(1);
            expect(testVector.y).toBe(20);
            expect(testVector.z).toBe(300);
            expect(testVector.w).toBe(4000);
            expect(testVector).toEqual(new Vec4(1, 20, 300, 4000));
        });
    });

    describe('Normalize', () => {
        it('exists on the object', () => {
            expect(testVector.normalize).toBeDefined();
        });

        it('correctly normalizes a vector', () => {
            testVector = new Vec4(0, 1, 0, 0);
            const expectedVector = new Vec4(0, 1, 0, 0);
            const actualVector = testVector.normalize();
            expect(actualVector).toEqual(expectedVector);
        });

        it('correctly normalizes a different vector', () => {
            testVector = new Vec4(1, 1, 0, 1);
            const length = Math.sqrt((testVector.x * testVector.x) + (testVector.y * testVector.y) + (testVector.z * testVector.z) + (testVector.w * testVector.w));
            const expectedVector = new Vec4(testVector.x / length, testVector.y / length, testVector.z / length, testVector.w / length);
            const actualVector = testVector.normalize();
            expect(actualVector).toEqual(expectedVector);
        });
    });

    describe('Dot', () => {
        it('exists on the object', () => {
            expect(testVector.dot).toBeDefined();
        });

        it('correctly returns the dot product between 2 vectors', () => {
            testVector = new Vec4(1, 0, 0);
            let anotherVector = new Vec4(0, 1, 0, 3);
            const expectedDotProduct = ((testVector.x * anotherVector.x) + (testVector.y * anotherVector.y) + (testVector.z * anotherVector.z) + (testVector.w * anotherVector.w));
            const actualDotProduct = testVector.dot(anotherVector);
            expect(actualDotProduct).toEqual(expectedDotProduct);
        });
        it('correctly returns the dot product of a different vector', () => {
            testVector = new Vec4(1, 1, 0);
            let anotherVector = new Vec4(-1, -1, 0, 2)
            const expectedDotProduct = ((testVector.x * anotherVector.x) + (testVector.y * anotherVector.y) + (testVector.z * anotherVector.z) + (testVector.w * anotherVector.w));
            const actualDotProduct = testVector.dot(anotherVector);
            expect(actualDotProduct).toEqual(expectedDotProduct);
        });
    });

    describe('Length', () => {
        it('exists on the object', () => {
            expect(testVector.length).toBeDefined();
        });

        it('correctly returns the length of the calling vector', () => {
            testVector = new Vec4(1, 1, 1, 2);
            const expectedLength = Math.sqrt((testVector.x * testVector.x) + (testVector.y * testVector.y) + (testVector.z * testVector.z) + (testVector.w * testVector.w));
            const actualLength = testVector.length();
            expect(actualLength).toEqual(expectedLength);
        });
        it('correctly returns the length of another calling vector', () => {
            testVector = new Vec4(3, -1, 4, 4);
            const expectedLength = Math.sqrt((testVector.x * testVector.x) + (testVector.y * testVector.y) + (testVector.z * testVector.z) + (testVector.w * testVector.w));
            const actualLength = testVector.length();
            expect(actualLength).toEqual(expectedLength);
        });
    });

    describe('Clone', () => {
        it('exists on the object', () => {
            expect(testVector.clone).toBeDefined();
        });

        it('correctly returns the clone of the calling vector', () => {
            testVector = new Vec4(1, 1, 1, 2);
            const actualClone = testVector.clone();
            expect(actualClone).toEqual(testVector);
            expect(actualClone).not.toBe(testVector);
        });

        it('correctly returns the clone of another calling vector', () => {
            testVector = new Vec4(2, -1, 5, 4);
            const actualClone = testVector.clone();
            expect(actualClone).toEqual(testVector);
            expect(actualClone).not.toBe(testVector);
        });
    });

    describe('Add', () => {
        it('exists on the object', () => {
            expect(testVector.add).toBeDefined();
        });

        it('adds two vectors together', () => {
            expect(testVector).toEqual(new Vec4());
            const anotherVector = new Vec4(1, -1, 3, 1);
            const actualVector = testVector.add(anotherVector);
            const expectedVector = new Vec4(1, -1, 3, 2);
            expect(actualVector).toEqual(expectedVector);
        });

        it('adds two other vectors together', () => {
            expect(testVector).toEqual(new Vec4());
            testVector = new Vec4(1, -5, 3, 4);
            const anotherVector = new Vec4(1, -1, 3, -2);
            const actualVector = testVector.add(anotherVector);
            const expectedVector = new Vec4(2, -6, 6, 2);
            expect(actualVector).toEqual(expectedVector);
        });
    });

});
