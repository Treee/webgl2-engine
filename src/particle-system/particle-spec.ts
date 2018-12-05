import { Particle } from './particle';
import { Vec3 } from '../math/vec3';

describe('Particle System', () => {
  let testParticle: Particle;
  let testParticlePosition = new Vec3(3, 2, 1);
  let testParticleDecay = 3;
  let testParticleVelocity = new Vec3(0, 0, 0);
  const defaultDt = 1 / 1000;
  const aLargeNumber = 99999999;

  beforeEach(() => {
    testParticle = new Particle();
  });

  describe('Initialization', () => {
    it('starts with a default position of 0,0,0', () => {
      expect(testParticle.position).toEqual(new Vec3(0, 0, 0));
    });

    it('can be given a starting position', () => {
      testParticle = new Particle(testParticlePosition);
      expect(testParticle.position).toEqual(testParticlePosition);
    });

    it('starts off as enabled', () => {
      expect(testParticle.isActive).toBe(true);
    });

    it('has a default visual/enabled decay of 5 seconds', () => {
      expect(testParticle.decay).toEqual(testParticleDecay);
    });

    it('can be given a custom decay', () => {
      const expectedParticleDecay = 20;
      testParticle = new Particle(testParticlePosition, testParticleVelocity, expectedParticleDecay);
      expect(testParticle.decay).toEqual(expectedParticleDecay);
    });

    it('has a velocity of 0 unit/s', () => {
      expect(testParticle.velocity).toEqual(testParticleVelocity);
    });

    it('can be given a custom velocity', () => {
      const expectedParticleVelocity = new Vec3(0, 12, 0);
      testParticle = new Particle(testParticlePosition, expectedParticleVelocity, testParticleDecay);
      expect(testParticle.velocity).toEqual(expectedParticleVelocity);
    });
  });

  describe('update', () => {
    it('applies the velocity to the particle', () => {
      testParticle.velocity = new Vec3(1, 1, 0);
      testParticle.update(defaultDt);
      expect(testParticle.position).toEqual(new Vec3(1, 1, 0));
      testParticle.update(defaultDt);
      expect(testParticle.position).toEqual(new Vec3(2, 2, 0));
      testParticle.update(defaultDt);
      expect(testParticle.position).toEqual(new Vec3(3, 3, 0));
    });

    it('applies a different velocity to the particle', () => {
      testParticle.velocity = new Vec3(-1, 2, 0);
      testParticle.update(defaultDt);
      expect(testParticle.position).toEqual(new Vec3(-1, 2, 0));
      testParticle.update(defaultDt);
      expect(testParticle.position).toEqual(new Vec3(-2, 4, 0));
      testParticle.update(defaultDt);
      expect(testParticle.position).toEqual(new Vec3(-3, 6, 0));
    });

    it('applies the decay to the particle', () => {
      testParticle.update(0.5);
      expect(testParticle.decay).toEqual(2.5);
      testParticle.update(0.5);
      expect(testParticle.decay).toEqual(2.0);
    });

    it('does not update the particle\'s position when isActive is false', () => {
      const expectedPosition = testParticle.position;
      testParticle.isActive = false;
      testParticle.update(100);
      expect(testParticle.position).toEqual(expectedPosition);
    });

    it('does not update the particle\'s decay when isActive is false', () => {
      const expectedDecay = testParticle.decay;
      testParticle.isActive = false;
      testParticle.update(100);
      expect(testParticle.decay).toEqual(expectedDecay);
    });
  });

  describe('disableParticleCheck', () => {
    it('disables a particle when the decay falls below 0', () => {
      testParticle.decay = -1;
      testParticle.disableParticleCheck();
      expect(testParticle.isActive).toEqual(false);
    });
  });

});