"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_program_1 = require("./shader-program");
const program_info_1 = require("./program-info");
class ShaderManager {
    constructor() {
        this.programs = new Map();
    }
    initializeShaderPrograms(gl) {
        // create the default shader program for a 2d program
        const shaderProgram = new shader_program_1.ShaderProgram();
        const basicProgramInfo = new program_info_1.ProgramInfo();
        basicProgramInfo.program = shaderProgram.getBasic2dProgram(gl);
        basicProgramInfo.setUniforms(gl, ['u_transform', 'u_color']);
        this.programs.set('basic-shader', basicProgramInfo);
        const basicParticleProgramInfo = new program_info_1.ProgramInfo();
        basicParticleProgramInfo.program = shaderProgram.getBasicParticleProgram(gl);
        basicParticleProgramInfo.setUniforms(gl, ['u_transform', 'u_color']);
        this.programs.set('basic-particle-shader', basicParticleProgramInfo);
    }
    getShader(shaderKey) {
        if (!this.programs.has(shaderKey)) {
            throw new Error('Shader key does not exist.');
        }
        const shaderProgram = this.programs.get(shaderKey);
        if (!shaderProgram) {
            throw new Error('Shader program does not exist.');
        }
        return shaderProgram.program;
    }
}
exports.ShaderManager = ShaderManager;
//# sourceMappingURL=shader-manager.js.map