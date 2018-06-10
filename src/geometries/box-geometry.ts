import { Vec3 } from '../math/vec3';
import { Vec4 } from '../math/vec4';
import { Mat3 } from '../math/mat3';

export class BoxGeometry {

    private position: Vec3 = new Vec3();
    private scale: Vec3 = new Vec3(1, 1, 1);
    private rotation: Vec3 = new Vec3(0, 1, 0);

    private color: Vec4 = new Vec4();

    private vao!: WebGLVertexArrayObject;
    private vertices: number[] = [];

    constructor() {
        this.createRectangle(new Vec3(), 25, 25);
    }

    setVertices(newVertices: number[]) {
        this.vertices = newVertices;
    }

    getTransform(projectionMatrix: Mat3): Mat3 {
        let temp = new Mat3();
        temp = temp.multiplyMatrices(temp, this.getRotationMatrix());
        temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
        temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
        temp = temp.multiplyMatrices(temp, projectionMatrix);
        return temp;
    }

    translate(amountToTranslate: Vec3): void {
        const newPosition = this.getPosition().add(amountToTranslate);
        this.setPosition(newPosition);
    }

    getTranslationMatrix(): Mat3 {
        const position = this.getPosition();
        let translationMatrix = new Mat3();
        translationMatrix.set(1, 0, position.x, 0, 1, position.y, 0, 0, 1);
        return translationMatrix;
    }

    private setPosition(newPosition: Vec3): void {
        this.position = newPosition;
    }

    getPosition(): Vec3 {
        return this.position.clone();
    }

    getScaleMatrix(): Mat3 {
        const scale = this.getScale();
        let scaleMatrix = new Mat3();
        scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, scale.z);
        return scaleMatrix;
    }

    setScale(newScale: Vec3): void {
        this.scale = newScale;
    }

    getScale(): Vec3 {
        return this.scale.clone();
    }

    // rotates clockwise starting from (0, 1, 0)
    rotate(angleInDegrees: number): void {
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const newRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
        this.setRotation(newRotation);
    }

    getRotationMatrix(): Mat3 {
        const rotation = this.getRotation();
        let rotationMatrix = new Mat3();
        // [y, -x, 0,
        //  x, y, 0,
        //  0, 0, 1]
        rotationMatrix.set(rotation.y, rotation.x, 0, -rotation.x, rotation.y, 0, 0, 0, 1);
        return rotationMatrix;
    }

    private setRotation(newRotation: Vec3): void {
        this.rotation = newRotation;
    }

    getRotation(): Vec3 {
        return this.rotation.clone();
    }

    setColor(newColor: Vec4): void {
        this.color = newColor;
    }

    getColor(): Vec4 {
        return this.color.clone();
    }

    drawObject(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3) {
        gl.bindVertexArray(this.vao);
        // vertex uniforms
        const matrix = this.getTransform(projectionMatrix);
        gl.uniformMatrix3fv(transformUniformLocation, false, matrix.toArray());
        // fragment uniforms
        gl.uniform4fv(colorUniformLocation, this.getColor().toArray());

        let offset = 0;
        const count = 6;
        gl.drawArrays(gl.TRIANGLES, offset, count);
        // gl.bindVertexArray(null);
    }

    createVertexArrayObject(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
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

        const size = 2;             // 2 components per iteration
        const type = gl.FLOAT; // the data is 32bit floats
        const normalize = false;    // don't normalize the data
        const stride = 0;           // 0 = move forward size * sizeof(type) each iteration to get the next position
        let offset = 0;             // start at the beginning of the buffer
        // define how the gpu will interpret the array
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        gl.bindVertexArray(null);
    }

    // create a buffer, bing opengl to that buffer, send data to the buffer in one fell swoop
    private createBindAndBufferData(gl: any, bufferType: GLenum, bufferData: any, bufferUsage: GLenum) {
        const buffer = gl.createBuffer();
        gl.bindBuffer(bufferType, buffer);
        gl.bufferData(bufferType, new Float32Array(bufferData), bufferUsage);
    }

    private createRectangle(position: Vec3, width: number, height: number) {
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

    private createRandomRectangle(position: Vec3, maxWidth: number, maxHeight: number) {
        this.createRectangle(position, this.randomInt(maxWidth), this.randomInt(maxHeight));
    }

    randomInt(range: number): number {
        return Math.floor(Math.random() * range);
    }

}