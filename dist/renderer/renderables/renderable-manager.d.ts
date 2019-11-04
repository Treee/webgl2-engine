import { RenderableObject } from "./renderable-object";
import { ShaderManager } from "../shaders/shader-manager";
import { Camera } from "../camera/camera";
import { InputManager } from "../../input-interfaces/input-manager";
export declare class RenderableManager {
    gl: WebGLRenderingContext;
    shaderManager: ShaderManager;
    inputManager: InputManager;
    activeCameraIndex: number;
    cameras: Camera[];
    renderables: RenderableObject[];
    constructor(gl: WebGLRenderingContext, shaderManager: ShaderManager, inputManager: InputManager);
    setDefaultScene(): void;
    addRenderableObject(objectToAdd: RenderableObject): void;
    addRenderableObjectByType(type: string): void;
    drawScene(gl: WebGLRenderingContext, dt: number): void;
    applyUserInput(input: InputManager): void;
}
