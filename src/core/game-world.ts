import { RendererEngine } from "../renderer/renderer-engine";

export class GameWorld {
    renderer: RendererEngine;
    constructor(rendererEngine: RendererEngine) {
        this.renderer = rendererEngine;
    }
}