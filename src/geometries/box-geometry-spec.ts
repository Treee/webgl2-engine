import { BoxGeometry } from "./box-geometry";
import { Vec3 } from "../math/vec3";

describe('Box Geometry', () => {
    let testBoxGeometry: BoxGeometry;

    beforeEach(() => {
        testBoxGeometry = new BoxGeometry();
    });

    // describe('Construction', () => {

    // });

    describe('Get Position', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.getPosition).toBeDefined();
        });
    });
});