"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shader_types_1 = require("./shader-types");
class VertexShader {
    constructor() { }
    getVertexShaderCode(vertexShaderType) {
        let vertexShaderCode = '';
        switch (vertexShaderType) {
            case shader_types_1.VertexShaderType.TWO_D:
                vertexShaderCode = this.getBasic2dShaderCode();
                break;
            case shader_types_1.VertexShaderType.PARTICLE:
                vertexShaderCode = this.getBasicParticleShaderCode();
                break;
            case shader_types_1.VertexShaderType.DEBUG:
                vertexShaderCode = this.getDefaultVertexShader();
                break;
        }
        return vertexShaderCode;
    }
    getBasicParticleShaderCode() {
        return `#version 300 es
        in vec2 a_position;
        in vec4 a_color;

        uniform mat3 u_transform;

        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
          gl_PointSize = 2.0;
          v_color = a_color;
        }
        `;
    }
    getBasic2dShaderCode() {
        return `#version 300 es
        in vec2 a_position;
        in vec4 a_color;

        uniform mat3 u_transform;

        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
          gl_PointSize = 2.0;
          v_color = a_color;
        }
        `;
    }
    getDefaultVertexShader() {
        return `#version 300 es

        in vec4 a_position;
        in vec4 a_color;

        out vec4 v_color;

        void main() {
          gl_Position = a_position;
          gl_PointSize = 2.0;
          v_color = a_color;
        }
        `;
    }
}
exports.VertexShader = VertexShader;
//# sourceMappingURL=vertex-shader.js.map