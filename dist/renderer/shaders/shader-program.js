"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vertex_shader_1 = require("./vertex-shader");
const fragment_shader_1 = require("./fragment-shader");
const shader_types_1 = require("./shader-types");
class ShaderProgram {
    constructor() { }
    getBasic2dProgram(gl) {
        return this.createShaderProgram(gl, shader_types_1.VertexShaderType.TWO_D, shader_types_1.FragmentShaderType.PASS_THROUGH);
    }
    getBasicParticleProgram(gl) {
        return this.createShaderProgram(gl, shader_types_1.VertexShaderType.PARTICLE, shader_types_1.FragmentShaderType.PASS_THROUGH);
    }
    createShaderProgram(gl, vertexShaderType, fragmentShaderType) {
        return this.createProgram(gl, this.createVertexShader(gl, vertexShaderType), this.createFragmentShader(gl, fragmentShaderType));
    }
    ;
    createVertexShader(gl, vertexShaderType) {
        const vertexShader = new vertex_shader_1.VertexShader();
        return this.compileShader(gl, vertexShader.getVertexShaderCode(vertexShaderType), gl.VERTEX_SHADER);
    }
    createFragmentShader(gl, fragmentShaderType) {
        const fragmentShader = new fragment_shader_1.FragmentShader();
        return this.compileShader(gl, fragmentShader.getfragmentShaderCode(fragmentShaderType), gl.FRAGMENT_SHADER);
    }
    createProgram(gl, vertexShader, fragmentShader) {
        // create a program.
        const program = gl.createProgram();
        if (!program) {
            throw new Error('Program failed to create.');
        }
        // attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        // link the program.
        gl.linkProgram(program);
        // Check if it linked.
        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            throw new Error('Program failed to link:' + gl.getProgramInfoLog(program));
        }
        return program;
    }
    compileShader(gl, shaderSource, shaderType) {
        // Create the shader object
        const shader = gl.createShader(shaderType);
        if (!shader) {
            throw new Error('Shader failed to create.');
        }
        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);
        // Compile the shader
        gl.compileShader(shader);
        // Check if it compiled
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw new Error('Failed to compile shader:' + gl.getShaderInfoLog(shader));
        }
        return shader;
    }
}
exports.ShaderProgram = ShaderProgram;
//# sourceMappingURL=shader-program.js.map