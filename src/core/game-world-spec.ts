import { GameWorld } from './game-world';
import { RendererEngine } from '../renderer/renderer-engine';

fdescribe('GameWorld', () => {
    let testGameWorld: GameWorld;
    let rendererMock: RendererEngine;
    beforeEach(() => {
        rendererMock = jasmine.createSpyObj('rendererMock', ['']);
        testGameWorld = new GameWorld(rendererMock);
    });

    it('has a renderer', () => {
        expect(testGameWorld.renderer).toBeDefined(0);
    });
});