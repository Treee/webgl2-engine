// import { Particle } from './particle';
// import { Vec3 } from '../math/vec3';
// import { Vec4 } from '../math/vec4';

// describe('Particle', () => {
//   let testParticle: Particle;
//   let testParticlePosition = new Vec3();
//   let testParticleDecay = 3;
//   let testParticleVelocity = new Vec3();
//   let testParticleColor = new Vec4();
//   let defaultDt = 1 / 1000;

//   beforeEach(() => {
//     testParticlePosition = new Vec3(0, 0, 1);
//     testParticleVelocity = new Vec3();
//     testParticleColor = new Vec4();
//     testParticle = new Particle(testParticlePosition, testParticleVelocity, testParticleColor, testParticleDecay);
//   });

//   describe('Initialization', () => {
//     it('starts with a default position of 0,0,1', () => {
//       expect(testParticle.position).toEqual(new Vec3(0, 0, 1));
//     });

//     it('can be given a starting position', () => {
//       testParticle = new Particle(testParticlePosition);
//       expect(testParticle.position).toEqual(testParticlePosition);
//     });

//     it('starts off as enabled', () => {
//       expect(testParticle.isActive).toBe(true);
//     });

//     it('has a default visual/enabled decay of 5 seconds', () => {
//       expect(testParticle.decay).toEqual(testParticleDecay);
//     });

//     it('can be given a custom decay', () => {
//       const expectedParticleDecay = 20;
//       testParticle = new Particle(testParticlePosition, testParticleVelocity, testParticleColor, expectedParticleDecay);
//       expect(testParticle.decay).toEqual(expectedParticleDecay);
//     });

//     it('has a velocity of 0 unit/s', () => {
//       expect(testParticle.velocity).toEqual(testParticleVelocity);
//     });

//     it('can be given a custom velocity', () => {
//       const expectedParticleVelocity = new Vec3(0, 12, 0);
//       testParticle = new Particle(testParticlePosition, expectedParticleVelocity, testParticleColor, testParticleDecay);
//       expect(testParticle.velocity).toEqual(expectedParticleVelocity);
//     });

//     it('has a color of  0', () => {
//       expect(testParticle.color).toEqual(new Vec4());
//     });

//     it('can be given a custom color', () => {
//       const expectedColor = new Vec4(0, 1, 0, 1);
//       testParticle = new Particle(testParticlePosition, testParticleVelocity, expectedColor, testParticleDecay);
//       expect(testParticle.color).toEqual(expectedColor);
//     });
//   });

//   describe('update', () => {
//     it('applies the velocity to the particle', () => {
//       testParticle.velocity = new Vec3(1, 1, 0);
//       testParticle.update(defaultDt);
//       expect(testParticle.position).toEqual(new Vec3(1, 1, 1));
//       testParticle.update(defaultDt);
//       expect(testParticle.position).toEqual(new Vec3(2, 2, 1));
//       testParticle.update(defaultDt);
//       expect(testParticle.position).toEqual(new Vec3(3, 3, 1));
//     });

//     it('applies a different velocity to the particle', () => {
//       testParticle.velocity = new Vec3(-1, 2, 0);
//       testParticle.update(defaultDt);
//       expect(testParticle.position).toEqual(new Vec3(-1, 2, 1));
//       testParticle.update(defaultDt);
//       expect(testParticle.position).toEqual(new Vec3(-2, 4, 1));
//       testParticle.update(defaultDt);
//       expect(testParticle.position).toEqual(new Vec3(-3, 6, 1));
//     });

//     it('applies the decay to the particle', () => {
//       testParticle.update(0.5);
//       expect(testParticle.decay).toEqual(2.5);
//       testParticle.update(0.5);
//       expect(testParticle.decay).toEqual(2.0);
//     });

//     it('does not update the particle\'s position when isActive is false', () => {
//       const expectedPosition = testParticle.position;
//       testParticle.isActive = false;
//       testParticle.update(100);
//       expect(testParticle.position).toEqual(expectedPosition);
//     });

//     it('does not update the particle\'s decay when isActive is false', () => {
//       const expectedDecay = testParticle.decay;
//       testParticle.isActive = false;
//       testParticle.update(100);
//       expect(testParticle.decay).toEqual(expectedDecay);
//     });
//   });

//   describe('disableParticleCheck', () => {
//     it('disables a particle when the decay falls below 0', () => {
//       testParticle.decay = -1;
//       testParticle.disableParticleCheck();
//       expect(testParticle.isActive).toEqual(false);
//     });
//   });

//   describe('reinitializeParticle', () => {
//     it('re enables a particle with the default values', () => {
//       testParticle.update(100);
//       testParticle.reinitializeParticle();
//       expect(testParticle.color).toEqual(new Vec4());
//       expect(testParticle.position).toEqual(testParticlePosition);
//       expect(testParticle.velocity).toEqual(testParticleVelocity);
//       expect(testParticle.isActive).toBe(true);
//       expect(testParticle.decay).toBe(testParticleDecay);
//     });
//   });

// });