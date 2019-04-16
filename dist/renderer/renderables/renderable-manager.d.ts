/// <reference types="webgl2" />
import { m4 } from "twgl.js";
import { RenderableObject } from "./renderable-object";
import { ShaderManager } from "../shaders/shader-manager";
export declare class RenderableManager {
    gl: WebGL2RenderingContext;
    shaderManager: ShaderManager;
    renderables: RenderableObject[];
    constructor(gl: WebGL2RenderingContext, shaderManager: ShaderManager);
    setDefaultScene(): void;
    addRenderableObject(objectToAdd: RenderableObject): void;
    addRenderableObjectByType(type: string): void;
    drawScene(gl: WebGL2RenderingContext, dt: number, debugCamera: any, projectionMatrix: m4.Mat4): void;
}
