"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
const mat3_1 = require("../math/mat3");
class BoxGeometry {
    constructor() {
        this.position = new vec3_1.Vec3();
        this.scale = new vec3_1.Vec3(1, 1, 1);
        this.rotation = new vec3_1.Vec3(0, 1, 0);
        this.color = new vec4_1.Vec4();
        this.vertices = [];
        this.createRectangle(new vec3_1.Vec3(), 25, 25);
    }
    setVertices(newVertices) {
        this.vertices = newVertices;
    }
    getTransform() {
        let temp = new mat3_1.Mat3();
        temp = temp.multiplyMatrices(temp, this.getRotationMatrix());
        temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
        temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
        return temp;
    }
    translate(amountToTranslate) {
        const newPosition = this.getPosition().add(amountToTranslate);
        this.setPosition(newPosition);
    }
    getTranslationMatrix() {
        const position = this.getPosition();
        let translationMatrix = new mat3_1.Mat3();
        translationMatrix.set(1, 0, position.x, 0, 1, position.y, 0, 0, 1);
        return translationMatrix;
    }
    setPosition(newPosition) {
        this.position = newPosition;
    }
    getPosition() {
        return this.position.clone();
    }
    getScaleMatrix() {
        const scale = this.getScale();
        let scaleMatrix = new mat3_1.Mat3();
        scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, scale.z);
        return scaleMatrix;
    }
    setScale(newScale) {
        this.scale = newScale;
    }
    getScale() {
        return this.scale.clone();
    }
    // rotates clockwise starting from (0, 1, 0)
    rotate(angleInDegrees) {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const newRotation = new vec3_1.Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
        this.setRotation(newRotation);
    }
    getRotationMatrix() {
        const rotation = this.getRotation();
        let rotationMatrix = new mat3_1.Mat3();
        // [y, -x, 0,
        //  x, y, 0,
        //  0, 0, 1]
        rotationMatrix.set(rotation.y, rotation.x, 0, -rotation.x, rotation.y, 0, 0, 0, 1);
        return rotationMatrix;
    }
    setRotation(newRotation) {
        this.rotation = newRotation;
    }
    getRotation() {
        return this.rotation.clone();
    }
    setColor(newColor) {
        this.color = newColor;
    }
    getColor() {
        return this.color.clone();
    }
    drawObject(gl, transformLocation, colorLocation) {
        throw new Error('Implement Draw Object Function!!');
    }
    createVertexArrayObject(gl, shaderProgram) {
        // set up attribute and uniforms (vertex shader)
        const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
        // make a vertex array (this is so we layer data in a single array)
        const vertexArray = gl.createVertexArray();
        if (!vertexArray) {
            throw new Error('Vertex Attrib Array not created correctly.');
        }
        this.vao = vertexArray;
        // bind to the vertex array we will buffer data to
        gl.bindVertexArray(this.vao);
        // enable an attribute that was created above (in this case, possition attrib)
        gl.enableVertexAttribArray(positionAttributeLocation);
        this.createBindAndBufferData(gl, gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);
        const size = 2; // 2 components per iteration
        const type = gl.FLOAT; // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0; // start at the beginning of the buffer
        // define how the gpu will interpret the array
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.bindVertexArray(null);
    }
    // create a buffer, bing opengl to that buffer, send data to the buffer in one fell swoop
    createBindAndBufferData(gl, bufferType, bufferData, bufferUsage) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, new Float32Array(bufferData), bufferUsage);
    }
    createRectangle(position, width, height) {
        // let tempCenter = new Vec3(-(width) / 2, -(height) / 2, 1);
        // position.add(tempCenter.clone());
        this.translate(position);
        const x1 = 0;
        const x2 = x1 + width;
        const y1 = 0;
        const y2 = y1 + height;
        this.vertices = [
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2
        ];
        // this.setCenter(-(width) / 2, -(height) / 2, 1);
        // this.setCenter(tempCenter.x, tempCenter.y, tempCenter.z);
    }
    createRandomRectangle(position, maxWidth, maxHeight) {
        this.createRectangle(position, this.randomInt(maxWidth), this.randomInt(maxHeight));
    }
    randomInt(range) {
        return Math.floor(Math.random() * range);
    }
}
exports.BoxGeometry = BoxGeometry;
//# sourceMappingURL=box-geometry.js.map