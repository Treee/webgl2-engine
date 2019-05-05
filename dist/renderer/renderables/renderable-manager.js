"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twgl_js_1 = require("twgl.js");
const texture_entity_1 = require("./texture-entity");
const axis_3d_1 = require("./axis-3d");
const cube_1 = require("./cube");
const cone_1 = require("./cone");
const sphere_1 = require("./sphere");
const plane_1 = require("./plane");
const camera_1 = require("../camera/camera");
const rts_camera_1 = require("../camera/rts-camera");
class RenderableManager {
    constructor(gl, shaderManager) {
        this.activeCameraIndex = 1;
        this.cameras = [];
        this.renderables = [];
        this.gl = gl;
        this.shaderManager = shaderManager;
        this.cameras.push(new camera_1.Camera([0, 0, 0]));
        this.cameras.push(new rts_camera_1.RtsCamera([0, 0, 0]));
    }
    setDefaultScene() {
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
    addRenderableObject(objectToAdd) {
        this.renderables.push(objectToAdd);
    }
    addRenderableObjectByType(type) {
        switch (type) {
            case 'texture':
                let texture = new texture_entity_1.TextureEntity();
                texture.initializeObject(this.gl, this.shaderManager.getShader('basic-texture-shader'), {});
                this.addRenderableObject(texture);
                return;
            case 'cube':
                let cube = new cube_1.Cube();
                cube.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                cube.scale(0, [0.1, 0.1, 0.1]);
                this.addRenderableObject(cube);
                return;
            case 'sphere':
                let sphere = new sphere_1.Sphere();
                sphere.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(sphere);
                return;
            case 'cone':
                let cone = new cone_1.Cone();
                cone.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(cone);
                return;
            case 'axis':
                let axis = new axis_3d_1.Axis3D();
                axis.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                axis.scale(0, [100, 100, 100]);
                this.addRenderableObject(axis);
                return;
            case 'plane':
                let plane = new plane_1.Plane();
                plane.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                plane.scale(0, [200, 0, 200]);
                this.addRenderableObject(plane);
                return;
            default:
                let defaultCube = new cube_1.Cube();
                defaultCube.initializeObject(this.gl, this.shaderManager.getShader('basic-shader'), {});
                this.addRenderableObject(defaultCube);
                return;
        }
    }
    drawScene(gl, dt) {
        dt = dt * 0.001; // take the current dt and make it even smaller
        twgl_js_1.resizeCanvasToDisplaySize(gl.canvas);
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
    applyUserInput(activeKeysMap, mouseInputs) {
        if (activeKeysMap['p'] && this.activeCameraIndex === 1) {
            this.cameras[this.activeCameraIndex].zoomIn();
        }
        if (activeKeysMap['o'] && this.activeCameraIndex === 1) {
            this.cameras[this.activeCameraIndex].zoomOut();
        }
        if (activeKeysMap['Tab']) {
            this.activeCameraIndex = (this.activeCameraIndex + 1) % this.cameras.length;
        }
        if (activeKeysMap['w']) {
            // move forward
            this.cameras.forEach(camera => {
                camera.moveForward();
            });
        }
        if (activeKeysMap['s']) {
            // move backward
            this.cameras.forEach(camera => {
                camera.moveBackward();
            });
        }
        if (activeKeysMap['a']) {
            // strafe left
            this.cameras.forEach(camera => {
                camera.moveLeft();
            });
        }
        if (activeKeysMap['d']) {
            // strafe right
            this.cameras.forEach(camera => {
                camera.moveRight();
            });
        }
        if (activeKeysMap['r']) {
            // rise
            this.cameras.forEach(camera => {
                camera.moveUp();
            });
        }
        if (activeKeysMap['f']) {
            // fall
            this.cameras.forEach(camera => {
                camera.moveDown();
            });
        }
        if (mouseInputs.leftMouseClicked && mouseInputs.mouseIsMoving) {
            this.cameras.forEach(camera => {
                camera.pitch(mouseInputs.y);
                camera.yaw(mouseInputs.x);
            });
        }
    }
}
exports.RenderableManager = RenderableManager;
//# sourceMappingURL=renderable-manager.js.map