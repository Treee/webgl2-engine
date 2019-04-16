"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const renderable_object_1 = require("./renderable-object");
const twgl_js_1 = require("twgl.js");
class Cone extends renderable_object_1.RenderableObject {
    constructor() {
        super();
        this.coneHeight = 1;
        this.baseDiameter = 1;
        this.numConeSides = 16;
        this.defaultUniforms = {
            u_colorMult: [1, 1, 1, 1],
            u_matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        };
        this.alias = 'cone';
    }
    initializeObject(gl, progInfo, uniforms) {
        // cone height
        let conePositions = [0, this.coneHeight, 0, 0, 0, 0];
        let coneIndices = [];
        let coneColors = [1, 0, 0, 1, 1, 0, 0, 1];
        let theta = (2 * Math.PI) / this.numConeSides;
        for (let coneSide = 0; coneSide < this.numConeSides; coneSide++) {
            let leftBaseTheta = theta * coneSide;
            let rightBase = theta * (coneSide + 1);
            conePositions.push(Math.cos(leftBaseTheta), 0, Math.sin(leftBaseTheta), Math.cos(rightBase), 0, Math.sin(rightBase));
            coneIndices.push(0, coneSide + 2, coneSide + 1, coneSide + 1, coneSide + 2, 1);
            coneColors.push(0, 1, 0, 1, 0, 0, 1, 1);
        }
        let arrays = {
            position: conePositions,
            color: coneColors,
            indices: coneIndices
        };
        let coneBufferInfo = twgl_js_1.createBufferInfoFromArrays(gl, arrays);
        this.bufferInfo = coneBufferInfo;
        this.programInfo = progInfo;
        this.vertexArray = twgl_js_1.createVAOFromBufferInfo(gl, progInfo, coneBufferInfo);
        this.uniforms = Object.assign({}, this.defaultUniforms, uniforms);
    }
    rotate(dt) {
        this.rotationX = dt;
        this.rotationY = -dt;
    }
}
exports.Cone = Cone;
//# sourceMappingURL=cone.js.map