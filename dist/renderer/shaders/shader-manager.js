"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_program_1 = require("./shader-program");
const shader_bound_variables_1 = require("./shader-bound-variables");
class ShaderManager {
    constructor() {
        this.shaderVariables = new shader_bound_variables_1.BasicShaderVariables();
    }
    initializeShaderPrograms(gl) {
        // create the default shader program for a 2d program
        const shaderProgram = new shader_program_1.ShaderProgram();
        this.basicShader = shaderProgram.getBasic2dProgram(gl);
        this.basicParticleShader = shaderProgram.getBasicParticleProgram(gl);
        // set uniforms
        this.shaderVariables = new shader_bound_variables_1.BasicShaderVariables();
        this.shaderVariables.u_transform = gl.getUniformLocation(this.basicShader, 'u_transform');
        this.shaderVariables.u_color = gl.getUniformLocation(this.basicShader, 'u_color');
    }
}
exports.ShaderManager = ShaderManager;
//# sourceMappingURL=shader-manager.js.map