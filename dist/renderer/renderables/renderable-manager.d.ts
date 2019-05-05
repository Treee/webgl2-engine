/// <reference types="webgl2" />
import { RenderableObject } from "./renderable-object";
import { ShaderManager } from "../shaders/shader-manager";
import { Camera } from "../camera/camera";
export declare class RenderableManager {
    gl: WebGL2RenderingContext;
    shaderManager: ShaderManager;
    activeCameraIndex: number;
    cameras: Camera[];
    renderables: RenderableObject[];
    constructor(gl: WebGL2RenderingContext, shaderManager: ShaderManager);
    setDefaultScene(): void;
    addRenderableObject(objectToAdd: RenderableObject): void;
    addRenderableObjectByType(type: string): void;
    drawScene(gl: WebGL2RenderingContext, dt: number): void;
    applyUserInput(activeKeysMap: any, mouseInputs: any): void;
}
