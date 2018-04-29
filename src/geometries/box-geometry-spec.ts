import { BoxGeometry } from "./box-geometry";
import { Vec3 } from "../math/vec3";

describe('Box Geometry', () => {
    let testBoxGeometry: BoxGeometry;

    beforeEach(() => {
        testBoxGeometry = new BoxGeometry();
        // default values
        expect(testBoxGeometry.getPosition()).toEqual(new Vec3());
        expect(testBoxGeometry.getScale()).toEqual(new Vec3(1, 1, 1));
    });

    describe('Construction', () => {
        it('a position can be passed in', () => {
            expect(testBoxGeometry.getPosition()).toEqual(new Vec3());
            const newPosition = new Vec3(1, 1, 1);
            testBoxGeometry = new BoxGeometry(newPosition);
            expect(testBoxGeometry.getPosition()).toEqual(newPosition);
        });

        it('a scale can be passed in', () => {
            expect(testBoxGeometry.getScale()).toEqual(new Vec3(1, 1, 1));
            const newPosition = new Vec3(1, 1, 1);
            const newScale = new Vec3(9, 8, 7);
            testBoxGeometry = new BoxGeometry(newPosition, newScale);
            expect(testBoxGeometry.getScale()).toEqual(newScale);
        });
    });

    describe('Translate', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.translate).toBeDefined();
        });

        it('adds the supplied vector to the geometries position', () => {
            const expectedPosition = new Vec3(1, 2, 3);
            const amountToMove = new Vec3(1, 2, 3);
            testBoxGeometry.translate(amountToMove);
            const actualPosition = testBoxGeometry.getPosition();
            expect(actualPosition).toEqual(expectedPosition);
        });

        it('adds another supplied vector to the geometries position', () => {
            const newPosition = new Vec3(4, 1, 2);
            testBoxGeometry = new BoxGeometry(newPosition);
            const amountToMove = new Vec3(-1, 4, -3);
            const expectedPosition = new Vec3(3, 5, -1);
            testBoxGeometry.translate(amountToMove);
            const actualPosition = testBoxGeometry.getPosition();
            expect(actualPosition).toEqual(expectedPosition);
        });
    });

    describe('GetPosition', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.getPosition).toBeDefined();
        });

        it('returns the position of the geometry', () => {
            const actualPosition = testBoxGeometry.getPosition();
            expect(actualPosition).toEqual(new Vec3());
        });

        it('returns a copy of the actual position not a reference', () => {
            const newPosition = new Vec3(1, 2, 3);
            testBoxGeometry = new BoxGeometry(newPosition);
            const actualPosition = testBoxGeometry.getPosition();
            expect(actualPosition).toEqual(newPosition);
            expect(actualPosition).not.toBe(newPosition);
        });
    });

    describe('GetScale', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.getScale).toBeDefined();
        });

        it('returns the scale of the geometry', () => {
            const expectedScale = new Vec3(1, 1, 1);
            const actualScale = testBoxGeometry.getScale();
            expect(actualScale).toEqual(expectedScale);
        });

        it('returns a copy of the actual scale not a reference', () => {
            const newScale = new Vec3(1, 2, 3);
            testBoxGeometry = new BoxGeometry(undefined, newScale);
            const actualScale = testBoxGeometry.getScale();
            expect(actualScale).toEqual(newScale);
            expect(actualScale).not.toBe(newScale);
        });
    });

});