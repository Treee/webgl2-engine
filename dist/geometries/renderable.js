"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const vec4_1 = require("../math/vec4");
const mat3_1 = require("../math/mat3");
const geometry_data_1 = require("./geometry-data");
class Renderable {
    constructor() {
        this.position = new vec3_1.Vec3(0, 0, 0);
        this.scale = new vec3_1.Vec3(1, 1, 1);
        this.rotation = new vec3_1.Vec3(0, 1, 0);
        this.color = new vec4_1.Vec4();
        this.geometryData = new geometry_data_1.GeometryData();
        this.vertices = [];
    }
    lerp(pointA, pointB, dt) {
        // imprecise method pointA + dt * (pointB - pointA)
        // return pointA.add(pointB.sub(pointA).multiplyScalar(dt));
        // precise method (1 - dt) * pointA + dt * pointB
        return pointA.multiplyScalar(1 - dt).add(pointB.multiplyScalar(dt));
    }
    setVertices(newVertices) {
        this.vertices = newVertices;
    }
    getTransform(projectionMatrix) {
        let temp = new mat3_1.Mat3();
        temp = temp.multiplyMatrices(temp, this.getRotationMatrix());
        temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
        temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
        temp = temp.multiplyMatrices(temp, projectionMatrix);
        return temp;
    }
    getTranslationMatrix() {
        const position = this.getPosition();
        let translationMatrix = new mat3_1.Mat3();
        translationMatrix.set(1, 0, 0, 0, 1, 0, position.x, position.y, 1);
        return translationMatrix;
    }
    translate(newPosition) {
        this.position = newPosition;
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
    getScale() {
        return this.scale.cloneVec3();
    }
    setScale(newScale) {
        this.scale = newScale;
    }
    getRotationMatrix() {
        const rotation = this.getRotation();
        let rotationMatrix = new mat3_1.Mat3();
        // [y, -x, 0,
        //  x, y, 0,
        //  0, 0, 1]
        rotationMatrix.set(rotation.y, -rotation.x, 0, rotation.x, rotation.y, 0, 0, 0, 1);
        return rotationMatrix;
    }
    // rotates clockwise starting from (0, 1, 0)
    rotate(angleInDegrees) {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const newRotation = new vec3_1.Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
        this.setRotation(newRotation);
    }
    getRotation() {
        return this.rotation.cloneVec3();
    }
    setRotation(newRotation) {
        this.rotation = newRotation;
    }
    setColor(newColor) {
        this.color = newColor;
    }
    getColor() {
        return this.color.clone();
    }
    draw(gl, transformUniformLocation, projectionMatrix) {
        gl.bindVertexArray(this.vao);
        // vertex uniforms
        const matrix = this.getTransform(projectionMatrix).transpose();
        gl.uniformMatrix3fv(transformUniformLocation, false, matrix.toArray());
        // fragment uniforms
        // gl.uniform4fv(colorUniformLocation, this.getColor().toArray());
        gl.drawArrays(this.geometryData.drawMode, this.geometryData.offset, this.geometryData.count);
        // gl.drawArrays(gl.TRIANGLES, offset, count);
        // gl.bindVertexArray(null);
    }
    createVertexArrayObject(gl, shaderProgram) {
        // set up attribute and uniforms (vertex shader)
        const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
        // set up attribute and uniforms (fragment shader)
        const colorAttributeLocation = gl.getAttribLocation(shaderProgram, 'u_color');
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
        // define how the gpu will interpret the array
        gl.vertexAttribPointer(positionAttributeLocation, this.geometryData.size, this.geometryData.dataType, this.geometryData.isNormalized, this.geometryData.stride, this.geometryData.offset);
        // gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.bindVertexArray(null);
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(colorAttributeLocation);
        this.createBindAndBufferData(gl, gl.ARRAY_BUFFER, this.color.toArray(), gl.STATIC_DRAW);
        gl.vertexAttribPointer(colorAttributeLocation, this.color.toArray().length, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);
    }
    // create a buffer, bing opengl to that buffer, send data to the buffer in one fell swoop
    createBindAndBufferData(gl, bufferType, bufferData, bufferUsage) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, new Float32Array(bufferData), bufferUsage);
    }
}
exports.Renderable = Renderable;
//# sourceMappingURL=renderable.js.map