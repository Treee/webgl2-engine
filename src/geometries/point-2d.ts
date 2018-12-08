import { Vec3 } from '../math/vec3';
import { Renderable } from './renderable';

export class Point2D extends Renderable {

    constructor(x: number, y: number, gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
        super();
        this.setVertices([0, 0]);
        this.translate(new Vec3(x, y, 1));
        this.geometryData.setData(gl.FLOAT, gl.POINTS, false, 2, 0, 0, 1);
        this.createVertexArrayObject(gl, shaderProgram);
    }

}