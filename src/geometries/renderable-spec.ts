import { RenderableObject } from "./renderable-object";

// stub for abstract class, intentionally left empty so we can test base functionality
class TestRenderableObject extends RenderableObject {
    constructor() {
        super();
    }
}

fdescribe('Renderable Object', () => {

    let testObject: TestRenderableObject;

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
});