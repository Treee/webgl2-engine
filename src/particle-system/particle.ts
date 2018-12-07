import { Vec3 } from "../math/vec3";
import { Vec4 } from "../math/vec4";
import { Mat3 } from '../math/mat3';

export class Particle {

  private vao!: WebGLVertexArrayObject;
  private vertices: number[] = [];

  private scale: Vec3 = new Vec3(1, 1, 1);

  color: Vec4 = new Vec4();
  position: Vec3 = new Vec3();
  velocity: Vec3 = new Vec3();
  isActive: boolean = false;
  decay: number = 3;


  constructor(position: Vec3 = new Vec3(), velocity: Vec3 = new Vec3(), color: Vec4 = new Vec4(), decay: number = 3) {
    this.reinitializeParticle(position, velocity, color, decay);
  }

  reinitializeParticle(position: Vec3 = new Vec3(), velocity: Vec3 = new Vec3(), color: Vec4 = new Vec4(), decay: number = 3) {
    this.position = position;
    this.decay = decay;
    this.velocity = velocity;
    this.color = color;
    this.isActive = true;
    this.setVertices([position.x, position.y]);
    this.translate(new Vec3(position.x, position.y, 1));
  }

  update(dt: number) {
    if (this.isActive) {
      this.decay -= dt;
      const newPosition = this.position.clone().add(this.velocity);
      const newVec = new Vec3(newPosition.x, newPosition.y, newPosition.z);
      // this.position.add(this.velocity);
      this.translate(newVec);
      this.disableParticleCheck();
    }
  }

  disableParticleCheck() {
    if (this.decay < 0) {
      this.isActive = false;
    }
  }

  setVertices(newVertices: number[]) {
    this.vertices = newVertices;
  }

  translate(newPosition: Vec3): void {
    this.position = newPosition;
  }

  getScale(): Vec3 {
    return this.scale.cloneVec3();
  }

  getScaleMatrix(): Mat3 {
    const scale = this.getScale();
    let scaleMatrix = new Mat3();
    scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, scale.z);
    return scaleMatrix;
  }

  getPosition(): Vec3 {
    return this.position.cloneVec3();
  }

  getColor(): Vec4 {
    return this.color.clone();
  }

  getTranslationMatrix(): Mat3 {
    const position = this.getPosition();
    let translationMatrix = new Mat3();
    translationMatrix.set(1, 0, 0, 0, 1, 0, position.x, position.y, 1);
    return translationMatrix;
  }

  getTransform(projectionMatrix: Mat3): Mat3 {
    let temp = new Mat3();
    temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
    temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
    temp = temp.multiplyMatrices(temp, projectionMatrix);
    return temp;
  }

  draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3) {
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

}