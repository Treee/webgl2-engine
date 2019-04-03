import { Camera } from "./camera";

describe('Camera', () => {

    let testCamera: Camera;
    let startingPosition = [0, 0, 0];

    beforeEach(() => {
        testCamera = new Camera(startingPosition);
        // default private values
        expect(testCamera.getPosition()).toEqual([0, 0, 0]);
    });


    describe('movement', () => {
        it('can move forward one unit', () => {
            expect(testCamera.getPosition()).toEqual([0, 0, 0]);
            testCamera.moveForward();
            expect(testCamera.getPosition()[0]).toBeLessThan(0.000000000000001);
            expect(testCamera.getPosition()[1]).toBeLessThan(0.000000000000001);
            expect(testCamera.getPosition()[2]).toEqual(-1);
        });

        it('can move to the right one unit', () => {
            expect(testCamera.getPosition()).toEqual([0, 0, 0]);
            testCamera.moveRight();
            expect(testCamera.getPosition()[0]).toBe(1);
            expect(testCamera.getPosition()[1]).toBe(0);
            expect(testCamera.getPosition()[2]).toEqual(0);
        });
    });

});