import { Vec3 } from '../math/vec3';
import { Renderable } from './renderable';
import { Vec4 } from '../math/vec4';
import { ProgramInfo } from '../renderer/shaders/program-info';

export class BoxGeometry extends Renderable {

    constructor(gl: WebGL2RenderingContext, programInfo: ProgramInfo) {
        super(programInfo);
        this.createRectangle(gl, new Vec3(), 25, 25, new Vec4(1, 0, 0, 1));
        this.createVertexArrayObject(gl, programInfo.program);
    }

    private createRectangle(gl: WebGL2RenderingContext, position: Vec3, width: number, height: number, color: Vec4) {
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
        this.color = color;
        this.geometryData.setData(gl.FLOAT, gl.TRIANGLES, false, 2, 0, 0, (this.vertices.length / 2));
        // this.geometryData = new GeometryData(gl.FLOAT, gl.TRIANGLES, false, 2, 0, 0, this.vertices.length / 2);
        // this.setCenter(-(width) / 2, -(height) / 2, 1);
        // this.setCenter(tempCenter.x, tempCenter.y, tempCenter.z);
    }

    private createRandomRectangle(gl: WebGL2RenderingContext, position: Vec3, maxWidth: number, maxHeight: number) {
        this.createRectangle(gl, position, this.randomInt(maxWidth), this.randomInt(maxHeight), new Vec4(Math.random(), Math.random(), Math.random(), 1));
    }

    randomInt(range: number): number {
        return Math.floor(Math.random() * range);
    }
}