"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const renderable_1 = require("./renderable");
const vec4_1 = require("../math/vec4");
class BoxGeometry extends renderable_1.Renderable {
    constructor(gl, shaderProgram) {
        super();
        this.createRectangle(gl, new vec3_1.Vec3(), 25, 25, new vec4_1.Vec4(1, 0, 0, 1));
        this.createVertexArrayObject(gl, shaderProgram);
    }
    createRectangle(gl, position, width, height, color) {
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
    createRandomRectangle(gl, position, maxWidth, maxHeight) {
        this.createRectangle(gl, position, this.randomInt(maxWidth), this.randomInt(maxHeight), new vec4_1.Vec4(Math.random(), Math.random(), Math.random(), 1));
    }
    randomInt(range) {
        return Math.floor(Math.random() * range);
    }
}
exports.BoxGeometry = BoxGeometry;
//# sourceMappingURL=box-geometry.js.map