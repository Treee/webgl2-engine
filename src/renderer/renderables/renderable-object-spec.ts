import { RenderableObject } from "./renderable-object";
import { v3, ProgramInfo } from "twgl.js";

// stub for abstract class, intentionally left empty so we can test base functionality
class TestRenderableObject extends RenderableObject {
    constructor() {
        super();
    }
}

describe('Renderable Object', () => {

    let testObject: TestRenderableObject;
    const deltaTime = 0.01;

    beforeEach(() => {
        testObject = new TestRenderableObject();
    });

    describe('lerp', () => {
        it('can move several steps correctly', () => {
            expect(Array.prototype.slice.call(testObject.lerp([0, 0, 0], [1, 0, 0], .25))).toEqual([0.25, 0, 0]);
            expect(Array.prototype.slice.call(testObject.lerp([0, 0, 0], [1, 0, 0], .5))).toEqual([0.50, 0, 0]);
            expect(Array.prototype.slice.call(testObject.lerp([0, 0, 0], [1, 0, 0], .75))).toEqual([0.75, 0, 0]);
            expect(Array.prototype.slice.call(testObject.lerp([0, 0, 0], [1, 0, 0], 1))).toEqual([1, 0, 0]);
        });
    });

    describe('translate', () => {
        it('adds the translation amount to the current position of the test object', () => {
            const translateAmount = [Math.random(), Math.random(), Math.random()];
            const expectedPosition = v3.add(testObject.position, translateAmount);
            testObject.translate(deltaTime, translateAmount)
            expect(testObject.position).toEqual(expectedPosition);
        });

        it('sets the object as dirty', () => {
            testObject.translate(deltaTime, [Math.random(), Math.random(), Math.random()]);
            expect(testObject.isDirty).toBe(true);
        });
    });

    describe('scale', () => {
        it('scales the object to the desired value', () => {
            const scaleAmount = [Math.random(), Math.random(), Math.random()];
            expect(testObject.scaleValue).toEqual([1, 1, 1]);
            testObject.scale(deltaTime, scaleAmount)
            expect(testObject.scaleValue).toEqual(scaleAmount);
        });

        it('sets the object as dirty', () => {
            testObject.scale(deltaTime, [Math.random(), Math.random(), Math.random()]);
            expect(testObject.isDirty).toBe(true);
        });
    });

    describe('rotate', () => {
        it('sets the object as dirty', () => {
            testObject.rotate(deltaTime);
            expect(testObject.isDirty).toBe(true);
        });
    });

});