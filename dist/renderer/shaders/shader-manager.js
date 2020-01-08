"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shader_types_1 = require("./shader-types");
const twgl = __importStar(require("twgl.js"));
const vertex_shader_1 = require("./vertex-shader");
const fragment_shader_1 = require("./fragment-shader");
class ShaderManager {
    constructor() {
        this.programs = new Map();
        this.vs = new vertex_shader_1.VertexShader();
        this.fs = new fragment_shader_1.FragmentShader();
    }
    initializeShaderPrograms(gl) {
        this.programs.set('basic-shader', this.initializeBasicShader(gl));
        this.programs.set('basic-texture-shader', this.initializeBasicTextureShader(gl));
    }
    getShader(shaderKey) {
        if (!this.programs.has(shaderKey)) {
            throw new Error('Shader key does not exist.');
        }
        const shaderProgram = this.programs.get(shaderKey);
        if (!shaderProgram) {
            throw new Error('Shader program does not exist.');
        }
        return shaderProgram;
    }
    initializeBasicShader(gl) {
        return this.initializeShaderProgram(gl, this.vs.getVertexShaderCode(shader_types_1.VertexShaderType.THREE_D), this.fs.getfragmentShaderCode(shader_types_1.FragmentShaderType.PASS_THROUGH));
    }
    initializeBasicTextureShader(gl) {
        return this.initializeShaderProgram(gl, this.vs.getVertexShaderCode(shader_types_1.VertexShaderType.TEXTURE), this.fs.getfragmentShaderCode(shader_types_1.FragmentShaderType.TEXTURE));
    }
    initializeShaderProgram(gl, vertexShader, fragmentShader, attributePrefix = 'a_') {
        twgl.setAttributePrefix(attributePrefix);
        return twgl.createProgramInfo(gl, [vertexShader, fragmentShader]);
    }
}
exports.ShaderManager = ShaderManager;
//# sourceMappingURL=shader-manager.js.map