import { RtsCamera } from './rts-camera';
import { m4 } from "twgl.js";

describe('RTS Camera', () => {
    let testRtsCamera: RtsCamera;
    let startPosition = [0, 0, 0];
    beforeEach(() => {
        testRtsCamera = new RtsCamera(startPosition);
    });

    it('has a diametric projection', () => {
        const right = 0;
        const left = 1366
        const top = 0;
        const bot = 768;
        const near = 1;
        const far = 100;
        const diametricProjectionMatrix = m4.identity([
            ((right - left) / 2), 0, 0, 0,
            0, ((top - bot) / 2), 0, 0,
            0, 0, ((far - near) / -2), 0,
            ((left + right) / 2), ((top + bot) / 2), -((far + near) / 2), 1
        ]);
        expect(testRtsCamera.setDiametricProjection()).toEqual(diametricProjectionMatrix);
    });

    // it('moves across the x plane in the left and right directions', () => {
    //     expect(testRtsCamera.getPosition()).toEqual([0, 0, 0]);
    //     testRtsCamera.moveLeft()
    //     expect(testRtsCamera.getPosition()).toEqual(new Float32Array([-0.5253219604492188, 5.551115123125783e-17, 0.8509035110473633]));
    //     testRtsCamera.moveRight();
    //     expect(testRtsCamera.getPosition()).toEqual(new Float32Array([0, 0, 0]));
    //     testRtsCamera.moveRight();
    //     expect(testRtsCamera.getPosition()).toEqual(new Float32Array([0.5253219604492188, -5.551115123125783e-17, -0.8509035110473633]));
    // });

    // it('moves across the x plane in the forward and backward directions', () => {
    //     expect(testRtsCamera.getPosition()).toEqual([0, 0, 0]);
    //     testRtsCamera.moveForward()
    //     expect(testRtsCamera.getPosition()).toEqual(new Float32Array([-0.5253219604492188, -5.551115123125783e-17, 0.8509035110473633]));
    //     testRtsCamera.moveBackward();
    //     expect(testRtsCamera.getPosition()).toEqual(new Float32Array([0, 0, 0]));
    //     testRtsCamera.moveBackward();
    //     expect(testRtsCamera.getPosition()).toEqual(new Float32Array([0.5253219604492188, 5.551115123125783e-17, -0.8509035110473633]));
    // });
});