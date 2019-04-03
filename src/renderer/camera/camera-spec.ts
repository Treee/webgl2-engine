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
            expect(testCamera.getPosition()).toEqual([0, 0, -1]);
        });
    });

});