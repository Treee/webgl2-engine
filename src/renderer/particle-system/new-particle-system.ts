
import { Vec3 } from '../../math/vec3';
import { Vec4 } from '../../math/vec4';
import { Mat3 } from '../../math/mat3';
import { GeometryData } from '../renderables/geometry-data';

export class NewParticle {
  velocity: Vec3 = new Vec3();
  isActive: boolean = false;
  decay: number = 3;
  constructor() {

  };
}

export class NewParticleSystem {

  protected position: Vec3 = new Vec3(0, 0, 0);
  protected scale: Vec3 = new Vec3(1, 1, 1);
  protected rotation: Vec3 = new Vec3(0, 1, 0);

  protected color: Vec4 = new Vec4();

  public geometryData: GeometryData = new GeometryData();

  protected vao!: WebGLVertexArrayObject;
  protected vertices: number[] = [];

  numParticles = 0;
  particles: NewParticle[] = [];

  constructor(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram, numParticles: number = 5000, position: Vec3) {
    this.reinitializeParticles(gl, shaderProgram, numParticles, position, new Vec3(7, 7, 7), 7);
  }

  reinitializeParticles(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram, numParticles: number = 5000, generatorPosition: Vec3 = new Vec3(), maxVelocity: Vec3 = new Vec3(), maxDecay: number = 3) {
    this.vertices = new Array(numParticles * 2).fill(0);
    this.geometryData.setData(gl.FLOAT, gl.POINTS, false, 2, 0, 0, numParticles);
    this.createVertexArrayObject(gl, shaderProgram);


    this.translate(generatorPosition);
    this.setColor(new Vec4(0, 1, 0, 1));
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push(this.createParticle(maxVelocity, maxDecay));
    }
  }

  createParticle(maxVelocity: Vec3, maxDecay: number) {
    const newParticle = new NewParticle();
    newParticle.decay = maxDecay;
    newParticle.velocity = maxVelocity;
    newParticle.isActive = true;
    return newParticle;
  }

  update(dt: number) {
    this.particles.forEach(particle => {
      if (particle.isActive) {
        particle.decay -= dt;
        // do some translation if needed




        particle.isActive = this.isParticleActive(particle.decay);
      }
    });
  }

  isParticleActive(particleDecay: number) {
    return particleDecay > 0;
  }

  public lerp(pointA: Vec3, pointB: Vec3, dt: number): Vec3 {
    // imprecise method pointA + dt * (pointB - pointA)
    // return pointA.add(pointB.sub(pointA).multiplyScalar(dt));
    // precise method (1 - dt) * pointA + dt * pointB
    return pointA.multiplyScalar(1 - dt).add(pointB.multiplyScalar(dt));
  }

  protected setVertices(newVertices: number[]) {
    this.vertices = newVertices;
  }

  public getTransform(projectionMatrix: Mat3): Mat3 {
    let temp = new Mat3();
    temp = temp.multiplyMatrices(temp, this.getRotationMatrix());
    temp = temp.multiplyMatrices(temp, this.getScaleMatrix());
    temp = temp.multiplyMatrices(temp, this.getTranslationMatrix());
    temp = temp.multiplyMatrices(temp, projectionMatrix);
    return temp;
  }

  public getTranslationMatrix(): Mat3 {
    const position = this.getPosition();
    let translationMatrix = new Mat3();
    translationMatrix.set(1, 0, 0, 0, 1, 0, position.x, position.y, 1);
    return translationMatrix;
  }

  public translate(newPosition: Vec3): void {
    this.position = newPosition;
  }

  public getPosition(): Vec3 {
    return this.position.cloneVec3();
  }

  public getScaleMatrix(): Mat3 {
    const scale = this.getScale();
    let scaleMatrix = new Mat3();
    scaleMatrix.set(scale.x, 0, 0, 0, scale.y, 0, 0, 0, scale.z);
    return scaleMatrix;
  }

  public getScale(): Vec3 {
    return this.scale.cloneVec3();
  }

  public setScale(newScale: Vec3): void {
    this.scale = newScale;
  }

  public getRotationMatrix(): Mat3 {
    const rotation = this.getRotation();
    let rotationMatrix = new Mat3();
    // [y, -x, 0,
    //  x, y, 0,
    //  0, 0, 1]
    rotationMatrix.set(rotation.y, -rotation.x, 0, rotation.x, rotation.y, 0, 0, 0, 1);
    return rotationMatrix;
  }

  // rotates clockwise starting from (0, 1, 0)
  public rotate(angleInDegrees: number): void {
    const angleInRadians = angleInDegrees * (Math.PI / 180);
    const newRotation = new Vec3(Math.sin(angleInRadians), Math.cos(angleInRadians), 0);
    this.setRotation(newRotation);
  }

  public getRotation(): Vec3 {
    return this.rotation.cloneVec3();
  }

  private setRotation(newRotation: Vec3): void {
    this.rotation = newRotation;
  }

  public setColor(newColor: Vec4): void {
    this.color = newColor;
  }

  public getColor(): Vec4 {
    return this.color.clone();
  }

  draw(gl: WebGL2RenderingContext, transformUniformLocation: any, colorUniformLocation: any, projectionMatrix: Mat3) {
    gl.bindVertexArray(this.vao);
    // vertex uniforms
    const matrix = this.getTransform(projectionMatrix).transpose();
    gl.uniformMatrix3fv(transformUniformLocation, false, matrix.toArray());
    // fragment uniforms
    gl.uniform4fv(colorUniformLocation, this.getColor().toArray());

    gl.drawArrays(this.geometryData.drawMode, this.geometryData.offset, this.geometryData.count);
    // gl.drawArrays(gl.TRIANGLES, offset, count);
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

    // define how the gpu will interpret the array
    gl.vertexAttribPointer(positionAttributeLocation, this.geometryData.size, this.geometryData.dataType, this.geometryData.isNormalized, this.geometryData.stride, this.geometryData.offset);
    // gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    gl.bindVertexArray(null);
  }

  // create a buffer, bing opengl to that buffer, send data to the buffer in one fell swoop
  private createBindAndBufferData(gl: any, bufferType: GLenum, bufferData: any, bufferUsage: GLenum) {
    const buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, new Float32Array(bufferData), bufferUsage);
  }
}