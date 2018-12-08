// import { BoxGeometry } from './box-geometry';
// import { Vec3 } from '../math/vec3';
// import { Vec4 } from '../math/vec4';
// import { Mat3 } from '../math/mat3';

// describe('Renderable', () => {
//   let testRenderable: BoxGeometry;

//   beforeEach(() => {
//     testRenderable = new BoxGeometry(jasmine.createSpy(), jasmine.createSpy());
//     // default private values
//     expect(testRenderable.getPosition()).toEqual(new Vec3());
//     expect(testRenderable.getScale()).toEqual(new Vec3(1, 1, 1));
//     // rotation is at 90 degrees by default
//     expect(testRenderable.getRotation()).toEqual(new Vec3(0, 1, 0));
//     expect(testRenderable.getColor()).toEqual(new Vec4());
//   });

//   describe('Translate', () => {
//     it('exists on the geometry', () => {
//       expect(testRenderable.translate).toBeDefined();
//     });

//     it('sets the position of the geometry to a new position', () => {
//       const expectedPosition = new Vec3(1, 2, 3);
//       testRenderable.translate(expectedPosition);
//       const actualPosition = testRenderable.getPosition();
//       expect(actualPosition).toEqual(expectedPosition);
//     });

//     it('sets the position to a new position when the position is already set', () => {
//       const initialPosition = new Vec3(4, 1, 2);
//       testRenderable = new BoxGeometry(webglRenderSpy, webglProgramSpy);
//       testRenderable.translate(initialPosition);
//       let actualPosition = testRenderable.getPosition();
//       expect(actualPosition).toEqual(initialPosition, 'Failed initial position test');
//       const expectedPosition = new Vec3(3, 5, -1);
//       testRenderable.translate(expectedPosition);
//       actualPosition = testRenderable.getPosition();
//       expect(actualPosition).toEqual(expectedPosition, 'Failed expected position test');
//     });
//   });

//   describe('GetTranslationMatrix', () => {
//     it('returns a matrix with the position as the last row (ignoring z for now)', () => {
//       const newPosition = new Vec3(2, 3, 4);
//       const expectedTranslation = [1, 0, newPosition.x, 0, 1, newPosition.y, 0, 0, 1]
//       testRenderable.translate(newPosition);
//       const actualTranslation = testRenderable.getTranslationMatrix();
//       expect(actualTranslation.toArray()).toEqual(expectedTranslation);
//     });
//   });

//   describe('GetPosition', () => {
//     it('exists on the geometry', () => {
//       expect(testRenderable.getPosition).toBeDefined();
//     });

//     it('returns the position of the geometry', () => {
//       const actualPosition = testRenderable.getPosition();
//       expect(actualPosition).toEqual(new Vec3());
//     });

//     it('returns a copy of the actual position not a reference', () => {
//       const newPosition = new Vec3(1, 2, 3);
//       testRenderable = new BoxGeometry(webglRenderSpy, webglProgramSpy);
//       testRenderable.translate(newPosition);
//       const actualPosition = testRenderable.getPosition();
//       expect(actualPosition).toEqual(newPosition);
//       expect(actualPosition).not.toBe(newPosition);
//     });
//   });

//   describe('GetScale', () => {
//     it('exists on the geometry', () => {
//       expect(testRenderable.getScale).toBeDefined();
//     });

//     it('returns the scale of the geometry', () => {
//       const expectedScale = new Vec3(1, 1, 1);
//       const actualScale = testRenderable.getScale();
//       expect(actualScale).toEqual(expectedScale);
//     });

//     it('returns a copy of the actual scale not a reference', () => {
//       const newScale = new Vec3(1, 2, 3);
//       testRenderable = new BoxGeometry(webglRenderSpy, webglProgramSpy);
//       testRenderable.setScale(newScale);
//       const actualScale = testRenderable.getScale();
//       expect(actualScale).toEqual(newScale);
//       expect(actualScale).not.toBe(newScale);
//     });
//   });

//   describe('GetScaleMatrix', () => {
//     it('returns a matrix with the scale at position (x)a11, (y)a22, (z)a33w', () => {
//       const newScale = new Vec3(4, 2, 3);
//       const expectedScaleMatrix = [newScale.x, 0, 0, 0, newScale.y, 0, 0, 0, newScale.z];
//       testRenderable.setScale(newScale);
//       const actualScaleMatrix = testRenderable.getScaleMatrix();
//       expect(actualScaleMatrix.toArray()).toEqual(expectedScaleMatrix);
//     });
//   });

//   describe('GetRotation', () => {
//     it('exists on the geometry', () => {
//       expect(testRenderable.getRotation).toBeDefined();
//     });

//     it('returns the rotation vector of the geometry', () => {
//       const expectedRotation = new Vec3(0, 1, 0);
//       const actualRotation = testRenderable.getRotation();
//       expect(actualRotation).toEqual(expectedRotation);
//     });

//     it('returns a copy of the rotation vector not a reference', () => {
//       const expectedRotation = new Vec3(1, 0, 0);
//       testRenderable = new BoxGeometry(webglRenderSpy, webglProgramSpy);
//       testRenderable.rotate(90);
//       const actualRotation = testRenderable.getRotation();
//       // cos90 degrees is only approx 0
//       // check if the value is below the margin of error (10 zeros out)
//       if (actualRotation.y < 0.00000000001) {
//         actualRotation.y = 0;
//       }
//       expect(actualRotation).toEqual(expectedRotation);
//       expect(actualRotation).not.toBe(expectedRotation);
//     });
//   });

//   describe('Rotate', () => {
//     it('exists on the geometry', () => {
//       expect(testRenderable.rotate).toBeDefined();
//     });

//     it('rotates the geometry by 90 degrees', () => {
//       const angleInDegrees = 90;
//       const angleInRadians = angleInDegrees * (Math.PI / 180);
//       const expectedRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
//       testRenderable.rotate(angleInDegrees);
//       const actualRotation = testRenderable.getRotation();
//       expect(actualRotation).toEqual(expectedRotation);
//     });

//     it('rotates the geometry by 45 degreess', () => {
//       const angleInDegrees = 45;
//       const angleInRadians = angleInDegrees * (Math.PI / 180);
//       const expectedRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
//       testRenderable.rotate(angleInDegrees);
//       const actualRotation = testRenderable.getRotation();
//       expect(actualRotation).toEqual(expectedRotation);
//     });
//   });

//   describe('GetRotationMatrix', () => {
//     it('returns a matrix with the rotation matrix within', () => {
//       const expectedRotationMatrix = [1, 0, 0, -0, 1, 0, 0, 0, 1];
//       const actualRotationMatrix = testRenderable.getRotationMatrix();
//       expect(actualRotationMatrix.toArray()).toEqual(expectedRotationMatrix);
//     });

//     it('returns a matrix with the 90 degree rotation matrix within', () => {
//       const expectedRotationMatrix = [0, 1, 0, -1, 0, 0, 0, 0, 1];
//       testRenderable.rotate(90);
//       const actualRotationMatrix = testRenderable.getRotationMatrix();
//       let rotationMatrixArray = actualRotationMatrix.toArray();
//       if (rotationMatrixArray[0] < 0.0000000001) {
//         rotationMatrixArray[0] = 0;
//       }
//       if (rotationMatrixArray[4] < 0.0000000001) {
//         rotationMatrixArray[4] = 0;
//       }
//       expect(rotationMatrixArray).toEqual(expectedRotationMatrix);
//     });
//   });

//   describe('GetColor', () => {
//     it('returns the default color (black) vector of the geometry', () => {
//       const expectedColorVector = new Vec4();
//       const actualColorVector = testRenderable.getColor();
//       expect(actualColorVector).toEqual(expectedColorVector);
//     });

//     it('returns the current color vector of the geometry', () => {
//       const expectedColorVector = new Vec4(1, 1, 1, 1);
//       testRenderable = new BoxGeometry(webglRenderSpy, webglProgramSpy);
//       testRenderable.setColor(expectedColorVector);
//       const actualColorVector = testRenderable.getColor();
//       expect(actualColorVector).toEqual(expectedColorVector);
//     });

//     it('returns a copy of the vector, not a reference', () => {
//       const expectedColorVector = new Vec4(1, 1, 1, 1);
//       testRenderable = new BoxGeometry(webglRenderSpy, webglProgramSpy);
//       testRenderable.setColor(expectedColorVector);
//       const actualColorVector = testRenderable.getColor();
//       expect(actualColorVector).not.toBe(expectedColorVector);
//     });
//   });

//   describe('GetTransform', () => {
//     it('returns a full transformation of the geometry. translate and scale only', () => {
//       const moveAmount = new Vec3(1, 1, 1);
//       const scaleAmount = new Vec3(1, 1, 1);
//       const rotateAmount = 90;
//       const rotateInRadian = rotateAmount * (Math.PI / 180);
//       const expectedRotationX = Math.sin(rotateInRadian);
//       const expectedRotationY = Math.cos(rotateInRadian);
//       const expectedTransform = [expectedRotationY, expectedRotationX, moveAmount.x, -expectedRotationX, expectedRotationY, moveAmount.y, 0, 0, 1];
//       testRenderable.translate(moveAmount);
//       testRenderable.setScale(scaleAmount);
//       testRenderable.rotate(rotateAmount);
//       const actualTransform = testRenderable.getTransform(new Mat3());
//       expect(actualTransform.toArray()).toEqual(expectedTransform);
//     });
//   });

//   describe('LERP (Linear Interpolate)', () => {
//     it('interpolates between two values', () => {
//       const expectedDestination = new Vec3(0.5, 0.5, 0.5);
//       const actualDestination = testRenderable.lerp(new Vec3(), new Vec3(1, 1, 1), 0.5);
//       expect(actualDestination).toEqual(expectedDestination);
//     });
//   });

// });