import { ParticleSystem } from './particle-system';

describe('Particle System', () => {
  let testParticleSystem: ParticleSystem;
  let totalParticles = 10;

  beforeEach(() => {
    testParticleSystem = new ParticleSystem(totalParticles);
  });

  describe('Initialization', () => {
    it('starts with a certain number of particles', () => {
      const expectedParticles = totalParticles;
      const actualParticles = testParticleSystem.particles.length;
      expect(actualParticles).toEqual(expectedParticles);
    });
  });

});