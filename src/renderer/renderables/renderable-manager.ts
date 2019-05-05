import { resizeCanvasToDisplaySize } from "twgl.js";
import { RenderableObject } from "./renderable-object";
import { TextureEntity } from "./texture-entity";
import { Axis3D } from "./axis-3d";
import { Cube } from "./cube";
import { Cone } from "./cone";
import { Sphere } from "./sphere";
import { Plane } from "./plane";
import { ShaderManager } from "../shaders/shader-manager";
import { Camera } from "../camera/camera";
import { RtsCamera } from "../camera/rts-camera";

export class RenderableManager {

    gl: WebGL2RenderingContext;
    shaderManager: ShaderManager;

    activeCameraIndex = 0;
    cameras: Camera[] = [];
    renderables: RenderableObject[] = [];

    constructor(gl: WebGL2RenderingContext, shaderManager: ShaderManager) {
        this.gl = gl;
        this.shaderManager = shaderManager;

        this.cameras.push(new Camera([0, 0, 0]));
        this.cameras.push(new RtsCamera([0, 0, 0]));
    }

    public setDefaultScene() {
        this.addRenderableObjectByType('cube');
        this.addRenderableObjectByType('cube');
        this.addRenderableObjectByType('cube');
        this.addRenderableObjectByType('cube');
        this.addRenderableObjectByType('cone');
        this.addRenderableObjectByType('sphere');
        this.addRenderableObjectByType('axis');
        this.addRenderableObjectByType('plane');
        this.addRenderableObjectByType('texture');
    }

    public addRenderableObject(objectToAdd: RenderableObject): void {
        this.renderables.push(objectToAdd);
    }

    public addRenderableObjectByType(type: string) {
        switch (type) {
            case 'texture':
                let texture = new TextureEntity();
                texture.initializeObject(this.gl, this.shaderManager.getShader('basic-texture-shader'), {});
                this.addRenderableObject(texture);
                return;
            case 'cube':
                let cube = new Cube();
                cube.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(cube);
                return;
            case 'sphere':
                let sphere = new Sphere();
                sphere.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(sphere);
                return;
            case 'cone':
                let cone = new Cone();
                cone.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(cone);
                return;
            case 'axis':
                let axis = new Axis3D();
                axis.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                axis.scale(0, [100, 100, 100]);
                this.addRenderableObject(axis);
                return;
            case 'plane':
                let plane = new Plane();
                plane.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                plane.scale(0, [200, 0, 200]);
                this.addRenderableObject(plane);
                return;
            default:
                let defaultCube = new Cube();
                defaultCube.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(defaultCube);
                return;
        }
    }

    public drawScene(gl: WebGL2RenderingContext, dt: number) {
        dt = dt * 0.001; // take the current dt and make it even smaller
        resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);


        let viewProjectionMatrix = this.cameras[this.activeCameraIndex].getViewProjectionMatrix();

        this.renderables.forEach(renderable => {
            // renderable.rotate(dt);
            renderable.update(dt, viewProjectionMatrix);
            renderable.draw(gl);
        });
    }

    public applyUserInput(activeKeysMap: any, mouseInputs: any): void {
        if (activeKeysMap['Tab']) {
            this.activeCameraIndex = (this.activeCameraIndex + 1) % this.cameras.length;
        }
        if (activeKeysMap['w']) {
            // move forward
            this.cameras.forEach(camera => {
                camera.moveForward();
            });
        } if (activeKeysMap['s']) {
            // move backward
            this.cameras.forEach(camera => {
                camera.moveBackward();
            });
        } if (activeKeysMap['a']) {
            // strafe left
            this.cameras.forEach(camera => {
                camera.moveLeft();
            });
        } if (activeKeysMap['d']) {
            // strafe right
            this.cameras.forEach(camera => {
                camera.moveRight();
            });
        } if (activeKeysMap['r']) {
            // rise
            this.cameras.forEach(camera => {
                camera.moveUp();
            });
        } if (activeKeysMap['f']) {
            // fall
            this.cameras.forEach(camera => {
                camera.moveDown();
            });
        } if (mouseInputs.leftMouseClicked && mouseInputs.mouseIsMoving) {
            this.cameras.forEach(camera => {
                camera.pitch(mouseInputs.y);
                camera.yaw(mouseInputs.x);
            });
        }
    }
}