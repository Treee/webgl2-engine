"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_types_1 = require("./shader-types");
const twgl = require("twgl.js");
const vertex_shader_1 = require("./vertex-shader");
const fragment_shader_1 = require("./fragment-shader");
class ShaderManager {
    constructor() {
        this.programs = new Map();
        this.vertexShader = new vertex_shader_1.VertexShader();
        this.fragmentShader = new fragment_shader_1.FragmentShader();
    }
    initializeShaderPrograms(gl) {
        this.programs.set('basic-shader', this.initializeBasicShader(gl));
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
    initializeBasicShader(gl) {
        return this.initializeShaderProgram(gl, this.vertexShader.getVertexShaderCode(shader_types_1.VertexShaderType.TWO_D), this.fragmentShader.getfragmentShaderCode(shader_types_1.FragmentShaderType.PASS_THROUGH));
    }
    initializeShaderProgram(gl, vertexShader, fragmentShader, attributePrefix = 'a_') {
        twgl.setAttributePrefix(attributePrefix);
        return twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
    }
}
exports.ShaderManager = ShaderManager;
//# sourceMappingURL=shader-manager.js.map