import { Point2D } from './point-2d';
import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';

describe('Point', () => {
    let testPoint: Point2D;
    const startingX = 100;
    const startingY = 150;

    beforeEach(() => {
        testPoint = new Point2D(startingX, startingY);
        // default private values
        expect(testPoint.getPosition()).toEqual(new Vec3(startingX, startingY, 1));
        expect(testPoint.getScale()).toEqual(new Vec3(1, 1, 1));
        expect(testPoint.getColor()).toEqual(new Vec4());
    });

    describe('', () => {
        it('', () => {

        });
    });

});