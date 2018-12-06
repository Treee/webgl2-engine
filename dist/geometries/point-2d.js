"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
const mat3_1 = require("../math/mat3");
class Point2D {
    constructor(x, y) {
        this.position = new vec3_1.Vec3(0, 0, 0);
        this.scale = new vec3_1.Vec3(1, 1, 1);
        this.color = new vec4_1.Vec4();
        this.vertices = [];
        this.setVertices([0, 0]);
        this.translate(new vec3_1.Vec3(x, y, 1));
    }
    setVertices(newVertices) {
        this.vertices = newVertices;
    }
    getTransform(projectionMatrix) {
        let temp = new mat3_1.Mat3();
        temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
        temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
        temp = temp.multiplyMatrices(temp, projectionMatrix);
        return temp;
    }
    translate(newPosition) {
        this.position = newPosition;
    }
    getTranslationMatrix() {
        const position = this.getPosition();
        let translationMatrix = new mat3_1.Mat3();
        translationMatrix.set(1, 0, 0, 0, 1, 0, position.x, position.y, 1);
        return translationMatrix;
    }
    getPosition() {
        return this.position.cloneVec3();
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
        return this.scale.cloneVec3();
    }
    setColor(newColor) {
        this.color = newColor;
    }
    getColor() {
        return this.color.clone();
    }
    draw(gl, transformUniformLocation, colorUniformLocation, projectionMatrix) {
        gl.bindVertexArray(this.vao);
        // vertex uniforms
        const matrix = this.getTransform(projectionMatrix).transpose();
        gl.uniformMatrix3fv(transformUniformLocation, false, matrix.toArray());
        // fragment uniforms
        gl.uniform4fv(colorUniformLocation, this.getColor().toArray());
        let offset = 0;
        const count = 1;
        gl.drawArrays(gl.POINTS, offset, count);
        // gl.bindVertexArray(null);
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
}
exports.Point2D = Point2D;
//# sourceMappingURL=point-2d.js.map