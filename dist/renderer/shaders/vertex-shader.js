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
            case shader_types_1.VertexShaderType.THREE_D:
                vertexShaderCode = this.getBasic3dShaderCode();
                break;
            case shader_types_1.VertexShaderType.TEXTURE:
                vertexShaderCode = this.getBasicTextureShaderCode();
                break;
            case shader_types_1.VertexShaderType.DEBUG:
                vertexShaderCode = this.getDefaultVertexShader();
                break;
        }
        return vertexShaderCode;
    }
    getBasic3dShaderCode() {
        return `#version 300 es

        in vec4 a_position;	
        in vec4 a_color;	

        uniform mat4 u_matrix;	
        
        out vec4 v_color;	
            
        void main() {	
            // Multiply the position by the matrix.	
            gl_Position = u_matrix * a_position;	
            // Pass the color to the fragment shader.	
            v_color = a_color;	
        }	
        `;
    }
    getBasicTextureShaderCode() {
        return `#version 300 es

        in vec4 a_position;
        in vec4 a_color;
        in vec2 a_texCoord;
    
        uniform mat4 u_matrix;
        uniform vec2 u_resolution;
    
        out vec4 v_color;
        out vec2 v_texCoord;
    
        void main() {
            // Multiply the position by the matrix.
            gl_Position = u_matrix * a_position;
        
            // pass the texCoord to the fragment shader
            // The GPU will interpolate this value between points.
            v_texCoord = a_texCoord;
        }
        `;
    }
    getBasic2dShaderCode() {
        return `#version 300 es
        in vec2 a_position;
        
        uniform vec4 u_color;
        uniform mat3 u_transform;

        out vec4 v_color;

        void main() {
          gl_Position = vec4((u_transform * vec3(a_position, 1)).xy, 0, 1);
          gl_PointSize = 2.0;
          v_color = u_color;
        }
        `;
    }
    getDefaultVertexShader() {
        return `#version 300 es

        in vec4 a_position;

        uniform vec4 u_color;

        out vec4 v_color;

        void main() {
          gl_Position = a_position;
          gl_PointSize = 2.0;
          v_color = u_color;
        }
        `;
    }
}
exports.VertexShader = VertexShader;
//# sourceMappingURL=vertex-shader.js.map