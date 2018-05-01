import { BoxGeometry } from "./box-geometry";
import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";

describe('Box Geometry', () => {
    let testBoxGeometry: BoxGeometry;

    beforeEach(() => {
        testBoxGeometry = new BoxGeometry();
        // default private values
        expect(testBoxGeometry.getPosition()).toEqual(new Vec3());
        expect(testBoxGeometry.getScale()).toEqual(new Vec3(1, 1, 1));
        // rotation is at 90 degrees by default
        expect(testBoxGeometry.getRotation()).toEqual(new Vec3(0, 1, 0));
        expect(testBoxGeometry.getColor()).toEqual(new Vec4());
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

    describe('GetTranslationMatrix', () => {
        it('returns a matrix with the position as the last row (ignoring z for now)', () => {
            const newPosition = new Vec3(2, 3, 4);
            const expectedTranslation = [1, 0, 0, 0, 1, 0, 2, 3, 1]
            testBoxGeometry.translate(newPosition);
            const actualTranslation = testBoxGeometry.getTranslationMatrix();
            expect(actualTranslation.toArray()).toEqual(expectedTranslation);
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

    describe('ScaleGeometry', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.scaleGeometry).toBeDefined();
        });

        it('scales the geometry by a given amount', () => {
            const expectedScale = new Vec3(2, 3, 4);
            const scaleBy = new Vec3(1, 2, 3);
            testBoxGeometry.scaleGeometry(scaleBy);
            const actualScale = testBoxGeometry.getScale();
            expect(actualScale).toEqual(expectedScale);
        });

        it('scales the geometry by a different given amount', () => {
            testBoxGeometry = new BoxGeometry(new Vec3(0, 0, 0), new Vec3(2, 2, 2));
            const expectedScale = new Vec3(3, 4, 5);
            const scaleBy = new Vec3(1, 2, 3);
            testBoxGeometry.scaleGeometry(scaleBy);
            const actualScale = testBoxGeometry.getScale();
            expect(actualScale).toEqual(expectedScale);
        });
    });

    describe('GetScaleMatrix', () => {
        it('returns a matrix with the scale at position (x)a11, (y)a22, (z)a33 ignored for now', () => {
            const newScale = new Vec3(4, 2, 3);
            const expectedScaleMatrix = [newScale.x, 0, 0, 0, newScale.y, 0, 0, 0, 1];
            testBoxGeometry.scaleGeometry(new Vec3(3, 1, 2));
            const actualScaleMatrix = testBoxGeometry.getScaleMatrix();
            expect(actualScaleMatrix.toArray()).toEqual(expectedScaleMatrix);
        });
    });

    describe('GetRotation', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.getRotation).toBeDefined();
        });

        it('returns the rotation vector of the geometry', () => {
            const expectedRotation = new Vec3(0, 1, 0);
            const actualRotation = testBoxGeometry.getRotation();
            expect(actualRotation).toEqual(expectedRotation);
        });

        it('returns a copy of the rotation vector not a reference', () => {
            const expectedRotation = new Vec3(1, 0, 0);
            testBoxGeometry = new BoxGeometry(new Vec3(), new Vec3(), 90);
            const actualRotation = testBoxGeometry.getRotation();
            // cos90 degrees is only approx 0
            // check if the value is below the margin of error (10 zeros out)
            if (actualRotation.y < 0.00000000001) {
                actualRotation.y = 0;
            }
            expect(actualRotation).toEqual(expectedRotation);
            expect(actualRotation).not.toBe(expectedRotation);
        });
    });

    describe('Rotate', () => {
        it('exists on the geometry', () => {
            expect(testBoxGeometry.rotate).toBeDefined();
        });

        it('rotates the geometry by 90 degrees', () => {
            const angleInDegrees = 90;
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const expectedRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
            testBoxGeometry.rotate(angleInDegrees);
            const actualRotation = testBoxGeometry.getRotation();
            expect(actualRotation).toEqual(expectedRotation);
        });

        it('rotates the geometry by 45 degreess', () => {
            const angleInDegrees = 45;
            const angleInRadians = angleInDegrees * (Math.PI / 180);
            const expectedRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
            testBoxGeometry.rotate(angleInDegrees);
            const actualRotation = testBoxGeometry.getRotation();
            expect(actualRotation).toEqual(expectedRotation);
        });
    });

    describe('GetRotationMatrix', () => {
        it('returns a matrix with the rotation matrix within', () => {
            const expectedRotationMatrix = [1, -0, 0, 0, 1, 0, 0, 0, 1];
            const actualRotationMatrix = testBoxGeometry.getRotationMatrix();
            expect(actualRotationMatrix.toArray()).toEqual(expectedRotationMatrix);
        });

        it('returns a matrix with the 90 degree rotation matrix within', () => {
            const expectedRotationMatrix = [0, -1, 0, 1, 0, 0, 0, 0, 1];
            testBoxGeometry.rotate(90);
            const actualRotationMatrix = testBoxGeometry.getRotationMatrix();
            let rotationMatrixArray = actualRotationMatrix.toArray();
            if (rotationMatrixArray[0] < 0.0000000001) {
                rotationMatrixArray[0] = 0;
            }
            if (rotationMatrixArray[4] < 0.0000000001) {
                rotationMatrixArray[4] = 0;
            }
            expect(rotationMatrixArray).toEqual(expectedRotationMatrix);
        });
    });

    describe('GetColor', () => {
        it('returns the default color (black) vector of the geometry', () => {
            const expectedColorVector = new Vec4();
            const actualColorVector = testBoxGeometry.getColor();
            expect(actualColorVector).toEqual(expectedColorVector);
        });

        it('returns the current color vector of the geometry', () => {
            const expectedColorVector = new Vec4(1, 1, 1, 1);
            testBoxGeometry = new BoxGeometry(undefined, undefined, undefined, expectedColorVector);
            const actualColorVector = testBoxGeometry.getColor();
            expect(actualColorVector).toEqual(expectedColorVector);
        });

        it('returns a copy of the vector, not a reference', () => {
            const expectedColorVector = new Vec4(1, 1, 1, 1);
            testBoxGeometry = new BoxGeometry(undefined, undefined, undefined, expectedColorVector);
            const actualColorVector = testBoxGeometry.getColor();
            expect(actualColorVector).not.toBe(expectedColorVector);
        });
    });

    describe('SetColor', () => {
        it('it sets the color of the geometry', () => {
            const expectedColorVector = new Vec4(1, 0, 1, 1);
            testBoxGeometry.setColor(expectedColorVector);
            const actualColorVector = testBoxGeometry.getColor();
            expect(actualColorVector).toEqual(expectedColorVector);
        });

        it('it sets another color of the geometry', () => {
            const expectedColorVector = new Vec4(1, 1, 0, 1);
            testBoxGeometry.setColor(expectedColorVector);
            const actualColorVector = testBoxGeometry.getColor();
            expect(actualColorVector).toEqual(expectedColorVector);
        });
    });

});