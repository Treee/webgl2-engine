"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = require("../math/vec3");
const renderable_1 = require("./renderable");
class Point2D extends renderable_1.Renderable {
    constructor(x, y, gl, programInfo) {
        super(programInfo);
        this.setVertices([0, 0]);
        this.translate(new vec3_1.Vec3(x, y, 1));
        this.geometryData.setData(gl.FLOAT, gl.POINTS, false, 2, 0, 0, 1);
        this.createVertexArrayObject(gl, programInfo.program);
    }
}
exports.Point2D = Point2D;
//# sourceMappingURL=point-2d.js.map