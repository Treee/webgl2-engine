"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramInfoTree {
    constructor() {
        this.uniforms = new Map();
        this.attributes = new Map();
    }
    setUniforms(gl, uniformKeys) {
        uniformKeys.forEach((key) => {
            this.uniforms.set(key, gl.getUniformLocation(this.program, key));
        });
    }
    getUniform(key) {
        if (!this.uniforms.has(key)) {
            throw new Error(`Uniform Key ${key} does not exist in the uniform map.`);
        }
        const uniform = this.uniforms.get(key);
        if (!uniform) {
            throw new Error(`Uniform ${key} does not exist.`);
        }
        return uniform;
    }
}
exports.ProgramInfoTree = ProgramInfoTree;
//# sourceMappingURL=program-info.js.map